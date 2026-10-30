import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Calendar,
  CreditCard,
  Scale,
  Fuel,
  Database,
  ArrowRight,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getApplications } from '../../data/mock/store';
import type { ApplicationStatus, ApplicationType } from '../../types';

export function MyApplications() {
  const navigate = useNavigate();
  const applications = useMemo(() => getApplications(), []);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');

  // Count by status
  const counts = useMemo(() => {
    return {
      all: applications.length,
      submitted: applications.filter((a) => a.status === 'Submitted').length,
      underReview: applications.filter((a) => a.status === 'Under Review').length,
      scheduled: applications.filter((a) => a.status === 'Scheduled').length,
      certIssued: applications.filter((a) => a.status === 'Certificate Issued').length,
    };
  }, [applications]);

  // Filtered applications
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesStatus =
        statusFilter === 'All' ? true : app.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesType =
        typeFilter === 'All' ? true : app.type.toLowerCase() === typeFilter.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        app.applicationNo.toLowerCase().includes(q) ||
        app.submittedDate.toLowerCase().includes(q) ||
        (app.remarks && app.remarks.toLowerCase().includes(q));

      return matchesStatus && matchesType && matchesQuery;
    });
  }, [applications, statusFilter, typeFilter, searchQuery]);

  const getInstrumentName = (instId: string) => {
    switch (instId) {
      case 'inst-002':
        return 'Petrol Dispenser';
      case 'inst-003':
        return 'Measuring Tank';
      case 'inst-001':
      default:
        return 'Electronic Weighing Scale';
    }
  };

  const getInstrumentIcon = (instId: string) => {
    switch (instId) {
      case 'inst-002':
        return <Fuel size={16} className="text-blue-600" />;
      case 'inst-003':
        return <Database size={16} className="text-emerald-600" />;
      case 'inst-001':
      default:
        return <Scale size={16} className="text-indigo-600" />;
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
              <span className="text-slate-800 font-medium">My Applications</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Applications</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review and track all your verification and re-verification requests in real-time.
            </p>
          </div>

          <button
            onClick={() => navigate('/applications/new')}
            className="inline-flex items-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>New Application</span>
          </button>
        </div>

        {/* Status Pills Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {[
            { id: 'All', label: 'All Applications', count: counts.all },
            { id: 'Submitted', label: 'Submitted', count: counts.submitted },
            { id: 'Under Review', label: 'Under Review', count: counts.underReview },
            { id: 'Scheduled', label: 'Scheduled', count: counts.scheduled },
            { id: 'Certificate Issued', label: 'Certificate Issued', count: counts.certIssued },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  statusFilter === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Secondary Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by application number or date..."
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter size={13} className="text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Types</option>
              <option value="Verification">Fresh Verification</option>
              <option value="Re-verification">Re-verification</option>
            </select>
          </div>
        </div>

        {/* Applications List Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-3 px-4">Application No</th>
                  <th className="py-3 px-4">Instrument Category</th>
                  <th className="py-3 px-4">Application Type</th>
                  <th className="py-3 px-4">Submitted Date</th>
                  <th className="py-3 px-4">Fee Paid</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <FileText size={28} className="mx-auto mb-2 text-slate-300" />
                      <p className="font-semibold text-slate-600">No applications found</p>
                      <p className="text-[11px] mt-0.5">Try clearing your search query or filters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr key={app.id || app.applicationNo} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {app.applicationNo}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
                            {getInstrumentIcon(app.instrumentId)}
                          </div>
                          <span className="font-medium text-slate-800">
                            {getInstrumentName(app.instrumentId)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                          {app.type}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {app.submittedDate}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-semibold text-emerald-700">₹{app.payment.amount}</span>
                        <span className="text-[10px] text-slate-400 block">UPI Verified</span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusBadge status={app.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/applications/${app.applicationNo}`)}
                          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Eye size={12} />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
