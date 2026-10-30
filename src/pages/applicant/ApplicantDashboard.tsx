import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  Clock,
  Calendar,
  Plus,
  Search,
  ChevronRight,
  MoreVertical,
  Scale,
  Fuel,
  Database,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { StatusBadge } from '../../components/ui/StatusBadge';
import {
  currentUser,
  mockApplications,
  mockInstruments,
} from '../../data/mock';

export function ApplicantDashboard() {
  const navigate = useNavigate();
  const [trackQuery, setTrackQuery] = useState('');
  const [trackError, setTrackError] = useState('');

  const handleTrackSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = trackQuery.trim();
    if (!query) {
      setTrackError('Please enter an Application Number');
      return;
    }

    const found = mockApplications.find(
      (app) => app.applicationNo.toLowerCase() === query.toLowerCase()
    );

    if (found) {
      navigate(`/applications/${found.applicationNo}`);
    } else {
      setTrackError(`Application "${query}" not found in demo records. Try LM-2026-001482.`);
    }
  };

  const getInstrumentIcon = (type: string) => {
    switch (type) {
      case 'Petrol Dispenser':
      case 'LPG Dispenser':
        return <Fuel size={18} className="text-blue-600" />;
      case 'Measuring Tank':
        return <Database size={18} className="text-emerald-600" />;
      case 'Electronic Weighing Scale':
      default:
        return <Scale size={18} className="text-indigo-600" />;
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Welcome Section & Primary Action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Welcome, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Apply for verification / re-verification of your weighing and measuring instruments, track status and manage certificates.
            </p>
          </div>

          <button
            onClick={() => navigate('/applications/new')}
            className="inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>New Application</span>
          </button>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Applications */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">Total Applications</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">5</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText size={20} />
              </div>
            </div>
            <button
              onClick={() => navigate('/my-applications')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-3 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Approved Certificates */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">Approved Certificates</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">3</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
            </div>
            <button
              onClick={() => navigate('/certificates')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-3 cursor-pointer"
            >
              <span>View Certificates</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Pending Applications */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">Pending Applications</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">1</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Clock size={20} />
              </div>
            </div>
            <button
              onClick={() => navigate('/my-applications')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-3 cursor-pointer"
            >
              <span>Track Status</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Due for Re-verification */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">Due for Re-verification</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">1</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                <Calendar size={20} />
              </div>
            </div>
            <button
              onClick={() => navigate('/reverification')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-3 cursor-pointer"
            >
              <span>View Details</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>

        {/* Main Grid: Left Column (~65%) and Right Column (~35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Track Your Application Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <h2 className="text-sm font-bold text-slate-900">Track Your Application</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Enter your Application Number to check the current status.
              </p>

              <form onSubmit={handleTrackSubmit} className="mt-4 flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    value={trackQuery}
                    onChange={(e) => {
                      setTrackQuery(e.target.value);
                      if (trackError) setTrackError('');
                    }}
                    placeholder="e.g. LM-2026-001482"
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Track
                </button>
              </form>

              {trackError && (
                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-red-600">
                  <AlertCircle size={14} />
                  <span>{trackError}</span>
                </div>
              )}
            </div>

            {/* Recent Applications Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Recent Applications</h2>
                </div>
                <button
                  onClick={() => navigate('/my-applications')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                      <th className="py-3 px-4">Application No</th>
                      <th className="py-3 px-4">Instrument Type</th>
                      <th className="py-3 px-4">Submitted On</th>
                      <th className="py-3 px-4">Current Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {mockApplications.map((app) => (
                      <tr
                        key={app.applicationNo}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-semibold text-slate-800 whitespace-nowrap">
                          {app.applicationNo}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                          {app.instrumentId === 'inst-001'
                            ? 'Digital Weighing Scale'
                            : app.instrumentId === 'inst-002'
                            ? 'Petrol Dispenser'
                            : 'Measuring Tank'}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                          {app.submittedDate}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <StatusBadge status={app.status} size="sm" />
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/applications/${app.applicationNo}`)}
                              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline cursor-pointer"
                            >
                              View
                            </button>
                            <button
                              className="text-slate-400 hover:text-slate-600 p-1 rounded-sm"
                              title="More options"
                            >
                              <MoreVertical size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Your Next Actions Panel */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Your Next Actions
                </h2>
                <button
                  onClick={() => navigate('/notifications')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {/* Action 1 */}
                <div
                  onClick={() => navigate('/reverification')}
                  className="p-3 rounded-lg border border-slate-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all cursor-pointer flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-amber-100 text-amber-700 mt-0.5">
                      <Clock size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-amber-900 leading-tight">
                        Re-verification due in 42 days
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        Instrument: Digital Weighing Scale (SN: DS-1003)
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-amber-700 mt-1 flex-shrink-0" />
                </div>

                {/* Action 2 */}
                <div
                  onClick={() => navigate('/applications/LM-2026-001482')}
                  className="p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer flex items-start justify-between gap-3 group"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-md bg-blue-100 text-blue-700 mt-0.5">
                      <FileText size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-blue-900 leading-tight">
                        Complete pending application
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        LM-2026-001486 — Document verification pending
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-slate-400 group-hover:text-blue-700 mt-1 flex-shrink-0" />
                </div>
              </div>
            </div>

            {/* Your Instruments Panel */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Your Instruments
                </h2>
                <button
                  onClick={() => navigate('/my-instruments')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  View All (3)
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {mockInstruments.map((inst) => (
                  <div
                    key={inst.id}
                    className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                        {getInstrumentIcon(inst.type)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-tight">
                          {inst.type}
                        </p>
                        <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          SN: {inst.serialNumber}
                        </p>
                        <p className="text-[10px] text-slate-400 leading-tight">
                          Model: {inst.model}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end flex-shrink-0">
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                        Valid
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Till: {inst.validityTill}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/my-instruments')}
                className="w-full mt-3 pt-2 border-t border-slate-100 text-center text-xs font-medium text-slate-600 hover:text-blue-600 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Manage all instruments</span>
                <ExternalLink size={12} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
