import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Scale,
  QrCode,
  Search,
  CheckCircle2,
  ShieldCheck,
  Building,
  Calendar,
  Award,
  ArrowLeft,
  Printer,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import { mockCertificates, currentApplicant } from '../../data/mock';

export function PublicVerify() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [inputRef, setInputRef] = useState(id || 'MH-LM-2026-8841');
  const [searchedCert, setSearchedCert] = useState<any>(() => {
    return mockCertificates[0];
  });
  const [copied, setCopied] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputRef.trim().toUpperCase();
    const found = mockCertificates.find(
      (c) => c.certificateNo.toUpperCase() === query || c.id.toUpperCase() === query
    );
    if (found) {
      setSearchedCert(found);
    } else {
      setSearchedCert(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-[#1a2744] text-white py-3.5 px-4 sm:px-8 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-white/10 p-1.5 rounded-md">
            <Scale size={20} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-base leading-none block">LegalMetrix</span>
            <span className="text-[10px] text-white/60">Department of Legal Metrology, Maharashtra</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-md transition-colors cursor-pointer"
        >
          Merchant Sign In
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Title */}
        <div className="text-center pt-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            <QrCode size={13} className="text-blue-600" />
            <span>Public Verification Portal (Section 24)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Authenticate Instrument Certificate
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Verify the legal validity and tamper-evident digital seal of any commercial weighing or measuring instrument in Maharashtra.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={inputRef}
                onChange={(e) => setInputRef(e.target.value)}
                placeholder="Enter Certificate No (e.g. MH-LM-2026-8841)"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Verify Now
            </button>
          </form>
        </div>

        {/* Certificate Display Canvas */}
        {searchedCert ? (
          <div className="bg-white rounded-2xl border-2 border-slate-300 p-6 sm:p-8 shadow-md space-y-5">
            {/* Stamp Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Official Certificate: Valid &amp; Active
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 mt-1 font-mono">
                    {searchedCert.certificateNo}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 bg-slate-50 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Printer size={13} />
                <span>Print Copy</span>
              </button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Commercial Establishment</span>
                <p className="font-bold text-slate-800 mt-0.5">{currentApplicant.businessName}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Proprietor: {currentApplicant.ownerName}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Physical Premises</span>
                <p className="font-medium text-slate-800 mt-0.5">{currentApplicant.address}</p>
                <p className="text-[11px] text-slate-500">Chhatrapati Sambhaji Nagar, Maharashtra</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Date of Verification</span>
                <p className="font-bold text-slate-800 mt-0.5">{searchedCert.issueDate}</p>
                <p className="text-[11px] text-slate-500">Physical testing completed</p>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200">
                <span className="text-emerald-700 block text-[11px] font-semibold">Statutory Validity Until</span>
                <p className="font-bold text-emerald-900 text-sm mt-0.5">{searchedCert.validUpto}</p>
                <p className="text-[10px] text-emerald-700 mt-0.5">Lawfully certified for commercial transactions</p>
              </div>
            </div>

            {/* QR Seal & Authority Footer */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 space-y-1 text-center sm:text-left">
                <p className="font-bold text-slate-900">Department of Legal Metrology (Weights &amp; Measures)</p>
                <p className="text-[11px] text-slate-500">Verified by: Inspector S. Patil (Senior Inspector, Zone 1)</p>
                <p className="text-[10px] font-mono text-slate-400">Cryptographic Seal ID: 8841-A92-CERT-MAH</p>
              </div>

              <div className="text-center flex-shrink-0">
                <div className="w-16 h-16 bg-white border border-slate-300 rounded-lg p-1.5 flex items-center justify-center shadow-xs mx-auto mb-1">
                  <QrCode size={52} className="text-[#1a2744]" />
                </div>
                <span className="text-[9px] text-slate-400 font-mono">Live Stamped QR</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-xs space-y-2">
            <AlertCircle size={32} className="text-amber-500 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">Certificate Reference Not Found</h3>
            <p className="text-slate-500 max-w-xs mx-auto">
              Please check the certificate number. Try testing with demo reference <strong>MH-LM-2026-8841</strong>.
            </p>
          </div>
        )}

        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Return to LegalMetrix Home</span>
          </button>
        </div>
      </main>
    </div>
  );
}
