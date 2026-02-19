-- =============================================================
-- NEO-DIAGDEF - Complete Database Schema
-- Based on: Plan Directeur Technique - MAXER Methodology
-- Generated: 2026-02-19
-- =============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- =============================================================
-- 1. ROLES & USER PROFILES
-- =============================================================

CREATE TABLE IF NOT EXISTS roles (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        TEXT NOT NULL UNIQUE,          -- 'ADMIN','EXPERT_METHODE','TECHNICIAN','SUPERVISOR','VIEWER'
    description TEXT,
    permissions JSONB NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
    id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name    TEXT,
    last_name     TEXT,
    initials      TEXT,
    role_id       UUID REFERENCES roles(id),
    employee_id   TEXT UNIQUE,
    department    TEXT,
    phone         TEXT,
    avatar_url    TEXT,
    is_active     BOOLEAN DEFAULT TRUE,
    last_seen_at  TIMESTAMPTZ,
    preferences   JSONB DEFAULT '{}',
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 2. ORGANIZATIONS & PLANTS
-- =============================================================

CREATE TABLE IF NOT EXISTS organizations (
    id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name         TEXT NOT NULL,
    code         TEXT UNIQUE,
    country      TEXT,
    sector       TEXT,   -- 'DEFENSE','NUCLEAR','INDUSTRIAL','AERONAUTICS'
    is_air_gapped BOOLEAN DEFAULT FALSE,
    settings     JSONB DEFAULT '{}',
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS plants (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name            TEXT NOT NULL,
    code            TEXT NOT NULL,
    location        TEXT,
    timezone        TEXT DEFAULT 'UTC',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 3. ASSET / EQUIPMENT HIERARCHY (Functional Locations)
-- =============================================================

CREATE TABLE IF NOT EXISTS functional_locations (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plant_id         UUID REFERENCES plants(id),
    parent_id        UUID REFERENCES functional_locations(id),
    code             TEXT NOT NULL,          -- e.g. "P-101-A"
    name             TEXT NOT NULL,          -- e.g. "Hydraulic Pump A2"
    description      TEXT,
    level            INTEGER NOT NULL DEFAULT 0,
    path             TEXT,                   -- materialized path
    asset_category   TEXT,                   -- 'PUMP','MOTOR','CONVEYOR','COMPRESSOR','HVAC','ROBOT'
    manufacturer     TEXT,
    model            TEXT,
    serial_number    TEXT,
    installation_date DATE,
    criticality      TEXT DEFAULT 'MEDIUM',  -- 'CRITICAL','HIGH','MEDIUM','LOW'
    gmao_id          TEXT,                   -- SAP / Maximo ID
    s3000l_ref       TEXT,
    metadata         JSONB DEFAULT '{}',
    is_active        BOOLEAN DEFAULT TRUE,
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 4. OBJECT & DEFECT LIBRARIES  (MAXER Core Ontology)
-- =============================================================

-- Object = physical component (bearing, seal, motor, etc.)
CREATE TABLE IF NOT EXISTS objects (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    functional_location_id UUID REFERENCES functional_locations(id),
    code                   TEXT NOT NULL UNIQUE,
    name                   TEXT NOT NULL,
    description            TEXT,
    category               TEXT,  -- 'MECHANICAL','ELECTRICAL','HYDRAULIC','ELECTRONIC','PNEUMATIC'
    s3000l_ref             TEXT,
    iso_14224_code         TEXT,
    parent_object_id       UUID REFERENCES objects(id),
    is_active              BOOLEAN DEFAULT TRUE,
    created_at             TIMESTAMPTZ DEFAULT NOW()
);

-- Defect = standardized failure symptom per ISO 14224 / S3000L
CREATE TABLE IF NOT EXISTS defects (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code                    TEXT NOT NULL UNIQUE,
    name                    TEXT NOT NULL,
    description             TEXT,
    iso_14224_code          TEXT,
    s3000l_failure_mode_ref TEXT,
    category                TEXT,  -- 'VIBRATION','NOISE','LEAKAGE','THERMAL','ELECTRICAL','FUNCTIONAL','STRUCTURAL'
    severity                TEXT DEFAULT 'MEDIUM',
    is_active               BOOLEAN DEFAULT TRUE,
    created_at              TIMESTAMPTZ DEFAULT NOW()
);

-- MAXER constraint: only valid Object-Defect pairs are selectable
CREATE TABLE IF NOT EXISTS object_defect_mappings (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    object_id        UUID NOT NULL REFERENCES objects(id) ON DELETE CASCADE,
    defect_id        UUID NOT NULL REFERENCES defects(id) ON DELETE CASCADE,
    frequency_weight FLOAT DEFAULT 1.0,   -- historical occurrence (for AI ranking)
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(object_id, defect_id)
);

-- =============================================================
-- 5. FAILURE MODES — S3000L / FMECA
-- =============================================================

CREATE TABLE IF NOT EXISTS failure_modes (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    functional_location_id UUID REFERENCES functional_locations(id),
    object_id              UUID REFERENCES objects(id),
    defect_id              UUID REFERENCES defects(id),
    failure_mode_code      TEXT,
    description            TEXT,
    local_effect           TEXT,
    system_effect          TEXT,
    mission_effect         TEXT,
    detection_method       TEXT,
    severity_class         TEXT,  -- 'CATASTROPHIC','CRITICAL','MARGINAL','NEGLIGIBLE'
    probability_class      TEXT,  -- 'FREQUENT','PROBABLE','OCCASIONAL','REMOTE','IMPROBABLE'
    mtbf_hours             FLOAT,
    source                 TEXT DEFAULT 'MANUAL',  -- 'S3000L_IMPORT','MANUAL','AI_GENERATED'
    is_validated           BOOLEAN DEFAULT FALSE,
    created_at             TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 6. WORK ORDERS
-- =============================================================

CREATE TABLE IF NOT EXISTS work_orders (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wo_number              TEXT NOT NULL UNIQUE,   -- 'OT-4921'
    plant_id               UUID REFERENCES plants(id),
    functional_location_id UUID REFERENCES functional_locations(id),
    assigned_technician_id UUID REFERENCES profiles(id),
    created_by             UUID REFERENCES profiles(id),
    title                  TEXT NOT NULL,
    description            TEXT,
    priority               TEXT NOT NULL DEFAULT 'MEDIUM',  -- 'CRITICAL','HIGH','MEDIUM','LOW'
    status                 TEXT NOT NULL DEFAULT 'OPEN',
    -- OPEN | IN_DIAGNOSIS | PENDING_PARTS | IN_PROGRESS | SOLVED | CLOSED | CANCELLED
    type                   TEXT DEFAULT 'CORRECTIVE',
    -- CORRECTIVE | PREVENTIVE | PREDICTIVE | CONDITIONAL
    reported_symptom       TEXT,             -- raw text from GMAO
    object_id              UUID REFERENCES objects(id),
    defect_id              UUID REFERENCES defects(id),
    gmao_id                TEXT,
    gmao_source            TEXT,             -- 'SAP_PM','MAXIMO','CARL','MANUAL'
    gmao_sync_status       TEXT DEFAULT 'PENDING',
    gmao_last_sync_at      TIMESTAMPTZ,
    estimated_duration_hours FLOAT,
    actual_duration_hours    FLOAT,
    planned_start_at       TIMESTAMPTZ,
    actual_start_at        TIMESTAMPTZ,
    completed_at           TIMESTAMPTZ,
    due_at                 TIMESTAMPTZ,
    tags                   TEXT[],
    metadata               JSONB DEFAULT '{}',
    created_at             TIMESTAMPTZ DEFAULT NOW(),
    updated_at             TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS work_order_activities (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    work_order_id  UUID NOT NULL REFERENCES work_orders(id) ON DELETE CASCADE,
    user_id        UUID REFERENCES profiles(id),
    action         TEXT NOT NULL,
    -- CREATED|ASSIGNED|STATUS_CHANGED|SYNCED|COMMENTED|ATTACHMENT_ADDED
    old_value      JSONB,
    new_value      JSONB,
    comment        TEXT,
    created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 7. DIAGNOSTICS  (Main MAXER diagnostic sessions)
-- =============================================================

CREATE TABLE IF NOT EXISTS diagnostics (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    work_order_id          UUID NOT NULL REFERENCES work_orders(id) ON DELETE CASCADE,
    technician_id          UUID REFERENCES profiles(id),
    validator_id           UUID REFERENCES profiles(id),

    -- MAXER Step 1: Situation Analysis
    symptom_object_id      UUID REFERENCES objects(id),
    symptom_defect_id      UUID REFERENCES defects(id),
    operating_context      JSONB DEFAULT '{}',
    -- {load_pct, temperature_c, speed_rpm, operating_mode, environment, duration_before_failure}
    initial_description    TEXT,

    -- MAXER Step 2: Urgency
    urgency_decision       TEXT,   -- 'STOP','DEGRADED_MODE','CONTINUE'
    urgency_justification  TEXT,

    -- MAXER Step 6: Root Cause
    root_cause_category    TEXT,   -- 'MATERIAL','HUMAN','ORGANIZATION','DESIGN','ENVIRONMENT'
    root_cause_description TEXT,
    root_cause_node_key    TEXT,   -- which graph node is the confirmed root cause

    -- Workflow state
    status                 TEXT NOT NULL DEFAULT 'DRAFT',
    -- DRAFT|IN_PROGRESS|VALIDATED|CLOSED|ARCHIVED
    current_step           INTEGER DEFAULT 1,  -- MAXER step 1-10

    -- Graph data (JSONB for offline-first / sync)
    graph_data             JSONB DEFAULT '{"nodes": [], "edges": []}',

    -- Timing
    started_at             TIMESTAMPTZ DEFAULT NOW(),
    validated_at           TIMESTAMPTZ,
    closed_at              TIMESTAMPTZ,

    -- REX
    is_rex_validated       BOOLEAN DEFAULT FALSE,
    rex_validated_at       TIMESTAMPTZ,
    rex_validated_by       UUID REFERENCES profiles(id),

    -- AI feedback
    ai_confidence_score    FLOAT,
    ai_rating              INTEGER CHECK (ai_rating BETWEEN 1 AND 5),
    ai_rating_comment      TEXT,

    metadata               JSONB DEFAULT '{}',
    created_at             TIMESTAMPTZ DEFAULT NOW(),
    updated_at             TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 8. DEFAILLOGRAMME — Nodes & Edges
-- =============================================================

CREATE TABLE IF NOT EXISTS diagnostic_nodes (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagnostic_id   UUID NOT NULL REFERENCES diagnostics(id) ON DELETE CASCADE,
    node_key        TEXT NOT NULL,   -- React Flow node id  e.g. "n1"
    node_type       TEXT NOT NULL DEFAULT 'HYPOTHESIS',
    -- ROOT_SYMPTOM | HYPOTHESIS | ROOT_CAUSE | CONTRIBUTING_FACTOR
    object_id       UUID REFERENCES objects(id),
    defect_id       UUID REFERENCES defects(id),
    label           TEXT,
    description     TEXT,

    -- MAXER coloring states
    state           TEXT NOT NULL DEFAULT 'UNVERIFIED',
    -- UNVERIFIED (white) | SUSPECTED (orange) | DISCULPATED (green) | CONFIRMED (red)

    -- React Flow canvas position
    position_x      FLOAT DEFAULT 0,
    position_y      FLOAT DEFAULT 0,

    -- Logic gates for complex trees
    logic_gate      TEXT,   -- 'AND' | 'OR' | NULL

    is_contributing_factor BOOLEAN DEFAULT FALSE,

    -- AI metadata
    is_ai_suggested BOOLEAN DEFAULT FALSE,
    ai_probability  FLOAT,   -- 0-1 AI estimated likelihood

    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(diagnostic_id, node_key)
);

CREATE TABLE IF NOT EXISTS diagnostic_edges (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagnostic_id   UUID NOT NULL REFERENCES diagnostics(id) ON DELETE CASCADE,
    edge_key        TEXT NOT NULL,
    source_node_key TEXT NOT NULL,
    target_node_key TEXT NOT NULL,
    edge_type       TEXT DEFAULT 'CAUSAL',  -- 'CAUSAL' | 'CONTRIBUTING'
    label           TEXT,
    is_ai_suggested BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(diagnostic_id, edge_key)
);

-- =============================================================
-- 9. VERIFICATION TESTS  (MAXER Step 4)
-- =============================================================

CREATE TABLE IF NOT EXISTS verification_tests (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagnostic_id   UUID NOT NULL REFERENCES diagnostics(id) ON DELETE CASCADE,
    node_id         UUID NOT NULL REFERENCES diagnostic_nodes(id) ON DELETE CASCADE,
    test_method     TEXT NOT NULL,      -- e.g. "Measure output pressure with manometer"
    expected_value  TEXT,               -- expected if hypothesis is true
    performed_by    UUID REFERENCES profiles(id),
    performed_at    TIMESTAMPTZ,
    measured_value  TEXT,
    result          TEXT,               -- 'INCRIMINATED' | 'DISCULPATED' | 'INCONCLUSIVE'
    result_notes    TEXT,
    tools_used      TEXT[],
    measurement_data JSONB,             -- raw sensor / spectra data (MIMOSA OSA-CBM)
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 10. CORRECTIVE INTERVENTIONS  (MAXER Step 5)
-- =============================================================

CREATE TABLE IF NOT EXISTS interventions (
    id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagnostic_id      UUID NOT NULL REFERENCES diagnostics(id) ON DELETE CASCADE,
    work_order_id      UUID REFERENCES work_orders(id),
    performed_by       UUID REFERENCES profiles(id),
    action_type        TEXT,
    -- REPLACEMENT|REPAIR|ADJUSTMENT|CLEANING|CALIBRATION|INSPECTION
    description        TEXT NOT NULL,
    parts_used         JSONB DEFAULT '[]',
    -- [{part_number, description, quantity, unit_cost, currency}]
    labor_hours        FLOAT,
    resolution_status  TEXT DEFAULT 'RESOLVED',
    -- RESOLVED | PARTIALLY_RESOLVED | REQUIRES_FOLLOWUP
    followup_deadline  TIMESTAMPTZ,
    followup_notes     TEXT,
    started_at         TIMESTAMPTZ,
    completed_at       TIMESTAMPTZ,
    created_at         TIMESTAMPTZ DEFAULT NOW(),
    updated_at         TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 11. PREVENTIVE MEASURES  (MAXER Steps 7-10)
-- =============================================================

CREATE TABLE IF NOT EXISTS preventive_measures (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagnostic_id          UUID NOT NULL REFERENCES diagnostics(id) ON DELETE CASCADE,
    functional_location_id UUID REFERENCES functional_locations(id),
    failure_mode_id        UUID REFERENCES failure_modes(id),
    title                  TEXT NOT NULL,
    description            TEXT NOT NULL,
    measure_type           TEXT,
    -- MAINTENANCE_PLAN|INSPECTION|TRAINING|PROCEDURE_UPDATE|DESIGN_CHANGE
    priority               TEXT DEFAULT 'MEDIUM',
    status                 TEXT DEFAULT 'PENDING',
    -- PENDING | IN_PROGRESS | IMPLEMENTED | REJECTED
    responsible_id         UUID REFERENCES profiles(id),
    target_date            DATE,
    implemented_at         TIMESTAMPTZ,
    effectiveness_rating   INTEGER CHECK (effectiveness_rating BETWEEN 1 AND 5),
    created_at             TIMESTAMPTZ DEFAULT NOW(),
    updated_at             TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 12. REX — KNOWLEDGE BASE (Case Base / Retour d'Expérience)
-- =============================================================

CREATE TABLE IF NOT EXISTS rex_cases (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagnostic_id          UUID REFERENCES diagnostics(id),
    functional_location_id UUID REFERENCES functional_locations(id),
    title                  TEXT NOT NULL,
    object_id              UUID REFERENCES objects(id),
    defect_id              UUID REFERENCES defects(id),
    root_cause_category    TEXT,
    root_cause_description TEXT,
    solution_summary       TEXT,
    graph_snapshot         JSONB,          -- validated defaillogramme snapshot
    resolution_time_hours  FLOAT,
    recurrence_count       INTEGER DEFAULT 0,
    last_occurred_at       TIMESTAMPTZ,
    is_validated           BOOLEAN DEFAULT FALSE,
    validated_by           UUID REFERENCES profiles(id),
    validated_at           TIMESTAMPTZ,
    quality_score          FLOAT,          -- expert rating 0-1
    tags                   TEXT[],
    keywords               TEXT[],
    embedding              VECTOR(1536),   -- for pgvector similarity search
    created_at             TIMESTAMPTZ DEFAULT NOW(),
    updated_at             TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 13. TECHNICAL DOCUMENTS & RAG CHUNKS
-- =============================================================

CREATE TABLE IF NOT EXISTS technical_documents (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    functional_location_id UUID REFERENCES functional_locations(id),
    title                  TEXT NOT NULL,
    document_type          TEXT,
    -- MAINTENANCE_MANUAL|TECHNICAL_BULLETIN|PROCEDURE|DRAWING|DATASHEET|FMECA
    standard               TEXT,           -- 'S1000D','S3000L','PDF','XML'
    version                TEXT,
    file_url               TEXT,           -- Supabase Storage path
    file_size_bytes        BIGINT,
    language               TEXT DEFAULT 'fr',
    is_indexed             BOOLEAN DEFAULT FALSE,
    indexed_at             TIMESTAMPTZ,
    metadata               JSONB DEFAULT '{}',
    uploaded_by            UUID REFERENCES profiles(id),
    created_at             TIMESTAMPTZ DEFAULT NOW(),
    updated_at             TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS document_chunks (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id   UUID NOT NULL REFERENCES technical_documents(id) ON DELETE CASCADE,
    chunk_index   INTEGER NOT NULL,
    content       TEXT NOT NULL,
    page_number   INTEGER,
    section_title TEXT,
    embedding     VECTOR(1536),            -- pgvector for semantic search
    token_count   INTEGER,
    metadata      JSONB DEFAULT '{}',
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 14. ATTACHMENTS / MEDIA
-- =============================================================

CREATE TABLE IF NOT EXISTS attachments (
    id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    -- Polymorphic: at least one FK is non-null
    work_order_id        UUID REFERENCES work_orders(id) ON DELETE CASCADE,
    diagnostic_id        UUID REFERENCES diagnostics(id) ON DELETE CASCADE,
    node_id              UUID REFERENCES diagnostic_nodes(id) ON DELETE CASCADE,
    verification_test_id UUID REFERENCES verification_tests(id) ON DELETE CASCADE,
    file_name            TEXT NOT NULL,
    file_url             TEXT NOT NULL,
    file_type            TEXT,   -- IMAGE|VIDEO|PDF|VIBRATION_DATA|THERMAL_IMAGE|AUDIO
    mime_type            TEXT,
    file_size_bytes      BIGINT,
    description          TEXT,
    captured_at          TIMESTAMPTZ,
    uploaded_by          UUID REFERENCES profiles(id),
    sensor_data          JSONB,  -- {amplitude, frequency, rms, spectra[]} — MIMOSA OSA-CBM
    created_at           TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 15. AI SESSIONS & SUGGESTIONS
-- =============================================================

CREATE TABLE IF NOT EXISTS ai_sessions (
    id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagnostic_id  UUID REFERENCES diagnostics(id) ON DELETE CASCADE,
    user_id        UUID REFERENCES profiles(id),
    session_type   TEXT,
    -- DIAGNOSTIC_ASSISTANT|TREE_GENERATION|RAG_QUERY|SIMILARITY_SEARCH
    model_used     TEXT,   -- 'llama-3-8b','mistral-large','gpt-4o'
    messages       JSONB DEFAULT '[]',     -- [{role, content, timestamp}]
    rag_chunks_used UUID[],                -- document_chunks.id used as context
    rex_cases_used  UUID[],                -- rex_cases.id used as context
    tokens_input   INTEGER,
    tokens_output  INTEGER,
    latency_ms     INTEGER,
    user_rating    INTEGER CHECK (user_rating BETWEEN 1 AND 5),
    user_feedback  TEXT,
    created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_suggestions (
    id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diagnostic_id    UUID REFERENCES diagnostics(id) ON DELETE CASCADE,
    ai_session_id    UUID REFERENCES ai_sessions(id),
    suggestion_type  TEXT,
    -- CAUSE_NODE|VERIFICATION_TEST|SIMILAR_CASE|NEXT_ACTION|PREVENTIVE_MEASURE
    content          JSONB NOT NULL,
    confidence       FLOAT,   -- 0-1
    status           TEXT DEFAULT 'PENDING',
    -- PENDING | ACCEPTED | REJECTED | MODIFIED
    reviewed_by      UUID REFERENCES profiles(id),
    reviewed_at      TIMESTAMPTZ,
    created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 16. GMAO INTEGRATION
-- =============================================================

CREATE TABLE IF NOT EXISTS gmao_connectors (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plant_id      UUID REFERENCES plants(id),
    name          TEXT NOT NULL,
    connector_type TEXT NOT NULL,   -- 'SAP_PM','MAXIMO','CARL_SOURCE','CUSTOM'
    base_url      TEXT,
    api_version   TEXT,
    auth_type     TEXT,             -- 'API_KEY','OAUTH2','BASIC','MTLS'
    config        JSONB DEFAULT '{}',
    is_active     BOOLEAN DEFAULT TRUE,
    last_sync_at  TIMESTAMPTZ,
    sync_status   TEXT DEFAULT 'IDLE',   -- 'IDLE','SYNCING','ERROR'
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gmao_webhooks (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    connector_id      UUID REFERENCES gmao_connectors(id),
    event_type        TEXT NOT NULL,
    -- WORK_ORDER_CREATED|WORK_ORDER_UPDATED|WORK_ORDER_CLOSED|STATUS_CHANGED
    payload           JSONB NOT NULL,
    processing_status TEXT DEFAULT 'PENDING',   -- PENDING|PROCESSED|FAILED
    work_order_id     UUID REFERENCES work_orders(id),
    error_message     TEXT,
    processed_at      TIMESTAMPTZ,
    received_at       TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 17. NOTIFICATIONS
-- =============================================================

CREATE TABLE IF NOT EXISTS notifications (
    id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type       TEXT NOT NULL,
    -- WO_ASSIGNED|DIAGNOSTIC_VALIDATED|SYNC_REQUIRED|AI_SUGGESTION|REX_PENDING|ALERT
    title      TEXT NOT NULL,
    message    TEXT,
    data       JSONB DEFAULT '{}',
    is_read    BOOLEAN DEFAULT FALSE,
    read_at    TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- 18. AUDIT LOG  (Defense-grade tamper-proof chain)
-- =============================================================

CREATE TABLE IF NOT EXISTS audit_logs (
    id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id            UUID REFERENCES profiles(id),
    entity_type        TEXT NOT NULL,
    -- DIAGNOSTIC|WORK_ORDER|REX_CASE|USER|ATTACHMENT|VALIDATION
    entity_id          UUID NOT NULL,
    action             TEXT NOT NULL,
    -- CREATE|UPDATE|DELETE|VALIDATE|APPROVE|LOGIN|EXPORT|SYNC
    old_state          JSONB,
    new_state          JSONB,
    ip_address         INET,
    user_agent         TEXT,
    signature          TEXT,   -- SHA-256(user_id||entity_id||action||created_at||prev_sig)
    previous_signature TEXT,   -- cryptographic chain
    created_at         TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================
-- INDEXES
-- =============================================================

-- Work orders
CREATE INDEX IF NOT EXISTS idx_wo_status         ON work_orders(status);
CREATE INDEX IF NOT EXISTS idx_wo_priority       ON work_orders(priority);
CREATE INDEX IF NOT EXISTS idx_wo_plant          ON work_orders(plant_id);
CREATE INDEX IF NOT EXISTS idx_wo_location       ON work_orders(functional_location_id);
CREATE INDEX IF NOT EXISTS idx_wo_technician     ON work_orders(assigned_technician_id);
CREATE INDEX IF NOT EXISTS idx_wo_gmao           ON work_orders(gmao_id);

-- Diagnostics
CREATE INDEX IF NOT EXISTS idx_diag_wo           ON diagnostics(work_order_id);
CREATE INDEX IF NOT EXISTS idx_diag_status       ON diagnostics(status);
CREATE INDEX IF NOT EXISTS idx_diag_technician   ON diagnostics(technician_id);

-- Graph
CREATE INDEX IF NOT EXISTS idx_nodes_diagnostic  ON diagnostic_nodes(diagnostic_id);
CREATE INDEX IF NOT EXISTS idx_edges_diagnostic  ON diagnostic_edges(diagnostic_id);

-- REX & Documents — vector search
CREATE INDEX IF NOT EXISTS idx_rex_embedding     ON rex_cases USING hnsw(embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_chunks_embedding  ON document_chunks USING hnsw(embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_chunks_document   ON document_chunks(document_id);

-- Full text search (French)
CREATE INDEX IF NOT EXISTS idx_wo_fts ON work_orders
    USING GIN(to_tsvector('french', COALESCE(title,'') || ' ' || COALESCE(reported_symptom,'')));

CREATE INDEX IF NOT EXISTS idx_rex_fts ON rex_cases
    USING GIN(to_tsvector('french',
        COALESCE(title,'') || ' ' ||
        COALESCE(root_cause_description,'') || ' ' ||
        COALESCE(solution_summary,'')));

-- Audit
CREATE INDEX IF NOT EXISTS idx_audit_entity      ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_user        ON audit_logs(user_id);

-- Notifications
CREATE INDEX IF NOT EXISTS idx_notif_user_unread ON notifications(user_id, is_read);

-- =============================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================

ALTER TABLE profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_orders         ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostics         ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_nodes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_edges    ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_tests  ENABLE ROW LEVEL SECURITY;
ALTER TABLE interventions       ENABLE ROW LEVEL SECURITY;
ALTER TABLE preventive_measures ENABLE ROW LEVEL SECURITY;
ALTER TABLE rex_cases           ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments         ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_sessions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_suggestions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications       ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs          ENABLE ROW LEVEL SECURITY;

-- Profiles: users see their own profile
CREATE POLICY "profiles_self" ON profiles
    FOR ALL USING (auth.uid() = id);

-- Work orders: technicians see own, supervisors/admins see all
CREATE POLICY "wo_select" ON work_orders
    FOR SELECT USING (
        assigned_technician_id = auth.uid()
        OR created_by = auth.uid()
        OR EXISTS (
            SELECT 1 FROM profiles p
            JOIN roles r ON p.role_id = r.id
            WHERE p.id = auth.uid()
            AND r.name IN ('ADMIN','SUPERVISOR','EXPERT_METHODE')
        )
    );

-- Diagnostics: own or admin/expert
CREATE POLICY "diag_select" ON diagnostics
    FOR SELECT USING (
        technician_id = auth.uid()
        OR EXISTS (
            SELECT 1 FROM profiles p
            JOIN roles r ON p.role_id = r.id
            WHERE p.id = auth.uid()
            AND r.name IN ('ADMIN','SUPERVISOR','EXPERT_METHODE')
        )
    );

-- Notifications: own only
CREATE POLICY "notif_own" ON notifications
    FOR ALL USING (user_id = auth.uid());

-- Audit logs: read only for admins
CREATE POLICY "audit_admin" ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles p
            JOIN roles r ON p.role_id = r.id
            WHERE p.id = auth.uid() AND r.name = 'ADMIN'
        )
    );

-- =============================================================
-- SEED DATA
-- =============================================================

-- Default roles
INSERT INTO roles (name, description, permissions) VALUES
('ADMIN',          'System Administrator',         '{"all": true}'::jsonb),
('EXPERT_METHODE', 'Method Expert — validates REX', '{"rex":{"validate":true},"models":{"edit":true},"diagnostics":{"view_all":true}}'::jsonb),
('SUPERVISOR',     'Operations Supervisor',         '{"work_orders":{"assign":true,"view_all":true},"diagnostics":{"view_all":true}}'::jsonb),
('TECHNICIAN',     'Field Technician',              '{"diagnostics":{"create":true,"edit_own":true},"work_orders":{"view":true,"update_own":true}}'::jsonb),
('VIEWER',         'Read-only access',              '{"all_read":true}'::jsonb)
ON CONFLICT (name) DO NOTHING;

-- Standard defects (ISO 14224 / MAXER library)
INSERT INTO defects (code, name, category, iso_14224_code, severity) VALUES
('DEF-VIB-HF',    'High-Frequency Vibration',     'VIBRATION',    'VIB-001', 'HIGH'),
('DEF-VIB-LF',    'Low-Frequency Vibration',      'VIBRATION',    'VIB-002', 'MEDIUM'),
('DEF-NOISE-GRD', 'Grinding Noise',               'NOISE',        'NOI-001', 'HIGH'),
('DEF-NOISE-KNK', 'Knocking Noise',               'NOISE',        'NOI-002', 'HIGH'),
('DEF-OVERHEAT',  'Overheating',                  'THERMAL',      'THE-001', 'CRITICAL'),
('DEF-LEAK-OIL',  'Oil Leakage',                  'LEAKAGE',      'LEA-001', 'HIGH'),
('DEF-LEAK-H2O',  'Water Leakage',                'LEAKAGE',      'LEA-002', 'MEDIUM'),
('DEF-NO-START',  'Failure to Start',             'FUNCTIONAL',   'FUN-001', 'CRITICAL'),
('DEF-MISALIGN',  'Misalignment',                 'MECHANICAL',   'MEC-001', 'HIGH'),
('DEF-CORROSION', 'Corrosion',                    'DEGRADATION',  'DEG-001', 'MEDIUM'),
('DEF-WEAR',      'Excessive Wear',               'DEGRADATION',  'DEG-002', 'HIGH'),
('DEF-CRACK',     'Crack / Fracture',             'STRUCTURAL',   'STR-001', 'CRITICAL'),
('DEF-CLOG',      'Clogged / Blocked',            'FUNCTIONAL',   'FUN-002', 'HIGH'),
('DEF-ELEC-SC',   'Electrical Short Circuit',     'ELECTRICAL',   'ELE-001', 'CRITICAL'),
('DEF-ELEC-OC',   'Open Circuit',                 'ELECTRICAL',   'ELE-002', 'HIGH'),
('DEF-PRES-LOW',  'Low Pressure',                 'HYDRAULIC',    'HYD-001', 'HIGH'),
('DEF-PRES-HIGH', 'High Pressure',                'HYDRAULIC',    'HYD-002', 'CRITICAL'),
('DEF-SEAL-FAIL', 'Seal Failure',                 'MECHANICAL',   'MEC-002', 'HIGH'),
('DEF-BEAR-FAIL', 'Bearing Failure',              'MECHANICAL',   'MEC-003', 'CRITICAL'),
('DEF-LUBE-LACK', 'Insufficient Lubrication',    'MAINTENANCE',  'MNT-001', 'HIGH'),
('DEF-CONTAM',    'Fluid Contamination',          'QUALITY',      'QUA-001', 'HIGH'),
('DEF-CAVIT',     'Cavitation',                   'HYDRAULIC',    'HYD-003', 'HIGH'),
('DEF-LOOSE',     'Structural Looseness',         'MECHANICAL',   'MEC-004', 'MEDIUM'),
('DEF-IMBAL',     'Rotor Imbalance',              'MECHANICAL',   'MEC-005', 'HIGH'),
('DEF-FATIGUE',   'Material Fatigue',             'STRUCTURAL',   'STR-002', 'CRITICAL')
ON CONFLICT (code) DO NOTHING;
