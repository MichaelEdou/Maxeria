'use client';

import Link from 'next/link';

export default function MaxerDiagnosticPage() {
    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Sub-header specific to this diagnostic session */}
            <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                            <Link href="/dashboard/work-orders" className="hover:text-primary transition-colors">Work Orders</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <Link href="/dashboard/work-orders/new" className="hover:text-primary transition-colors">#WO-4921</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-slate-800 dark:text-slate-200 font-medium">Situation Analysis</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Step 1: Diagnostic Contextualization</h1>
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded uppercase tracking-wide">In Progress</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                            <span className="material-symbols-outlined text-[20px]">save</span>
                            Save Draft
                        </button>
                        <Link href="/dashboard/work-orders/new/diagnostic/validation" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                            Next Step
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                    </div>
                </div>

                {/* Stepper */}
                <div className="mt-6">
                    <div className="flex items-center w-full">
                        <div className="flex items-center text-primary relative">
                            <div className="rounded-full h-8 w-8 border-2 border-primary bg-primary flex items-center justify-center text-white font-bold text-sm">1</div>
                            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-primary">Situation Analysis</div>
                        </div>
                        <div className="flex-auto border-t-2 border-slate-200 dark:border-slate-700"></div>
                        <div className="flex items-center text-slate-400 relative">
                            <div className="rounded-full h-8 w-8 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-sm">2</div>
                            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-slate-400">Symptom Check</div>
                        </div>
                        <div className="flex-auto border-t-2 border-slate-200 dark:border-slate-700"></div>
                        <div className="flex items-center text-slate-400 relative">
                            <div className="rounded-full h-8 w-8 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-sm">3</div>
                            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-slate-400">Root Cause</div>
                        </div>
                        <div className="flex-auto border-t-2 border-slate-200 dark:border-slate-700"></div>
                        <div className="flex items-center text-slate-400 relative">
                            <div className="rounded-full h-8 w-8 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-sm">4</div>
                            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-slate-400">Solution</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main body: form + AI sidebar */}
            <div className="flex flex-1 overflow-hidden">
                {/* Form area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <div className="max-w-3xl mx-auto space-y-8 pb-12">

                        {/* Section 1: Object & Defect */}
                        <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined">target</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Object &amp; Defect Definition</h3>
                                    <p className="text-sm text-slate-500">Confirm the specific component and the nature of the defect.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Object (Component)</label>
                                    <div className="relative">
                                        <input
                                            className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary text-sm pl-10 py-2.5"
                                            type="text"
                                            defaultValue="Bearing Housing - Rear"
                                        />
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[18px]">settings_accessibility</span>
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 material-symbols-outlined text-[18px]">check_circle</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Defect Type</label>
                                    <div className="relative">
                                        <select className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary text-sm pl-10 py-2.5">
                                            <option>Vibration - High Frequency</option>
                                            <option>Vibration - Low Frequency</option>
                                            <option>Overheating</option>
                                            <option>Noise - Grinding</option>
                                            <option>Leakage</option>
                                        </select>
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-[18px]">waves</span>
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Initial Observation / Description</label>
                                    <textarea
                                        className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary text-sm p-3"
                                        rows={3}
                                        defaultValue="Operator reported excessive noise and vibration during the morning shift startup sequence. Sensor VIB-204 showing spikes > 8mm/s."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Operating Context */}
                        <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                                    <span className="material-symbols-outlined">thermostat</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Operating Context</h3>
                                    <p className="text-sm text-slate-500">Record conditions at the time of failure detection.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <div className="flex justify-between items-start mb-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Load</label>
                                        <span className="material-symbols-outlined text-slate-400 text-[18px]">weight</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-primary focus:ring-0 p-0 text-lg font-bold text-slate-900 dark:text-white" type="number" defaultValue="85" />
                                        <span className="text-sm text-slate-500">%</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <div className="flex justify-between items-start mb-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Temperature</label>
                                        <span className="material-symbols-outlined text-slate-400 text-[18px]">device_thermostat</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-primary focus:ring-0 p-0 text-lg font-bold text-slate-900 dark:text-white" type="number" defaultValue="62.5" />
                                        <span className="text-sm text-slate-500">°C</span>
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <div className="flex justify-between items-start mb-2">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Speed</label>
                                        <span className="material-symbols-outlined text-slate-400 text-[18px]">speed</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input className="w-full bg-transparent border-0 border-b border-slate-300 focus:border-primary focus:ring-0 p-0 text-lg font-bold text-slate-900 dark:text-white" type="number" defaultValue="1450" />
                                        <span className="text-sm text-slate-500">RPM</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Attached Media</label>
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    <div className="shrink-0 size-20 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary cursor-pointer text-slate-400 hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">add_photo_alternate</span>
                                    </div>
                                    <div className="shrink-0 relative group">
                                        <div className="size-20 bg-slate-200 rounded-lg overflow-hidden">
                                            <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-500 text-xs">IMG_001.jpg</div>
                                        </div>
                                        <button className="absolute -top-1 -right-1 size-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="material-symbols-outlined text-[14px]">close</span>
                                        </button>
                                    </div>
                                    <div className="shrink-0 relative group">
                                        <div className="size-20 bg-slate-200 rounded-lg overflow-hidden">
                                            <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-500 text-xs">VIB_log.pdf</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* AI Insights Sidebar */}
                <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                            <span className="material-symbols-outlined">auto_awesome</span>
                            <h3 className="font-bold text-sm uppercase tracking-wide">AI Insights</h3>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                            <span className="material-symbols-outlined text-[20px]">refresh</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-lg">
                            <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed mb-2">
                                Based on &quot;Vibration&quot; and &quot;Bearing Housing&quot;, I found 3 similar past cases (REX) for this asset type.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Similar Cases (REX)</h4>

                            {/* Case 1 */}
                            <div className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 rounded-lg p-3 transition-colors cursor-pointer shadow-sm hover:shadow-md">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-mono text-slate-500">#WO-3204</span>
                                    <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">Solved</span>
                                </div>
                                <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1 group-hover:text-indigo-600 transition-colors">Inner Race Defect</h5>
                                <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                                    Vibration spikes at 2x BPFI frequency. Confirmed by envelope analysis.
                                </p>
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                                    <span className="text-[10px] text-slate-400">Match: 94%</span>
                                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                                        View
                                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                    </span>
                                </div>
                            </div>

                            {/* Case 2 */}
                            <div className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 rounded-lg p-3 transition-colors cursor-pointer shadow-sm hover:shadow-md">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-mono text-slate-500">#WO-2881</span>
                                    <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">Solved</span>
                                </div>
                                <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1 group-hover:text-indigo-600 transition-colors">Lubrication Issue</h5>
                                <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                                    High frequency noise due to insufficient grease. Temp +15°C above baseline.
                                </p>
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                                    <span className="text-[10px] text-slate-400">Match: 78%</span>
                                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                                        View
                                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                    </span>
                                </div>
                            </div>

                            {/* Case 3 */}
                            <div className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 rounded-lg p-3 transition-colors cursor-pointer shadow-sm hover:shadow-md">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-xs font-mono text-slate-500">#WO-1045</span>
                                    <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded">Solved</span>
                                </div>
                                <h5 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1 group-hover:text-indigo-600 transition-colors">Loose Mounting Bolt</h5>
                                <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                                    Structural looseness causing vibration at 1x RPM.
                                </p>
                                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/50">
                                    <span className="text-[10px] text-slate-400">Match: 65%</span>
                                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                                        View
                                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">library_books</span>
                            Search Knowledge Base
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
