import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  Search,
  Filter,
  MapPin,
  ArrowRight,
  Wifi,
  WifiOff,
  RefreshCw,
  Scale,
  AlertTriangle,
  Building,
  UserCheck,
  ExternalLink,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockOfficers } from '../../data/mock';

const mockOfficerCases = [
  {
    id: 'LM-2026-001482',
    applicantName: 'Ajinkya Govind Ghuge',
    businessName: 'Ghuge Retail Store',
    address: 'Shop No. 12, Near Bus Stand, Chhatrapati Sambhaji Nagar',
    instrument: 'Electronic Weighing Scale (DS-252)',
    serialNumber: 'E012345678',
    scheduleDate: 'Today, 29 Oct 2026',
    timeSlot: '10:00 AM - 12:00 PM',
    priority: 'High',
    status: 'Scheduled',
    today: true,
  },
  {
    id: 'LM-2026-001486',
    applicantName: 'Rajesh Sharma',
    businessName: 'Sharma Provision Mart',
    address: 'Shop 4, CIDCO Sector 4 Commercial Complex',
    instrument: 'Platform Weighing Scale (100kg)',
    serialNumber: 'PS-88419',
    scheduleDate: 'Today, 29 Oct 2026',
    timeSlot: '02:00 PM - 04:00 PM',
    priority: 'Normal',
    status: 'Scheduled',
    today: true,
  },
  {
    id: 'LM-2026-001490',
    applicantName: 'Vikram Shinde',
    businessName: 'Highway IndianOil Filling Station',
    address: 'Plot 18, Jalna Road Highway Hub',
    instrument: 'Petrol Dispenser Unit 1 (PD-V1)',
    serialNumber: 'PD-4587',
    scheduleDate: 'Tomorrow, 30 Oct 2026',
    timeSlot: '11:00 AM - 01:00 PM',
    priority: 'High',
    status: 'Field Verification',
    today: false,
  },
  {
    id: 'LM-2026-001165',
    applicantName: 'Ajinkya Govind Ghuge',
    businessName: 'Ghuge Retail Store',
    address: 'Shop No. 12, Near Bus Stand',
    instrument: 'Petrol Dispenser (PD-V1)',
    serialNumber: 'PD-4587',
    scheduleDate: '18 Sep 2026',
    timeSlot: '11:00 AM - 01:00 PM',
    priority: 'Normal',
    status: 'Certificate Issued',
    today: false,
  },
  {
    id: 'LM-2026-001120',
    applicantName: 'Sanjay Deshmukh',
    businessName: 'Deshmukh Bulk Storage Depot',
    address: 'Waluj Industrial Area, Sector B',
    instrument: 'Measuring Tank (MT-200)',
    serialNumber: 'MT-7701',
    scheduleDate: '05 Sep 2026',
    timeSlot: '03:00 PM - 05:00 PM',
    priority: 'Normal',
    status: 'Certificate Issued',
    today: false,
  },
];

export function OfficerDashboard() {
  const navigate = useNavigate();
  const currentOfficer = mockOfficers[0]; // Inspector S. Patil

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [syncSuccess, setSyncSuccess] = useState(false);

  const filteredCases = useMemo(() => {
    return mockOfficerCases.filter((c) => {
      const matchesStatus =
        statusFilter === 'All'
          ? true
          : statusFilter === 'Today'
          ? c.today
          : c.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesPriority =
        priorityFilter === 'All' ? true : c.priority === priorityFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.businessName.toLowerCase().includes(q) ||
        c.applicantName.toLowerCase().includes(q) ||
        c.instrument.toLowerCase().includes(q) ||
        c.serialNumber.toLowerCase().includes(q);

      return matchesStatus && matchesPriority && matchesQuery;
    });
  }, [statusFilter, priorityFilter, searchQuery]);

  const handleSync = () => {
    setSyncSuccess(true);
    setTimeout(() => setSyncSuccess(false), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Officer Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-indigo-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                Weights &amp; Measures Field Inspection
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {currentOfficer.district} • {currentOfficer.zone}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Field Officer Workspace: {currentOfficer.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review assigned cases, carry out on-site instrument calibration tests, and submit statutory verification reports.
            </p>
          </div>

          {/* Sync & Field Mode Indicator */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSync}
              className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <RefreshCw size={13} className="text-blue-600" />
              <span>{syncSuccess ? 'Offline Cache Ready!' : 'Sync Field Data'}</span>
            </button>

            <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs text-emerald-800 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Online (GPS Active)</span>
            </div>
          </div>
        </div>

        {/* 4 Key Inspector Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Assigned Active Cases</span>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FileText size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">8 Cases</p>
            <p className="text-[11px] text-blue-600 font-medium mt-0.5">Zone 1 Jurisdiction</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Today&apos;s Inspections</span>
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Calendar size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-amber-700 mt-2">2 Visits</p>
            <p className="text-[11px] text-amber-800 font-medium mt-0.5">Morning &amp; Afternoon Slots</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Pending Field Reports</span>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Clock size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-purple-700 mt-2">3 Reports</p>
            <p className="text-[11px] text-purple-800 font-medium mt-0.5">Awaiting Result Submission</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">Completed This Month</span>
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <CheckCircle2 size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-700 mt-2">19 Cleared</p>
            <p className="text-[11px] text-emerald-800 font-medium mt-0.5">Certificates Issued</p>
          </div>
        </div>

        {/* Priority: Today's Scheduled On-Site Inspections */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Calendar size={16} className="text-blue-600" />
                <span>Today&apos;s Scheduled Inspections (2 Visits)</span>
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Physical on-site testing scheduled for today in Chhatrapati Sambhaji Nagar
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded">
              Action Required Today
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockOfficerCases
              .filter((c) => c.today)
              .map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-3 hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                          {c.id}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm mt-1">{c.businessName}</h3>
                        <p className="text-xs text-slate-600">Applicant: {c.applicantName}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {c.timeSlot}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-200">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Scale size={13} className="text-indigo-600" />
                        <span>{c.instrument}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-slate-500 text-[11px]">
                        <MapPin size={13} className="text-slate-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{c.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => navigate(`/officer/cases/${c.id}/verify`)}
                      className="w-full py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-bold shadow-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShieldCheck size={14} />
                      <span>Start Field Verification</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Assigned Cases Master Directory */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                All Assigned Cases in Jurisdiction
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Cases allocated by District Administration for Inspector S. Patil
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              {/* Search */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search case, shop, serial..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Cases</option>
                <option value="Today">Today Only</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Field Verification">In Progress</option>
                <option value="Certificate Issued">Completed</option>
              </select>

              {/* Priority filter */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Normal">Normal</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-3 px-4">Case Reference</th>
                  <th className="py-3 px-4">Establishment &amp; Applicant</th>
                  <th className="py-3 px-4">Instrument Specification</th>
                  <th className="py-3 px-4">Inspection Slot</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Inspection Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCases.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No cases match the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredCases.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {c.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-800">{c.businessName}</p>
                        <p className="text-[11px] text-slate-500">{c.applicantName}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-medium text-slate-700">{c.instrument}</p>
                        <p className="text-[10px] font-mono text-slate-400">S/N: {c.serialNumber}</p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="font-semibold text-slate-800">{c.scheduleDate}</p>
                        <p className="text-[10px] text-slate-400">{c.timeSlot}</p>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            c.priority === 'High'
                              ? 'bg-red-50 text-red-700 border border-red-200'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {c.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusBadge status={c.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/officer/cases/${c.id}/verify`)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                        >
                          <ShieldCheck size={13} />
                          <span>Conduct Inspection</span>
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
