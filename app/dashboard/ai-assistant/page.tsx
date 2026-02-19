'use client';

import Link from 'next/link';

export default function AIAssistantPage() {
    return (
        <div className="bg-background-light text-[#111418] h-screen flex flex-col overflow-hidden">
            {/* Top Navigation */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 bg-surface px-6 py-3 h-16 shrink-0 z-20 shadow-sm">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="flex items-center gap-4 group">
                        <div className="size-8 bg-primary/10 text-primary flex items-center justify-center rounded-lg group-hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined">hub</span>
                        </div>
                        <div>
                            <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">Neo-DIAGDEF</h2>
                            <div className="flex items-center gap-2">
                                <span className="flex size-2 rounded-full bg-success"></span>
                                <span className="text-xs text-[#617589] font-medium">Online (Sync Active)</span>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-1 justify-center">
                    <div className="hidden md:flex items-center bg-[#f0f2f4] rounded-lg p-1">
                        <Link href="/dashboard/diagnostics" className="px-4 py-1.5 text-sm font-medium rounded-md hover:bg-white hover:shadow-sm text-[#617589] hover:text-primary transition-all">New Diagnostic</Link>
                        <button className="px-4 py-1.5 text-sm font-medium rounded-md bg-white shadow-sm text-primary">AI Assistant</button>
                        <Link href="/dashboard/assets" className="px-4 py-1.5 text-sm font-medium rounded-md text-[#617589] hover:text-[#111418] hover:bg-white hover:shadow-sm transition-all">Assets</Link>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-[#111418]">Session #4092</p>
                        <p className="text-xs text-[#617589]">Hydraulic Pump Failure</p>
                    </div>
                    <button className="size-10 flex items-center justify-center rounded-full hover:bg-[#f0f2f4] text-[#617589] transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                    <div className="size-10 rounded-full bg-gradient-to-tr from-blue-100 to-blue-200 border border-white shadow-sm flex items-center justify-center text-primary font-bold text-sm">
                        JD
                    </div>
                </div>
            </header>
            {/* Main Content Area (Split Screen) */}
            <main className="flex flex-1 overflow-hidden relative">
                {/* Left Panel: Defaillogram Visualizer */}
                <section className="flex-1 relative bg-[#f0f2f4]/30 overflow-hidden border-r border-gray-200 group/canvas">
                    {/* Canvas Toolbar */}
                    <div className="absolute top-4 left-4 z-10 bg-white shadow-md rounded-lg p-1.5 flex flex-col gap-1 border border-gray-100">
                        <button className="p-2 hover:bg-gray-50 rounded text-[#617589] hover:text-primary transition-colors" title="Zoom In">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                        </button>
                        <button className="p-2 hover:bg-gray-50 rounded text-[#617589] hover:text-primary transition-colors" title="Zoom Out">
                            <span className="material-symbols-outlined text-[20px]">remove</span>
                        </button>
                        <button className="p-2 hover:bg-gray-50 rounded text-[#617589] hover:text-primary transition-colors" title="Fit to Screen">
                            <span className="material-symbols-outlined text-[20px]">center_focus_strong</span>
                        </button>
                    </div>
                    {/* Canvas Content (Simulated Tree) */}
                    <div className="w-full h-full relative cursor-grab active:cursor-grabbing p-10 overflow-auto flex items-center justify-center">
                        {/* Tree Container */}
                        <div className="relative w-[800px] h-[600px] transform scale-90 origin-center">
                            {/* Lines connecting nodes */}
                            {/* Root to L2 */}
                            <div className="absolute bg-[#dbe0e6] z-0 w-0.5 h-16 left-[400px] top-[80px]"></div>
                            {/* L2 Crossbar */}
                            <div className="absolute bg-[#dbe0e6] z-0 h-0.5 w-[400px] left-[200px] top-[144px]"></div>
                            {/* L2 Connectors down */}
                            <div className="absolute bg-[#dbe0e6] z-0 w-0.5 h-8 left-[200px] top-[144px]"></div>
                            <div className="absolute bg-[#dbe0e6] z-0 w-0.5 h-8 left-[600px] top-[144px]"></div>
                            {/* Active Path Highlight (L2 Left to L3) */}
                            <div className="absolute bg-[#137fec] z-0 w-0.5 h-12 left-[200px] top-[240px]"></div>
                            {/* Root Node */}
                            <div className="absolute left-[300px] top-0 w-[200px] bg-white border border-gray-200 shadow-sm rounded-lg p-3 z-10">
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-[10px] font-bold text-[#617589] uppercase tracking-wider">Root Event</span>
                                    <span className="material-symbols-outlined text-red-500 text-[16px]">error</span>
                                </div>
                                <p className="font-semibold text-sm text-[#111418] leading-snug">Hydraulic Pump Failure</p>
                            </div>
                            {/* Level 2 Node (Left) - Active Path */}
                            <div className="absolute left-[100px] top-[160px] w-[200px] bg-white border-2 border-primary shadow-md rounded-lg p-3 z-10 ring-4 ring-primary/10">
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Investigating</span>
                                    <span className="flex size-2 rounded-full bg-primary animate-pulse"></span>
                                </div>
                                <p className="font-semibold text-sm text-[#111418] leading-snug">Low Pressure Output</p>
                                <div className="mt-2 text-xs text-[#617589] bg-gray-50 p-1 rounded border border-gray-100">
                                    Probability: High (85%)
                                </div>
                            </div>
                            {/* Level 2 Node (Right) */}
                            <div className="absolute left-[500px] top-[160px] w-[200px] bg-gray-50 border border-gray-200 rounded-lg p-3 z-10 opacity-60">
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-[10px] font-bold text-[#617589] uppercase tracking-wider">Ruled Out</span>
                                    <span className="material-symbols-outlined text-[#617589] text-[16px]">check_circle</span>
                                </div>
                                <p className="font-semibold text-sm text-[#617589] leading-snug">Electrical Motor Fault</p>
                            </div>
                            {/* Level 3 Node (Child of Active) */}
                            <div className="absolute left-[100px] top-[300px] w-[200px] bg-white border border-dashed border-primary shadow-sm rounded-lg p-3 z-10">
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-[10px] font-bold text-[#617589] uppercase tracking-wider">Potential Cause</span>
                                    <span className="material-symbols-outlined text-primary text-[16px]">help</span>
                                </div>
                                <p className="font-semibold text-sm text-[#111418] leading-snug">Thermostat Stuck Open</p>
                                <div className="mt-2 flex gap-1">
                                    <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded">Thermal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Legend / Status */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-gray-200 shadow-sm text-xs flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm bg-white border-2 border-primary"></span>
                            <span className="text-[#111418]">Current Investigation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm bg-white border border-gray-200"></span>
                            <span className="text-[#617589]">Pending</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm bg-gray-50 border border-gray-200 opacity-60"></span>
                            <span className="text-[#617589]">Ruled Out</span>
                        </div>
                    </div>
                </section>
                {/* Right Panel: Cognitive Agent Chat */}
                <section className="w-full lg:w-[480px] xl:w-[540px] flex flex-col bg-surface shadow-xl border-l border-gray-200 z-10">
                    {/* Agent Header */}
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                    <span className="material-symbols-outlined">smart_toy</span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                                    <div className="size-2.5 rounded-full bg-success border border-white"></div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#111418] text-sm">Cognitive Assistant</h3>
                                <p className="text-xs text-[#617589] flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">neurology</span>
                                    LangGraph v4.2 • Context Aware
                                </p>
                            </div>
                        </div>
                        <button className="text-[#617589] hover:text-primary transition-colors p-2 rounded hover:bg-gray-50">
                            <span className="material-symbols-outlined">history</span>
                        </button>
                    </div>
                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50 scrollbar-hide">
                        {/* Timestamp */}
                        <div className="flex justify-center">
                            <span className="text-[10px] text-[#617589] font-medium bg-gray-100 px-2 py-0.5 rounded-full">Today, 10:23 AM</span>
                        </div>
                        {/* AI Message: Introduction */}
                        <div className="flex gap-3">
                            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                            </div>
                            <div className="flex flex-col gap-1 max-w-[85%]">
                                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-[#111418] leading-relaxed">
                                    <p>I&apos;ve analyzed the telemetry data. The <span className="font-semibold text-primary">Hydraulic Pump</span> output pressure is fluctuating below the threshold.</p>
                                    <p className="mt-2">Based on previous incidents (REX #8821), this is often caused by thermal regulation issues rather than a mechanical pump failure.</p>
                                </div>
                                <span className="text-[10px] text-[#617589] ml-1">AI Agent • 10:23 AM</span>
                            </div>
                        </div>
                        {/* User Message */}
                        <div className="flex gap-3 flex-row-reverse">
                            <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0 mt-1">JD</div>
                            <div className="flex flex-col gap-1 max-w-[85%] items-end">
                                <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-md text-sm leading-relaxed">
                                    <p>Confirmed. The motor current is stable, so electrical fault is ruled out. What should I check next?</p>
                                </div>
                                <span className="text-[10px] text-[#617589] mr-1">You • 10:25 AM</span>
                            </div>
                        </div>
                        {/* AI Message: Thinking/Action */}
                        <div className="flex gap-3">
                            <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                            </div>
                            <div className="flex flex-col gap-2 max-w-[90%]">
                                {/* The Text */}
                                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm text-[#111418] leading-relaxed">
                                    <p>Let&apos;s verify the thermal regulation loop. I need one piece of information to narrow down the root cause.</p>
                                </div>
                                {/* Interactive Question Card */}
                                <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 p-4 rounded-xl shadow-sm mt-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="material-symbols-outlined text-primary">help</span>
                                        <h4 className="font-bold text-[#111418] text-sm">Discriminating Question</h4>
                                    </div>
                                    <p className="text-sm text-[#111418] mb-4">Is the engine currently running cold (below 60°C) despite operating under load?</p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-white border border-gray-200 hover:border-success hover:bg-success/5 text-[#111418] hover:text-success py-2 px-3 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 group">
                                            <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-success">check_circle</span>
                                            Yes
                                        </button>
                                        <button className="flex-1 bg-white border border-gray-200 hover:border-danger hover:bg-danger/5 text-[#111418] hover:text-danger py-2 px-3 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2 group">
                                            <span className="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-danger">cancel</span>
                                            No
                                        </button>
                                        <button className="bg-white border border-gray-200 hover:bg-gray-50 text-[#617589] py-2 px-3 rounded-lg text-sm font-medium shadow-sm" title="I don't know">
                                            <span className="material-symbols-outlined text-[18px]">unknown_med</span>
                                        </button>
                                    </div>
                                </div>
                                {/* Next Best Action Suggestion */}
                                <div className="relative overflow-hidden bg-white border border-l-4 border-l-primary border-y-gray-200 border-r-gray-200 p-4 rounded-r-xl shadow-md mt-1 group cursor-pointer hover:bg-blue-50/30 transition-colors">
                                    <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">NEXT BEST ACTION</div>
                                    <div className="flex gap-3">
                                        <div className="mt-1">
                                            <span className="material-symbols-outlined text-primary text-[24px]">build_circle</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#111418] text-sm">Inspect Thermostat Valve</h4>
                                            <p className="text-xs text-[#617589] mt-1 leading-normal">Visually inspect the bypass valve position. Reference manual section 4.2.</p>
                                            <div className="flex items-center gap-3 mt-3">
                                                <Link className="flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline" href="#">
                                                    <span className="material-symbols-outlined text-[14px]">menu_book</span>
                                                    Open Manual (PDF)
                                                </Link>
                                                <Link className="flex items-center gap-1 text-[11px] font-semibold text-[#617589] hover:text-[#111418]" href="#">
                                                    <span className="material-symbols-outlined text-[14px]">article</span>
                                                    View REX #8821
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-200 shrink-0">
                        <div className="relative">
                            <textarea className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none outline-none text-[#111418] placeholder-[#617589] shadow-inner" placeholder="Type your observation or ask a question..." rows={2}></textarea>
                            <button className="absolute right-2 bottom-2 p-2 bg-primary hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">send</span>
                            </button>
                            <div className="absolute right-14 bottom-2 flex gap-1">
                                <button className="p-2 text-[#617589] hover:text-primary hover:bg-gray-100 rounded-lg transition-colors" title="Upload Image">
                                    <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                                </button>
                                <button className="p-2 text-[#617589] hover:text-primary hover:bg-gray-100 rounded-lg transition-colors" title="Voice Input">
                                    <span className="material-symbols-outlined text-[20px]">mic</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center mt-2">
                            <p className="text-[10px] text-[#617589]">AI can make mistakes. Verify critical steps with safety protocols.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
