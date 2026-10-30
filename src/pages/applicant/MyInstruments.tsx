import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scale,
  Fuel,
  Database,
  Plus,
  Search,
  Filter,
  QrCode,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Download,
  FileText,
  X,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockInstruments, currentApplicant } from '../../data/mock';
import type { MockInstrumentItem } from '../../data/mock';

export function MyInstruments() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedPassport, setSelectedPassport] = useState<MockInstrumentItem | null>(null);

  const filteredInstruments = useMemo(() => {
    return mockInstruments.filter((inst) => {
      const matchesCat = categoryFilter === 'All' ? true : inst.type === categoryFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        inst.type.toLowerCase().includes(q) ||
        inst.make.toLowerCase().includes(q) ||
        inst.model.toLowerCase().includes(q) ||
        inst.serialNumber.toLowerCase().includes(q);

      return matchesCat && matchesQuery;
    });
  }, [categoryFilter, searchQuery]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Petrol Dispenser':
      case 'LPG Dispenser':
        return <Fuel size={22} className="text-blue-600" />;
      case 'Measuring Tank':
        return <Database size={22} className="text-emerald-600" />;
      case 'Electronic Weighing Scale':
      default:
        return <Scale size={22} className="text-indigo-600" />;
    }
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
              <span className="text-slate-800 font-medium">My Instruments</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              My Instruments (Digital Passport)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Certified weighing and measuring equipment deployed at {currentApplicant.businessName}.
            </p>
          </div>

          <button
            onClick={() => navigate('/applications/new')}
            className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>Verify New Instrument</span>
          </button>
        </div>

        {/* 4 Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Total Registered</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">{mockInstruments.length}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Commercial Instruments</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Active &amp; Certified</span>
            <p className="text-2xl font-bold text-emerald-700 mt-1">3</p>
            <p className="text-[11px] text-emerald-600 mt-0.5">Valid QR Verification</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Due for Re-verification</span>
            <p className="text-2xl font-bold text-amber-600 mt-1">1</p>
            <p className="text-[11px] text-amber-700 mt-0.5">Expiring in 42 Days</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Compliance Rate</span>
            <p className="text-2xl font-bold text-blue-600 mt-1">100%</p>
            <p className="text-[11px] text-blue-700 mt-0.5">Zero Infringements</p>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by make, model, or serial..."
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={13} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Electronic Weighing Scale">Weighing Scales</option>
              <option value="Petrol Dispenser">Fuel Dispensers</option>
              <option value="Measuring Tank">Storage Tanks</option>
            </select>
          </div>
        </div>

        {/* Instruments Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredInstruments.map((inst) => (
            <div
              key={inst.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 transition-all space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      {getIcon(inst.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 leading-tight">
                        {inst.type}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">{inst.make} • {inst.model}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                    Valid
                  </span>
                </div>

                {/* Specs List */}
                <div className="py-3 text-xs space-y-1.5 border-b border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Serial Number:</span>
                    <span className="font-mono font-bold text-slate-800">{inst.serialNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Capacity / Range:</span>
                    <span className="font-semibold text-slate-700">{inst.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Least Count:</span>
                    <span className="font-semibold text-slate-700">{inst.leastCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Validity:</span>
                    <span className="font-semibold text-emerald-700">Till {inst.validityTill}</span>
                  </div>
                </div>

                {/* Re-verification badge alert */}
                {inst.serialNumber === 'DS-1003' && (
                  <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between text-xs text-amber-900">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} className="text-amber-700" />
                      <span className="font-semibold text-[11px]">Re-verification Due in 42 Days</span>
                    </div>
                    <button
                      onClick={() => navigate('/applications/new')}
                      className="text-[10px] font-bold text-amber-900 underline hover:text-amber-700"
                    >
                      Renew
                    </button>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setSelectedPassport(inst)}
                  className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-lg text-xs border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FileText size={13} className="text-blue-600" />
                  <span>Digital Passport</span>
                </button>

                <button
                  onClick={() => navigate('/certificates')}
                  className="p-2 bg-white hover:bg-slate-50 text-slate-700 rounded-lg border border-slate-200 cursor-pointer"
                  title="View QR Certificate"
                >
                  <QrCode size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Digital Instrument Passport Viewer */}
        {selectedPassport && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    {getIcon(selectedPassport.type)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">
                      Instrument Digital Passport
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Legal Metrology Unique Device ID: {selectedPassport.serialNumber}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPassport(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400">Device Description:</span>
                  <span className="font-bold text-slate-800">{selectedPassport.type}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400">Manufacturer &amp; Model:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedPassport.make} ({selectedPassport.model})
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400">Registered Commercial Owner:</span>
                  <span className="font-semibold text-slate-800">{currentApplicant.businessName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400">Physical Location:</span>
                  <span className="font-semibold text-slate-800">{selectedPassport.locationDescription}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-400">Last Verified Date:</span>
                  <span className="font-semibold text-slate-800">{selectedPassport.lastVerifiedDate}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Next Re-verification Due:</span>
                  <span className="font-bold text-amber-700">{selectedPassport.nextVerificationDue}</span>
                </div>
              </div>

              {/* QR Code Tag Illustration */}
              <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-blue-900">Tamper-Proof QR Passport Tag</p>
                  <p className="text-[11px] text-blue-700">
                    Customers and enforcement officers scan this tag to confirm verification validity.
                  </p>
                </div>
                <div className="w-16 h-16 bg-white border border-blue-300 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0 shadow-xs">
                  <QrCode size={48} className="text-[#1a2744]" />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  onClick={() => alert(`Printing QR Certificate tag for ${selectedPassport.serialNumber}`)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Download size={13} />
                  <span>Download QR Sticker</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedPassport(null);
                    navigate('/applications/new');
                  }}
                  className="px-5 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                >
                  Apply for Re-verification
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
