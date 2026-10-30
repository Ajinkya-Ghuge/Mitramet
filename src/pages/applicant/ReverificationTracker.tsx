import { useNavigate } from 'react-router-dom';
import {
  RefreshCw,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Scale,
  Fuel,
  Database,
  ArrowRight,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { mockInstruments, currentApplicant } from '../../data/mock';

export function ReverificationTracker() {
  const navigate = useNavigate();

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
              <span className="text-slate-800 font-medium">Re-verification</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Re-verification Tracking &amp; Renewals
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Monitor statutory expiration deadlines under the Legal Metrology Act, 2009 for {currentApplicant.businessName}.
            </p>
          </div>

          <button
            onClick={() => navigate('/applications/new')}
            className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw size={15} />
            <span>Apply for Re-verification</span>
          </button>
        </div>

        {/* Priority Renewal Alert Card */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Clock size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                  Action Required within 42 Days
                </span>
                <span className="text-xs font-semibold text-amber-800">Due: 15 Dec 2026</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                Digital Weighing Scale (SN: DS-1003) — Annual Re-verification Due
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Statutory validity expires in 42 days. Submit the renewal application early to avoid business disruption or penalty fees.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/applications/new')}
            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shadow-xs cursor-pointer whitespace-nowrap self-start md:self-auto"
          >
            Renew Scale Certificate →
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Upcoming Renewals (60 Days)</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <AlertTriangle size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-amber-700 mt-2">1 Instrument</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Electronic Weighing Scale</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Fully Compliant &amp; Active</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-700 mt-2">2 Instruments</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Valid through 2027 &amp; 2028</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Overdue / Expired</span>
              <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                <ShieldCheck size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800 mt-2">0</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">100% Legal Compliance</p>
          </div>
        </div>

        {/* Detailed Instruments Timeline Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Instrument Verification Status &amp; Renewal Deadlines
            </h3>
            <span className="text-xs text-slate-500 font-medium">3 Devices Registered</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-3 px-4">Instrument Specification</th>
                  <th className="py-3 px-4">Serial Number</th>
                  <th className="py-3 px-4">Last Verified</th>
                  <th className="py-3 px-4">Statutory Expiry</th>
                  <th className="py-3 px-4">Renewal Window</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockInstruments.map((inst) => {
                  const isDue = inst.serialNumber === 'DS-1003';

                  return (
                    <tr key={inst.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                            {inst.type === 'Petrol Dispenser' ? (
                              <Fuel size={16} className="text-blue-600" />
                            ) : inst.type === 'Measuring Tank' ? (
                              <Database size={16} className="text-emerald-600" />
                            ) : (
                              <Scale size={16} className="text-indigo-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{inst.type}</p>
                            <p className="text-[11px] text-slate-500">{inst.make} ({inst.model})</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                        {inst.serialNumber}
                      </td>

                      <td className="py-3.5 px-4 text-slate-500">
                        {inst.lastVerifiedDate}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {inst.validityTill}
                      </td>

                      <td className="py-3.5 px-4">
                        {isDue ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold bg-amber-100 text-amber-900 rounded-md">
                            <Clock size={12} />
                            <span>Due in 42 Days</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 rounded-md">
                            <CheckCircle2 size={12} />
                            <span>Valid</span>
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => navigate('/applications/new')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer ${
                            isDue
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                              : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{isDue ? 'Renew Now' : 'Re-verify Early'}</span>
                          <ArrowRight size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statutory Frequency Info Box */}
        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 shadow-xs text-xs space-y-2 text-blue-900">
          <div className="flex items-center gap-2 font-bold">
            <Info size={16} className="text-blue-700" />
            <span>Legal Metrology Statutory Verification Intervals (Maharashtra)</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-blue-800">
            <li><strong>Commercial Electronic Weighing Scales:</strong> Mandatory annual re-verification (every 12 months).</li>
            <li><strong>Petrol, Diesel &amp; LPG Dispensers:</strong> Mandatory annual verification and flow calibration.</li>
            <li><strong>Storage Tanks &amp; Bulk Flow Meters:</strong> Re-verification every 24 to 60 months per Schedule IV.</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
