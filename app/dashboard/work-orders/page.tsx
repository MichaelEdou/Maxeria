'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function WorkOrdersPage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="relative flex-1 flex flex-col h-full">
            {/* Create New WO Modal */}
            {showModal && (
                <div className="absolute inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-700">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 shrink-0">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Create New Work Order</h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manually register a maintenance request for diagnosis.</p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                            >
                                <span className="material-symbols-outlined text-[24px]">close</span>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
                            {/* General Information */}
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
                                            <input
                                                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-500 cursor-not-allowed pl-3 pr-10 py-2.5"
                                                disabled
                                                type="text"
                                                value="OT-4922 (Auto)"
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[18px]">lock</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            Priority <span className="text-red-500">*</span>
                                        </label>
                                        <select className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5 px-3">
                                            <option value="critical">Critical</option>
                                            <option value="high" defaultValue="high">High</option>
                                            <option value="medium">Medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Assigned Technician</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[18px]">person_search</span>
                                            <input
                                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary pl-10 pr-3 py-2.5"
                                                placeholder="Search technician..."
                                                type="text"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Asset Selection */}
                            <section className="border-t border-slate-100 dark:border-slate-700/50 pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[16px]">precision_manufacturing</span>
                                    </span>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Asset Selection</h3>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                        Industrial Asset <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">search</div>
                                        <input
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary pl-10 pr-10 py-2.5 shadow-sm"
                                            placeholder="Start typing asset name or ID (e.g. Hydraulic Pump A2)..."
                                            type="text"
                                        />
                                        <button className="absolute right-2 top-1.5 p-1 text-slate-400 hover:text-primary rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                            <span className="material-symbols-outlined text-[16px]">account_tree</span>
                                        </button>
                                    </div>
                                    <div className="mt-2 text-xs text-slate-500">
                                        Selected: <span className="font-semibold text-slate-700 dark:text-slate-300">None</span>
                                    </div>
                                </div>
                            </section>

                            {/* Symptom Entry */}
                            <section className="border-t border-slate-100 dark:border-slate-700/50 pt-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="size-6 rounded bg-primary/10 text-primary flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                                    </span>
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Symptom Entry (MAXER)</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            Object <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5 px-3"
                                            list="objects"
                                            placeholder="e.g. Bearing, Motor, Seal"
                                            type="text"
                                        />
                                        <datalist id="objects">
                                            <option value="Bearing" />
                                            <option value="Motor" />
                                            <option value="Seal" />
                                            <option value="Gearbox" />
                                            <option value="Fan" />
                                        </datalist>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                            Defect <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary py-2.5 px-3"
                                            list="defects"
                                            placeholder="e.g. Vibration, Noise, Leakage"
                                            type="text"
                                        />
                                        <datalist id="defects">
                                            <option value="High Vibration" />
                                            <option value="Unusual Noise" />
                                            <option value="Oil Leakage" />
                                            <option value="Overheating" />
                                            <option value="Misalignment" />
                                        </datalist>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                                    <textarea
                                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary p-3"
                                        placeholder="Provide additional context about the failure or observation..."
                                        rows={3}
                                    />
                                </div>
                            </section>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between shrink-0">
                            <label className="inline-flex items-center cursor-pointer group">
                                <input defaultChecked className="sr-only peer" type="checkbox" />
                                <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                                <span className="ms-3 text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">Sync with SAP/Maximo</span>
                            </label>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <Link
                                    href="/dashboard/work-orders/new"
                                    className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm shadow-primary/30 transition-all flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">save</span>
                                    Create Work Order
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Page Content */}
            <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-black/20 h-full overflow-hidden">
                <div className="p-6 pb-2 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                                <span>Operations</span>
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                <span className="text-slate-800 dark:text-slate-200 font-medium">Work Orders</span>
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Work Orders Management</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage and track maintenance work orders synchronized with your GMAO/ERP.</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                                <span className="material-symbols-outlined text-[18px]">filter_list</span>
                                Filter
                            </button>
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
                            >
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Create New WO
                            </button>
                        </div>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group">
                            <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-5xl text-slate-900 dark:text-white">assignment</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Open</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">42</p>
                                <span className="text-xs text-slate-500">work orders</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group">
                            <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-5xl text-blue-500">engineering</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">In Diagnosis</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">15</p>
                                <span className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded font-medium">Active</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group">
                            <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-5xl text-amber-500">sync_problem</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pending Sync</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">3</p>
                                <span className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded font-medium">Needs Review</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group">
                            <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-5xl text-red-500">priority_high</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Critical</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">5</p>
                                <span className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded font-medium">Urgent</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="flex flex-1 overflow-hidden p-6 pt-2 gap-6">
                    <div className="flex-1 flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        {/* Filters */}
                        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-3 items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                            <div className="relative flex-1 max-w-md">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[18px]">search</span>
                                <input className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary" placeholder="Search by ID, Asset, or Symptom..." type="text" />
                            </div>
                            <div className="flex items-center gap-2">
                                <select className="form-select text-sm border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 pl-3 pr-8 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary cursor-pointer">
                                    <option>All Priorities</option>
                                    <option>Critical</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                                <select className="form-select text-sm border border-slate-200 dark:border-slate-700 rounded-lg py-1.5 pl-3 pr-8 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary cursor-pointer">
                                    <option>All Statuses</option>
                                    <option>In Diagnosis</option>
                                    <option>Pending</option>
                                    <option>Solved</option>
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
                            <div className="col-span-2 text-center">Diagnostic Status</div>
                        </div>

                        {/* Table Rows */}
                        <div className="overflow-y-auto custom-scrollbar flex-1">
                            {/* Row 1 */}
                            <Link href="/dashboard/work-orders/4921" className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 items-center transition-colors group cursor-pointer">
                                <div className="col-span-1 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">#OT-4921</div>
                                <div className="col-span-1">
                                    <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1">
                                        <span className="size-1.5 rounded-full bg-red-600 animate-pulse"></span>Critical
                                    </span>
                                </div>
                                <div className="col-span-2"><div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-white">Hydraulic Pump A2</span><span className="text-xs text-slate-500">Zone B - Line 4</span></div></div>
                                <div className="col-span-3"><div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2"><span className="font-semibold">Motor:</span> High vibration detected on bearing housing.</div></div>
                                <div className="col-span-2 flex items-center gap-2"><div className="size-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">JD</div><span className="text-sm text-slate-700 dark:text-slate-300">John Doe</span></div>
                                <div className="col-span-1"><div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-green-500"></span><span className="text-xs font-medium text-slate-600 dark:text-slate-400">In SAP</span></div></div>
                                <div className="col-span-2 flex items-center justify-between gap-2">
                                    <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-100 dark:border-blue-800">In Progress</span>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="p-1.5 text-primary hover:bg-primary/10 rounded-md"><span className="material-symbols-outlined text-[20px]">play_circle</span></span>
                                        <span className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"><span className="material-symbols-outlined text-[20px]">visibility</span></span>
                                    </div>
                                </div>
                            </Link>
                            {/* Row 2 */}
                            <Link href="/dashboard/work-orders/4920" className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 items-center transition-colors group cursor-pointer">
                                <div className="col-span-1 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">#OT-4920</div>
                                <div className="col-span-1"><span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded text-xs font-bold">High</span></div>
                                <div className="col-span-2"><div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-white">Conveyor Belt M1</span><span className="text-xs text-slate-500">Zone A - Logistics</span></div></div>
                                <div className="col-span-3"><div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2"><span className="font-semibold">Belt:</span> Misalignment detected during routine check.</div></div>
                                <div className="col-span-2 flex items-center gap-2"><div className="size-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs font-bold">--</div><span className="text-sm text-slate-400 italic">Unassigned</span></div>
                                <div className="col-span-1"><div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-green-500"></span><span className="text-xs font-medium text-slate-600 dark:text-slate-400">In SAP</span></div></div>
                                <div className="col-span-2 flex items-center justify-between gap-2">
                                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700">Not Started</span>
                                    <span className="bg-primary text-white px-3 py-1.5 rounded text-xs font-semibold shadow-sm opacity-0 group-hover:opacity-100 whitespace-nowrap">View Details</span>
                                </div>
                            </Link>
                            {/* Row 3 */}
                            <Link href="/dashboard/work-orders/4918" className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 items-center transition-colors group cursor-pointer">
                                <div className="col-span-1 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">#OT-4918</div>
                                <div className="col-span-1"><span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-bold">Medium</span></div>
                                <div className="col-span-2"><div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-white">Compressor C-40</span><span className="text-xs text-slate-500">Zone C - Utility</span></div></div>
                                <div className="col-span-3"><div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2"><span className="font-semibold">Compressor:</span> Unusual noise during startup sequence.</div></div>
                                <div className="col-span-2 flex items-center gap-2"><div className="size-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">AS</div><span className="text-sm text-slate-700 dark:text-slate-300">Alice Smith</span></div>
                                <div className="col-span-1"><div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-amber-500"></span><span className="text-xs font-medium text-slate-600 dark:text-slate-400">Syncing...</span></div></div>
                                <div className="col-span-2 flex items-center justify-between gap-2">
                                    <span className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2.5 py-1 rounded-full text-xs font-semibold border border-green-100 dark:border-green-800 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check</span> Solved</span>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><span className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"><span className="material-symbols-outlined text-[20px]">description</span></span></div>
                                </div>
                            </Link>
                            {/* Row 4 */}
                            <Link href="/dashboard/work-orders/4915" className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 items-center transition-colors group cursor-pointer">
                                <div className="col-span-1 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">#OT-4915</div>
                                <div className="col-span-1"><span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs font-bold">Low</span></div>
                                <div className="col-span-2"><div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-white">HVAC Unit 3</span><span className="text-xs text-slate-500">Admin Building</span></div></div>
                                <div className="col-span-3"><div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2"><span className="font-semibold">Fan:</span> Periodic maintenance request (Filter check).</div></div>
                                <div className="col-span-2 flex items-center gap-2"><div className="size-6 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center text-xs font-bold">MK</div><span className="text-sm text-slate-700 dark:text-slate-300">Mike K.</span></div>
                                <div className="col-span-1"><div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-green-500"></span><span className="text-xs font-medium text-slate-600 dark:text-slate-400">In SAP</span></div></div>
                                <div className="col-span-2 flex items-center justify-between gap-2">
                                    <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-100 dark:border-blue-800">In Progress</span>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="p-1.5 text-primary hover:bg-primary/10 rounded-md"><span className="material-symbols-outlined text-[20px]">play_circle</span></span>
                                        <span className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"><span className="material-symbols-outlined text-[20px]">visibility</span></span>
                                    </div>
                                </div>
                            </Link>
                            {/* Row 5 */}
                            <Link href="/dashboard/work-orders/4902" className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 items-center transition-colors group cursor-pointer">
                                <div className="col-span-1 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">#OT-4902</div>
                                <div className="col-span-1"><span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded text-xs font-bold">High</span></div>
                                <div className="col-span-2"><div className="flex flex-col"><span className="text-sm font-medium text-slate-900 dark:text-white">Robot Arm Kuka-7</span><span className="text-xs text-slate-500">Zone B - Assembly</span></div></div>
                                <div className="col-span-3"><div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2"><span className="font-semibold">Servo:</span> Axis 3 positioning error exceeded tolerance.</div></div>
                                <div className="col-span-2 flex items-center gap-2"><div className="size-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs font-bold">--</div><span className="text-sm text-slate-400 italic">Unassigned</span></div>
                                <div className="col-span-1"><div className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-red-500"></span><span className="text-xs font-medium text-slate-600 dark:text-slate-400">Error</span></div></div>
                                <div className="col-span-2 flex items-center justify-between gap-2">
                                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700">Not Started</span>
                                    <span className="bg-primary text-white px-3 py-1.5 rounded text-xs font-semibold shadow-sm opacity-0 group-hover:opacity-100 whitespace-nowrap">View Details</span>
                                </div>
                            </Link>
                        </div>

                        {/* Pagination */}
                        <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between text-sm">
                            <span className="text-slate-500">Showing 1-5 of 42 Work Orders</span>
                            <div className="flex gap-1">
                                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-50"><span className="material-symbols-outlined">chevron_left</span></button>
                                <button className="px-2 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-700 dark:text-white font-medium">1</button>
                                <button className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors">2</button>
                                <button className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors">3</button>
                                <span className="px-2 py-1 text-slate-400">...</span>
                                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><span className="material-symbols-outlined">chevron_right</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
