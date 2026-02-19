'use client';

import Link from 'next/link';

export default function WorkOrdersPage() {
    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-black/20">
            {/* Header - Specific to Operations/Work Orders */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 shrink-0 z-20">
                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                        <button className="px-3 py-1.5 text-sm font-medium rounded-md text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Admin</button>
                        <button className="px-3 py-1.5 text-sm font-medium rounded-md bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white">Operations</button>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden lg:block">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[20px]">search</span>
                        <input className="pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white placeholder-slate-500" placeholder="Search global assets..." type="text" />
                    </div>
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
                    <button className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">help</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors relative">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                        <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                    </button>
                    <button className="size-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-primary/30">
                        JD
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
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
                            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Create New WO
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group hover:border-primary/50 transition-colors">
                            <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-5xl text-slate-900 dark:text-white">assignment</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Open</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">42</p>
                                <span className="text-xs text-slate-500">work orders</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                            <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-5xl text-blue-500">engineering</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">In Diagnosis</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">15</p>
                                <span className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-1.5 py-0.5 rounded font-medium">Active</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
                            <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-5xl text-amber-500">sync_problem</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pending Sync</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">3</p>
                                <span className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 rounded font-medium">Needs Review</span>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between h-24 relative overflow-hidden group hover:border-red-500/50 transition-colors">
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

                <div className="flex-1 flex flex-col p-6 pt-2 gap-6 min-h-0">
                    <div className="flex-1 flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-3 items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                            <div className="relative flex-1 max-w-md">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[18px]">search</span>
                                <input className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-1 focus:ring-primary focus:border-primary" placeholder="Search by ID, Asset, or Symptom..." type="text" />
                            </div>
                            <div className="flex items-center gap-2">
                                <select className="form-select text-sm border-slate-200 dark:border-slate-700 rounded-lg py-1.5 pl-3 pr-8 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary cursor-pointer">
                                    <option>All Priorities</option>
                                    <option>Critical</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                                <select className="form-select text-sm border-slate-200 dark:border-slate-700 rounded-lg py-1.5 pl-3 pr-8 bg-white dark:bg-slate-900 focus:ring-primary focus:border-primary cursor-pointer">
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
                            <div className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 items-center transition-colors group">
                                <div className="col-span-1 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">#OT-4921</div>
                                <div className="col-span-1">
                                    <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded text-xs font-bold inline-flex items-center gap-1">
                                        <span className="size-1.5 rounded-full bg-red-600 animate-pulse"></span>
                                        Critical
                                    </span>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">Hydraulic Pump A2</span>
                                        <span className="text-xs text-slate-500">Zone B - Line 4</span>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                                        <span className="font-semibold">Motor:</span> High vibration detected on bearing housing.
                                    </div>
                                </div>
                                <div className="col-span-2 flex items-center gap-2">
                                    <div className="size-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">JD</div>
                                    <span className="text-sm text-slate-700 dark:text-slate-300">John Doe</span>
                                </div>
                                <div className="col-span-1">
                                    <div className="flex items-center gap-1.5">
                                        <span className="size-2 rounded-full bg-green-500"></span>
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">In SAP</span>
                                    </div>
                                </div>
                                <div className="col-span-2 flex items-center justify-between gap-2">
                                    <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-100 dark:border-blue-800">In Progress</span>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-primary hover:bg-primary/10 rounded-md" title="Continue Diagnosis">
                                            <span className="material-symbols-outlined text-[20px]">play_circle</span>
                                        </button>
                                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md" title="View Details">
                                            <span className="material-symbols-outlined text-[20px]">visibility</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 items-center transition-colors group">
                                <div className="col-span-1 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">#OT-4920</div>
                                <div className="col-span-1">
                                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded text-xs font-bold">High</span>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">Conveyor Belt M1</span>
                                        <span className="text-xs text-slate-500">Zone A - Logistics</span>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                                        <span className="font-semibold">Belt:</span> Misalignment detected during routine check.
                                    </div>
                                </div>
                                <div className="col-span-2 flex items-center gap-2">
                                    <div className="size-6 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center justify-center text-xs font-bold">--</div>
                                    <span className="text-sm text-slate-400 italic">Unassigned</span>
                                </div>
                                <div className="col-span-1">
                                    <div className="flex items-center gap-1.5">
                                        <span className="size-2 rounded-full bg-green-500"></span>
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">In SAP</span>
                                    </div>
                                </div>
                                <div className="col-span-2 flex items-center justify-between gap-2">
                                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700">Not Started</span>
                                    <button className="bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded text-xs font-semibold shadow-sm transition-colors opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                        Start Diagnosis
                                    </button>
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="grid grid-cols-12 gap-4 px-4 py-4 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 items-center transition-colors group">
                                <div className="col-span-1 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">#OT-4918</div>
                                <div className="col-span-1">
                                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-bold">Medium</span>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">Compressor C-40</span>
                                        <span className="text-xs text-slate-500">Zone C - Utility</span>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                                        <span className="font-semibold">Compressor:</span> Unusual noise during startup sequence.
                                    </div>
                                </div>
                                <div className="col-span-2 flex items-center gap-2">
                                    <div className="size-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center text-xs font-bold">AS</div>
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Alice Smith</span>
                                </div>
                                <div className="col-span-1">
                                    <div className="flex items-center gap-1.5">
                                        <span className="size-2 rounded-full bg-amber-500"></span>
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Syncing...</span>
                                    </div>
                                </div>
                                <div className="col-span-2 flex items-center justify-between gap-2">
                                    <span className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-2.5 py-1 rounded-full text-xs font-semibold border border-green-100 dark:border-green-800 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">check</span> Solved
                                    </span>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md" title="View Report">
                                            <span className="material-symbols-outlined text-[20px]">description</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between text-sm">
                            <span className="text-slate-500">Showing 1-5 of 42 Work Orders</span>
                            <div className="flex gap-1">
                                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-50">
                                    <span className="material-symbols-outlined">chevron_left</span>
                                </button>
                                <button className="px-2 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded text-slate-700 dark:text-white font-medium">1</button>
                                <button className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors">2</button>
                                <button className="px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors">3</button>
                                <span className="px-2 py-1 text-slate-400">...</span>
                                <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                    <span className="material-symbols-outlined">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
