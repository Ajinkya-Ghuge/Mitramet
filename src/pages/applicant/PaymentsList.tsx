import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Download,
  Search,
  CheckCircle2,
  Calendar,
  Building,
  ArrowRight,
  Printer,
  FileCheck,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { currentApplicant } from '../../data/mock';

const mockPaymentRecords = [
  {
    id: 'pay-001',
    txnId: 'UPI2026100213324589',
    appNo: 'LM-2026-001482',
    description: 'Electronic Weighing Scale — Statutory Verification Fee',
    amount: 500,
    date: '02 Oct 2026, 10:32 AM',
    mode: 'UPI (Google Pay)',
    status: 'Paid',
  },
  {
    id: 'pay-002',
    txnId: 'NB202609189874',
    appNo: 'LM-2026-001165',
    description: 'Petrol Dispenser — Verification & Flow Rate Inspection Fee',
    amount: 1500,
    date: '18 Sep 2026, 02:15 PM',
    mode: 'Net Banking (SBI)',
    status: 'Paid',
  },
  {
    id: 'pay-003',
    txnId: 'UPI202609058129',
    appNo: 'LM-2026-001120',
    description: 'Underground Measuring Tank — Bulk Calibration Fee',
    amount: 2500,
    date: '05 Sep 2026, 11:45 AM',
    mode: 'UPI (PhonePe)',
    status: 'Paid',
  },
  {
    id: 'pay-004',
    txnId: 'UPI202608219920',
    appNo: 'LM-2026-001090',
    description: 'LPG Dispenser — Annual Re-verification Fee',
    amount: 1200,
    date: '21 Aug 2026, 04:10 PM',
    mode: 'UPI',
    status: 'Paid',
  },
  {
    id: 'pay-005',
    txnId: 'UPI202608101411',
    appNo: 'LM-2026-001051',
    description: 'Water Flow Meter — Inspection Fee',
    amount: 500,
    date: '10 Aug 2026, 09:30 AM',
    mode: 'UPI',
    status: 'Paid',
  },
];

export function PaymentsList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockPaymentRecords.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      p.txnId.toLowerCase().includes(q) ||
      p.appNo.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

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
              <span className="text-slate-800 font-medium">Payments</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Payment History &amp; Receipts
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review government verification fees, treasury challans, and transaction receipts for {currentApplicant.businessName}.
            </p>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Total Statutory Fees Paid</span>
            <p className="text-2xl font-bold text-slate-900 mt-1">₹6,200.00</p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">All 5 Transactions Settled</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Government Treasury Route</span>
            <p className="text-2xl font-bold text-blue-700 mt-1">GRAS Portal</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Govt Receipt Accounting System</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <span className="text-xs font-medium text-slate-500">Outstanding Dues</span>
            <p className="text-2xl font-bold text-emerald-700 mt-1">₹0.00</p>
            <p className="text-[11px] text-slate-500 mt-0.5">No Pending Challans</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by transaction ID, application..."
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Showing {filtered.length} receipts
          </span>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                  <th className="py-3 px-4">Transaction Reference</th>
                  <th className="py-3 px-4">Application No</th>
                  <th className="py-3 px-4">Fee Description</th>
                  <th className="py-3 px-4">Payment Date</th>
                  <th className="py-3 px-4">Mode</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800 whitespace-nowrap">
                      {item.txnId}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-blue-700 whitespace-nowrap">
                      <button
                        onClick={() => navigate(`/applications/${item.appNo}`)}
                        className="hover:underline cursor-pointer"
                      >
                        {item.appNo}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {item.mode}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                      ₹{item.amount}.00
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => alert(`Downloading payment receipt for ${item.txnId}`)}
                        className="px-2.5 py-1 text-xs bg-white border border-slate-300 hover:bg-slate-50 rounded-md text-slate-700 font-medium inline-flex items-center gap-1 cursor-pointer shadow-2xs"
                      >
                        <Download size={12} className="text-blue-600" />
                        <span>Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
