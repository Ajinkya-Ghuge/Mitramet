import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Search,
  Filter,
  QrCode,
  Download,
  Printer,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  X,
  Scale,
  Eye,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockCertificates, currentApplicant } from '../../data/mock';
import type { Certificate } from '../../types';

export function CertificatesList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredCerts = useMemo(() => {
    return mockCertificates.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        !q ||
        c.certificateNo.toLowerCase().includes(q) ||
        c.issueDate.toLowerCase().includes(q) ||
        c.validUpto.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span onClick={() => navigate('/dashboard')} className="hover:text-blue-600 cursor-pointer">
                Dashboard
              </span>
              <span>&gt;</span>
              <span className="text-slate-800 font-medium">Certificates</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Verification Certificates
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Official digital verification certificates and QR verification stamps issued to {currentApplicant.businessName}.
            </p>
          </div>

          <button
            onClick={() => navigate('/certificates/verify')}
            className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <QrCode size={16} className="text-blue-600" />
            <span>Public QR Verification Portal</span>
          </button>
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider bg-amber-200/80 text-amber-900 text-[10px] px-2 py-0.5 rounded">
              Demo Certificates
            </span>
            <span>These records demonstrate digital stamping and public QR verification for SIH 2026.</span>
          </div>
          <span className="text-[11px] text-amber-700 hidden sm:inline">Act 2009 &bull; Rule 16</span>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by certificate number..."
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredCerts.length} active certificates
          </span>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all space-y-4"
            >
              <div>
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <Award size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        Certificate No.
                      </span>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                        {cert.certificateNo}
                      </h3>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                    Valid
                  </span>
                </div>

                <div className="py-3 text-xs space-y-1.5 border-b border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Issue Date:</span>
                    <span className="font-semibold text-slate-700">{cert.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Valid Upto:</span>
                    <span className="font-bold text-emerald-700">{cert.validUpto}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Authority:</span>
                    <span className="font-medium text-slate-700">Legal Metrology Dept</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Verifying Officer:</span>
                    <span className="font-medium text-slate-700">Inspector S. Patil</span>
                  </div>
                </div>

                {/* QR Miniature Stamping */}
                <div className="pt-2 flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                  <div className="text-[11px] text-slate-600">
                    <p className="font-bold text-slate-800">Scan for Public Verification</p>
                    <p className="text-[10px] text-slate-400">Authenticates official seal</p>
                  </div>
                  <div className="w-10 h-10 bg-white border border-slate-300 rounded flex items-center justify-center">
                    <QrCode size={24} className="text-[#1a2744]" />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="flex-1 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Eye size={13} />
                  <span>View Certificate</span>
                </button>

                <button
                  onClick={() => alert(`Downloading PDF certificate for ${cert.certificateNo}`)}
                  className="p-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-300 cursor-pointer"
                  title="Download PDF"
                >
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Inspection Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl border border-slate-300 max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 my-8">
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Official Verification Certificate
                </span>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Certificate Canvas Frame */}
              <div className="border-4 border-double border-slate-300 p-6 rounded-xl bg-slate-50/50 space-y-4 text-center">
                {/* Government Header */}
                <div className="space-y-1">
                  <div className="w-10 h-10 bg-[#1a2744] text-white rounded-lg flex items-center justify-center mx-auto mb-2 shadow-xs">
                    <Scale size={22} />
                  </div>
                  <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                    Government of Maharashtra
                  </h2>
                  <p className="text-xs font-semibold text-slate-700">
                    Department of Legal Metrology (Weights &amp; Measures)
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Certificate of Verification under Section 24 of Legal Metrology Act, 2009
                  </p>
                </div>

                <div className="border-t border-b border-slate-200 py-3 text-xs space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Certificate Reference:</span>
                    <span className="font-bold font-mono text-blue-900">{selectedCert.certificateNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Issued To (Merchant):</span>
                    <span className="font-bold text-slate-800">{currentApplicant.businessName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Owner Name:</span>
                    <span className="font-semibold text-slate-800">{currentApplicant.ownerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Premises Address:</span>
                    <span className="font-medium text-slate-700">{currentApplicant.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date of Verification:</span>
                    <span className="font-semibold text-slate-800">{selectedCert.issueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Valid Through:</span>
                    <span className="font-bold text-emerald-800">{selectedCert.validUpto}</span>
                  </div>
                </div>

                {/* QR Verification Seal Footer */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <div className="text-left text-[11px] text-slate-600 space-y-1">
                    <p className="font-bold text-slate-900">Verified by Inspector S. Patil</p>
                    <p className="text-slate-500">Legal Metrology Officer, Zone 1</p>
                    <span className="inline-block text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Digitally Verified &amp; Stamped
                    </span>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-white border border-slate-300 rounded-lg p-1.5 flex items-center justify-center shadow-xs mx-auto mb-1">
                      <QrCode size={52} className="text-[#1a2744]" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">Scan to Verify</span>
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => handleCopy(selectedCert.qrCode)}
                  className="text-xs text-slate-600 hover:text-blue-600 font-medium inline-flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Verification QR Link'}</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Printer size={13} />
                    <span>Print Certificate</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCert(null);
                      navigate('/certificates/verify');
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ExternalLink size={13} />
                    <span>Public Verify Page</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
