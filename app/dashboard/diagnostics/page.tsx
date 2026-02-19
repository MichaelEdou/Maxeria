'use client';

import Link from 'next/link';

export default function NewDiagnosticPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#111418] dark:text-white min-h-screen flex flex-col overflow-x-hidden">
            {/* Top Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e5e7eb] dark:border-b-gray-800 bg-white dark:bg-[#111418] px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="size-8 text-primary flex items-center justify-center bg-primary/10 rounded-lg">
                        <span className="material-symbols-outlined filled">analytics</span>
                    </div>
                    <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Neo-DIAGDEF</h2>
                    <div className="hidden md:flex items-center gap-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">
                        <span className="material-symbols-outlined text-[14px] filled">wifi_off</span>
                        <span>Offline Ready</span>
                    </div>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    <div className="hidden lg:flex items-center gap-9">
                        <Link className="text-[#111418] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors" href="/dashboard">Dashboard</Link>
                        <Link className="text-[#111418] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors" href="#">Work Orders</Link>
                        <Link className="text-[#111418] dark:text-gray-200 text-sm font-medium hover:text-primary transition-colors" href="#">History</Link>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-background-light dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-[#111418] dark:text-white">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                        <button className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-background-light dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-[#111418] dark:text-white relative">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                        </button>
                        <button className="flex size-10 cursor-pointer items-center justify-center rounded-lg bg-background-light dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-[#111418] dark:text-white">
                            <span className="material-symbols-outlined">account_circle</span>
                        </button>
                    </div>
                </div>
            </header>
            <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-[960px] flex flex-col gap-6">
                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-[#111418] dark:text-white">New Diagnostic Session</h1>
                            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Initiate a new MAXER-based analysis for the assigned work order.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-blue-50 text-primary text-sm font-medium rounded-full border border-blue-100">Variant 2/10</span>
                        </div>
                    </div>
                    {/* Wizard Stepper */}
                    <div className="bg-white dark:bg-[#1a2632] rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
                        <nav aria-label="Progress">
                            <ol className="flex items-center" role="list">
                                <li className="relative pr-8 sm:pr-20">
                                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                        <div className="h-0.5 w-full bg-primary"></div>
                                    </div>
                                    <a className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary hover:bg-blue-600" href="#">
                                        <span className="material-symbols-outlined text-white text-[20px]">play_arrow</span>
                                        <span className="sr-only">Step 1</span>
                                    </a>
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-primary whitespace-nowrap">Initiation</span>
                                </li>
                                <li className="relative pr-8 sm:pr-20">
                                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                        <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
                                    </div>
                                    <a className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-[#1a2632] border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400" href="#">
                                        <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">02</span>
                                        <span className="sr-only">Step 2</span>
                                    </a>
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500 dark:text-gray-400">Observation</span>
                                </li>
                                <li className="relative pr-8 sm:pr-20">
                                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                        <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
                                    </div>
                                    <a className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-[#1a2632] border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400" href="#">
                                        <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">03</span>
                                        <span className="sr-only">Step 3</span>
                                    </a>
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500 dark:text-gray-400">Analysis</span>
                                </li>
                                <li className="relative">
                                    <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                        <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-700"></div>
                                    </div>
                                    <a className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-[#1a2632] border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400" href="#">
                                        <span className="text-gray-500 dark:text-gray-400 text-xs font-medium">04</span>
                                        <span className="sr-only">Step 4</span>
                                    </a>
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-500 dark:text-gray-400">Conclusion</span>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Form Column */}
                        <div className="lg:col-span-2 flex flex-col gap-6">
                            {/* Context Card */}
                            <div className="bg-white dark:bg-[#1a2632] rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                                <div className="h-32 bg-cover bg-center relative" data-alt="Industrial pump machinery in a factory setting" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8yOapynw1UDyPdDVLPYi4X4sI9-st7V_2lHvXmKnFfUUWCUuU8gygIPLLCgrbHad-2jjCnAmnRmsmNfm6UH5JuAw2AqzmrI1r9cm7rg050mBm7a99jkDiKzJJl6l-2_3HNeXDwPPeiTVI7mNTgdfIfNL8sR9_9GibtXmF1xzJhlZtbZ_snsr6ZCxwwBc05V3EoHzLeVB9AwVcz06B6h-POKcjO-xtgAD6v2y9feSGdXHHVN0tgQC3UvADuyeljLahdbFHFa9nvVY')" }}>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-blue-600/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-semibold tracking-wide">GMAO CONTEXT</span>
                                            <span className="bg-red-500/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-semibold tracking-wide flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">priority_high</span> High Priority
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold font-mono">WO-2024-891</h3>
                                    </div>
                                </div>
                                <div className="p-5 flex flex-wrap gap-y-4 gap-x-8 text-sm">
                                    <div>
                                        <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold mb-1">Description</span>
                                        <p className="font-medium text-[#111418] dark:text-white">Abnormal vibration and noise detected during routine inspection.</p>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold mb-1">Location</span>
                                        <p className="font-medium text-[#111418] dark:text-white flex items-center gap-1">
                                            <span className="material-symbols-outlined text-[16px] text-gray-400">location_on</span>
                                            Pump House B, Sector 4
                                        </p>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold mb-1">Reported</span>
                                        <p className="font-medium text-[#111418] dark:text-white">Oct 24, 2023 - 08:30 AM</p>
                                    </div>
                                </div>
                            </div>
                            {/* Mandatory Selection Form */}
                            <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-[#111418] dark:text-white flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">fact_check</span>
                                        Mandatory Selection
                                    </h3>
                                </div>
                                <div className="space-y-6">
                                    {/* Object Selection */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="object-select">
                                            Target Object / Asset
                                            <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-gray-400">precision_manufacturing</span>
                                            </div>
                                            <input className="pl-10 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-11" id="object-select" list="objects-list" placeholder="Search asset tag (e.g., P-101)..." type="text" />
                                            <datalist id="objects-list">
                                                <option value="P-101 - Centrifugal Pump">
                                                </option><option value="M-204 - Drive Motor">
                                                </option><option value="V-301 - Isolation Valve">
                                                </option><option value="C-105 - Compressor Unit">
                                                </option></datalist>
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                <span className="text-xs text-gray-400">Enter to search</span>
                                            </div>
                                        </div>
                                        <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">Select the specific component from the functional location hierarchy.</p>
                                    </div>
                                    {/* Defect Selection */}
                                    <div className="relative p-0.5 rounded-lg">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="defect-select">
                                            Standardized Defect / Symptom
                                            <span className="text-red-500">*</span>
                                        </label>
                                        {/* AI Suggestion Chip */}
                                        <div className="mb-3 flex">
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 rounded-md text-indigo-700 dark:text-indigo-300 text-xs animate-pulse-slow cursor-pointer hover:bg-indigo-100 transition-colors">
                                                <span className="material-symbols-outlined text-[16px] filled">auto_awesome</span>
                                                <span className="font-medium">Neo-AI Suggestion:</span>
                                                <span>&quot;High Vibration (ISO-10816)&quot; detected from description</span>
                                                <span className="ml-1 material-symbols-outlined text-[14px]">add_circle</span>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-gray-400">warning</span>
                                            </div>
                                            <select className="pl-10 block w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary sm:text-sm h-11 appearance-none" id="defect-select">
                                                <option disabled selected value="">Select observed symptom...</option>
                                                <option value="vib-high">High Vibration</option>
                                                <option value="noise-abnormal">Abnormal Noise</option>
                                                <option value="temp-high">Overheating</option>
                                                <option value="leak-fluid">Fluid Leakage</option>
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <span className="material-symbols-outlined text-gray-400">expand_more</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar / Recent */}
                        <div className="flex flex-col gap-6">
                            {/* Quick Actions / Recents */}
                            <div className="bg-white dark:bg-[#1a2632] rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-5">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Recent Assets</h4>
                                <ul className="space-y-3">
                                    <li>
                                        <button className="w-full text-left group flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-100 dark:bg-blue-900/30 text-primary p-1.5 rounded-md">
                                                    <span className="material-symbols-outlined text-[18px]">settings_input_component</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Pump P-101</p>
                                                    <p className="text-xs text-gray-500">Pump House B</p>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary text-[20px]">add</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="w-full text-left group flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-100 dark:bg-blue-900/30 text-primary p-1.5 rounded-md">
                                                    <span className="material-symbols-outlined text-[18px]">electric_bolt</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Motor M-204</p>
                                                    <p className="text-xs text-gray-500">Main Assembly</p>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary text-[20px]">add</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="w-full text-left group flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-100 dark:bg-blue-900/30 text-primary p-1.5 rounded-md">
                                                    <span className="material-symbols-outlined text-[18px]">valve</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Valve V-301</p>
                                                    <p className="text-xs text-gray-500">Inflow Line</p>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-gray-300 group-hover:text-primary text-[20px]">add</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            {/* Guidelines */}
                            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30">
                                <div className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#111418] dark:text-white mb-1">MAXER Method Tip</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                            Ensure you distinguish clearly between the functional location and the physical object. The diagnostic should focus on the specific maintainable item.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Action Bar */}
                    <div className="sticky bottom-6 z-40">
                        <div className="bg-white/90 dark:bg-[#1a2632]/95 backdrop-blur-md border border-gray-200 dark:border-gray-700 p-4 rounded-xl shadow-lg flex items-center justify-between">
                            <button className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Cancel Session
                            </button>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-500 hidden sm:inline-block">All mandatory fields must be filled to proceed.</span>
                                <button className="px-8 py-2.5 rounded-lg bg-primary hover:bg-blue-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                                    Start Diagnostic
                                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
