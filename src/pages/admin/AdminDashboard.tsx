import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  Calendar,
  ShieldCheck,
  Award,
  Search,
  Filter,
  Users,
  Building2,
  ChevronRight,
  UserCheck,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  BarChart2,
  Layers,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { AppShell } from '../../components/layout/AppShell';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { currentAdmin, mockOfficers } from '../../data/mock';
import { getApplications } from '../../data/mock/store';

// Chart 1: Applications by Status Dataset
const statusChartData = [
  { status: 'Submitted', count: 24, fill: '#3b82f6' },
  { status: 'Under Review', count: 16, fill: '#f59e0b' },
  { status: 'Scheduled', count: 18, fill: '#8b5cf6' },
  { status: 'Field Testing', count: 12, fill: '#6366f1' },
  { status: 'Cert Issued', count: 896, fill: '#10b981' },
  { status: 'Clarification', count: 7, fill: '#ef4444' },
];

// Chart 2: 6-Month Verification Volume
const monthlyTrendData = [
  { month: 'May', verifications: 140, reverifications: 65 },
  { month: 'Jun', verifications: 175, reverifications: 80 },
  { month: 'Jul', verifications: 190, reverifications: 95 },
  { month: 'Aug', verifications: 210, reverifications: 110 },
  { month: 'Sep', verifications: 245, reverifications: 130 },
  { month: 'Oct', verifications: 280, reverifications: 145 },
];

export function AdminDashboard() {
  const navigate = useNavigate();
  const applications = useMemo(() => getApplications(), []);

  // Filter & Search states
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extended mock table data with applicant business names and assigned officers
  const adminApplications = useMemo(() => {
    return [
      {
        id: 'LM-2026-001482',
        applicantName: 'Ajinkya Govind Ghuge',
        businessName: 'Ghuge Retail Store',
        instrument: 'Electronic Weighing Scale (DS-252)',
        submittedDate: '02 Oct 2026',
        assignedOfficer: null, // Pending Assignment
        status: 'Submitted',
        priority: 'Normal',
      },
      {
        id: 'LM-2026-001486',
        applicantName: 'Rajesh Sharma',
        businessName: 'Sharma Provision Mart',
        instrument: 'Platform Weighing Scale (100kg)',
        submittedDate: '01 Oct 2026',
        assignedOfficer: 'Inspector S. Patil',
        status: 'Scheduled',
        priority: 'High',
      },
      {
        id: 'LM-2026-001490',
        applicantName: 'Vikram Shinde',
        businessName: 'Highway IndianOil Filling Station',
        instrument: 'Petrol Dispenser (PD-V1)',
        submittedDate: '30 Sep 2026',
        assignedOfficer: 'Inspector R. Jadhav',
        status: 'Field Verification',
        priority: 'High',
      },
      {
        id: 'LM-2026-001165',
        applicantName: 'Ajinkya Govind Ghuge',
        businessName: 'Ghuge Retail Store',
        instrument: 'Petrol Dispenser',
        submittedDate: '18 Sep 2026',
        assignedOfficer: 'Inspector S. Patil',
        status: 'Certificate Issued',
        priority: 'Normal',
      },
      {
        id: 'LM-2026-001090',
        applicantName: 'Ajinkya Govind Ghuge',
        businessName: 'Ghuge Fuel Outlet',
        instrument: 'LPG Dispenser',
        submittedDate: '21 Aug 2026',
        assignedOfficer: 'Inspector A. Kulkarni',
        status: 'Under Review',
        priority: 'Normal',
      },
    ];
  }, []);

  // Filtered applications list
  const filteredApps = useMemo(() => {
    return adminApplications.filter((app) => {
      const matchesStatus =
        selectedStatus === 'All'
          ? true
          : selectedStatus === 'Unassigned'
          ? !app.assignedOfficer
          : app.status.toLowerCase() === selectedStatus.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        app.id.toLowerCase().includes(q) ||
        app.businessName.toLowerCase().includes(q) ||
        app.applicantName.toLowerCase().includes(q) ||
        app.instrument.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [adminApplications, selectedStatus, searchQuery]);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Admin Role Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#1a2744] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                Admin Control Panel
              </span>
              <span className="text-xs text-slate-500">
                Department of Legal Metrology • Govt of Maharashtra
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Department Administration Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Supervising {currentAdmin.office} — Caseload monitoring, officer assignment, and certification audit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Admin identity badge */}
            <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 shadow-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold ring-2 ring-blue-100">
                {currentAdmin.avatarInitials}
              </div>
              <div className="text-left text-xs">
                <p className="font-bold text-slate-900 leading-tight">{currentAdmin.name}</p>
                <p className="text-[10px] text-slate-500 leading-tight">{currentAdmin.designation}</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/dashboard')}
              className="text-xs font-semibold text-slate-600 hover:text-blue-600 bg-white border border-slate-300 px-3 py-2 rounded-lg transition-colors cursor-pointer"
              title="Preview Applicant View"
            >
              Switch to Shopkeeper View
            </button>
          </div>
        </div>

        {/* 5 Metric Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Total Applications */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">Total Applications</span>
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <FileText size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">1,248</p>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-600 font-semibold">
              <TrendingUp size={12} />
              <span>+14.2% from last month</span>
            </div>
          </div>

          {/* Card 2: Pending Review */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">Pending Review</span>
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Clock size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">24</p>
            <p className="text-[11px] text-amber-700 font-medium mt-1">Awaiting Officer Assignment</p>
          </div>

          {/* Card 3: Scheduled Inspections */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">Scheduled Inspections</span>
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                <Calendar size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">18</p>
            <p className="text-[11px] text-purple-700 font-medium mt-1">Allocated to 4 Inspectors</p>
          </div>

          {/* Card 4: Field Verifications */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">Active Field Tests</span>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <ShieldCheck size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">12</p>
            <p className="text-[11px] text-indigo-700 font-medium mt-1">On-site verification running</p>
          </div>

          {/* Card 5: Certificates Issued */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">Certificates Issued</span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <Award size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">896</p>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">With Live QR Passports</p>
          </div>
        </div>

        {/* 2 Visualizations Row: Recharts Bar Chart & Area Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Applications by Status Bar Chart (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Applications Distribution by Status
                </h3>
                <p className="text-[11px] text-slate-400">Current workflow breakdown across all stages</p>
              </div>
              <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                Real-Time
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="status"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 6-Month Verification Volume Area Chart (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Verification Growth Trend
                </h3>
                <p className="text-[11px] text-slate-400">Fresh verification vs Re-verifications</p>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">6 Months</span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVerif" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorReverif" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="verifications"
                    stroke="#2563eb"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorVerif)"
                    name="Verifications"
                  />
                  <Area
                    type="monotone"
                    dataKey="reverifications"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorReverif)"
                    name="Re-verifications"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Officer Workload Summary Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Users size={16} className="text-blue-600" />
                <span>Field Inspector Workload &amp; Zone Deployment</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Active certified Weights &amp; Measures Officers designated for on-site physical inspections
              </p>
            </div>
            <button
              onClick={() => navigate('/officer/dashboard')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Preview Officer Dashboard</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockOfficers.map((officer) => (
              <div
                key={officer.id}
                className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3 hover:border-slate-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                      {officer.name.split(' ')[1]?.slice(0, 2) || 'IN'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {officer.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        {officer.designation}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                      officer.status === 'On Field'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {officer.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-200/70">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Jurisdiction:</span>
                    <span className="font-medium text-slate-700">{officer.zone}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Assigned Pending:</span>
                    <span className="font-bold text-amber-700">{officer.assignedCases} Cases</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Cleared This Month:</span>
                    <span className="font-semibold text-emerald-700">{officer.completedThisMonth} Verified</span>
                  </div>
                </div>

                {/* Capacity visual bar */}
                <div className="pt-1">
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${Math.min(100, (officer.assignedCases / 10) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 block">
                    Workload capacity: {Math.round((officer.assignedCases / 10) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Applications Management Table with Search & Status Filters */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Applications Awaiting Review &amp; Assignment
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Assign certified field inspectors to submitted applications and coordinate inspection dates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search application, shop, instrument..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status filter dropdown */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <Filter size={13} className="text-slate-400" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="text-xs border border-slate-300 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Unassigned">Unassigned Only (Needs Action)</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Certificate Issued">Certificate Issued</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-3 px-4">Application No</th>
                  <th className="py-3 px-4">Shopkeeper / Commercial Establishment</th>
                  <th className="py-3 px-4">Instrument Specification</th>
                  <th className="py-3 px-4">Submitted Date</th>
                  <th className="py-3 px-4">Designated Inspector</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Administrative Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                      No applications match the current filter or search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                        {item.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-800 leading-tight">
                          {item.businessName}
                        </p>
                        <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                          Applicant: {item.applicantName}
                        </p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {item.instrument}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {item.submittedDate}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {item.assignedOfficer ? (
                          <div className="flex items-center gap-1.5 text-slate-700">
                            <UserCheck size={13} className="text-blue-600" />
                            <span className="font-medium text-xs">{item.assignedOfficer}</span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                            <AlertCircle size={10} />
                            <span>Unassigned</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <StatusBadge status={item.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/admin/applications/${item.id}`)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer ${
                            !item.assignedOfficer
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{!item.assignedOfficer ? 'Review & Assign' : 'Manage Case'}</span>
                          <ArrowRight size={12} />
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
