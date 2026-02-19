'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('password123');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/dashboard/work-orders');
        }
    };

    return (
        <div className="bg-background-light text-text-primary font-display antialiased h-screen overflow-hidden flex flex-col md:flex-row">
            <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative bg-slate-100 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 filter saturate-50 brightness-110 contrast-105"
                    data-alt="Engineer using a tablet in a clean high-tech industrial facility"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC0Mp1CCTor5SDDqxKxJsQcR8UJRTyOMbeStyU_BzXcmQOT16e6GgK-nV-o_yPWB8ZQkWbX2Lu2Kjhs5uljG2QC5ieBLi2Ml4dKv-BwgzqMuFQe1eZNVcVqGprlrtRTbtvdwm44XBtD-MfvUF1FJPs6_Qt48nbR8GlCzmIWTjC7SjGXk3NqIk61uhwysorUsLevTxSamVJps7xZ3H73KtMPymkH4b_k2Rw3K3LcrUECdqsU9klo4452oAaH1XoZcq3XvTm_hkSSEBk')" }}
                >
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-blue-50/20 mix-blend-overlay z-10"></div>
                <div className="relative z-20 flex flex-col justify-between p-12 w-full h-full text-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/50">
                            <span className="material-symbols-outlined text-3xl text-primary">shield_lock</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">Neo-DIAGDEF</span>
                    </div>
                    <div className="max-w-lg mb-10">
                        <h2 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6 text-slate-900 drop-shadow-sm">
                            Sovereign Industrial Diagnostics
                        </h2>
                        <div className="flex flex-col gap-4 border-l-4 border-primary pl-6 bg-white/40 backdrop-blur-md p-4 rounded-r-xl shadow-sm border-y border-r border-white/50">
                            <p className="text-slate-700 text-lg leading-relaxed font-medium">
                                Authorized personnel only. This system processes classified industrial telemetry and diagnostic data.
                            </p>
                            <div className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider">
                                <span className="material-symbols-outlined text-sm font-bold">encrypted</span>
                                End-to-End Encrypted
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center w-full h-full bg-background-light p-6 md:p-12 overflow-y-auto">
                <div className="w-full max-w-[480px] bg-surface-white p-8 md:p-10 rounded-2xl shadow-card border border-slate-100 flex flex-col gap-8">
                    <div className="md:hidden flex items-center gap-2 mb-2 text-slate-900 justify-center">
                        <span className="material-symbols-outlined text-3xl text-primary">shield_lock</span>
                        <span className="text-lg font-bold">Neo-DIAGDEF</span>
                    </div>
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Secure Access</h1>
                        <p className="text-slate-500 font-medium">Enter your credentials to access the mainframe.</p>
                    </div>
                    <form className="flex flex-col gap-5" onSubmit={handleLogin}>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-semibold text-slate-700">Username or Corporate Email</span>
                            <div className="relative group">
                                <input
                                    className="w-full h-12 px-4 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 focus:bg-white"
                                    placeholder="user@organization.mil"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <span className="material-symbols-outlined absolute right-4 top-3 text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                            </div>
                        </label>
                        <label className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-semibold text-slate-700">Password</span>
                                <a className="text-xs font-semibold text-primary hover:text-blue-700 hover:underline transition-colors" href="#">Forgot password?</a>
                            </div>
                            <div className="relative group">
                                <input
                                    className="w-full h-12 px-4 pr-12 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400 focus:bg-white"
                                    placeholder="••••••••••••"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button className="absolute right-0 top-0 h-full px-4 text-slate-400 hover:text-slate-600 transition-colors flex items-center" type="button">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                            </div>
                        </label>
                        <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer group">
                                <input className="sr-only peer" type="checkbox" value="" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                <span className="ms-3 text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Remember this device</span>
                            </label>
                        </div>
                        <div className="flex flex-col gap-4 mt-2">
                            {error && (
                                <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                                    {error}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/30 hover:shadow-primary/40 active:scale-[0.98] disabled:opacity-50"
                            >
                                {loading ? 'Authenticating...' : 'Sign In'}
                            </button>
                            <div className="relative flex py-2 items-center">
                                <div className="flex-grow border-t border-slate-200"></div>
                                <span className="flex-shrink-0 mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure Alternate Login</span>
                                <div className="flex-grow border-t border-slate-200"></div>
                            </div>
                            <button className="w-full h-12 flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg transition-all shadow-sm group">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-600 transition-colors">smart_card_reader</span>
                                Hardware Token / CAC Login
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col gap-6">
                        <p className="text-center text-sm text-slate-500">
                            New organization?
                            <Link className="font-bold text-primary hover:text-blue-700 hover:underline transition-colors" href="/signup">Create account</Link>
                        </p>
                        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center leading-relaxed">
                            By accessing this system, you consent to monitoring and interception. Unauthorized use is prohibited and subject to criminal and civil penalties.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
