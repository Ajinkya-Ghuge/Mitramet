import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scale,
  ClipboardList,
  Search,
  QrCode,
  CheckCircle2,
  Clock,
  FileText,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Building2,
  Users,
  BarChart3,
  Smartphone,
  Globe,
  Lock,
} from 'lucide-react';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import heroBanner from '../../assets/hero-banner.png';

// ─── Workflow step data ────────────────────────────────────────────────────────
const workflowSteps = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Submit Application',
    description:
      'Fill in your business details, instrument information and upload the required documents online.',
  },
  {
    step: '02',
    icon: FileText,
    title: 'Department Review',
    description:
      'The Legal Metrology department reviews your application, verifies documents and schedules an inspection.',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Field Inspection',
    description:
      'A licensed Weights & Measures Inspector visits your premises and carries out the physical verification.',
  },
  {
    step: '04',
    icon: CheckCircle2,
    title: 'Certificate Issued',
    description:
      'Upon successful verification, a digital certificate is issued with a unique QR code for public verification.',
  },
];

// ─── Feature data ──────────────────────────────────────────────────────────────
const features = [
  {
    icon: Globe,
    title: 'Online Application',
    description: 'Apply for fresh verification or re-verification entirely online, at any time.',
  },
  {
    icon: Clock,
    title: 'Real-Time Tracking',
    description: 'Track your application status at every stage — from submission to certificate issue.',
  },
  {
    icon: QrCode,
    title: 'QR-Based Verification',
    description: 'Every certificate carries a tamper-evident QR code for instant public verification.',
  },
  {
    icon: Smartphone,
    title: 'Digital Passport',
    description: 'Each instrument gets a permanent digital record of all its verifications and certificates.',
  },
  {
    icon: Users,
    title: 'Officer Dashboard',
    description: 'Field officers access their assigned cases, record observations and submit results digitally.',
  },
  {
    icon: BarChart3,
    title: 'Admin Analytics',
    description: 'Department administrators monitor caseloads, track SLA compliance and generate reports.',
  },
  {
    icon: Lock,
    title: 'Secure and Auditable',
    description: 'Every action is timestamped and attributed, providing a complete audit trail.',
  },
  {
    icon: Building2,
    title: 'Multi-District Support',
    description: 'Designed for district-level Legal Metrology offices across Maharashtra.',
  },
];

// ─── Instrument categories ─────────────────────────────────────────────────────
const instrumentCategories = [
  'Electronic Weighing Scales',
  'Petrol & LPG Dispensers',
  'Measuring Tapes & Rulers',
  'Water & Milk Meters',
  'Platform & Truck Scales',
  'Thermal Printers (POS)',
  'Retail Weighing Machines',
  'Other Approved Instruments',
];

// ─── Component ─────────────────────────────────────────────────────────────────
export function LandingPage() {
  const navigate = useNavigate();
  const [trackId, setTrackId] = useState('');

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (trackId.trim()) {
      navigate(`/applications/${trackId.trim()}`);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PublicNavbar />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden bg-[#05182d] text-white border-b border-slate-800"
        style={{
          backgroundImage: `url(${heroBanner})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right center',
          backgroundSize: 'cover',
        }}
      >
        {/* Navy gradient overlay on the left to ensure high contrast and readable text */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, #05182d 0%, #05182df0 35%, #05182d99 60%, transparent 100%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            {/* Left copy (7 columns) */}
            <div className="md:col-span-7">
              {/* Gov badge */}
              <div className="inline-flex items-center gap-2 bg-blue-950/80 border border-blue-500/30 rounded-full px-3 py-1 mb-6 backdrop-blur-sm shadow-inner">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                <span className="text-xs font-medium text-blue-200">
                  Government of Maharashtra — Legal Metrology Department
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
                Online Verification System for{' '}
                <span className="text-blue-400">Weighing &amp; Measuring Instruments</span>
              </h1>

              <p className="text-base text-slate-300 leading-relaxed mb-8 max-w-xl">
                LegalMetrix digitizes the complete lifecycle of instrument verification —
                from application submission and officer inspection to certificate issuance and
                re-verification tracking.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-6 py-3 rounded-md text-sm transition-all shadow-md hover:shadow-blue-500/25 cursor-pointer"
                >
                  Apply for Verification
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate('/track')}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-md font-semibold px-6 py-3 rounded-md text-sm transition-all cursor-pointer"
                >
                  <Search size={16} />
                  Track Application
                </button>
              </div>

              {/* Quick track bar */}
              <div className="bg-slate-900/60 border border-slate-700/60 backdrop-blur-md p-3.5 rounded-lg max-w-md">
                <p className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Search size={13} className="text-blue-400" /> Quick Status Tracker
                </p>
                <form onSubmit={handleTrack} className="flex gap-2">
                  <input
                    type="text"
                    value={trackId}
                    onChange={e => setTrackId(e.target.value)}
                    placeholder="e.g. LM-2026-001482"
                    className="flex-1 bg-slate-950/70 border border-slate-700 rounded-md px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                  >
                    Track
                  </button>
                </form>
                <p className="text-[11px] text-slate-400 mt-2">Enter your Application Number to check its real-time stage.</p>
              </div>
            </div>

            {/* Right — Floating Glass Badge & Quick Stats (5 columns) */}
            <div className="md:col-span-5 flex justify-end">
              <div className="bg-[#0b1b33]/85 backdrop-blur-md border border-white/15 text-white rounded-xl p-5 w-full max-w-sm shadow-2xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-500/20 border border-blue-400/30 rounded p-1.5">
                      <Scale size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-none">LegalMetrix</p>
                      <p className="text-[10px] text-blue-200/70 mt-0.5">Prototype — SIH 2026</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Live Portal
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { label: 'Applications (Demo)', value: '1,248' },
                    { label: 'Certificates Issued', value: '896' },
                    { label: 'Officers Active', value: '43' },
                    { label: 'Districts Covered', value: '12' },
                  ].map(s => (
                    <div key={s.label} className="bg-white/5 border border-white/10 rounded-lg p-2.5">
                      <p className="text-lg font-bold text-white">{s.value}</p>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Certificate verify entry */}
                <div
                  onClick={() => navigate('/certificates/verify')}
                  className="group bg-blue-600/20 hover:bg-blue-600/30 border border-blue-400/30 rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-all"
                >
                  <div className="bg-blue-600/40 rounded p-2 text-blue-300 group-hover:text-white transition-colors">
                    <QrCode size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-white">Instant QR Verification</p>
                    <p className="text-[11px] text-slate-300">Scan QR on any verified instrument</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                </div>

                <p className="text-[10px] text-slate-400 mt-3 text-center">
                  Notice: Digital demonstration prototype for hackathon evaluation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900">How It Works</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
              The end-to-end verification workflow, digitized — from application to certificate.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((s, i) => (
              <div key={s.step} className="bg-white rounded-lg border border-slate-200 p-5 relative shadow-sm">
                {/* Connector arrow (not on last) */}
                {i < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight size={20} className="text-slate-300" />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-slate-400 font-mono">{s.step}</span>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <s.icon size={18} className="text-blue-600" />
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTRUMENT TYPES ── */}
      <section className="py-14 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-start gap-12">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Instruments Covered</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                The system supports verification for all categories of instruments regulated under
                the Legal Metrology Act, 2009.
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Apply for Verification <ArrowRight size={14} />
              </button>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {instrumentCategories.map(cat => (
                <div
                  key={cat}
                  className="flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-md px-3 py-2.5"
                >
                  <CheckCircle2 size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-700 font-medium leading-tight">{cat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900">Platform Features</h2>
            <p className="text-sm text-slate-500 mt-2">
              Built for applicants, field officers and department administrators.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(f => (
              <div key={f.title} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:border-blue-300 transition-colors">
                <div className="bg-slate-100 rounded-lg w-9 h-9 flex items-center justify-center mb-3">
                  <f.icon size={18} className="text-slate-600" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLE CTA CARDS ── */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 text-center mb-8">Access Your Portal</h2>
          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {/* Applicant */}
            <div className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group" onClick={() => navigate('/dashboard')}>
              <div className="bg-blue-50 rounded-lg w-10 h-10 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                <ClipboardList size={20} className="text-blue-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Applicant / Business Owner</h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Submit and track verification applications, view certificates and manage instruments.
              </p>
              <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                Go to Applicant Portal <ChevronRight size={13} />
              </span>
            </div>

            {/* Officer */}
            <div className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group" onClick={() => navigate('/officer/dashboard')}>
              <div className="bg-indigo-50 rounded-lg w-10 h-10 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                <ShieldCheck size={20} className="text-indigo-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Field Officer / Inspector</h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                View assigned cases, record field observations and submit verification results.
              </p>
              <span className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
                Go to Officer Portal <ChevronRight size={13} />
              </span>
            </div>

            {/* Admin */}
            <div className="border border-slate-200 rounded-lg p-5 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer group" onClick={() => navigate('/admin/dashboard')}>
              <div className="bg-slate-100 rounded-lg w-10 h-10 flex items-center justify-center mb-3 group-hover:bg-slate-200 transition-colors">
                <BarChart3 size={20} className="text-slate-600" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Department Administrator</h3>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Review applications, assign officers, monitor case status and view analytics.
              </p>
              <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                Go to Admin Dashboard <ChevronRight size={13} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROTOTYPE NOTICE BANNER ── */}
      <div className="bg-amber-50 border-t border-amber-200 py-3 px-4">
        <p className="text-xs text-amber-800 text-center max-w-3xl mx-auto">
          <strong>Prototype Notice:</strong> LegalMetrix is a demonstration prototype submitted for Smart India Hackathon 2026 (PS 26036).
          All data is synthetic. This system does not issue legally valid certificates or interact with any government database.
        </p>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a2744] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-white/10 rounded p-1.5">
                  <Scale size={16} className="text-white" />
                </div>
                <span className="font-bold text-sm">LegalMetrix</span>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                Online verification system for weighing and measuring instruments.
                Department of Legal Metrology, Government of Maharashtra.
              </p>
            </div>

            {/* Applicants */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">For Applicants</h4>
              <ul className="space-y-2">
                {['Apply for Verification', 'Track Application', 'View Certificates', 'My Instruments', 'Re-verification'].map(l => (
                  <li key={l}>
                    <button onClick={() => navigate('/dashboard')} className="text-xs text-white/70 hover:text-white transition-colors text-left">
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Department */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">Department</h4>
              <ul className="space-y-2">
                {['Officer Login', 'Admin Dashboard', 'Inspection Records', 'Certificate Registry', 'Analytics'].map(l => (
                  <li key={l}>
                    <button onClick={() => navigate('/login')} className="text-xs text-white/70 hover:text-white transition-colors text-left">
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">Resources</h4>
              <ul className="space-y-2">
                {['Verify Certificate (QR)', 'Help &amp; Support', 'Legal Metrology Act 2009', 'Fee Schedule', 'Contact Department'].map(l => (
                  <li key={l}>
                    <button className="text-xs text-white/70 hover:text-white transition-colors text-left">
                      {l}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[11px] text-white/40">
              © 2026 LegalMetrix — SIH 2026 Prototype | PS 26036
            </p>
            <div className="flex gap-4">
              <button className="text-[11px] text-white/40 hover:text-white/70">Privacy Policy</button>
              <button className="text-[11px] text-white/40 hover:text-white/70">Terms of Use</button>
              <button className="text-[11px] text-white/40 hover:text-white/70">Disclaimer</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
