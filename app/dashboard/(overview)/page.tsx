'use client';

import Link from 'next/link';

export default function DashboardPage() {
    return (
        <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background-light dark:bg-background-dark">
            {/* Header */}
            <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-[#1a2632] border-b border-slate-200 dark:border-slate-800 flex-shrink-0 z-10">
                <div className="flex items-center gap-4">
                    <button className="lg:hidden p-1 text-slate-500 hover:text-slate-700">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        Global Maintenance Overview
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium border border-green-200 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> Online
                        </span>
                    </h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative hidden md:block w-64">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
                        <input className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 text-slate-900 dark:text-white placeholder:text-slate-500" placeholder="Search assets, alerts..." type="text" />
                    </div>
                    <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-4 ml-2">
                        <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative" title="Sync Status">
                            <span className="material-symbols-outlined">cloud_done</span>
                        </button>
                        <button className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative" title="Notifications">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#1a2632]"></span>
                        </button>
                    </div>
                    <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                        New Diagnostic
                    </button>
                </div>
            </header>
            {/* Dashboard Content Scrollable Area */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
                <div className="max-w-[1600px] mx-auto flex flex-col gap-6">
                    {/* KPIs Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* KPI 1 */}
                        <div className="bg-white dark:bg-[#1a2632] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-32">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Fleet MTTR</p>
                                    <div className="mt-1 flex items-baseline gap-2">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">4.2h</h3>
                                        <span className="text-emerald-600 text-xs font-medium bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                                            <span className="material-symbols-outlined text-[14px]">trending_down</span> 12%
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-blue-50 dark:bg-slate-800 p-2 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">timer</span>
                                </div>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-auto overflow-hidden">
                                <div className="bg-primary h-full rounded-full" style={{ width: '78%' }}></div>
                            </div>
                        </div>
                        {/* KPI 2 */}
                        <div className="bg-white dark:bg-[#1a2632] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-32">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Active Diagnostics</p>
                                    <div className="mt-1 flex items-baseline gap-2">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">12</h3>
                                        <span className="text-amber-600 text-xs font-medium bg-amber-50 px-1.5 py-0.5 rounded">
                                            +2 needing review
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-blue-50 dark:bg-slate-800 p-2 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">analytics</span>
                                </div>
                            </div>
                            <div className="flex -space-x-2 mt-auto">
                                <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white dark:border-[#1a2632] flex items-center justify-center text-[10px] font-bold text-slate-600">JM</div>
                                <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white dark:border-[#1a2632] flex items-center justify-center text-[10px] font-bold text-slate-600">AL</div>
                                <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white dark:border-[#1a2632] flex items-center justify-center text-[10px] text-slate-500">+3</div>
                            </div>
                        </div>
                        {/* KPI 3 */}
                        <div className="bg-white dark:bg-[#1a2632] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-32">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Facility Health Score</p>
                                    <div className="mt-1 flex items-baseline gap-2">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">88%</h3>
                                        <span className="text-emerald-600 text-xs font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                                            +5% vs last week
                                        </span>
                                    </div>
                                </div>
                                <div className="relative w-10 h-10 flex items-center justify-center">
                                    <svg className="transform -rotate-90 w-10 h-10">
                                        <circle className="text-slate-100 dark:text-slate-700" cx="20" cy="20" fill="transparent" r="16" stroke="currentColor" strokeWidth="4"></circle>
                                        <circle className="text-primary" cx="20" cy="20" fill="transparent" r="16" stroke="currentColor" strokeDasharray="100" strokeDashoffset="12" strokeWidth="4"></circle>
                                    </svg>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 mt-auto">Target: 90% by Q4</p>
                        </div>
                        {/* KPI 4 */}
                        <div className="bg-white dark:bg-[#1a2632] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between h-32">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">OEE</p>
                                    <div className="mt-1 flex items-baseline gap-2">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">94.5%</h3>
                                        <span className="text-emerald-600 text-xs font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                                            Optimal
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-blue-50 dark:bg-slate-800 p-2 rounded-lg text-primary">
                                    <span className="material-symbols-outlined">speed</span>
                                </div>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-auto overflow-hidden">
                                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '94%' }}></div>
                            </div>
                        </div>
                    </div>
                    {/* Main Grid Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-[500px]">
                        {/* Map Section */}
                        <div className="lg:col-span-2 bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-[#1a2632]">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Facility Map: Sector 7</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Real-time status of critical assets</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1.5 text-xs font-medium bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded text-slate-700 dark:text-slate-200 transition-colors">2D View</button>
                                    <button className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Hierarchy</button>
                                </div>
                            </div>
                            <div className="relative flex-1 bg-slate-50 dark:bg-slate-900 overflow-hidden group">
                                {/* Background Map Placeholder */}
                                <div className="absolute inset-0 bg-cover bg-center opacity-80" data-alt="Industrial floor plan schematic with machinery outlines" data-location="Sector 7 Floor Plan" style={{ backgroundImage: "url('https://placeholder.pics/svg/300')" }}>
                                </div>
                                {/* Overlay Gradient for better contrast */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent dark:from-[#1a2632]/90 dark:via-[#1a2632]/40 dark:to-transparent"></div>
                                {/* Interactive Nodes (Mockup) */}
                                {/* Node 1: Critical */}
                                <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/node">
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-red-500/20 rounded-full animate-ping"></div>
                                        <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg relative z-10"></div>
                                    </div>
                                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 shadow-lg rounded px-3 py-1.5 text-xs font-semibold whitespace-nowrap border border-red-100 dark:border-red-900/30 text-red-600 hidden group-hover/node:block z-20">
                                        Pump P-102 (Overheat)
                                    </div>
                                </div>
                                {/* Node 2: Warning */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/node">
                                    <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg"></div>
                                    <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 shadow-lg rounded px-3 py-1.5 text-xs font-semibold whitespace-nowrap border border-amber-100 dark:border-amber-900/30 text-amber-600 hidden group-hover/node:block z-20">
                                        Conv-B Tension
                                    </div>
                                </div>
                                {/* Node 3: Healthy */}
                                <div className="absolute bottom-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/node">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm opacity-80"></div>
                                </div>
                                <div className="absolute top-1/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/node">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm opacity-80"></div>
                                </div>
                                {/* Map Controls */}
                                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                                    <button className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50">
                                        <span className="material-symbols-outlined text-[20px]">add</span>
                                    </button>
                                    <button className="bg-white dark:bg-slate-800 p-2 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50">
                                        <span className="material-symbols-outlined text-[20px]">remove</span>
                                    </button>
                                </div>
                                {/* Legend */}
                                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                    <div className="flex flex-col gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Normal
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Warning
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Critical
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Urgent Alerts Panel */}
                        <div className="lg:col-span-1 flex flex-col gap-4">
                            {/* Header for Alerts */}
                            <div className="flex justify-between items-center px-1">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Urgent Alerts</h3>
                                <button className="text-xs font-medium text-primary hover:text-primary/80">View All</button>
                            </div>
                            {/* Alert Card 1 (Critical with AI) */}
                            <div className="bg-white dark:bg-[#1a2632] rounded-xl border-l-4 border-l-red-500 border-y border-r border-slate-200 dark:border-slate-800 shadow-sm p-4 relative overflow-hidden group hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-red-500">warning</span>
                                        <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded uppercase tracking-wide">Critical</span>
                                    </div>
                                    <span className="text-xs text-slate-400">2m ago</span>
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Pump P-102 Overheating</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Temperature exceeded threshold (85°C). Immediate inspection required.</p>
                                {/* AI Insight Box */}
                                <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-3 mb-3 border border-primary/10">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="material-symbols-outlined text-primary text-[16px]">psychology</span>
                                        <span className="text-xs font-bold text-primary">AI Insight</span>
                                    </div>
                                    <p className="text-xs text-slate-600 dark:text-slate-300">
                                        Pattern matches bearing failure signature (94% confidence). Suggest inspecting Bearing B-2 first.
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 px-3 py-2 rounded text-sm font-medium transition-colors">
                                        Investigate
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                                    </button>
                                </div>
                            </div>
                            {/* Alert Card 2 (Warning) */}
                            <div className="bg-white dark:bg-[#1a2632] rounded-xl border-l-4 border-l-amber-500 border-y border-r border-slate-200 dark:border-slate-800 shadow-sm p-4 hover:shadow-md transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-amber-500">error</span>
                                        <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded uppercase tracking-wide">Warning</span>
                                    </div>
                                    <span className="text-xs text-slate-400">14m ago</span>
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Conveyor Belt Tension Low</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Tension sensor reading below nominal range on Line 3.</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 px-3 py-2 rounded text-sm font-medium transition-colors">
                                        Assign Technician
                                    </button>
                                </div>
                            </div>
                            {/* Alert Card 3 (Notice) */}
                            <div className="bg-white dark:bg-[#1a2632] rounded-xl border-l-4 border-l-blue-400 border-y border-r border-slate-200 dark:border-slate-800 shadow-sm p-4 hover:shadow-md transition-all opacity-70 hover:opacity-100">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-blue-400">info</span>
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded uppercase tracking-wide">Maintenance</span>
                                    </div>
                                    <span className="text-xs text-slate-400">1h ago</span>
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Scheduled Downtime: Mixer M-4</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Routine maintenance starting in 30 mins.</p>
                            </div>
                        </div>
                    </div>
                    {/* Recent Activity Table (Bottom Section) */}
                    <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
                        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Diagnostic Runs</h3>
                            <button className="text-sm text-primary font-medium hover:underline">View All History</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-medium">
                                    <tr>
                                        <th className="px-6 py-3">Asset ID</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Last Run</th>
                                        <th className="px-6 py-3">Assigned To</th>
                                        <th className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Turbine T-500</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Healthy
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">Today, 09:42 AM</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-200 text-xs flex items-center justify-center font-medium text-slate-600">SJ</div>
                                                <span className="text-slate-600 dark:text-slate-300">Sarah Jenkins</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary hover:text-primary/80 font-medium text-sm">Report</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Compressor C-12</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Review
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">Today, 08:15 AM</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-primary/20 text-xs flex items-center justify-center font-medium text-primary">AI</div>
                                                <span className="text-slate-600 dark:text-slate-300">Auto-Run (AI)</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary hover:text-primary/80 font-medium text-sm">Review</button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Generator G-01</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Offline
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">Yesterday, 16:30 PM</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-200 text-xs flex items-center justify-center font-medium text-slate-600">MK</div>
                                                <span className="text-slate-600 dark:text-slate-300">Mike K.</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-primary hover:text-primary/80 font-medium text-sm">Details</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
