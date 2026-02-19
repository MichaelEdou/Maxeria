'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Recommendation {
    id: number;
    text: string;
    priority: 'High' | 'Medium' | 'Low';
}

export default function SolutionPage() {
    const [resolved, setResolved] = useState(true);
    const [followUp, setFollowUp] = useState(false);
    const [aiRating, setAiRating] = useState<'up' | 'down' | null>(null);
    const [recommendations, setRecommendations] = useState<Recommendation[]>([
        { id: 1, text: 'Schedule monthly laser alignment checks for Pump A2', priority: 'High' },
    ]);

    const addRecommendation = () => {
        setRecommendations(prev => [...prev, { id: Date.now(), text: '', priority: 'Medium' }]);
    };

    const removeRecommendation = (id: number) => {
        setRecommendations(prev => prev.filter(r => r.id !== id));
    };

    const updateRec = (id: number, field: keyof Recommendation, value: string) => {
        setRecommendations(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                            <Link href="/dashboard/work-orders" className="hover:text-primary transition-colors">Work Orders</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <Link href="/dashboard/work-orders/new" className="hover:text-primary transition-colors">#OT-4921</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-slate-800 dark:text-slate-200 font-medium">Solution</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Step 4: Solution &amp; Remedial Actions</h1>
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded uppercase tracking-wide">Finalizing</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                            <span className="material-symbols-outlined text-[20px]">print</span>
                            Print Preview
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm shadow-green-600/20">
                            <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
                            Generate Report &amp; Sync to GMAO
                        </button>
                    </div>
                </div>

                {/* Stepper — all complete except step 4 active */}
                <div className="mt-6">
                    <div className="flex items-center w-full">
                        {[
                            { label: 'Situation Analysis' },
                            { label: 'Symptom Check' },
                            { label: 'Root Cause' },
                        ].map((s, i) => (
                            <>
                                <div key={s.label} className="flex items-center text-green-500 relative">
                                    <div className="rounded-full h-8 w-8 border-2 border-green-500 bg-green-500 flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-sm">check</span>
                                    </div>
                                    <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-green-600">{s.label}</div>
                                </div>
                                <div className="flex-auto border-t-2 border-green-500"></div>
                            </>
                        ))}
                        <div className="flex items-center text-primary relative">
                            <div className="rounded-full h-8 w-8 border-2 border-primary bg-primary flex items-center justify-center text-white font-bold text-sm">4</div>
                            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-primary">Solution</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <div className="max-w-4xl mx-auto space-y-8 pb-12">

                        {/* Validated Root Cause */}
                        <section className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-4">Validated Root Cause</h3>
                            <div className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 shrink-0">
                                    <span className="material-symbols-outlined">warning</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">Inner Race Spalling due to Misalignment</h4>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                        The primary cause was identified as shaft misalignment (angular), which led to excessive loading on the inner race, eventually causing spalling and high-frequency vibrations.
                                    </p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 rounded">Confidence: High</span>
                                        <span className="text-xs text-slate-400">Validated by AI &amp; Technician</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Final Action */}
                        <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined">handyman</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Final Action (Corrective)</h3>
                                    <p className="text-sm text-slate-500">Define the immediate actions taken to resolve the failure.</p>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Action Type</label>
                                        <select className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary text-sm py-2.5 px-3">
                                            <option>Component Replacement</option>
                                            <option>Adjustment / Calibration</option>
                                            <option>Software Update</option>
                                            <option>Lubrication Top-up</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Parts Used</label>
                                        <input
                                            className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary text-sm py-2.5 px-3"
                                            placeholder="e.g. Bearing Kit #SKF-6205"
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description of Work</label>
                                    <textarea
                                        className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary text-sm p-3"
                                        rows={3}
                                        defaultValue="Replaced the rear bearing housing. Performed laser alignment check and corrected angular misalignment to within 0.05mm tolerance."
                                    />
                                </div>
                                <div className="flex items-center gap-6 flex-wrap">
                                    <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                                        <input
                                            checked={resolved}
                                            onChange={e => setResolved(e.target.checked)}
                                            className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                                            type="checkbox"
                                        />
                                        <span>Issue resolved immediately</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                                        <input
                                            checked={followUp}
                                            onChange={e => setFollowUp(e.target.checked)}
                                            className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                                            type="checkbox"
                                        />
                                        <span>Requires follow-up check (24h)</span>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Preventive Measures */}
                        <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                                    <span className="material-symbols-outlined">shield</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Preventive Measures</h3>
                                    <p className="text-sm text-slate-500">Actions to prevent recurrence of this failure.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                {recommendations.map((rec, idx) => (
                                    <div key={rec.id} className="flex gap-4 items-start">
                                        <div className="flex-1 space-y-1">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Recommendation {idx + 1}</label>
                                            <input
                                                className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary text-sm py-2.5 px-3"
                                                value={rec.text}
                                                onChange={e => updateRec(rec.id, 'text', e.target.value)}
                                                placeholder="Enter recommendation..."
                                            />
                                        </div>
                                        <div className="w-40 space-y-1">
                                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Priority</label>
                                            <select
                                                className="block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary text-sm py-2.5 px-3"
                                                value={rec.priority}
                                                onChange={e => updateRec(rec.id, 'priority', e.target.value)}
                                            >
                                                <option>High</option>
                                                <option>Medium</option>
                                                <option>Low</option>
                                            </select>
                                        </div>
                                        <button
                                            onClick={() => removeRecommendation(rec.id)}
                                            className="mt-7 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </div>
                                ))}
                                <button
                                    onClick={addRecommendation}
                                    className="flex items-center gap-2 text-sm text-primary font-medium hover:text-primary/80 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                    Add Recommendation
                                </button>
                            </div>
                        </section>

                        {/* AI Rating */}
                        <section className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800/30 p-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white dark:bg-indigo-900 rounded-full shadow-sm text-indigo-600 dark:text-indigo-400">
                                        <span className="material-symbols-outlined">psychology_alt</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">Rate AI Accuracy</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Was the AI&apos;s root cause suggestion helpful?</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setAiRating(aiRating === 'up' ? null : 'up')}
                                        className={`p-2 rounded-lg transition-colors ${aiRating === 'up' ? 'bg-green-100 text-green-600' : 'hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-green-500'}`}
                                    >
                                        <span className="material-symbols-outlined text-3xl">thumb_up</span>
                                    </button>
                                    <button
                                        onClick={() => setAiRating(aiRating === 'down' ? null : 'down')}
                                        className={`p-2 rounded-lg transition-colors ${aiRating === 'down' ? 'bg-red-100 text-red-600' : 'hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-red-500'}`}
                                    >
                                        <span className="material-symbols-outlined text-3xl">thumb_down</span>
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Back navigation */}
                        <div className="flex justify-between items-center pt-2">
                            <Link href="/dashboard/work-orders/new/diagnostic/root-cause" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-medium flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                Back to Root Cause
                            </Link>
                            <button className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm shadow-green-600/20">
                                <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
                                Generate Report &amp; Sync to GMAO
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar: Diagnostic Summary */}
                <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col shrink-0">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                        <h3 className="font-bold text-sm uppercase tracking-wide text-slate-800 dark:text-slate-200">Diagnostic Summary</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">

                        {/* Step 1 */}
                        <div className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                            <div className="absolute -left-[5px] top-0 size-2.5 rounded-full bg-slate-400"></div>
                            <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Step 1: Context</h4>
                            <p className="text-sm text-slate-800 dark:text-slate-300 font-medium">Bearing Housing - Rear</p>
                            <p className="text-xs text-slate-500 mt-0.5">Vibration - High Frequency</p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                            <div className="absolute -left-[5px] top-0 size-2.5 rounded-full bg-slate-400"></div>
                            <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1">Step 2: Symptoms</h4>
                            <div className="space-y-2">
                                {[
                                    { label: 'Load', value: '85%', color: '' },
                                    { label: 'Temp', value: '62.5°C', color: '' },
                                    { label: 'Vibration', value: '> 8mm/s', color: 'text-red-500' },
                                ].map(({ label, value, color }) => (
                                    <div key={label} className="flex items-center justify-between text-xs">
                                        <span className="text-slate-600 dark:text-slate-400">{label}</span>
                                        <span className={`font-medium ${color || 'text-slate-900 dark:text-white'}`}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative pl-4 border-l-2 border-green-500">
                            <div className="absolute -left-[5px] top-0 size-2.5 rounded-full bg-green-500"></div>
                            <h4 className="text-xs font-semibold text-green-600 uppercase mb-1">Step 3: Root Cause</h4>
                            <p className="text-sm text-slate-800 dark:text-slate-300 font-medium">Misalignment (Angular)</p>
                            <div className="mt-2 text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-2 rounded">
                                Confirmed by Spectrum Analysis
                            </div>
                        </div>

                        {/* Cost summary */}
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500 font-medium">Est. Downtime</span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">4h 30m</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500 font-medium">Parts Cost</span>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">$450.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">history</span>
                            View Edit Log
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
