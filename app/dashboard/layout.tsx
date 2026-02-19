'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardOverviewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
            {/* Sidebar */}
            <aside className="w-64 flex flex-col h-full bg-white dark:bg-[#1a2632] border-r border-slate-200 dark:border-slate-800 flex-shrink-0 z-20">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: '28px' }}>precision_manufacturing</span>
                    </div>
                    <div>
                        <h1 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Neo-DIAGDEF</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Reliability Platform</p>
                    </div>
                </div>
                <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
                    {pathname.startsWith('/dashboard/work-orders/new/diagnostic') ? (
                        <>
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-2">Diagnostic Process</div>
                            <Link href="/dashboard/work-orders/new/diagnostic" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium ${pathname === '/dashboard/work-orders/new/diagnostic'
                                ? 'bg-primary/10 text-primary'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}>
                                <span className={`material-symbols-outlined text-[20px] ${pathname !== '/dashboard/work-orders/new/diagnostic' ? 'text-green-500' : ''
                                    }`}>
                                    {pathname !== '/dashboard/work-orders/new/diagnostic' ? 'check_circle' : 'manage_search'}
                                </span>
                                <span className="text-sm">Situation Analysis</span>
                            </Link>
                            <Link href="/dashboard/work-orders/new/diagnostic/validation" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${pathname === '/dashboard/work-orders/new/diagnostic/validation'
                                ? 'bg-primary/10 text-primary'
                                : pathname === '/dashboard/work-orders/new/diagnostic/root-cause'
                                    ? 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}>
                                <span className={`material-symbols-outlined text-[20px] ${pathname === '/dashboard/work-orders/new/diagnostic/root-cause' ? 'text-green-500' : 'group-hover:text-primary'
                                    }`}>
                                    {pathname === '/dashboard/work-orders/new/diagnostic/root-cause' ? 'check_circle' : 'fact_check'}
                                </span>
                                <span className="text-sm font-medium">Validation</span>
                            </Link>
                            <Link href="/dashboard/work-orders/new/diagnostic/root-cause" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${pathname === '/dashboard/work-orders/new/diagnostic/root-cause'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}>
                                <span className={`material-symbols-outlined text-[20px] ${pathname === '/dashboard/work-orders/new/diagnostic/solution' ? 'text-green-500' : 'group-hover:text-primary'
                                    }`}>
                                    {pathname === '/dashboard/work-orders/new/diagnostic/solution' ? 'check_circle' : 'psychology'}
                                </span>
                                <span className="text-sm font-medium">Root Cause (5 Why)</span>
                            </Link>
                            <Link href="/dashboard/work-orders/new/diagnostic/solution" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${pathname === '/dashboard/work-orders/new/diagnostic/solution'
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}>
                                <span className="material-symbols-outlined text-[20px] group-hover:text-primary">build</span>
                                <span className="text-sm font-medium">Remedial Actions</span>
                            </Link>
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Case Info</div>
                            <div className="px-3 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-slate-500">WO #OT-4921</span>
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Critical</span>
                                </div>
                                <div className="text-sm font-medium text-slate-800 dark:text-slate-200">Hydraulic Pump A2</div>
                                <div className="text-xs text-slate-500 mt-1">Zone B - Line 4</div>
                            </div>
                        </>
                    ) : pathname.startsWith('/dashboard/work-orders') ? (
                        <>
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-2">Platform</div>
                            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors group">
                                <span className="material-symbols-outlined text-[20px] group-hover:text-primary">home</span>
                                <span className="text-sm font-medium">Home</span>
                            </Link>
                            <Link href="/dashboard/work-orders" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${pathname === '/dashboard/work-orders' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined text-[20px]">assignment</span>
                                <span className="text-sm font-medium">My Work Order</span>
                            </Link>
                            <Link href="/dashboard/work-orders/tools" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${pathname === '/dashboard/work-orders/tools' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined text-[20px]">build</span>
                                <span className="text-sm font-medium">Tools & Parts</span>
                            </Link>
                            <Link href="/dashboard/work-orders/history" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${pathname === '/dashboard/work-orders/history' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined text-[20px]">history</span>
                                <span className="text-sm font-medium">History</span>
                            </Link>

                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 mt-4">Support</div>
                            <Link href="/dashboard/work-orders/documentation" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${pathname === '/dashboard/work-orders/documentation' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined text-[20px]">menu_book</span>
                                <span className="text-sm font-medium">Documentation</span>
                            </Link>
                            <Link href="/dashboard/work-orders/supervisor" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${pathname === '/dashboard/work-orders/supervisor' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined text-[20px]">support_agent</span>
                                <span className="text-sm font-medium">Supervisor Contact</span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${pathname === '/dashboard' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined">dashboard</span>
                                <span className="text-sm font-medium">Dashboard</span>
                            </Link>
                            <Link href="/dashboard/assets" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${pathname === '/dashboard/assets' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined">precision_manufacturing</span>
                                <span className="text-sm font-medium">Asset</span>
                            </Link>
                            <Link href="/dashboard/assets" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${pathname === '/dashboard/assets/management' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined">factory</span>
                                <span className="text-sm font-medium">Asset Management</span>
                            </Link>
                            <Link href="/dashboard/work-orders" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${pathname.startsWith('/dashboard/work-orders') ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined">assignment</span>
                                <span className="text-sm font-medium">Work Orders</span>
                            </Link>
                            <Link href="/dashboard/diagnostics" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${pathname === '/dashboard/diagnostics' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined">stethoscope</span>
                                <span className="text-sm font-medium">Diagnostics</span>
                            </Link>
                            <Link href="/dashboard/ai-assistant" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${pathname === '/dashboard/ai-assistant' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined">smart_toy</span>
                                <span className="text-sm font-medium">AI Assistant</span>
                            </Link>
                            <Link href="/dashboard/reports" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${pathname === '/dashboard/reports' ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>
                                <span className="material-symbols-outlined">description</span>
                                <span className="text-sm font-medium">Reports</span>
                            </Link>
                        </>
                    )}
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                        <div className="h-9 w-9 rounded-full bg-slate-200 bg-cover bg-center" data-alt="User profile photo" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCSS0YAzjlb0PuQJLtNOVEVdK4RQJ-msbrKIszgfqriwtJ1gSmeJjvlt99Wvow4rooIj-ybpAqj8lOTXtgQqWTvxIKbRwiUbUixaROyUXwQZy_lfqaMSGLZSaXl7w-3ixLqIVnEjZ66RCJiKQ3aipB83CPjsLbgx8cixQlyH3J1knAHvUVlQ2fUwgo_SNy1HfHTWU1HvegADcWANz8whXw60Acjuk8cT4OvnGMlEw9_eRM4xb6fMwcmCPTTzkRiB2HirxtnYM76P5Y')" }}></div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">Alex Morgan</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">Maintenance Lead</span>
                        </div>
                    </div>
                </div>
            </aside>
            {/* Main Content */}
            <div className="flex-1 h-full overflow-y-auto overflow-x-hidden">
                {children}
            </div>
        </div>
    );
}
