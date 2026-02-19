'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock data per WO id
const woData: Record<string, {
    id: string;
    priority: 'Critical' | 'High' | 'Medium' | 'Low';
    asset: string;
    zone: string;
    serial: string;
    symptom: string;
    status: 'In Progress' | 'Not Started' | 'Solved';
    tech: string;
    techInitials: string;
    icon: string;
}> = {
    '4921': {
        id: 'OT-4921', priority: 'Critical', asset: 'Hydraulic Pump A2', zone: 'Zone B - Line 4',
        serial: 'HYD-2023-X99', symptom: 'Motor: High vibration detected on bearing housing. Operator reported unusual noise during start-up sequence at 08:00 AM. Vibration monitoring system triggered alert code VIB-002.',
        status: 'In Progress', tech: 'John Doe', techInitials: 'JD', icon: 'water_pump',
    },
    '4920': {
        id: 'OT-4920', priority: 'High', asset: 'Conveyor Belt M1', zone: 'Zone A - Logistics',
        serial: 'CNV-2022-M01', symptom: 'Belt: Misalignment detected during routine check. Belt offset measuring 12mm from centre-line.',
        status: 'Not Started', tech: 'Unassigned', techInitials: '--', icon: 'conveyor_belt',
    },
    '4918': {
        id: 'OT-4918', priority: 'Medium', asset: 'Compressor C-40', zone: 'Zone C - Utility',
        serial: 'CMP-2021-C40', symptom: 'Compressor: Unusual noise during startup sequence. Possible valve issue.',
        status: 'Solved', tech: 'Alice Smith', techInitials: 'AS', icon: 'air',
    },
    '4915': {
        id: 'OT-4915', priority: 'Low', asset: 'HVAC Unit 3', zone: 'Admin Building',
        serial: 'HVC-2020-U03', symptom: 'Fan: Periodic maintenance request (Filter check).',
        status: 'In Progress', tech: 'Mike K.', techInitials: 'MK', icon: 'hvac',
    },
    '4902': {
        id: 'OT-4902', priority: 'High', asset: 'Robot Arm Kuka-7', zone: 'Zone B - Assembly',
        serial: 'ROB-2023-K07', symptom: 'Servo: Axis 3 positioning error exceeded tolerance by 0.8mm.',
        status: 'Not Started', tech: 'Unassigned', techInitials: '--', icon: 'robot_2',
    },
};

const priorityStyle: Record<string, string> = {
    Critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900/50',
    High: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-900/50',
    Medium: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
    Low: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600',
};

export default function WorkOrderDetailPage() {
    const { id } = useParams<{ id: string }>();
    const wo = woData[id] ?? woData['4921'];

    const diagnosticHref = '/dashboard/work-orders/new/diagnostic';

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
                            <span className="text-primary font-mono font-medium">#{wo.id}</span>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Work Order #{wo.id}</h1>
                            <span className={`px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1 border ${priorityStyle[wo.priority]}`}>
                                {wo.priority === 'Critical' && <span className="size-1.5 rounded-full bg-red-600 animate-pulse" />}
                                {wo.priority}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${wo.status === 'In Progress' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50'
                                    : wo.status === 'Solved' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                                }`}>
                                {wo.status}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-slate-700 dark:text-slate-200">
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                            Edit
                        </button>
                        <Link
                            href={diagnosticHref}
                            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5 transform"
                        >
                            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                            {wo.status === 'In Progress' ? 'Continue Diagnostic' : wo.status === 'Solved' ? 'View Diagnostic' : 'Launch MAXER Diagnostic'}
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
                                        <span className="material-symbols-outlined text-3xl text-slate-400">{wo.icon}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">{wo.asset}</h4>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">Main hydraulic circuit pump for assembly line 4.</p>
                                        <div className="flex gap-4 mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px] text-slate-400">location_on</span>
                                                {wo.zone}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px] text-slate-400">barcode</span>
                                                SN: {wo.serial}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-red-500 mt-0.5">warning</span>
                                        <div>
                                            <h5 className="text-sm font-bold text-red-900 dark:text-red-200 mb-1">Reported Symptom</h5>
                                            <p className="text-sm text-red-800 dark:text-red-300 leading-relaxed">&quot;{wo.symptom}&quot;</p>
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
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Similar Case: #OT-3882</p>
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
                            {wo.tech !== 'Unassigned' ? (
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-bold">
                                            {wo.techInitials}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">{wo.tech}</p>
                                            <p className="text-xs text-slate-500">Lead Technician</p>
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
                                    { icon: 'add_task', color: 'green', time: 'Today, 08:15 AM', title: 'WO Created in SAP', desc: 'Auto-generated from alert VIB-002' },
                                    { icon: 'person', color: 'blue', time: 'Today, 08:45 AM', title: 'Technician Assigned', desc: `${wo.tech} accepted the WO` },
                                    { icon: 'sync', color: 'amber', time: 'Today, 09:02 AM', title: 'Last Sync', desc: 'Data refreshed from GMAO' },
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

                        {/* Quick Actions */}
                        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50">
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 p-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors flex flex-col items-center gap-1">
                                    <span className="material-symbols-outlined">print</span>
                                    <span>Print WO</span>
                                </button>
                                <button className="bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 p-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-200 transition-colors flex flex-col items-center gap-1">
                                    <span className="material-symbols-outlined">share</span>
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
