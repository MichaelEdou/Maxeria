'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate signup delay or logic here if needed
        router.push('/dashboard');
    };

    return (
        <div className="bg-white font-display text-[#161616] min-h-screen flex flex-col antialiased selection:bg-[#0f62fe]/10 selection:text-[#0f62fe]">
            <style jsx global>{`
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar-thumb {
                    background-color: rgba(15, 98, 254, 0.2);
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background-color: rgba(15, 98, 254, 0.4);
                }
            `}</style>
            <div className="flex flex-1 min-h-screen">
                <div className="hidden lg:flex flex-col relative w-1/3 max-w-[480px] bg-gradient-to-br from-[#f2f4f8] to-[#e0e7ff] p-12 justify-between overflow-hidden border-r border-slate-200">
                    <div className="absolute inset-0 z-0 opacity-40 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
                    <div className="absolute -left-20 top-20 w-60 h-60 bg-indigo-50 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8 text-[#0f62fe]">
                            <span className="material-symbols-outlined text-4xl">precision_manufacturing</span>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-800">Neo-DIAGDEF</h2>
                        </div>
                        <h1 className="text-4xl font-bold leading-tight mb-6 text-slate-900">Sovereign Industrial Diagnostics</h1>
                        <p className="text-[#525252] text-lg leading-relaxed">Secure, compliant, and real-time diagnostic intelligence for mission-critical infrastructure.</p>
                    </div>
                    <div className="relative z-10 space-y-6 mt-12">
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm transition-all hover:shadow-md hover:bg-white/80">
                            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                                <span className="material-symbols-outlined">verified_user</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 text-sm">ISO 27001 Compliant</h3>
                                <p className="text-xs text-slate-500 mt-1">Certified information security management systems.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm transition-all hover:shadow-md hover:bg-white/80">
                            <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 shrink-0">
                                <span className="material-symbols-outlined">dns</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 text-sm">Sovereign Deployment</h3>
                                <p className="text-xs text-slate-500 mt-1">Data residency guaranteed within jurisdictional control.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm transition-all hover:shadow-md hover:bg-white/80">
                            <div className="p-2.5 rounded-lg bg-teal-50 text-teal-600 shrink-0">
                                <span className="material-symbols-outlined">lock</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 text-sm">End-to-End Encryption</h3>
                                <p className="text-xs text-slate-500 mt-1">Military-grade encryption for data at rest and in transit.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative z-10 pt-8 mt-auto border-t border-slate-200/50">
                        <p className="text-xs text-slate-400">© 2024 Neo-DIAGDEF Systems. All rights reserved.</p>
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 relative bg-white">
                    <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-slate-900">
                        <span className="material-symbols-outlined text-[#0f62fe] text-3xl">precision_manufacturing</span>
                        <span className="font-bold text-xl">Neo-DIAGDEF</span>
                    </div>
                    <div className="w-full max-w-[580px] mx-auto space-y-10">
                        <div className="text-center lg:text-left space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create Account</h2>
                            <p className="text-[#525252]">Secure registration for authorized personnel only.</p>
                        </div>
                        <form className="space-y-6" onSubmit={handleSignup}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-slate-700" htmlFor="fullName">Full Name</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                            <span className="material-symbols-outlined text-[20px]">person</span>
                                        </span>
                                        <input className="block w-full rounded-lg border-slate-200 bg-white pl-10 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0f62fe] focus:ring-1 focus:ring-[#0f62fe] h-11 transition-shadow hover:border-slate-300 shadow-sm" id="fullName" placeholder="John Doe" type="text" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-slate-700" htmlFor="email">Professional Email</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                            <span className="material-symbols-outlined text-[20px]">mail</span>
                                        </span>
                                        <input className="block w-full rounded-lg border-slate-200 bg-white pl-10 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0f62fe] focus:ring-1 focus:ring-[#0f62fe] h-11 transition-shadow hover:border-slate-300 shadow-sm" id="email" placeholder="name@company.com" type="email" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-semibold text-slate-700" htmlFor="organization">Organization / Unit</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                            <span className="material-symbols-outlined text-[20px]">apartment</span>
                                        </span>
                                        <input className="block w-full rounded-lg border-slate-200 bg-white pl-10 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0f62fe] focus:ring-1 focus:ring-[#0f62fe] h-11 transition-shadow hover:border-slate-300 shadow-sm" id="organization" placeholder="e.g. Diagnostics Team A" type="text" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-semibold text-slate-700" htmlFor="accessCode">Access Code</label>
                                        <div className="group relative cursor-help">
                                            <span className="material-symbols-outlined text-slate-400 text-[18px]">info</span>
                                            <div className="absolute bottom-full right-0 mb-2 hidden w-48 rounded bg-slate-800 p-2 text-xs text-white shadow-lg group-hover:block z-50">
                                                This code is provided by your system administrator.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                            <span className="material-symbols-outlined text-[20px]">vpn_key</span>
                                        </span>
                                        <input className="block w-full rounded-lg border-slate-200 bg-white pl-10 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0f62fe] focus:ring-1 focus:ring-[#0f62fe] h-11 transition-shadow hover:border-slate-300 shadow-sm" id="accessCode" placeholder="XXXX-XXXX-XXXX" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-slate-700" htmlFor="password">Password</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                        <span className="material-symbols-outlined text-[20px]">lock</span>
                                    </span>
                                    <input className="block w-full rounded-lg border-slate-200 bg-white pl-10 text-sm text-slate-900 placeholder-slate-400 focus:border-[#0f62fe] focus:ring-1 focus:ring-[#0f62fe] h-11 transition-shadow hover:border-slate-300 shadow-sm" id="password" placeholder="Create a secure password" type="password" />
                                    <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600" type="button">
                                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Must be at least 12 characters with symbols.</p>
                            </div>
                            <div className="flex items-start gap-3 pt-2">
                                <div className="flex h-5 items-center">
                                    <input className="h-4 w-4 rounded border-slate-300 text-[#0f62fe] focus:ring-[#0f62fe]" id="terms" name="terms" type="checkbox" />
                                </div>
                                <div className="text-sm">
                                    <label className="font-medium text-slate-600" htmlFor="terms">I agree to the <a className="text-[#0f62fe] hover:text-[#0043ce] underline decoration-slate-300 underline-offset-2 hover:decoration-[#0f62fe]" href="#">Terms of Service</a> and <a className="text-[#0f62fe] hover:text-[#0043ce] underline decoration-slate-300 underline-offset-2 hover:decoration-[#0f62fe]" href="#">Privacy Policy</a>.</label>
                                </div>
                            </div>
                            <div className="pt-6">
                                <button className="flex w-full justify-center rounded-lg bg-[#0f62fe] px-4 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg hover:bg-[#0043ce] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0f62fe] transition-all active:scale-[0.99]" type="submit">
                                    Create Account
                                </button>
                            </div>
                        </form>
                        <div className="text-center pt-2">
                            <p className="text-sm text-slate-500">
                                Already have an account?{' '}
                                <Link className="font-semibold text-[#0f62fe] hover:text-[#0043ce] transition-colors" href="/login">Log in</Link>
                            </p>
                        </div>
                    </div>
                    <div className="lg:hidden absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
}
