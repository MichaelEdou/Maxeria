
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-surface-border bg-white/90 backdrop-blur-md px-6 py-4 lg:px-10 shadow-sm">
        <div className="flex items-center gap-3 text-text-main">
          <div className="flex items-center justify-center size-8 rounded bg-primary text-white shadow-sm">
            <span className="material-symbols-outlined text-xl">shield_lock</span>
          </div>
          <h2 className="text-text-main text-xl font-bold leading-tight tracking-tight">Neo-DIAGDEF</h2>
        </div>
        <nav className="hidden md:flex flex-1 justify-center gap-8">
          <a className="text-text-muted hover:text-primary text-sm font-medium leading-normal transition-colors" href="#features">Features</a>
          <a className="text-text-muted hover:text-primary text-sm font-medium leading-normal transition-colors" href="#security">Security</a>
          <a className="text-text-muted hover:text-primary text-sm font-medium leading-normal transition-colors" href="#integration">Integration</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:flex h-9 items-center justify-center px-4 rounded-lg bg-transparent border border-surface-border hover:bg-slate-50 hover:border-slate-300 text-text-main text-sm font-semibold transition-all">
            Login
          </Link>
          <button className="flex h-9 items-center justify-center px-4 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-semibold shadow-[0_2px_10px_rgba(19,127,236,0.3)] transition-all">
            Request Demo
          </button>
        </div>
      </header>
      <main className="flex-grow pt-20">
        <section className="relative flex min-h-[600px] flex-col items-center justify-center px-4 py-20 lg:py-32 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-white z-0"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.6] grid-bg z-0 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none z-0"></div>
          <div className="relative z-10 flex flex-col gap-6 items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-semibold text-primary-dark uppercase tracking-wider">System Operational</span>
            </div>
            <h1 className="text-accent-navy text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              Sovereign <br />
              <span className="text-primary">Industrial Intelligence</span>
            </h1>
            <p className="text-text-muted text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
              Optimizing defense logistics with the MAXER method and offline-first AI-driven maintenance. Secure. Autonomous. Precise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center">
              <button className="flex h-12 min-w-[160px] items-center justify-center rounded-lg bg-primary hover:bg-primary-dark text-white text-base font-bold transition-all shadow-[0_4px_14px_rgba(19,127,236,0.4)] hover:shadow-[0_6px_20px_rgba(19,127,236,0.6)] hover:-translate-y-0.5">
                Explore Capabilities
              </button>
              <button className="flex h-12 min-w-[160px] items-center justify-center rounded-lg bg-white border border-surface-border hover:border-primary/50 hover:bg-slate-50 text-text-main text-base font-bold transition-all group shadow-sm">
                <span className="material-symbols-outlined mr-2 group-hover:translate-x-1 transition-transform text-xl text-primary">play_circle</span>
                Watch Briefing
              </button>
            </div>
          </div>
        </section>
        <div className="w-full border-y border-surface-border bg-background-subtle">
          <div className="max-w-7xl mx-auto px-6 py-10 flex flex-wrap justify-center md:justify-between items-center gap-8">
            <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 group">
              <span className="material-symbols-outlined text-3xl text-text-main group-hover:text-primary">verified_user</span>
              <span className="font-mono text-sm font-bold tracking-widest uppercase text-text-muted group-hover:text-text-main">NATO Compliant</span>
            </div>
            <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 group">
              <span className="material-symbols-outlined text-3xl text-text-main group-hover:text-primary">encrypted</span>
              <span className="font-mono text-sm font-bold tracking-widest uppercase text-text-muted group-hover:text-text-main">AES-256 Encryption</span>
            </div>
            <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 group">
              <span className="material-symbols-outlined text-3xl text-text-main group-hover:text-primary">cloud_off</span>
              <span className="font-mono text-sm font-bold tracking-widest uppercase text-text-muted group-hover:text-text-main">Air-Gapped Ready</span>
            </div>
            <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 group">
              <span className="material-symbols-outlined text-3xl text-text-main group-hover:text-primary">precision_manufacturing</span>
              <span className="font-mono text-sm font-bold tracking-widest uppercase text-text-muted group-hover:text-text-main">ISO 55000</span>
            </div>
          </div>
        </div>
        <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto bg-white" id="features">
          <div className="flex flex-col gap-4 mb-16 items-center text-center">
            <h2 className="text-accent-navy text-3xl md:text-4xl font-bold leading-tight tracking-tight max-w-[720px]">
              Core Capabilities
            </h2>
            <p className="text-text-muted text-lg font-normal leading-relaxed max-w-[720px]">
              Advanced diagnostic methodologies designed for sovereign industrial autonomy and rapid decision making.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative flex flex-col gap-5 rounded-2xl border border-surface-border bg-white p-8 shadow-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="size-14 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">analytics</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-accent-navy text-xl font-bold">MAXER Methodology</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Structured failure analysis that identifies root causes faster. Reduce downtime with systematic diagnostic workflows tailored for heavy industry.
                </p>
              </div>
            </div>
            <div className="group relative flex flex-col gap-5 rounded-2xl border border-surface-border bg-white p-8 shadow-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="size-14 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">wifi_off</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-accent-navy text-xl font-bold">Offline-First Architecture</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Mission-critical operations cannot depend on connectivity. Our local-first database syncs seamlessly when connection is restored.
                </p>
              </div>
            </div>
            <div className="group relative flex flex-col gap-5 rounded-2xl border border-surface-border bg-white p-8 shadow-card hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <div className="size-14 rounded-xl bg-primary-light flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl">psychology</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-accent-navy text-xl font-bold">AI-RAG Engine</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Retrieval-Augmented Generation provides technicians with instant, context-aware guidance from technical manuals without hallucinations.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-24 bg-background-subtle border-y border-surface-border relative overflow-hidden" id="security">
          <div className="absolute -right-[10%] top-0 h-full w-1/2 bg-gradient-to-l from-white to-transparent pointer-events-none opacity-50"></div>
          <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider bg-white px-3 py-1 rounded-full shadow-sm border border-surface-border">
                <span className="material-symbols-outlined text-lg">shield</span>
                Sovereign Security
              </div>
              <h2 className="text-accent-navy text-3xl md:text-5xl font-black leading-tight tracking-tight">
                Defense-Grade <br />Data Protection.
              </h2>
              <p className="text-text-muted text-lg leading-relaxed">
                Your operational intelligence remains under your control. With end-to-end encryption and zero-trust architecture, Neo-DIAGDEF ensures that sensitive diagnostic data never leaves your secure perimeter unless authorized.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3">
                  <div className="bg-white rounded-full p-1 shadow-sm text-primary mt-0.5">
                    <span className="material-symbols-outlined text-xl block">check_circle</span>
                  </div>
                  <div>
                    <h4 className="text-accent-navy font-bold">On-Premise Deployment</h4>
                    <p className="text-text-muted text-sm">Full control over infrastructure and data residency.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white rounded-full p-1 shadow-sm text-primary mt-0.5">
                    <span className="material-symbols-outlined text-xl block">check_circle</span>
                  </div>
                  <div>
                    <h4 className="text-accent-navy font-bold">Role-Based Access Control</h4>
                    <p className="text-text-muted text-sm">Granular permissions for technicians, engineers, and auditors.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex-1 relative">
              <div className="relative rounded-2xl overflow-hidden border border-surface-border shadow-2xl bg-white aspect-video group transform transition-transform hover:scale-[1.02] duration-500">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 pointer-events-none"></div>
                <div className="w-full h-full bg-cover bg-center" data-alt="Abstract server room with secure blue lighting representing data security" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBkggIlrKPwF3pigUVPqQPxqw0EBm9zSfpElP9dswg0mJDOzVF45z4tLs1k9PgGu_7xDJmkyzNXw38Kh_W4pHajVege3hPQrCRWsk_eBEe-lLis_w0e-ywWxmbghBbBzPagA4lfeih4bzRn3Ak371hc_FavqXEjKJkyq_3wTSVm3Zmy8zU1tAp-8NFQpJ_9HD2lALDdbD_xZFagn10oSJMLlI9eTpr1eT8njT1oqQWj0O8RKDJfOuTmAWLQl79jhkE7ggdclFSt9oA')" }}></div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-surface-border p-4 rounded-xl z-20 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                      <span className="material-symbols-outlined">lock</span>
                    </div>
                    <div>
                      <div className="text-accent-navy font-bold text-sm">System Status</div>
                      <div className="text-green-600 text-xs font-mono font-bold">SECURE • ENCRYPTED</div>
                    </div>
                  </div>
                  <div className="text-text-muted text-xs font-mono border border-surface-border px-2 py-1 rounded bg-slate-50">
                    AES-256
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-60 h-60 bg-primary/10 rounded-full blur-[60px] -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-400/10 rounded-full blur-[60px] -z-10"></div>
            </div>
          </div>
        </section>
        <section className="py-24 px-4 md:px-10 max-w-7xl mx-auto" id="integration">
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-8 md:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] grid-bg z-0 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center gap-8 max-w-3xl mx-auto">
              <div className="size-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-white mb-2 shadow-inner border border-white/10">
                <span className="material-symbols-outlined text-4xl">hub</span>
              </div>
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                Seamless Integration
              </h2>
              <p className="text-slate-300 text-lg">
                Connects effortlessly with your existing CMMS infrastructure. Compatible with SAP, IBM Maximo, and custom military logistics software via REST API.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                <div className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 text-xs font-mono font-bold uppercase backdrop-blur-sm hover:bg-white/10 transition-colors">SAP S/4HANA</div>
                <div className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 text-xs font-mono font-bold uppercase backdrop-blur-sm hover:bg-white/10 transition-colors">IBM Maximo</div>
                <div className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 text-xs font-mono font-bold uppercase backdrop-blur-sm hover:bg-white/10 transition-colors">Oracle SCM</div>
                <div className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-300 text-xs font-mono font-bold uppercase backdrop-blur-sm hover:bg-white/10 transition-colors">IFS Applications</div>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full justify-center">
                <button className="flex h-12 px-8 items-center justify-center rounded-lg bg-white text-slate-900 text-base font-bold hover:bg-slate-100 transition-colors shadow-lg">
                  View Documentation
                </button>
                <button className="flex h-12 px-8 items-center justify-center rounded-lg bg-transparent border border-white/20 text-white text-base font-bold hover:bg-white/10 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-surface-border bg-white py-16 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-2 text-accent-navy">
              <span className="material-symbols-outlined text-primary">shield_lock</span>
              <h3 className="text-lg font-bold">Neo-DIAGDEF</h3>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Sovereign industrial intelligence platform for defense and critical infrastructure.
            </p>
            <div className="text-text-muted text-xs">
              © 2024 Neo-DIAGDEF Systems. All rights reserved.
            </div>
          </div>
          <div className="flex gap-16 flex-wrap">
            <div className="flex flex-col gap-4">
              <h4 className="text-accent-navy text-sm font-bold uppercase tracking-wider">Platform</h4>
              <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Features</a>
              <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Security</a>
              <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Integrations</a>
              <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Changelog</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-accent-navy text-sm font-bold uppercase tracking-wider">Company</h4>
              <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">About Us</a>
              <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Careers</a>
              <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Contact</a>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-accent-navy text-sm font-bold uppercase tracking-wider">Legal</h4>
              <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Privacy Policy</a>
              <a className="text-text-muted hover:text-primary text-sm transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
