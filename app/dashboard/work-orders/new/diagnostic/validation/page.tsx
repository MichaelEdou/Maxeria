'use client';

import Link from 'next/link';
import { useState } from 'react';

type Answer = 'confirmed' | 'refuted' | 'na' | null;

export default function SymptomVerificationPage() {
    const [answers, setAnswers] = useState<Record<number, Answer>>({
        1: 'confirmed',
        2: 'refuted',
        3: null,
    });

    const setAnswer = (step: number, val: Answer) => {
        setAnswers(prev => ({ ...prev, [step]: val }));
    };

    const verifiedCount = Object.values(answers).filter(v => v !== null).length;

    const btnClass = (step: number, val: Answer) => {
        const active = answers[step] === val;
        const base = 'px-4 py-1.5 rounded-md text-sm font-medium transition-all';
        if (active) return `${base} bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm`;
        return `${base} text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200`;
    };

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Sub-header */}
            <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                            <Link href="/dashboard/work-orders" className="hover:text-primary transition-colors">Work Orders</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <Link href="/dashboard/work-orders/new" className="hover:text-primary transition-colors">#OT-4921</Link>
                            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            <span className="text-slate-800 dark:text-slate-200 font-medium">Symptom Verification</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Step 2: Symptom Verification Check</h1>
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-semibold rounded uppercase tracking-wide">Verification</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                            <span className="material-symbols-outlined text-[20px]">save</span>
                            Save Draft
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                            Next Step
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                    </div>
                </div>

                {/* Stepper */}
                <div className="mt-6">
                    <div className="flex items-center w-full">
                        {/* Step 1 - Done */}
                        <div className="flex items-center text-green-500 relative">
                            <div className="rounded-full h-8 w-8 border-2 border-green-500 bg-green-500 flex items-center justify-center text-white font-bold">
                                <span className="material-symbols-outlined text-lg">check</span>
                            </div>
                            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-green-600">Situation Analysis</div>
                        </div>
                        <div className="flex-auto border-t-2 border-green-500"></div>
                        {/* Step 2 - Active */}
                        <div className="flex items-center text-primary relative">
                            <div className="rounded-full h-8 w-8 border-2 border-primary bg-primary flex items-center justify-center text-white font-bold text-sm">2</div>
                            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-primary">Symptom Check</div>
                        </div>
                        <div className="flex-auto border-t-2 border-slate-200 dark:border-slate-700"></div>
                        {/* Step 3 */}
                        <div className="flex items-center text-slate-400 relative">
                            <div className="rounded-full h-8 w-8 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-sm">3</div>
                            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-slate-400">Root Cause</div>
                        </div>
                        <div className="flex-auto border-t-2 border-slate-200 dark:border-slate-700"></div>
                        {/* Step 4 */}
                        <div className="flex items-center text-slate-400 relative">
                            <div className="rounded-full h-8 w-8 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-sm">4</div>
                            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-slate-400">Solution</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50 dark:bg-black/20">
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Left: AI Sidebar */}
                    <div className="w-full lg:w-96 shrink-0 space-y-4">
                        <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-lg p-4 flex items-start gap-3">
                            <span className="material-symbols-outlined text-indigo-500 mt-0.5">auto_awesome</span>
                            <div>
                                <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-200">AI Suggested Verification Plan</h3>
                                <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
                                    Based on the reported &quot;Vibration - High Frequency&quot; on the &quot;Bearing Housing&quot;, I recommend performing these 3 verification tests.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                <span className="material-symbols-outlined">psychology_alt</span>
                                <h3 className="font-bold text-sm uppercase tracking-wide">AI Recommendation</h3>
                            </div>
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">refresh</span>
                            </button>
                        </div>

                        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-lg">
                            <h4 className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider mb-2">Most Efficient Path</h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                Start with <strong className="text-indigo-700 dark:text-indigo-400">Acoustic Measurement</strong>. In 85% of similar cases (#OT-3204, #OT-2881), this test provided the definitive confirmation for &quot;High Frequency Vibration&quot;.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">Current Case Summary</h4>
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-slate-400 text-[16px]">settings_accessibility</span>
                                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Object</span>
                                </div>
                                <div className="text-sm text-slate-900 dark:text-white pl-6">Bearing Housing - Rear</div>
                            </div>
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-slate-400 text-[16px]">waves</span>
                                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Defect</span>
                                </div>
                                <div className="text-sm text-slate-900 dark:text-white pl-6">Vibration - High Frequency</div>
                            </div>
                            <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="material-symbols-outlined text-slate-400 text-[16px]">device_thermostat</span>
                                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Context</span>
                                </div>
                                <div className="pl-6 grid grid-cols-2 gap-2">
                                    <div><span className="block text-[10px] text-slate-500">Load</span><span className="text-xs font-medium text-slate-800 dark:text-slate-200">85%</span></div>
                                    <div><span className="block text-[10px] text-slate-500">Temp</span><span className="text-xs font-medium text-slate-800 dark:text-slate-200">62.5°C</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Confidence Ring */}
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Diagnostic Confidence</h4>
                            <div className="flex items-center gap-3">
                                <div className="relative size-12 shrink-0">
                                    <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                        <path className="text-slate-200 dark:text-slate-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                                        <path className="text-amber-500" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="45, 100" strokeWidth="3" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">45%</div>
                                </div>
                                <p className="text-xs text-slate-500">Confidence is low. Verifying symptoms will increase diagnostic accuracy significantly.</p>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">library_books</span>
                            Reference Guide
                        </button>
                    </div>

                    {/* Right: Verification Cards */}
                    <div className="flex-1 space-y-6">
                        {/* Card 1 - Acoustic Measurement */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                            <div className="p-6">
                                <div className="flex flex-col xl:flex-row gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="flex items-center justify-center size-8 rounded-full bg-slate-100 dark:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300 text-sm">1</span>
                                            <h4 className="text-base font-semibold text-slate-900 dark:text-white">Acoustic Measurement</h4>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 pl-11">
                                            Measure noise levels near the bearing housing using a specialized acoustic sensor. Look for peaks in the 2kHz - 5kHz range.
                                        </p>
                                        <div className="mt-4 pl-11">
                                            <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-900 p-1">
                                                <button onClick={() => setAnswer(1, 'confirmed')} className={btnClass(1, 'confirmed')}>Confirmed</button>
                                                <button onClick={() => setAnswer(1, 'refuted')} className={btnClass(1, 'refuted')}>Refuted</button>
                                                <button onClick={() => setAnswer(1, 'na')} className={btnClass(1, 'na')}>N/A</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full xl:w-72 shrink-0 border-l border-slate-100 dark:border-slate-700 pl-0 xl:pl-6 pt-4 xl:pt-0">
                                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-3">Evidence</span>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 group cursor-pointer hover:border-primary/50 transition-colors">
                                                <div className="size-10 bg-white dark:bg-slate-800 rounded flex items-center justify-center text-red-500">
                                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="text-xs font-medium text-slate-900 dark:text-white truncate">Acoustic_Report_v2.pdf</div>
                                                    <div className="text-[10px] text-slate-500">1.2 MB • Uploaded just now</div>
                                                </div>
                                                <button className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                            <button className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-xs font-medium text-slate-500 hover:text-primary hover:border-primary transition-colors">
                                                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                                Attach File / Photo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {answers[1] === 'confirmed' && (
                                <div className="bg-green-50 dark:bg-green-900/10 border-t border-green-100 dark:border-green-900/30 px-6 py-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
                                    <span className="text-xs font-medium text-green-700 dark:text-green-400">Symptom Verified: Noise levels exceeded threshold (&gt;85dB).</span>
                                </div>
                            )}
                            {answers[1] === 'refuted' && (
                                <div className="bg-red-50 dark:bg-red-900/10 border-t border-red-100 dark:border-red-900/30 px-6 py-2 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-red-500 text-[18px]">cancel</span>
                                    <span className="text-xs font-medium text-red-700 dark:text-red-400">Symptom Refuted.</span>
                                </div>
                            )}
                        </div>

                        {/* Card 2 - Visual Inspection */}
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                            <div className="flex flex-col xl:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="flex items-center justify-center size-8 rounded-full bg-slate-100 dark:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300 text-sm">2</span>
                                        <h4 className="text-base font-semibold text-slate-900 dark:text-white">Visual Inspection of Mounting</h4>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 pl-11">
                                        Check for loose bolts or structural cracks around the bearing housing base.
                                    </p>
                                    <div className="mt-4 pl-11">
                                        <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-900 p-1">
                                            <button onClick={() => setAnswer(2, 'confirmed')} className={btnClass(2, 'confirmed')}>Confirmed</button>
                                            <button onClick={() => setAnswer(2, 'refuted')} className={btnClass(2, 'refuted')}>Refuted</button>
                                            <button onClick={() => setAnswer(2, 'na')} className={btnClass(2, 'na')}>N/A</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full xl:w-72 shrink-0 border-l border-slate-100 dark:border-slate-700 pl-0 xl:pl-6 pt-4 xl:pt-0">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-3">Evidence</span>
                                    <button className="w-full flex items-center justify-center gap-2 py-6 px-3 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-xs font-medium text-slate-500 hover:text-primary hover:border-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                                        Add Photo
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 - Temperature Gradient */}
                        <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-opacity ${answers[3] === null ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}>
                            <div className="flex flex-col xl:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="flex items-center justify-center size-8 rounded-full bg-slate-100 dark:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300 text-sm">3</span>
                                        <h4 className="text-base font-semibold text-slate-900 dark:text-white">Temperature Gradient Check</h4>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 pl-11">
                                        Verify if there is a significant temperature difference between the bearing housing and the shaft.
                                    </p>
                                    <div className="mt-4 pl-11">
                                        <div className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-900 p-1">
                                            <button onClick={() => setAnswer(3, 'confirmed')} className={btnClass(3, 'confirmed')}>Confirmed</button>
                                            <button onClick={() => setAnswer(3, 'refuted')} className={btnClass(3, 'refuted')}>Refuted</button>
                                            <button onClick={() => setAnswer(3, 'na')} className={btnClass(3, 'na')}>N/A</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full xl:w-72 shrink-0 border-l border-slate-100 dark:border-slate-700 pl-0 xl:pl-6 pt-4 xl:pt-0">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-3">Evidence</span>
                                    <button className="w-full flex items-center justify-center gap-2 py-6 px-3 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-xs font-medium text-slate-500 hover:text-primary hover:border-primary transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                                        Add Thermal Image
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer nav */}
                        <div className="flex justify-between items-center pt-4">
                            <Link href="/dashboard/work-orders/new/diagnostic" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-medium flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                Back to Analysis
                            </Link>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-slate-500">{verifiedCount} of 3 verified</span>
                                <div className="w-32 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="bg-green-500 h-full transition-all" style={{ width: `${(verifiedCount / 3) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
