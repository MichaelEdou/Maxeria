'use client';

import Link from 'next/link';

export default function AssetPage() {
    return (
        <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light dark:bg-background-dark">
            <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-[#1a2632] border-b border-slate-200 dark:border-slate-800 flex-shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <button className="lg:hidden p-1 text-slate-500 hover:text-slate-700">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Asset & Equipment Library Manager</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Manage hierarchical asset library (S3000L / GMAO)</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border-r border-slate-200 dark:border-slate-700 pr-4 mr-2">
                        <span className="text-xs text-slate-400">Last Sync: Today, 08:30 AM</span>
                    </div>
                    <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>sync</span>
                        Sync from GMAO
                    </button>
                    <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                        New Asset
                    </button>
                </div>
            </header>
            <div className="flex-1 overflow-hidden flex flex-row p-6 gap-6">
                <div className="w-1/3 flex flex-col bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
                            <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white placeholder:text-slate-500" placeholder="Search hierarchy..." type="text" />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        <div className="flex flex-col gap-1">
                            <div className="group">
                                <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200">
                                    <span className="material-symbols-outlined text-slate-400">expand_more</span>
                                    <span className="material-symbols-outlined text-primary">domain</span>
                                    <span className="font-semibold text-sm">Plant Alpha - Lyon</span>
                                </div>
                                <div className="ml-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200">
                                        <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                        <span className="material-symbols-outlined text-amber-500" style={{ fontSize: '20px' }}>warehouse</span>
                                        <span className="text-sm">Sector A: Logistics</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200">
                                            <span className="material-symbols-outlined text-slate-400">expand_more</span>
                                            <span className="material-symbols-outlined text-amber-500" style={{ fontSize: '20px' }}>warehouse</span>
                                            <span className="text-sm font-medium">Sector B: Processing</span>
                                        </div>
                                        <div className="ml-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                                            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200">
                                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                                <span className="material-symbols-outlined text-blue-500" style={{ fontSize: '20px' }}>settings_suggest</span>
                                                <span className="text-sm">Sys-01: Mixing Line</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200">
                                                    <span className="material-symbols-outlined text-slate-400">expand_more</span>
                                                    <span className="material-symbols-outlined text-blue-500" style={{ fontSize: '20px' }}>settings_suggest</span>
                                                    <span className="text-sm font-medium">Sys-02: Fluid Transfer</span>
                                                </div>
                                                <div className="ml-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                                                    <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10 text-primary cursor-pointer border-l-2 border-primary">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-4"></span>
                                                            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>water_drop</span>
                                                            <span className="text-sm font-medium">Pump P-102</span>
                                                        </div>
                                                        <span className="w-2 h-2 rounded-full bg-red-500" title="Critical Status"></span>
                                                    </div>
                                                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-600 dark:text-slate-300">
                                                        <span className="w-4"></span>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>valve</span>
                                                        <span className="text-sm">Valve V-204</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-600 dark:text-slate-300">
                                                        <span className="w-4"></span>
                                                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>speed</span>
                                                        <span className="text-sm">Flow Meter F-12</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-200">
                                        <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                        <span className="material-symbols-outlined text-amber-500" style={{ fontSize: '20px' }}>warehouse</span>
                                        <span className="text-sm">Sector C: Packaging</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex justify-between">
                        <span>324 Assets Loaded</span>
                        <span>S3000L Standard</span>
                    </div>
                </div>
                <div className="w-2/3 flex flex-col bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start">
                        <div className="flex gap-4">
                            <div className="w-24 h-24 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden relative group">
                                <span className="material-symbols-outlined text-slate-300 text-4xl group-hover:hidden">image</span>
                                <img alt="Pump Thumbnail" className="absolute inset-0 w-full h-full object-cover hidden group-hover:block" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN1wrMWsQDQOWYphiXGoXcj5aCYeN5WhWGvhBa0vsk7plDxB2Wq78lxolfJSRu3s30QvUXE65xI2p7AFjjmFCTcgT_y5EM1kKkN7N3hT_fzIzUA1PdVF2jJ5IOkxyzbBl3P7oLhus1ss_8xwVReZoqn2XN5EUyR192XwUZ-u_koYivIw6uYYpaRogDbC3NtOAw88OpE09PxqQgLR_GQS5PUHdnKUNICBskmunJ1yWszvRSTCbmoqUJH2q7g_z7_Co5_lrZ4kVWQmU" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <span className="material-symbols-outlined text-white">zoom_in</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Centrifugal Pump P-102</h2>
                                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700 border border-red-200">Critical Asset</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Located in Sector B &gt; Sys-02: Fluid Transfer</p>
                                <div className="flex gap-6 text-sm">
                                    <div>
                                        <span className="block text-xs text-slate-400 font-medium uppercase">Manufacturer</span>
                                        <span className="font-medium text-slate-900 dark:text-white">Grundfos</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-400 font-medium uppercase">Model</span>
                                        <span className="font-medium text-slate-900 dark:text-white">NB 32-125/142</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-400 font-medium uppercase">Serial Number</span>
                                        <span className="font-medium text-slate-900 dark:text-white">SN-88293-XJ</span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-400 font-medium uppercase">Installation</span>
                                        <span className="font-medium text-slate-900 dark:text-white">12 Oct 2021</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/5 border border-primary/20 rounded-lg transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                Edit Metadata
                            </button>
                            <button className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">qr_code</span>
                                Print Tag
                            </button>
                        </div>
                    </div>
                    <div className="border-b border-slate-200 dark:border-slate-800 px-6">
                        <nav className="flex gap-6">
                            <button className="py-4 text-sm font-medium text-primary border-b-2 border-primary">
                                History & Logs
                            </button>
                            <button className="py-4 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border-b-2 border-transparent hover:border-slate-300 transition-colors flex items-center gap-2">
                                Associated Defects (MAXER)
                                <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] px-1.5 py-0.5 rounded-full">5</span>
                            </button>
                            <button className="py-4 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border-b-2 border-transparent hover:border-slate-300 transition-colors">
                                Technical Docs
                            </button>
                            <button className="py-4 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 border-b-2 border-transparent hover:border-slate-300 transition-colors">
                                Parts List (BOM)
                            </button>
                        </nav>
                    </div>
                    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#151e29] p-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Diagnostic History</h3>
                                <div className="flex gap-2">
                                    <select className="text-sm border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 py-1.5 px-3 focus:ring-primary focus:border-primary">
                                        <option>All Types</option>
                                        <option>Corrective</option>
                                        <option>Preventive</option>
                                    </select>
                                    <button className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:text-primary">
                                        <span className="material-symbols-outlined text-[20px]">filter_list</span>
                                    </button>
                                </div>
                            </div>
                            <div className="relative pl-6 pb-6 border-l border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-[#151e29]"></div>
                                <div className="bg-white dark:bg-[#1a2632] p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded mb-1 inline-block">CRITICAL ALERT</span>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Overheating Detected</h4>
                                        </div>
                                        <span className="text-xs text-slate-500">Today, 09:42 AM</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                                        Temperature sensor T-102-A recorded 85°C, exceeding threshold of 75°C for &gt; 5 mins.
                                        AI analysis suggests bearing friction.
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-700/50 pt-3">
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px]">person</span>
                                            System Monitor (Auto)
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px]">assignment</span>
                                            WO-2023-8892 Created
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative pl-6 pb-6 border-l border-slate-200 dark:border-slate-700">
                                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#151e29]"></div>
                                <div className="bg-white dark:bg-[#1a2632] p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded mb-1 inline-block">PREVENTIVE MAINTENANCE</span>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Monthly Lubrication</h4>
                                        </div>
                                        <span className="text-xs text-slate-500">Oct 15, 2023</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                        Routine greasing of bearings completed. Vibration analysis normal post-maintenance.
                                    </p>
                                    <div className="flex items-center gap-3 text-xs text-slate-500 border-t border-slate-100 dark:border-slate-700/50 pt-3 mt-3">
                                        <div className="flex items-center gap-1">
                                            <div className="w-4 h-4 rounded-full bg-slate-200 text-[10px] flex items-center justify-center font-bold">SJ</div>
                                            Sarah Jenkins
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-600">
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                            Resolved
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative pl-6 pb-6 border-l border-slate-200 dark:border-slate-700">
                                <div className="absolute -left-1.5 top-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-[#151e29]"></div>
                                <div className="bg-white dark:bg-[#1a2632] p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm opacity-75">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded mb-1 inline-block">UPDATE</span>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Firmware Update</h4>
                                        </div>
                                        <span className="text-xs text-slate-500">Sep 02, 2023</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                        Controller firmware updated to v2.4.1. Remote reboot successful.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
