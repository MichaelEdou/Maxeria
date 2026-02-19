'use client';

import Link from 'next/link';

export default function ReportsPage() {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display text-[#111418]">
            <div className="relative flex h-full w-full flex-col overflow-x-hidden">
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e5e7eb] bg-white px-6 py-3 shadow-sm sticky top-0 z-50">
                    <div className="flex items-center gap-4 text-[#111418]">
                        <div className="size-8 flex items-center justify-center text-primary bg-primary/10 rounded-lg">
                            <span className="material-symbols-outlined">network_check</span>
                        </div>
                        <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">Neo-DIAGDEF</h2>
                    </div>
                    <div className="flex flex-1 justify-end gap-6 items-center">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200">
                            <span className="material-symbols-outlined text-[18px]">cloud_done</span>
                            <span className="text-xs font-semibold">Online & Synced</span>
                        </div>
                        <div className="h-6 w-px bg-gray-200"></div>
                        <div className="flex gap-2">
                            <button className="flex size-10 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                                <span className="material-symbols-outlined">search</span>
                            </button>
                            <button className="flex size-10 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600 transition-colors relative">
                                <span className="material-symbols-outlined">notifications</span>
                                <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white"></span>
                            </button>
                        </div>
                        <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-semibold text-[#111418]">Alex Chen</p>
                                <p className="text-xs text-gray-500">Sr. Reliability Engineer</p>
                            </div>
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 border border-gray-200 shadow-sm" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBAFS6O8e8vr8opBKimA_Xrw6KcvEHrvxQRiiQYGJ459FtX6_eJUBbSls_dWfWnilus0txgx9MXvN7j31_qu_iyyAtm2FK3UoZs0wrgsUbdx5GPc-KtRKoFSAY-jIDhi2DDUnLoHRuJGNI43hL1mT7wq-008d6tDzqY7VXDDQy5z-sgcf9udPhskXXGE-DyLlnz2A5qCupmncWepF-QKwMI7oSyv-2Os3PN-s2wmZ3-QygwWPBTo7bUi1nLDB5b7YXZBhWJ0wSe-8k")' }}></div>
                        </div>
                    </div>
                </header>
                <main className="flex-1 px-4 md:px-8 py-6 w-full max-w-[1400px] mx-auto grid grid-cols-12 gap-8">
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-2 items-center text-sm">
                                <Link className="text-gray-500 hover:text-primary transition-colors" href="/dashboard">Home</Link>
                                <span className="material-symbols-outlined text-gray-400 text-[16px]">chevron_right</span>
                                <Link className="text-gray-500 hover:text-primary transition-colors" href="#">Knowledge Base</Link>
                                <span className="material-symbols-outlined text-gray-400 text-[16px]">chevron_right</span>
                                <span className="text-primary font-medium bg-primary/10 px-2 py-0.5 rounded text-xs">Bulk Upload</span>
                            </div>
                            <div className="flex justify-between items-start flex-wrap gap-4">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-[#111418] tracking-tight text-3xl font-bold">Knowledge Base Upload Manager</h1>
                                    <p className="text-gray-500 text-sm font-normal">
                                        Bulk ingest technical documentation for AI cognitive assistance.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg h-9 px-4 bg-white border border-gray-200 hover:bg-gray-50 text-[#111418] text-sm font-medium transition-colors shadow-sm">
                                        <span className="material-symbols-outlined text-[18px]">history</span>
                                        Upload History
                                    </button>
                                </div>
                            </div>
                        </div>
                        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">1</div>
                                    <h3 className="text-[#111418] text-lg font-bold">File Upload</h3>
                                </div>
                                <span className="text-xs font-medium text-gray-500">Supports all format types</span>
                            </div>
                            <div className="p-8">
                                <div className="drag-zone rounded-xl bg-gray-50 hover:bg-blue-50/30 transition-colors cursor-pointer group flex flex-col items-center justify-center min-h-[240px] gap-4 text-center">
                                    <div className="size-16 bg-white rounded-full shadow-sm border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                                        <span className="material-symbols-outlined text-primary text-[32px]">cloud_upload</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg font-semibold text-gray-900">Drag & Drop files here</p>
                                        <p className="text-sm text-gray-500">or <span className="text-primary font-medium hover:underline">browse your computer</span></p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">Maximum file size: 250MB per file</p>
                                </div>
                            </div>
                        </section>
                        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">2</div>
                                    <h3 className="text-[#111418] text-lg font-bold">URL Import</h3>
                                </div>
                                <span className="text-xs font-medium text-gray-500">External Links & SharePoint</span>
                            </div>
                            <div className="p-6">
                                <label className="block text-sm font-semibold text-[#111418] mb-2">Documentation Links</label>
                                <textarea className="w-full rounded-lg border-gray-300 bg-gray-50 text-sm focus:border-primary focus:ring-primary min-h-[100px] p-3 leading-relaxed font-mono" placeholder="https://sharepoint.internal/docs/manual-v2.pdf&#10;https://vendor-portal.com/specs/pump-series-a.xml"></textarea>
                                <p className="text-xs text-gray-500 mt-2">Enter one URL per line. The system will crawl and index the content.</p>
                                <div className="mt-3 flex justify-end">
                                    <button className="text-sm font-medium text-primary hover:text-blue-700 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                        Add Link Batch
                                    </button>
                                </div>
                            </div>
                        </section>
                        <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex-1">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                                <h3 className="text-[#111418] text-base font-bold">Upload Queue (3)</h3>
                                <button className="text-xs font-medium text-red-600 hover:text-red-800">Clear All</button>
                            </div>
                            <div className="divide-y divide-gray-100">
                                <div className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                    <div className="size-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined">picture_as_pdf</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">Hydraulic_Pump_Maint_Manual_v4.pdf</h4>
                                            <span className="text-xs font-bold text-primary">45%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div className="bg-primary h-1.5 rounded-full" style={{ width: '45%' }}></div>
                                        </div>
                                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                                            <span>2.4 MB / 5.8 MB</span>
                                            <span>Uploading...</span>
                                        </div>
                                    </div>
                                    <button className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                                        <span className="material-symbols-outlined text-[20px]">close</span>
                                    </button>
                                </div>
                                <div className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors bg-green-50/30">
                                    <div className="size-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined">code</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">S1000D_Data_Module_Engine.xml</h4>
                                            <div className="flex items-center gap-1 text-green-600">
                                                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                                <span className="text-xs font-bold">Ready</span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
                                        </div>
                                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                                            <span>145 KB</span>
                                            <span>Parsing Metadata...</span>
                                        </div>
                                    </div>
                                    <button className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </div>
                                <div className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                                    <div className="size-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined">link</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="text-sm font-medium text-gray-900 truncate">sharepoint.corp/tech-specs/2024-Q1</h4>
                                            <span className="text-xs font-medium text-gray-400">Queued</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div className="bg-gray-300 h-1.5 rounded-full" style={{ width: '0%' }}></div>
                                        </div>
                                    </div>
                                    <button className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600">
                                        <span className="material-symbols-outlined text-[20px]">close</span>
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                        <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-blue-50 to-white shadow-sm overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                                <span className="material-symbols-outlined text-[120px] text-primary">smart_toy</span>
                            </div>
                            <div className="p-5 relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">AI Processing</h3>
                                </div>
                                <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                                    Uploaded documents will be vectorized for the RAG pipeline. Metadata accuracy improves search relevance by <span className="font-bold text-primary">~40%</span>.
                                </p>
                                <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-blue-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-medium text-gray-500">Vectorization Estimate</span>
                                        <span className="text-xs font-bold text-gray-900">~2 mins</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                        <div className="bg-primary/50 h-1.5 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-fit">
                            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="text-[#111418] font-bold text-base">Metadata Tagging</h3>
                                <p className="text-xs text-gray-500 mt-1">Applied to all files in this batch.</p>
                            </div>
                            <div className="p-4 flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#111418]">Asset Class</label>
                                    <select className="w-full rounded-lg border-gray-300 bg-gray-50 text-sm focus:border-primary focus:ring-primary h-10">
                                        <option>Hydraulic Systems</option>
                                        <option>Power Generation</option>
                                        <option>Avionics</option>
                                        <option>Structural Components</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#111418]">Language</label>
                                    <select className="w-full rounded-lg border-gray-300 bg-gray-50 text-sm focus:border-primary focus:ring-primary h-10">
                                        <option>English (Technical)</option>
                                        <option>French</option>
                                        <option>German</option>
                                        <option>Spanish</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#111418]">Criticality Level</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <label className="cursor-pointer">
                                            <input className="peer sr-only" name="criticality" type="radio" value="low" />
                                            <div className="rounded-md border border-gray-200 p-2 text-center text-xs font-medium text-gray-600 hover:bg-gray-50 peer-checked:bg-green-50 peer-checked:text-green-700 peer-checked:border-green-200 transition-all">
                                                Low
                                            </div>
                                        </label>
                                        <label className="cursor-pointer">
                                            <input defaultChecked className="peer sr-only" name="criticality" type="radio" value="medium" />
                                            <div className="rounded-md border border-gray-200 p-2 text-center text-xs font-medium text-gray-600 hover:bg-gray-50 peer-checked:bg-orange-50 peer-checked:text-orange-700 peer-checked:border-orange-200 transition-all">
                                                Medium
                                            </div>
                                        </label>
                                        <label className="cursor-pointer">
                                            <input className="peer sr-only" name="criticality" type="radio" value="high" />
                                            <div className="rounded-md border border-gray-200 p-2 text-center text-xs font-medium text-gray-600 hover:bg-gray-50 peer-checked:bg-red-50 peer-checked:text-red-700 peer-checked:border-red-200 transition-all">
                                                High
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#111418]">Custom Tags</label>
                                    <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg bg-gray-50 min-h-[46px]">
                                        <span className="inline-flex items-center gap-1 bg-white border border-gray-200 px-2 py-1 rounded-md text-xs font-medium text-gray-700 shadow-sm">
                                            #Maintenance
                                            <button className="hover:text-red-500"><span className="material-symbols-outlined text-[14px]">close</span></button>
                                        </span>
                                        <input className="bg-transparent border-none p-0 text-sm focus:ring-0 placeholder-gray-400 min-w-[80px]" placeholder="Add tag..." type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-yellow-50 rounded-xl border border-yellow-100 p-4 flex items-start gap-3">
                            <span className="material-symbols-outlined text-yellow-600">lightbulb</span>
                            <div>
                                <p className="text-sm font-medium text-yellow-800">S1000D Compatibility</p>
                                <p className="text-xs text-yellow-700 mt-1">Ensure XML data modules reference the correct schema version (4.1 or higher) for automatic parsing.</p>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="sticky bottom-0 z-40 bg-white border-t border-gray-200 px-8 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-500 hidden sm:block">
                            <span className="font-medium text-gray-900">Total files:</span> 3 documents (1 URL)
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none h-11 px-6 rounded-lg bg-white border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors shadow-sm">
                                Cancel
                            </button>
                            <button className="flex-1 sm:flex-none h-11 px-6 rounded-lg bg-primary text-white font-bold text-sm hover:bg-blue-600 transition-colors shadow-md flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined text-[20px]">publish</span>
                                Start Indexing
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
