-- =============================================================
-- Migration 002 — Extra tables + seed data
-- =============================================================

-- Reports table (for /dashboard/reports)
CREATE TABLE IF NOT EXISTS reports (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title           TEXT NOT NULL,
    report_type     TEXT NOT NULL DEFAULT 'DIAGNOSTIC',
    -- DIAGNOSTIC | RELIABILITY | REX_SUMMARY | KPI | PARETO | MTBF
    work_order_id   UUID REFERENCES work_orders(id),
    diagnostic_id   UUID REFERENCES diagnostics(id),
    generated_by    UUID REFERENCES profiles(id),
    status          TEXT DEFAULT 'DRAFT',  -- DRAFT | PUBLISHED | ARCHIVED
    file_url        TEXT,
    summary         TEXT,
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Assets view table (alias/extension of functional_locations for the Assets pages)
CREATE TABLE IF NOT EXISTS assets (
    id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    functional_location_id UUID REFERENCES functional_locations(id),
    name                   TEXT NOT NULL,
    tag                    TEXT UNIQUE,         -- plant tag e.g. P-101-A
    category               TEXT,               -- PUMP|MOTOR|CONVEYOR|COMPRESSOR|HVAC|ROBOT
    zone                   TEXT,
    manufacturer           TEXT,
    model                  TEXT,
    serial_number          TEXT,
    installation_date      DATE,
    criticality            TEXT DEFAULT 'MEDIUM',
    condition_status       TEXT DEFAULT 'GOOD', -- GOOD|DEGRADED|CRITICAL|UNKNOWN
    last_maintenance_at    TIMESTAMPTZ,
    next_maintenance_at    TIMESTAMPTZ,
    mtbf_hours             FLOAT,
    image_url              TEXT,
    metadata               JSONB DEFAULT '{}',
    is_active              BOOLEAN DEFAULT TRUE,
    created_at             TIMESTAMPTZ DEFAULT NOW(),
    updated_at             TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assets_tag         ON assets(tag);
CREATE INDEX IF NOT EXISTS idx_assets_criticality ON assets(criticality);
CREATE INDEX IF NOT EXISTS idx_assets_status      ON assets(condition_status);
CREATE INDEX IF NOT EXISTS idx_reports_type       ON reports(report_type);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reports_select" ON reports FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "assets_select"  ON assets  FOR SELECT USING (auth.uid() IS NOT NULL);

-- =============================================================
-- SEED: Demo Organization & Plant
-- =============================================================
INSERT INTO organizations (id, name, code, country, sector)
VALUES ('00000000-0000-0000-0000-000000000001', 'MaxerIA Industries', 'MXR', 'France', 'INDUSTRIAL')
ON CONFLICT DO NOTHING;

INSERT INTO plants (id, organization_id, name, code, location, timezone)
VALUES ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', 'Plant Alpha', 'PLT-A', 'Lyon, France', 'Europe/Paris')
ON CONFLICT DO NOTHING;

-- =============================================================
-- SEED: Functional Locations (Assets)
-- =============================================================
INSERT INTO functional_locations (id, plant_id, code, name, asset_category, zone, serial_number, criticality, manufacturer, model)
VALUES
('10000000-0000-0000-0000-000000000001','00000000-0000-0000-0000-000000000010','P-101-A','Hydraulic Pump A2','PUMP','Zone B - Line 4','HYD-2023-X99','CRITICAL','Grundfos','CR45-2'),
('10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000010','CNV-M1','Conveyor Belt M1','CONVEYOR','Zone A - Logistics','CNV-2022-M01','HIGH','Interroll','TS 5000'),
('10000000-0000-0000-0000-000000000003','00000000-0000-0000-0000-000000000010','CMP-C40','Compressor C-40','COMPRESSOR','Zone C - Utility','CMP-2021-C40','MEDIUM','Atlas Copco','GA 22'),
('10000000-0000-0000-0000-000000000004','00000000-0000-0000-0000-000000000010','HVC-U3','HVAC Unit 3','HVAC','Admin Building','HVC-2020-U03','LOW','Daikin','VRV IV'),
('10000000-0000-0000-0000-000000000005','00000000-0000-0000-0000-000000000010','ROB-K7','Robot Arm Kuka-7','ROBOT','Zone B - Assembly','ROB-2023-K07','HIGH','Kuka','KR 16 R1610')
ON CONFLICT DO NOTHING;

-- =============================================================
-- SEED: Objects (MAXER structured components)
-- =============================================================
INSERT INTO objects (id, functional_location_id, code, name, category)
VALUES
('20000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','OBJ-BEARING-REAR','Bearing Housing - Rear','MECHANICAL'),
('20000000-0000-0000-0000-000000000002','10000000-0000-0000-0000-000000000002','OBJ-BELT-MAIN','Main Drive Belt','MECHANICAL'),
('20000000-0000-0000-0000-000000000003','10000000-0000-0000-0000-000000000003','OBJ-VALVE-INLET','Inlet Valve','MECHANICAL'),
('20000000-0000-0000-0000-000000000004','10000000-0000-0000-0000-000000000004','OBJ-FAN-UNIT','Fan Unit','MECHANICAL'),
('20000000-0000-0000-0000-000000000005','10000000-0000-0000-0000-000000000005','OBJ-SERVO-AX3','Servo Motor - Axis 3','ELECTRICAL')
ON CONFLICT DO NOTHING;

-- =============================================================
-- SEED: Work Orders (5 demo rows)
-- =============================================================
INSERT INTO work_orders (id, wo_number, plant_id, functional_location_id, title, priority, status, type, reported_symptom, object_id, defect_id, gmao_source, gmao_sync_status, estimated_duration_hours)
VALUES
(
  'a0000000-0000-0000-0000-000000000001',
  'OT-4921',
  '00000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000001',
  'Hydraulic Pump A2 - High Vibration',
  'CRITICAL',
  'IN_DIAGNOSIS',
  'CORRECTIVE',
  'Motor: High vibration detected on bearing housing. Operator reported unusual noise during start-up sequence at 08:00 AM. Vibration monitoring system triggered alert code VIB-002.',
  '20000000-0000-0000-0000-000000000001',
  (SELECT id FROM defects WHERE code = 'DEF-VIB-HF' LIMIT 1),
  'SAP_PM',
  'SYNCED',
  6.0
),
(
  'a0000000-0000-0000-0000-000000000002',
  'OT-4920',
  '00000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000002',
  'Conveyor Belt M1 - Misalignment',
  'HIGH',
  'OPEN',
  'CORRECTIVE',
  'Belt: Misalignment detected during routine check. Belt offset measuring 12mm from centre-line.',
  '20000000-0000-0000-0000-000000000002',
  (SELECT id FROM defects WHERE code = 'DEF-MISALIGN' LIMIT 1),
  'SAP_PM',
  'SYNCED',
  3.0
),
(
  'a0000000-0000-0000-0000-000000000003',
  'OT-4918',
  '00000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000003',
  'Compressor C-40 - Unusual Noise',
  'MEDIUM',
  'SOLVED',
  'CORRECTIVE',
  'Compressor: Unusual noise during startup sequence. Possible valve issue.',
  '20000000-0000-0000-0000-000000000003',
  (SELECT id FROM defects WHERE code = 'DEF-NOISE-GRD' LIMIT 1),
  'SAP_PM',
  'PENDING',
  4.5
),
(
  'a0000000-0000-0000-0000-000000000004',
  'OT-4915',
  '00000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000004',
  'HVAC Unit 3 - Periodic Maintenance',
  'LOW',
  'IN_DIAGNOSIS',
  'PREVENTIVE',
  'Fan: Periodic maintenance request (Filter check).',
  '20000000-0000-0000-0000-000000000004',
  (SELECT id FROM defects WHERE code = 'DEF-CLOG' LIMIT 1),
  'MANUAL',
  'SYNCED',
  2.0
),
(
  'a0000000-0000-0000-0000-000000000005',
  'OT-4902',
  '00000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000005',
  'Robot Arm Kuka-7 - Axis 3 Error',
  'HIGH',
  'OPEN',
  'CORRECTIVE',
  'Servo: Axis 3 positioning error exceeded tolerance by 0.8mm.',
  '20000000-0000-0000-0000-000000000005',
  (SELECT id FROM defects WHERE code = 'DEF-MISALIGN' LIMIT 1),
  'MANUAL',
  'ERROR',
  8.0
)
ON CONFLICT (wo_number) DO NOTHING;
