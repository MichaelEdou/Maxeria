'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

// ─── Types ───────────────────────────────────────────────────────────────────
type WorkOrder = {
    id: string;
    wo_number: string;
    title: string;
    priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    status: 'OPEN' | 'IN_DIAGNOSIS' | 'PENDING_PARTS' | 'IN_PROGRESS' | 'SOLVED' | 'CLOSED' | 'CANCELLED';
    reported_symptom: string | null;
    gmao_sync_status: string | null;
    estimated_duration_hours: number | null;
    created_at: string;
    functional_locations: {
        name: string;
        code: string;
        asset_category: string | null;
    } | null;
    profiles: {
        first_name: string | null;
        last_name: string | null;
        initials: string | null;
    } | null;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const priorityStyle: Record<string, string> = {
    CRITICAL: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    HIGH: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    MEDIUM: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    LOW: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
};

const statusStyle: Record<string, string> = {
    IN_DIAGNOSIS: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800',
    IN_PROGRESS: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800',
    OPEN: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
    PENDING_PARTS: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800',
    SOLVED: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800',
    CLOSED: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-500 border-slate-200 dark:border-slate-700',
    CANCELLED: 'bg-red-50 dark:bg-red-900/10 text-red-400 border-red-100 dark:border-red-900/30',
};

const statusLabel: Record<string, string> = {
    IN_DIAGNOSIS: 'In Diagnosis',
    IN_PROGRESS: 'In Progress',
    OPEN: 'Not Started',
    PENDING_PARTS: 'Pending Parts',
    SOLVED: 'Solved',
    CLOSED: 'Closed',
    CANCELLED: 'Cancelled',
};

const gmaoStyle: Record<string, { dot: string; label: string }> = {
    SYNCED: { dot: 'bg-green-500', label: 'Synced' },
    PENDING: { dot: 'bg-amber-500', label: 'Pending' },
    ERROR: { dot: 'bg-red-500', label: 'Error' },
};

function priorityLabel(p: string) {
    return p.charAt(0) + p.slice(1).toLowerCase();
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function WorkOrdersPage() {
    const supabase = createClient();

    const [showModal, setShowModal] = useState(false);
    const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    // New WO form state
    const [newWO, setNewWO] = useState({
        title: '', priority: 'HIGH', reported_symptom: '', type: 'CORRECTIVE',
    });

    // ── Fetch work orders ──────────────────────────────────────────────────
    const fetchWorkOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let query = supabase
                .from('work_orders')
                .select(`
                    id, wo_number, title, priority, status,
                    reported_symptom, gmao_sync_status,
                    estimated_duration_hours, created_at,
                    functional_locations ( name, code, asset_category ),
                    profiles!work_orders_assigned_technician_id_fkey ( first_name, last_name, initials )
                `)
                .order('created_at', { ascending: false });

            if (filterPriority) query = query.eq('priority', filterPriority);
            if (filterStatus) query = query.eq('status', filterStatus);

            const { data, error: dbErr } = await query;
            if (dbErr) throw dbErr;
            setWorkOrders((data ?? []) as unknown as WorkOrder[]);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Failed to load work orders');
        } finally {
            setLoading(false);
        }
    }, [filterPriority, filterStatus, supabase]);

    useEffect(() => { fetchWorkOrders(); }, [fetchWorkOrders]);

    // ── Create new WO ──────────────────────────────────────────────────────
    const handleCreateWO = async () => {
        if (!newWO.title.trim()) return;
        const nextNum = `WO-${Date.now().toString().slice(-4)}`;
        const { error: dbErr } = await supabase.from('work_orders').insert({
            wo_number: nextNum,
            title: newWO.title,
            priority: newWO.priority,
            reported_symptom: newWO.reported_symptom || null,
            type: newWO.type,
            status: 'OPEN',
            plant_id: '00000000-0000-0000-0000-000000000010',
        });
        if (dbErr) { alert('Error: ' + dbErr.message); return; }
        setShowModal(false);
        setNewWO({ title: '', priority: 'HIGH', reported_symptom: '', type: 'CORRECTIVE' });
        fetchWorkOrders();
    };

    // ── Filtered list ──────────────────────────────────────────────────────
    const filtered = workOrders.filter(wo => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            wo.wo_number.toLowerCase().includes(q) ||
            wo.title.toLowerCase().includes(q) ||
            (wo.reported_symptom ?? '').toLowerCase().includes(q) ||
            (wo.functional_locations?.name ?? '').toLowerCase().includes(q)
        );
    });

    // KPI counts
    const kpi = {
        total: workOrders.filter(w => !['CLOSED', 'CANCELLED', 'SOLVED'].includes(w.status)).length,
        inDiagnosis: workOrders.filter(w => w.status === 'IN_DIAGNOSIS' || w.status === 'IN_PROGRESS').length,
        pending: workOrders.filter(w => w.gmao_sync_status === 'PENDING').length,
        critical: workOrders.filter(w => w.priority === 'CRITICAL').length,
    };

    // ── Render ─────────────────────────────────────────────────────────────
    return (
        <div className="relative flex-1 flex flex-col h-full">

            {/* ─── Create WO Modal ─────────────────────────────────────── */}
            {showModal && (
                <div className="absolute inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg flex flex-col border border-slate-200 dark:border-slate-700">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Work Order</h2>
                                <p className="text-sm text-slate-500 mt-0.5">This will be saved to the database.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined text-[24px]">close</span>
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title *</label>
                                <input
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5 px-3"
                                    placeholder="e.g. Pump A2 - High Vibration"
                                    value={newWO.title}
                                    onChange={e => setNewWO(p => ({ ...p, title: e.target.value }))}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                                    <select
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5 px-3"
                                        value={newWO.priority}
                                        onChange={e => setNewWO(p => ({ ...p, priority: e.target.value }))}
                                    >
                                        <option value="CRITICAL">Critical</option>
                                        <option value="HIGH">High</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="LOW">Low</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
                                    <select
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5 px-3"
                                        value={newWO.type}
                                        onChange={e => setNewWO(p => ({ ...p, type: e.target.value }))}
                                    >
                                        <option value="CORRECTIVE">Corrective</option>
                                        <option value="PREVENTIVE">Preventive</option>
                                        <option value="PREDICTIVE">Predictive</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Symptom / Description</label>
                                <textarea
                                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary p-3"
                                    placeholder="Describe the issue..."
                                    rows={3}
                                    value={newWO.reported_symptom}
                                    onChange={e => setNewWO(p => ({ ...p, reported_symptom: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600">Cancel</button>
                            <button onClick={handleCreateWO} className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm shadow-primary/30 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">save</span>
                                Save to Database
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ─── Page Content ─────────────────────────────────────────── */}
            <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-black/20 h-full overflow-hidden">
                <div className="p-6 pb-2 space-y-6">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                                <span>Operations</span>
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                <span className="text-slate-800 dark:text-slate-200 font-medium">Work Orders</span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Work Orders Management</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Live data from Supabase — every change is persisted.</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={fetchWorkOrders} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
                                <span className="material-symbols-outlined text-[18px]">refresh</span>
                                Refresh
                            </button>
                            <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Create New WO
                            </button>
                        </div>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Open', value: kpi.total, icon: 'assignment', color: 'text-slate-900 dark:text-white', bg: 'text-slate-900 dark:text-white' },
                            { label: 'In Diagnosis', value: kpi.inDiagnosis, icon: 'engineering', color: 'text-blue-600', badge: 'text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded font-medium' },
                            { label: 'Pending Sync', value: kpi.pending, icon: 'sync_problem', color: 'text-amber-600', badge: 'text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded font-medium' },
                            { label: 'Critical', value: kpi.critical, icon: 'priority_high', color: 'text-red-600', badge: 'text-xs text-red-600 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded font-medium' },
                        ].map(card => (
                            <div key={card.label} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group">
                                <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className={`material-symbols-outlined text-5xl ${card.color}`}>{card.icon}</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{card.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{loading ? '—' : card.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="flex flex-1 overflow-hidden p-6 pt-2 gap-6">
                    <div className="flex-1 flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">

                        {/* Filters */}
                        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-3 items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                            <div className="relative flex-1 max-w-md">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[18px]">search</span>
                                <input
                                    className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary"
                                    placeholder="Search by ID, Asset, or Symptom..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <select
                                    className="form-select text-sm border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 pl-3 pr-8 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary cursor-pointer"
                                    value={filterPriority}
                                    onChange={e => setFilterPriority(e.target.value)}
                                >
                                    <option value="">All Priorities</option>
                                    <option value="CRITICAL">Critical</option>
                                    <option value="HIGH">High</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="LOW">Low</option>
                                </select>
                                <select
                                    className="form-select text-sm border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 pl-3 pr-8 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary cursor-pointer"
                                    value={filterStatus}
                                    onChange={e => setFilterStatus(e.target.value)}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="IN_DIAGNOSIS">In Diagnosis</option>
                                    <option value="OPEN">Not Started</option>
                                    <option value="SOLVED">Solved</option>
                                    <option value="PENDING_PARTS">Pending Parts</option>
                                </select>
                            </div>
                        </div>

                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <div className="col-span-1">ID</div>
                            <div className="col-span-1">Priority</div>
                            <div className="col-span-2">Equipment/Asset</div>
                            <div className="col-span-3">Symptom</div>
                            <div className="col-span-2">Technician</div>
                            <div className="col-span-1">GMAO</div>
                            <div className="col-span-2 text-center">Status</div>
                        </div>

                        {/* Table Rows */}
                        <div className="overflow-y-auto custom-scrollbar flex-1">
                            {loading ? (
                                <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                                    <span className="material-symbols-outlined animate-spin text-[28px]">progress_activity</span>
                                    <span className="text-sm font-medium">Loading from Supabase...</span>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-3">
                                    <span className="material-symbols-outlined text-red-400 text-[40px]">error</span>
                                    <p className="text-sm text-red-500 font-medium">{error}</p>
                                    <button onClick={fetchWorkOrders} className="text-sm text-primary underline">Retry</button>
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
                                    <span className="material-symbols-outlined text-[40px]">inbox</span>
                                    <p className="text-sm font-medium">No work orders found</p>
                                    <button onClick={() => setShowModal(true)} className="text-sm text-primary underline">Create the first one</button>
                                </div>
                            ) : filtered.map(wo => {
                                const woIdSlug = wo.wo_number.replace(/^[A-Z]+-/, '');
                                const gmao = gmaoStyle[wo.gmao_sync_status ?? 'PENDING'] ?? gmaoStyle.PENDING;
                                const techName = wo.profiles
                                    ? `${wo.profiles.first_name ?? ''} ${wo.profiles.last_name ?? ''}`.trim() || 'Unassigned'
                                    : 'Unassigned';
                                const initials = wo.profiles?.initials ?? '--';
                                const isInProgress = wo.status === 'IN_DIAGNOSIS' || wo.status === 'IN_PROGRESS';

                                return (
                                    <Link
                                        key={wo.id}
                                        href={`/dashboard/work-orders/${woIdSlug}`}
                                        className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 items-center transition-colors group cursor-pointer"
                                    >
                                        <div className="col-span-1 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                                            #WO-{wo.wo_number.replace(/^[A-Z]+-/, '')}
                                        </div>
                                        <div className="col-span-1">
                                            <span className={`px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1 ${priorityStyle[wo.priority] ?? priorityStyle.MEDIUM}`}>
                                                {wo.priority === 'CRITICAL' && <span className="size-1.5 rounded-full bg-red-600 animate-pulse" />}
                                                {priorityLabel(wo.priority)}
                                            </span>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-slate-900 dark:text-white">
                                                    {wo.functional_locations?.name ?? 'Unknown Asset'}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {wo.functional_locations?.code ?? ''}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-span-3">
                                            <div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                                                {wo.reported_symptom ?? wo.title}
                                            </div>
                                        </div>
                                        <div className="col-span-2 flex items-center gap-2">
                                            <div className="size-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">
                                                {initials}
                                            </div>
                                            <span className={`text-sm ${techName === 'Unassigned' ? 'text-slate-400 italic' : 'text-slate-700 dark:text-slate-300'}`}>
                                                {techName}
                                            </span>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="flex items-center gap-1.5">
                                                <span className={`size-2 rounded-full ${gmao.dot}`} />
                                                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{gmao.label}</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2 flex items-center justify-between gap-2">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle[wo.status] ?? statusStyle.OPEN}`}>
                                                {statusLabel[wo.status] ?? wo.status}
                                            </span>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                {isInProgress ? (
                                                    <span className="p-1.5 text-primary text-sm font-semibold">▶</span>
                                                ) : wo.status === 'SOLVED' ? (
                                                    <span className="material-symbols-outlined text-[20px] text-slate-400">description</span>
                                                ) : (
                                                    <span className="text-xs bg-primary text-white px-2 py-1 rounded font-semibold">View</span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between text-sm">
                            <span className="text-slate-500">
                                {loading ? 'Loading…' : `Showing ${filtered.length} of ${workOrders.length} Work Orders`}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                                <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                                Live — Supabase
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
