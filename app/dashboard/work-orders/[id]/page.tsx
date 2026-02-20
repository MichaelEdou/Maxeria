'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const priorityStyle: Record<string, string> = {
    'CRITICAL': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900/50',
    'HIGH': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-900/50',
    'MEDIUM': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
    'LOW': 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600',
    // Fallbacks for mixed casing
    'Critical': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900/50',
    'High': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-900/50',
    'Medium': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
    'Low': 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600',
};

const statusStyle: Record<string, string> = {
    'OPEN': 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600',
    'IN_DIAGNOSIS': 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
    'SOLVED': 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800',
    'Not Started': 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600',
    'In Progress': 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
};

export default function WorkOrderDetailPage() {
    const { id } = useParams<{ id: string }>();
    const supabase = createClient();

    const [wo, setWo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Edit Modal State
    const [showEditModal, setShowEditModal] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [editForm, setEditForm] = useState({
        title: '',
        priority: '',
        status: '',
        reported_symptom: '',
        description: '',
        assigned_technician_id: ''
    });
    const [technicians, setTechnicians] = useState<any[]>([]);

    useEffect(() => {
        async function fetchTechs() {
            const { data } = await supabase.from('technicians').select('*').eq('is_active', true);
            if (data) setTechnicians(data);
        }
        fetchTechs();
    }, [supabase]);

    const fetchWO = async () => {
        try {
            const { data, error: dbErr } = await supabase
                .from('work_orders')
                .select(`
                    *,
                    technicians:technicians!assigned_technician_id(first_name, last_name, initials),
                    functional_locations(name, code, serial_number)
                `)
                .or(`wo_number.eq.WO-${id},wo_number.eq.OT-${id},wo_number.eq.${id}`)
                .single();

            if (dbErr) throw dbErr;
            setWo(data);

            // Sync edit form
            setEditForm({
                title: data.title || '',
                priority: data.priority || 'MEDIUM',
                status: data.status || 'OPEN',
                reported_symptom: data.reported_symptom || '',
                description: data.description || '',
                assigned_technician_id: data.assigned_technician_id || ''
            });
        } catch (err: any) {
            console.error('Error fetching WO:', err);
            setError(err.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) fetchWO();
    }, [id, supabase]);

    const handleUpdateWO = async () => {
        setUpdating(true);
        try {
            const { error: upErr } = await supabase
                .from('work_orders')
                .update({
                    title: editForm.title,
                    priority: editForm.priority,
                    status: editForm.status,
                    reported_symptom: editForm.reported_symptom,
                    description: editForm.description,
                    assigned_technician_id: editForm.assigned_technician_id || null
                })
                .eq('id', wo.id);

            if (upErr) throw upErr;
            setShowEditModal(false);
            fetchWO(); // Refresh data
        } catch (err: any) {
            alert('Error updating: ' + err.message);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return (
        <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <div className="size-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-sm font-medium text-slate-500">Decrypting case files...</p>
            </div>
        </div>
    );

    if (error || !wo) return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">folder_off</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Work Order Not Found</h2>
            <p className="text-slate-500 max-w-md mb-6">The requested case code (#{id}) could not be retrieved from the central registry.</p>
            <Link href="/dashboard/work-orders" className="bg-primary text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-primary/20">
                Back to Dashboard
            </Link>
        </div>
    );

    const diagnosticHref = `/dashboard/work-orders/${id}/new/diagnostic`;

    // Map DB status to display labels
    const displayStatus = wo.status?.replace(/_/g, ' ') || 'OPEN';
    const displayPriority = wo.priority || 'MEDIUM';

    return (
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6 pb-20 space-y-6 max-w-7xl mx-auto w-full">

                {/* Page header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                            <Link href="/dashboard/work-orders" className="hover:text-primary transition-colors">Work Orders</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-slate-800 dark:text-slate-200 font-medium">WO Details</span>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-primary font-mono font-medium">#{wo.wo_number}</span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Work Order #{wo.wo_number}</h1>
                            <span className={`px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1 border ${priorityStyle[displayPriority] || priorityStyle['LOW']}`}>
                                {(displayPriority === 'CRITICAL' || displayPriority === 'Critical') && <span className="size-1.5 rounded-full bg-red-600 animate-pulse" />}
                                {displayPriority}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${statusStyle[wo.status] || statusStyle['OPEN']}`}>
                                {displayStatus}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowEditModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-slate-700 dark:text-slate-200"
                        >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                            Edit
                        </button>
                        <Link
                            href={diagnosticHref}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 transform"
                        >
                            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                            {wo.status === 'IN_DIAGNOSIS' || wo.status === 'In Progress' ? 'Continue Diagnostic' : wo.status === 'SOLVED' || wo.status === 'Solved' ? 'View Diagnostic' : 'Launch MAXER Diagnostic'}
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Main content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Asset Information */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                                <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-slate-400">precision_manufacturing</span>
                                    Asset Information
                                </h3>
                                <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">View Asset History</button>
                            </div>
                            <div className="p-5">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="size-16 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-600">
                                        <span className="material-symbols-outlined text-3xl text-slate-400">water_pump</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{wo.functional_locations?.name || wo.title.split(' - ')[0]}</h4>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">{wo.description || 'Industrial asset undergoing diagnostic analysis.'}</p>
                                        <div className="flex gap-4 mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
                                                {wo.functional_locations?.code || 'Main Plant'}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px] text-slate-400">barcode</span>
                                                SN: {wo.functional_locations?.serial_number || 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-red-500 mt-0.5">warning</span>
                                        <div>
                                            <h5 className="text-sm font-bold text-red-900 dark:text-red-200 mb-1">Reported Symptom</h5>
                                            <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">&quot;{wo.reported_symptom}&quot;</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Documentation & Evidence */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                                <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-slate-400">library_books</span>
                                    Documentation &amp; Evidence
                                </h3>
                                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded">AI RAG Context</span>
                            </div>
                            <div className="p-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <a href="#" className="group block p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md transition-all bg-slate-50 dark:bg-slate-800/50">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-white dark:bg-slate-700 p-2 rounded shadow-sm group-hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined">menu_book</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Maintenance Manual v4.2</p>
                                                <p className="text-xs text-slate-500 mt-1">Page 45: Bearing Replacement Procedure</p>
                                                <div className="mt-2 flex gap-2">
                                                    <span className="text-[10px] bg-slate-200 dark:bg-slate-600 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">PDF</span>
                                                    <span className="text-[10px] text-green-600 flex items-center gap-0.5"><span className="material-symbols-outlined text-[10px]">check_circle</span> Verified</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="#" className="group block p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:shadow-md transition-all bg-slate-50 dark:bg-slate-800/50">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-white dark:bg-slate-700 p-2 rounded shadow-sm group-hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined">history</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Similar Case: #WO-3882</p>
                                                <p className="text-xs text-slate-500 mt-1">Resolved by changing coupling element (94% similarity)</p>
                                                <div className="mt-2 flex gap-2">
                                                    <span className="text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-1.5 py-0.5 rounded">Insight</span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Attached Media</h4>
                                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                                    {['Pump_Side.jpg', 'Vibration_Graph.png'].map(name => (
                                        <div key={name} className="relative group shrink-0 w-32 h-24 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-600">
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                                                <span className="material-symbols-outlined text-slate-300 text-3xl">image</span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1 text-center">
                                                <span className="text-[10px] text-white">{name}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="shrink-0 w-24 h-24 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:text-primary hover:border-primary hover:bg-primary/5 transition-colors gap-1">
                                        <span className="material-symbols-outlined">add_a_photo</span>
                                        <span className="text-[10px] font-medium">Add Photo</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right sidebar */}
                    <div className="space-y-6">

                        {/* Assigned Team */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Assigned Team</h3>
                            {wo.technicians ? (
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold">
                                            {wo.technicians.initials || `${wo.technicians.first_name?.[0]}${wo.technicians.last_name?.[0]}`}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">{wo.technicians.first_name} {wo.technicians.last_name}</p>
                                            <p className="text-xs text-slate-500 truncate max-w-[120px]">Assigned Technician</p>
                                        </div>
                                    </div>
                                    <button className="text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">chat</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3 opacity-60 mb-4">
                                    <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center font-bold">
                                        <span className="material-symbols-outlined text-[20px]">person_add</span>
                                    </div>
                                    <p className="text-sm text-slate-500 italic">No technician assigned</p>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 opacity-50">
                                    <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center font-bold">
                                        <span className="material-symbols-outlined text-[20px]">person_add</span>
                                    </div>
                                    <p className="text-sm text-slate-500 italic">Assign support</p>
                                </div>
                            </div>
                        </div>

                        {/* Work Order History */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5">
                            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Work Order History</h3>
                            <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                                {[
                                    { icon: 'add_task', color: 'green', time: 'Recently', title: 'WO Created', desc: 'Registry entry established' },
                                    { icon: 'person', color: 'blue', time: 'Recently', title: 'Authority Established', desc: 'Case assigned to local node' },
                                ].map((item) => {
                                    const colorMap: Record<string, string> = {
                                        green: 'bg-green-100 dark:bg-green-900/30 text-green-600',
                                        blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
                                        amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600',
                                    };
                                    return (
                                        <div key={item.title} className="relative flex gap-4">
                                            <div className={`size-10 rounded-full ${colorMap[item.color]} border-4 border-white dark:border-slate-800 flex items-center justify-center shrink-0 z-10`}>
                                                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                                            </div>
                                            <div className="pt-1">
                                                <p className="text-xs text-slate-500 font-mono">{item.time}</p>
                                                <p className="text-sm font-medium text-slate-900 dark:text-white">{item.title}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Edit WO Modal ─────────────────────────────────────── */}
            {showEditModal && (
                <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Work Order</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Update details for case #{wo.wo_number}</p>
                            </div>
                            <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                <span className="material-symbols-outlined text-[24px]">close</span>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                            <section>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[16px]">info</span>
                                    </span>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">General Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Work Order ID</label>
                                        <div className="relative">
                                            <input className="w-full bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-500 cursor-not-allowed pl-3 pr-10 py-2.5" disabled type="text" value={wo.wo_number} />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[18px]">lock</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Priority <span className="text-red-500">*</span></label>
                                        <select
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5 px-3"
                                            value={editForm.priority}
                                            onChange={e => setEditForm(p => ({ ...p, priority: e.target.value }))}
                                        >
                                            <option value="CRITICAL">Critical</option>
                                            <option value="HIGH">High</option>
                                            <option value="MEDIUM">Medium</option>
                                            <option value="LOW">Low</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Assigned Technician</label>
                                        <select
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5 px-3"
                                            value={editForm.assigned_technician_id}
                                            onChange={e => setEditForm(p => ({ ...p, assigned_technician_id: e.target.value }))}
                                        >
                                            <option value="">-- Unassigned --</option>
                                            {technicians.map(tech => (
                                                <option key={tech.id} value={tech.id}>
                                                    {tech.first_name} {tech.last_name} ({tech.initials})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </section>

                            <section className="border-t border-slate-100 dark:border-slate-700/50 pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                                    </span>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Service Status</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Status</label>
                                        <select
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5 px-3"
                                            value={editForm.status}
                                            onChange={e => setEditForm(p => ({ ...p, status: e.target.value }))}
                                        >
                                            <option value="OPEN">Not Started</option>
                                            <option value="IN_DIAGNOSIS">In Diagnosis</option>
                                            <option value="PENDING_PARTS">Pending Parts</option>
                                            <option value="IN_PROGRESS">In Progress</option>
                                            <option value="SOLVED">Solved</option>
                                            <option value="CLOSED">Closed</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Short Title</label>
                                        <input
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary px-3 py-2.5"
                                            value={editForm.title}
                                            onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))}
                                            type="text"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className="border-t border-slate-100 dark:border-slate-700/50 pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                                    </span>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Symptom & Description</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Reported Symptom</label>
                                        <textarea
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary p-3"
                                            rows={2}
                                            value={editForm.reported_symptom}
                                            onChange={e => setEditForm(p => ({ ...p, reported_symptom: e.target.value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Detailed Description</label>
                                        <textarea
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary p-3"
                                            rows={3}
                                            value={editForm.description}
                                            onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateWO}
                                disabled={updating}
                                className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm shadow-primary/30 transition-all flex items-center gap-2 disabled:opacity-70"
                            >
                                <span className={`material-symbols-outlined text-[18px] ${updating ? 'animate-spin' : ''}`}>
                                    {updating ? 'sync' : 'save'}
                                </span>
                                {updating ? 'Updating...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
