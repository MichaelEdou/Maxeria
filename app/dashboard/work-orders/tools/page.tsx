'use client';

import { useState } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────
type ToolStatus = 'Available' | 'In Use' | 'Calibrating' | 'Maintenance';
type StockLevel = 'In Stock' | 'Low Stock' | 'Critical Low';

const toolStatusStyle: Record<ToolStatus, string> = {
    Available: 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
    'In Use': 'bg-blue-100   dark:bg-blue-900/20    text-blue-700   dark:text-blue-400',
    Calibrating: 'bg-orange-100 dark:bg-orange-900/20  text-orange-700 dark:text-orange-400',
    Maintenance: 'bg-red-100    dark:bg-red-900/20     text-red-700    dark:text-red-400',
};

const stockBadge: Record<StockLevel, { text: string; bar: string; label: string }> = {
    'In Stock': { text: 'text-emerald-600', bar: 'bg-emerald-500', label: 'font-bold text-emerald-600 uppercase tracking-wide text-[10px]' },
    'Low Stock': { text: 'text-orange-600', bar: 'bg-orange-500', label: 'font-bold text-orange-500  uppercase tracking-wide text-[10px]' },
    'Critical Low': { text: 'text-red-600', bar: 'bg-red-500', label: 'font-bold text-red-500     uppercase tracking-wide text-[10px]' },
};

// ─── Mock data (will be replaced by Supabase in migration 003) ────────────────
const TOOLS = [
    { id: 'VA-2023-001', name: 'Vibration Analyzer X7', icon: 'vibration', status: 'Available' as ToolStatus, location: 'Zone A - Locker 14', calibration: '12 Oct 2023' },
    { id: 'IR-CAM-099', name: 'Infrared Camera FLIR', icon: 'photo_camera_front', status: 'In Use' as ToolStatus, assignedTo: 'Sarah Connor', returnEta: '16:00 Today' },
    { id: 'OSC-4000-X', name: 'Oscilloscope Pro', icon: 'network_check', status: 'Calibrating' as ToolStatus, location: 'Lab B - Workbench 2', eta: 'Tomorrow' },
    { id: 'MM-FLUKE-02', name: 'Multimeter Fluke 87V', icon: 'bolt', status: 'Available' as ToolStatus, location: 'Mobile Unit 4', calibration: '01 Nov 2023' },
    { id: 'THK-TRQ-55', name: 'Torque Wrench Set', icon: 'settings', status: 'Available' as ToolStatus, location: 'Zone B - Cabinet 3', calibration: '05 Jan 2024' },
    { id: 'ULT-SCAN-03', name: 'Ultrasonic Thickness Gauge', icon: 'radar', status: 'In Use' as ToolStatus, assignedTo: 'Marc Durand', returnEta: 'Tomorrow 09:00' },
];

const PARTS = [
    { pn: 'BRG-6205-2RS', name: 'Deep Groove Ball Bearing', desc: 'Sealed, 25mm ID, 52mm OD, 15mm Width', qty: 2, min: 10, pct: 20, level: 'Critical Low' as StockLevel, compat: ['Conveyor M1', 'Pump A2'] },
    { pn: 'FLT-HYD-505', name: 'Hydraulic Return Filter', desc: '10 Micron, High Pressure', qty: 18, min: 5, pct: 80, level: 'In Stock' as StockLevel, compat: ['Hydraulic Unit H1'] },
    { pn: 'BELT-V-B42', name: 'V-Belt B42 Classic', desc: 'Rubber, Fabric Cover, Industrial Grade', qty: 4, min: 8, pct: 50, level: 'Low Stock' as StockLevel, compat: ['HVAC Unit 3', 'Fan Assembly F2'] },
    { pn: 'SENS-VIB-XA', name: 'Piezo Velocity Sensor', desc: '4-20mA Output, Top Connector', qty: 6, min: 3, pct: 100, level: 'In Stock' as StockLevel, compat: ['General Use'] },
    { pn: 'SEAL-OR-180', name: 'O-Ring Kit (Ø180mm)', desc: 'Nitrile Rubber, Pack of 5', qty: 12, min: 10, pct: 65, level: 'In Stock' as StockLevel, compat: ['Pump A2', 'Compressor C-40'] },
    { pn: 'CAP-ELEC-47U', name: 'Electrolytic Capacitor 47µF', desc: '400V, ±20%, Radial Leads', qty: 3, min: 6, pct: 30, level: 'Low Stock' as StockLevel, compat: ['VFD Drive', 'Control Cabinet'] },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ToolsPartsPage() {
    const [activeTab, setActiveTab] = useState<'tools' | 'parts'>('tools');
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'tool' | 'part'>('tool');

    const lowStockCount = PARTS.filter(p => p.level !== 'In Stock').length;

    const filteredTools = TOOLS.filter(t =>
        !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase())
    );

    const filteredParts = PARTS.filter(p =>
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.pn.toLowerCase().includes(search.toLowerCase()) ||
        p.compat.some(c => c.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-black/20">
            {/* ─── Header ──────────────────────────────────────────────── */}
            <div className="p-6 pb-2 space-y-6 shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                            <Link href="/dashboard/work-orders" className="hover:text-primary transition-colors">Operations</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-slate-800 dark:text-slate-200 font-medium">Tools & Parts</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Tools & Parts Inventory</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage specialized equipment availability and spare parts stock.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-slate-700 dark:text-slate-200">
                            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
                            Scan Item
                        </button>
                        <button
                            onClick={() => { setModalType(activeTab === 'tools' ? 'tool' : 'part'); setIsModalOpen(true); }}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
                        >
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Add New {activeTab === 'tools' ? 'Tool' : 'Part'}
                        </button>
                    </div>
                </div>

                {/* ─── Summary Cards ────────────────────────────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-5xl text-slate-900 dark:text-white">build</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Tools</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{TOOLS.length}</p>
                            <span className="text-xs text-slate-500">units</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-5xl text-emerald-500">check_circle</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Available Now</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                                {TOOLS.filter(t => t.status === 'Available').length}
                            </p>
                            <span className="text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded font-medium">Ready</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-5xl text-amber-500">inventory_2</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Low Stock</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                                {PARTS.filter(p => p.level === 'Low Stock').length}
                            </p>
                            <span className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded font-medium">Reorder</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="material-symbols-outlined text-5xl text-red-500">error</span>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Critical Stock</p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                                {PARTS.filter(p => p.level === 'Critical Low').length}
                            </p>
                            <span className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded font-medium">Urgent</span>
                        </div>
                    </div>
                </div>

                {/* ─── Tabs + Search ─────────────────────────────────── */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
                    <div className="flex gap-6">
                        <button
                            onClick={() => setActiveTab('tools')}
                            className={`pb-3 border-b-2 font-semibold text-sm flex items-center gap-2 transition-colors ${activeTab === 'tools'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">build</span>
                            Diagnostic Tools
                            <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                {TOOLS.length}
                            </span>
                        </button>
                        <button
                            onClick={() => setActiveTab('parts')}
                            className={`pb-3 border-b-2 font-semibold text-sm flex items-center gap-2 transition-colors ${activeTab === 'parts'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">settings_input_component</span>
                            Spare Parts
                            {lowStockCount > 0 && (
                                <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                    {lowStockCount} Low
                                </span>
                            )}
                        </button>
                    </div>
                    <div className="flex items-center gap-3 pb-2">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[18px]">search</span>
                            <input
                                className="w-64 pl-9 pr-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary placeholder-slate-400"
                                placeholder="Filter by name, ID or location..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <button className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[20px]">filter_list</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ─── Content ─────────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto p-6 pt-5 space-y-6">

                {/* ── TOOLS TAB ─────────────────────────────────────────── */}
                {activeTab === 'tools' && (
                    <div>
                        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200 mb-4">
                            Specialized Equipment
                            <span className="ml-2 text-xs font-normal text-slate-400">({filteredTools.length} items)</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                            {filteredTools.map(tool => {
                                const isAvailable = tool.status === 'Available';
                                const style = toolStatusStyle[tool.status];
                                return (
                                    <div key={tool.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-4 hover:shadow-md transition-all group relative overflow-hidden hover:-translate-y-0.5">
                                        {/* ghost icon */}
                                        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                                            <span className="material-symbols-outlined text-8xl">{tool.icon}</span>
                                        </div>

                                        {/* Status badge */}
                                        <div className="flex justify-between items-start mb-3">
                                            <div className={`${style} text-xs font-bold px-2 py-1 rounded inline-flex items-center gap-1`}>
                                                {tool.status === 'Available' && <span className="size-1.5 rounded-full bg-emerald-500" />}
                                                {tool.status === 'In Use' && <span className="size-1.5 rounded-full bg-blue-500 animate-pulse" />}
                                                {tool.status === 'Calibrating' && <span className="material-symbols-outlined text-[13px]">build_circle</span>}
                                                {tool.status === 'Maintenance' && <span className="material-symbols-outlined text-[13px]">warning</span>}
                                                {tool.status}
                                            </div>
                                            <button className="text-slate-400 hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                                            </button>
                                        </div>

                                        {/* Name */}
                                        <div className="mb-4">
                                            <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-1 leading-tight">{tool.name}</h4>
                                            <p className="text-slate-400 text-xs font-mono">ID: {tool.id}</p>
                                        </div>

                                        {/* Location / assignee */}
                                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
                                            <span className="material-symbols-outlined text-[18px] text-slate-400">
                                                {tool.assignedTo ? 'person' : 'location_on'}
                                            </span>
                                            <span className="truncate">
                                                {tool.assignedTo
                                                    ? `Tech: ${tool.assignedTo}`
                                                    : tool.location}
                                            </span>
                                        </div>

                                        {/* Footer */}
                                        <div className="border-t border-slate-100 dark:border-slate-700 pt-3 flex justify-between items-center">
                                            <span className="text-xs text-slate-500">
                                                {tool.calibration && `Last Calib: ${tool.calibration}`}
                                                {tool.returnEta && `Exp. Return: ${tool.returnEta}`}
                                                {tool.eta && `ETA: ${tool.eta}`}
                                            </span>
                                            {isAvailable ? (
                                                <button className="text-sm text-primary font-semibold hover:underline transition-colors">Check Out</button>
                                            ) : (
                                                <span className="text-sm text-slate-400 font-medium cursor-not-allowed">Unavailable</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {filteredTools.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
                                <span className="material-symbols-outlined text-[40px]">search_off</span>
                                <p className="text-sm">No tools match your search.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ── PARTS TAB ─────────────────────────────────────────── */}
                {activeTab === 'parts' && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        {/* Table header */}
                        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">Spare Parts Catalog</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-slate-500 uppercase">Sort by:</span>
                                <select className="form-select text-xs border border-slate-200 dark:border-slate-700 rounded-lg py-1 pl-2 pr-7 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary cursor-pointer h-8">
                                    <option>Stock Level (Low to High)</option>
                                    <option>Part Name</option>
                                    <option>Part Number</option>
                                </select>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
                                <thead className="bg-slate-50 dark:bg-slate-800/80 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200 dark:border-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 tracking-wider">Part Number</th>
                                        <th className="px-6 py-3 tracking-wider">Name & Description</th>
                                        <th className="px-6 py-3 tracking-wider">Stock Status</th>
                                        <th className="px-6 py-3 tracking-wider">Compatibility</th>
                                        <th className="px-6 py-3 tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                                    {filteredParts.map(part => {
                                        const s = stockBadge[part.level];
                                        const needsRestock = part.level !== 'In Stock';
                                        return (
                                            <tr key={part.pn} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                                                <td className="px-6 py-4 font-mono font-medium text-slate-900 dark:text-white whitespace-nowrap">
                                                    {part.pn}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-900 dark:text-white">{part.name}</div>
                                                    <div className="text-xs text-slate-500 max-w-[220px] truncate">{part.desc}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`font-bold ${s.text}`}>{part.qty}</span>
                                                            <span className="text-xs text-slate-400">/ {part.min} (Min)</span>
                                                        </div>
                                                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                            <div
                                                                className={`${s.bar} h-full rounded-full transition-all`}
                                                                style={{ width: `${Math.min(part.pct, 100)}%` }}
                                                            />
                                                        </div>
                                                        <span className={s.label}>{part.level}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {part.compat.map(c => (
                                                            <span key={c} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                                                {c}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    {needsRestock ? (
                                                        <button className="text-primary hover:text-primary/80 font-semibold text-sm transition-colors">
                                                            Restock
                                                        </button>
                                                    ) : (
                                                        <button className="text-slate-400 hover:text-primary transition-colors">
                                                            <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {filteredParts.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-14 text-center text-slate-400">
                                                <span className="material-symbols-outlined text-[36px] block mb-2">search_off</span>
                                                No parts match your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination footer */}
                        <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between text-sm">
                            <span className="text-slate-500">Showing {filteredParts.length} of {PARTS.length} Items</span>
                            <div className="flex gap-1 items-center">
                                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-40">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="px-2 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-700 dark:text-white font-medium text-xs">1</button>
                                <button className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors text-xs">2</button>
                                <button className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors text-xs">3</button>
                                <span className="px-1 text-slate-400 text-xs">…</span>
                                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ─── Add New Item Modal ─────────────────────────────── */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Register New {modalType === 'tool' ? 'Diagnostic Tool' : 'Spare Part'}
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                    Enter detailed inventory information for the new {modalType}.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[24px]">close</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                            {/* Modal Type Toggle */}
                            <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-lg w-fit">
                                <button
                                    onClick={() => setModalType('tool')}
                                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${modalType === 'tool'
                                            ? 'bg-white dark:bg-slate-700 shadow-sm text-primary'
                                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Diagnostic Tool
                                </button>
                                <button
                                    onClick={() => setModalType('part')}
                                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${modalType === 'part'
                                            ? 'bg-white dark:bg-slate-700 shadow-sm text-primary'
                                            : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                        }`}
                                >
                                    Spare Part
                                </button>
                            </div>

                            {modalType === 'tool' ? (
                                <div className="space-y-8 animate-in fade-in duration-200">
                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[16px]">info</span>
                                            </span>
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">General Information</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                    Tool Name <span className="text-red-500">*</span>
                                                </label>
                                                <input className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary px-3 py-2.5 text-slate-900 dark:text-white" placeholder="e.g. Laser Aligner Pro" type="text" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                    Serial Number / ID <span className="text-red-500">*</span>
                                                </label>
                                                <input className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary px-3 py-2.5 text-slate-900 dark:text-white" placeholder="e.g. LA-2024-X1" type="text" />
                                            </div>
                                        </div>
                                    </section>
                                    <section className="border-t border-slate-100 dark:border-slate-700/50 pt-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[16px]">location_on</span>
                                            </span>
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Storage & Status</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Initial Status</label>
                                                <select className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5 text-slate-900 dark:text-white px-2">
                                                    <option value="Available">Available</option>
                                                    <option value="Maintenance">Under Maintenance</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Storage Location</label>
                                                <input className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary px-3 py-2.5 text-slate-900 dark:text-white" placeholder="e.g. Zone B - Cabinet 12" type="text" />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            ) : (
                                <div className="space-y-8 animate-in fade-in duration-200">
                                    <section>
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[16px]">settings_input_component</span>
                                            </span>
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Part Details</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                    Part Name <span className="text-red-500">*</span>
                                                </label>
                                                <input className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary px-3 py-2.5 text-slate-900 dark:text-white" placeholder="e.g. SKF Bearing 6205" type="text" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                                    Part Number (PN) <span className="text-red-500">*</span>
                                                </label>
                                                <input className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary px-3 py-2.5 text-slate-900 dark:text-white" placeholder="e.g. BRG-6205-RS" type="text" />
                                            </div>
                                        </div>
                                    </section>
                                    <section className="border-t border-slate-100 dark:border-slate-700/50 pt-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[16px]">inventory</span>
                                            </span>
                                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Inventory Management</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Current Stock</label>
                                                <input className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary px-3 py-2.5 text-slate-900 dark:text-white" type="number" defaultValue="0" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Minimum Threshold</label>
                                                <input className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary px-3 py-2.5 text-slate-900 dark:text-white" type="number" defaultValue="5" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Unit</label>
                                                <select className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5 text-slate-900 dark:text-white px-2">
                                                    <option>PCS</option>
                                                    <option>SET</option>
                                                    <option>KG</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}
                        </div>

                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center">
                                <label className="inline-flex items-center cursor-pointer group">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                    <span className="ms-3 text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Sync with ERP/GMAO</span>
                                </label>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm shadow-primary/30 transition-all flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">save</span>
                                    Register Item
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
