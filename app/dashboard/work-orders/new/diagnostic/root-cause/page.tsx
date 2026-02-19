'use client';

import Link from 'next/link';
import { useState } from 'react';

type Classification = 'material' | 'human' | 'org' | null;

interface WhyStep {
    id: number;
    question: string;
    answer: string;
    classification: Classification;
}

const initialSteps: WhyStep[] = [
    {
        id: 1,
        question: 'Why did the vibration exceed limits?',
        answer: 'The inner race of the rear bearing was damaged causing irregular rotation.',
        classification: 'material',
    },
    {
        id: 2,
        question: 'Why was the inner race damaged?',
        answer: 'Lack of sufficient lubrication led to metal-on-metal contact and overheating.',
        classification: 'material',
    },
    {
        id: 3,
        question: 'Why was there a lack of lubrication?',
        answer: 'The automatic greasing unit reservoir was empty and alarm was missed.',
        classification: 'human',
    },
    {
        id: 4,
        question: 'Why was the reservoir empty and alarm missed?',
        answer: '',
        classification: null,
    },
];

const classBtn = (active: Classification, type: Classification, label: string) => {
    const colorMap: Record<string, string> = {
        material: 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
        human: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
        org: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
    };
    const inactiveClass = 'bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700';
    return `flex-1 py-2 px-3 text-xs font-medium rounded-md border transition-colors ${active === type ? colorMap[type!] : inactiveClass}`;
};

export default function RootCausePage() {
    const [steps, setSteps] = useState<WhyStep[]>(initialSteps);
    const [chatInput, setChatInput] = useState('');

    const updateStep = (id: number, field: keyof WhyStep, value: string | Classification) => {
        setSteps(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const addStep = () => {
        const lastId = steps[steps.length - 1].id;
        setSteps(prev => [...prev, {
            id: lastId + 1,
            question: `Why? (Level ${lastId + 1})`,
            answer: '',
            classification: null,
        }]);
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
                            <span className="text-slate-800 dark:text-slate-200 font-medium">Root Cause Analysis</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Step 3: Root Cause Identification</h1>
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded uppercase tracking-wide">In Progress</span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">
                            <span className="material-symbols-outlined text-[20px]">save</span>
                            Save Draft
                        </button>
                        <Link href="/dashboard/work-orders/new/diagnostic/solution" className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20">
                            Next Step
                            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </Link>
                    </div>
                </div>

                {/* Stepper */}
                <div className="mt-6">
                    <div className="flex items-center w-full">
                        {/* Step 1 - done */}
                        <div className="flex items-center text-green-500 relative">
                            <div className="rounded-full h-8 w-8 border-2 border-green-500 bg-green-500 flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-sm font-bold">check</span>
                            </div>
                            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-green-600">Situation Analysis</div>
                        </div>
                        <div className="flex-auto border-t-2 border-green-500"></div>
                        {/* Step 2 - done */}
                        <div className="flex items-center text-green-500 relative">
                            <div className="rounded-full h-8 w-8 border-2 border-green-500 bg-green-500 flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-sm font-bold">check</span>
                            </div>
                            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-green-600">Symptom Check</div>
                        </div>
                        <div className="flex-auto border-t-2 border-green-500"></div>
                        {/* Step 3 - active */}
                        <div className="flex items-center text-primary relative">
                            <div className="rounded-full h-8 w-8 border-2 border-primary bg-primary flex items-center justify-center text-white font-bold text-sm">3</div>
                            <div className="absolute top-0 -ml-10 text-center mt-10 w-32 text-xs font-medium text-primary">Root Cause</div>
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
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 bg-slate-50 dark:bg-black/20">
                <div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-8">

                    {/* Left: AI Panel */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        {/* Confirmed Symptom */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-4">
                            <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg text-blue-600 dark:text-blue-200 shrink-0 self-start">
                                <span className="material-symbols-outlined">report_problem</span>
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-1">Confirmed Symptom</h3>
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Excessive vibration in rear bearing housing causing safety shutdown (Sensor VIB-204 &gt; 8mm/s).</p>
                            </div>
                        </div>

                        {/* AI Assistant */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden" style={{ maxHeight: 'calc(100vh - 24rem)' }}>
                            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                                    <span className="material-symbols-outlined">psychology_alt</span>
                                    <h3 className="font-bold text-sm uppercase tracking-wide">AI Assistant</h3>
                                </div>
                                <div className="flex gap-2">
                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">tune</span>
                                    </button>
                                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                        <span className="material-symbols-outlined text-[20px]">refresh</span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-lg">
                                    <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed">
                                        I&apos;m analyzing the technical manuals for <span className="font-semibold">Hydraulic Pump A2</span>. Based on the symptom &quot;Lack of lubrication&quot;, here are potential systemic causes to explore.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                                            Technical Manual Insights
                                            <span className="bg-indigo-100 text-indigo-700 px-1.5 rounded text-[10px]">TM-204</span>
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 rounded-lg p-3 transition-colors cursor-pointer shadow-sm">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Procedure Gap</span>
                                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors"><span className="material-symbols-outlined text-[16px]">add_circle</span></button>
                                                </div>
                                                <p className="text-xs text-slate-700 dark:text-slate-300">&quot;Daily inspection checklist does not explicitly require checking the remote reservoir level gauge.&quot;</p>
                                            </div>
                                            <div className="group relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 rounded-lg p-3 transition-colors cursor-pointer shadow-sm">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Training</span>
                                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors"><span className="material-symbols-outlined text-[16px]">add_circle</span></button>
                                                </div>
                                                <p className="text-xs text-slate-700 dark:text-slate-300">Last training update on Lubrication Systems (LUB-09) was 18 months ago. New operators might lack certification.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Likely Root Cause Categories</h4>
                                        <div className="space-y-1">
                                            {[
                                                { color: 'bg-purple-500', label: 'Organizational (Process)', pct: '65%' },
                                                { color: 'bg-blue-500', label: 'Human (Error)', pct: '25%' },
                                                { color: 'bg-orange-500', label: 'Material (Component)', pct: '10%' },
                                            ].map(({ color, label, pct }) => (
                                                <div key={label} className="flex items-center justify-between text-xs p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`size-2 rounded-full ${color}`}></div>
                                                        <span className="text-slate-700 dark:text-slate-300">{label}</span>
                                                    </div>
                                                    <span className="font-mono text-slate-400">{pct}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat input */}
                            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                                <div className="flex gap-2">
                                    <input
                                        className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs py-2 px-3 bg-white dark:bg-slate-800 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Ask AI to verify a manual..."
                                        value={chatInput}
                                        onChange={e => setChatInput(e.target.value)}
                                    />
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">send</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: 5 Why Chain */}
                    <div className="col-span-12 lg:col-span-8 pb-16">
                        <div className="space-y-0 relative pl-2">
                            {steps.map((step, idx) => {
                                const isLast = idx === steps.length - 1;
                                const isActive = step.answer === '' && isLast;

                                return (
                                    <div key={step.id} className={`relative pl-10 pb-8 ${!isLast ? 'before:content-[""] before:absolute before:top-8 before:bottom-0 before:left-[1.25rem] before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700' : ''}`}>
                                        {/* Step bubble */}
                                        <div className={`absolute left-0 top-0 p-1.5 rounded-full z-10 shadow-md flex items-center justify-center ${isActive
                                            ? 'bg-white border-2 border-primary text-primary'
                                            : 'bg-primary text-white'
                                            }`}>
                                            <span className="text-xs font-bold px-1">{step.id}</span>
                                        </div>

                                        {/* Card */}
                                        <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border p-6 transition-all group ${isActive
                                            ? 'border-2 border-primary/30 ring-4 ring-primary/5 shadow-lg'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                                            }`}>
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Answer */}
                                                <div className="flex-1 space-y-3">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{step.question}</label>
                                                    <textarea
                                                        className={`block w-full rounded-lg text-sm shadow-sm focus:ring-primary ${isActive
                                                            ? 'border-2 border-primary bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
                                                            : 'border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white'
                                                            } p-3`}
                                                        rows={2}
                                                        placeholder={isActive ? 'Enter the cause here...' : ''}
                                                        value={step.answer}
                                                        onChange={e => updateStep(step.id, 'answer', e.target.value)}
                                                    />
                                                    {isActive && (
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <span className="text-xs text-slate-500">AI Suggestion:</span>
                                                            <button
                                                                onClick={() => updateStep(step.id, 'answer', 'Maintenance schedule not updated')}
                                                                className="text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 px-2 py-1 rounded border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
                                                            >
                                                                Maintenance schedule not updated
                                                            </button>
                                                            <button
                                                                onClick={() => updateStep(step.id, 'answer', 'Sensor malfunction')}
                                                                className="text-xs bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 px-2 py-1 rounded border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
                                                            >
                                                                Sensor malfunction
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Classification */}
                                                <div className="w-full md:w-48 space-y-3 border-l border-slate-100 dark:border-slate-700 pl-0 md:pl-6 pt-4 md:pt-0">
                                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Cause Classification</label>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => updateStep(step.id, 'classification', 'material')} className={classBtn(step.classification, 'material', 'Material')}>Material</button>
                                                        <button onClick={() => updateStep(step.id, 'classification', 'human')} className={classBtn(step.classification, 'human', 'Human')}>Human</button>
                                                        <button onClick={() => updateStep(step.id, 'classification', 'org')} className={classBtn(step.classification, 'org', 'Org')}>Org</button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Add button at bottom of active card */}
                                            {isActive && (
                                                <div className="flex justify-center mt-4 -mb-10">
                                                    <button
                                                        onClick={addStep}
                                                        className="bg-white dark:bg-slate-700 text-slate-400 hover:text-primary rounded-full p-1 border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-all"
                                                    >
                                                        <span className="material-symbols-outlined text-[20px]">add</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Empty "conclude" slot */}
                            <div className="relative pl-10">
                                <div className="absolute left-0 top-0 p-1.5 bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400 rounded-full z-10">
                                    <span className="text-xs font-bold px-1">{steps.length + 1}</span>
                                </div>
                                <div
                                    onClick={addStep}
                                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center text-slate-400 dark:text-slate-500 hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer bg-slate-50 dark:bg-slate-800/50"
                                >
                                    <span className="material-symbols-outlined text-[24px] mb-2 opacity-50 block">help_outline</span>
                                    <p className="text-sm font-medium">Add next &quot;Why?&quot; level or conclude Root Cause</p>
                                </div>
                            </div>

                            {/* Back nav */}
                            <div className="flex justify-between items-center pt-8 mt-4">
                                <Link href="/dashboard/work-orders/new/diagnostic/validation" className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-medium flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                                    Back to Verification
                                </Link>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-500">{steps.filter(s => s.answer).length} of {steps.length} levels filled</span>
                                    <div className="w-32 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="bg-primary h-full transition-all" style={{ width: `${(steps.filter(s => s.answer).length / steps.length) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
