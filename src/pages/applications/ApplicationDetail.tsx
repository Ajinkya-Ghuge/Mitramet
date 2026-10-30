import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Printer,
  Download,
  HelpCircle,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  UserCheck,
  Calendar,
  ShieldCheck,
  Award,
  AlertTriangle,
  FileText,
  Eye,
  ExternalLink,
  MessageSquare,
  Building,
  Scale,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getApplications } from '../../data/mock/store';
import { currentApplicant } from '../../data/mock';
import type { ApplicationStatus } from '../../types';

export function ApplicationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(false);
  const [copiedTxn, setCopiedTxn] = useState(false);
  const [withdrawn, setWithdrawn] = useState(false);

  // Load application from mock store or find default
  const applications = useMemo(() => getApplications(), []);
  const app = useMemo(() => {
    if (!id) return applications[0];
    const found = applications.find(
      (a) => a.applicationNo.toLowerCase() === id.toLowerCase() || a.id === id
    );
    return found || applications[0];
  }, [id, applications]);

  const handleCopy = (text: string, isAppId: boolean) => {
    navigator.clipboard.writeText(text);
    if (isAppId) {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    } else {
      setCopiedTxn(true);
      setTimeout(() => setCopiedTxn(false), 2000);
    }
  };

  // Timeline steps definition
  const timelineSteps = [
    { key: 'Submitted', label: 'Submitted', time: app.submittedDate + ', 10:30 AM' },
    { key: 'Under Review', label: 'Under Review', time: 'With Department ' + app.submittedDate },
    { key: 'Approved', label: 'Approved', time: app.status === 'Certificate Issued' ? 'Approved by Admin' : '-' },
    { key: 'Scheduled', label: 'Scheduled', time: app.status === 'Certificate Issued' ? 'Inspection Scheduled' : '-' },
    { key: 'Field Verification', label: 'Field Verification', time: app.status === 'Certificate Issued' ? 'Inspection Verified' : '-' },
    { key: 'Certificate Issued', label: 'Certificate', time: app.status === 'Certificate Issued' ? 'Digital Certificate Ready' : '-' },
  ];

  // Helper to determine step completion status
  const getStepState = (stepKey: string) => {
    if (withdrawn) return 'disabled';
    const statusOrder: ApplicationStatus[] = [
      'Submitted',
      'Under Review',
      'Approved',
      'Scheduled',
      'Field Verification',
      'Certificate Issued',
    ];

    const currentIndex = statusOrder.indexOf(app.status);
    const stepIndex = statusOrder.indexOf(stepKey as ApplicationStatus);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  const isCertReady = app.status === 'Certificate Issued';

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Top Header & Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span
                onClick={() => navigate('/dashboard')}
                className="hover:text-blue-600 cursor-pointer"
              >
                Dashboard
              </span>
              <span>&gt;</span>
              <span
                onClick={() => navigate('/my-applications')}
                className="hover:text-blue-600 cursor-pointer"
              >
                My Applications
              </span>
              <span>&gt;</span>
              <span className="text-slate-800 font-medium">{app.applicationNo}</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Application Details</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              View complete information, current status and track the progress of your application.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Printer size={13} />
              <span>Print</span>
            </button>

            <button
              onClick={() => alert(`Downloading acknowledgement slip for ${app.applicationNo}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Download size={13} />
              <span>Download Slip</span>
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>

        {/* Application Header Card with Meta & Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                <FileText size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-lg font-bold text-slate-900">{app.applicationNo}</h2>
                  <button
                    onClick={() => handleCopy(app.applicationNo, true)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                    title="Copy Application Number"
                  >
                    {copiedId ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  </button>
                  <StatusBadge status={withdrawn ? 'Rejected' : app.status} size="sm" />
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Submitted on <span className="text-slate-700 font-medium">{app.submittedDate}</span> • Type:{' '}
                  <span className="text-slate-700 font-medium">{app.type} (New Instrument)</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs lg:text-right border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100">
              <div>
                <span className="text-slate-400 block text-[11px]">Application Type</span>
                <span className="font-semibold text-slate-800">{app.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Total Instruments</span>
                <span className="font-semibold text-slate-800">{app.totalInstruments} Unit</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Application Fee</span>
                <span className="font-semibold text-emerald-700">₹{app.payment.amount} (Paid)</span>
              </div>
            </div>
          </div>

          {/* Horizontal Progress Timeline */}
          <div className="pt-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Application Progress
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">Current Status:</span>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded">
                  {withdrawn ? 'Withdrawn' : app.status}
                </span>
              </div>
            </div>

            {/* Timeline Steps (Horizontal on md+, wrapped on mobile) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {timelineSteps.map((step, idx) => {
                const state = getStepState(step.key);

                return (
                  <div
                    key={step.key}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      state === 'completed'
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                        : state === 'current'
                        ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100 text-blue-900'
                        : 'bg-slate-50/70 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-1.5">
                      {state === 'completed' ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <CheckCircle2 size={13} />
                        </div>
                      ) : state === 'current' ? (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] animate-pulse">
                          {idx + 1}
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-[10px]">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <p className="text-xs font-bold leading-tight truncate">{step.label}</p>
                    <p className="text-[10px] mt-1 text-slate-500 line-clamp-1">{step.time}</p>
                  </div>
                );
              })}
            </div>

            {/* Status explanation alert */}
            <div className="mt-4 p-3 bg-blue-50/80 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2.5">
              <Clock size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold">Next Operational Step: </span>
                {isCertReady ? (
                  <span>
                    Physical verification completed by Field Officer. Digital Verification Certificate has been issued and is available for public QR verification.
                  </span>
                ) : (
                  <span>
                    Your application is under scrutiny by the Department of Legal Metrology. Once documents are validated, a Field Officer will be designated to conduct the mandatory physical on-site testing.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Ready Callout (Visible if certificate issued) */}
        {isCertReady && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <Award size={26} className="text-white" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                  Official Verification Certificate Ready
                </span>
                <h3 className="text-base font-bold mt-1">Certificate No: MH-LM-2026-8841</h3>
                <p className="text-xs text-emerald-100">
                  Verified by Inspector S. Patil • Valid through 02 Nov 2027
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/certificates/MH-LM-2026-8841')}
              className="bg-white text-emerald-800 hover:bg-emerald-50 font-bold px-5 py-2.5 rounded-lg text-xs transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
            >
              View Digital Certificate &amp; QR
            </button>
          </div>
        )}

        {/* 2-Column Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Applicant, Instrument, Documents, Payment */}
          <div className="lg:col-span-8 space-y-6">
            {/* Applicant / Business Details */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Building size={15} className="text-blue-600" />
                  <span>Applicant / Business Details</span>
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Shop / Business Owner
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Owner / Applicant Name</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{currentApplicant.ownerName}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Business / Trade Name</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{currentApplicant.businessName}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Mobile Number</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{currentApplicant.mobile}</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Email ID</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{currentApplicant.email}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[11px]">Business Address</span>
                  <p className="font-semibold text-slate-800 mt-0.5 leading-relaxed">
                    {currentApplicant.address}, {currentApplicant.district}, Maharashtra -{' '}
                    {currentApplicant.pincode}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">District &amp; Taluka</span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {currentApplicant.district} / {currentApplicant.taluka}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Pincode</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{currentApplicant.pincode}</p>
                </div>
              </div>
            </div>

            {/* Instrument Details */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Scale size={15} className="text-indigo-600" />
                  <span>Instrument Details (1 Instrument)</span>
                </h3>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  New Instrument
                </span>
              </div>

              <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-indigo-700">
                    <Scale size={28} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900">
                      1. Electronic Weighing Scale
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Class III Non-Automatic Weighing Instrument
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mt-3 pt-3 border-t border-slate-200">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Manufacturer</span>
                        <span className="font-semibold text-slate-800">Essae</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Model No.</span>
                        <span className="font-semibold text-slate-800">DS-252</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Serial Number</span>
                        <span className="font-semibold text-slate-800">E012345678</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Capacity / Range</span>
                        <span className="font-semibold text-slate-800">0 - 30 kg</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Least Count / Accuracy</span>
                        <span className="font-semibold text-slate-800">5 g</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px]">Location of Instrument</span>
                        <span className="font-semibold text-slate-800">Shop Counter</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Uploaded Documents */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Uploaded Documents
                </h3>
                <span className="text-xs text-slate-500 font-medium">4 Documents Verified</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                      <th className="py-2.5 px-4">Document Name</th>
                      <th className="py-2.5 px-4">Uploaded Date</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: 'Identity Proof (Aadhaar)', date: app.submittedDate, status: 'Verified' },
                      { name: 'Business Proof (Shop Act / GST)', date: app.submittedDate, status: 'Verified' },
                      { name: 'Instrument Purchase Invoice', date: app.submittedDate, status: 'Verified' },
                      { name: 'Instrument Photograph', date: app.submittedDate, status: 'Verified' },
                    ].map((d) => (
                      <tr key={d.name} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-medium text-slate-800 flex items-center gap-2">
                          <FileText size={14} className="text-slate-400" />
                          <span>{d.name}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-500">{d.date}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                            {d.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => alert(`Previewing ${d.name}`)}
                            className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Eye size={13} />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Details Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Payment Details
                </h3>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Statutory Fee Paid
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Fee Amount</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                    ₹{app.payment.amount}.00
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Payment Date</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">
                    {app.payment.date || app.submittedDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Payment Mode</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">
                    {app.payment.method || 'UPI (Google Pay)'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Transaction ID</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-mono text-[11px] text-slate-800 truncate">
                      {app.payment.transactionId || 'UPI2026100213324589'}
                    </span>
                    <button
                      onClick={() => handleCopy(app.payment.transactionId || 'UPI2026100213324589', false)}
                      className="text-slate-400 hover:text-slate-600"
                      title="Copy Transaction ID"
                    >
                      {copiedTxn ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Officer, Inspection, Help, Withdraw */}
          <div className="lg:col-span-4 space-y-6">
            {/* Assigned Officer Panel */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                <UserCheck size={16} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Assigned Officer (Inspector)
                </h3>
              </div>

              {isCertReady ? (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center flex-shrink-0 text-xs">
                    SP
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">S. Patil</p>
                    <p className="text-[11px] text-slate-500">Legal Metrology Officer (Inspector)</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Zone: Chhatrapati Sambhaji Nagar</p>
                    <span className="inline-block mt-2 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Field Inspection Completed
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 px-2">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                    <UserCheck size={18} />
                  </div>
                  <p className="text-xs font-bold text-slate-700">Not Yet Assigned</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    A certified Field Officer will be designated after departmental document scrutiny.
                  </p>
                </div>
              )}
            </div>

            {/* Scheduled Inspection Panel */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                <Calendar size={16} className="text-purple-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Scheduled Inspection
                </h3>
              </div>

              {isCertReady ? (
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Inspection Date:</span>
                    <span className="font-semibold text-slate-800">22 Sep 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Time Window:</span>
                    <span className="font-semibold text-slate-800">11:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Location:</span>
                    <span className="font-semibold text-slate-800">Shop Counter</span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                    <CheckCircle2 size={13} />
                    <span>Instrument Passed Verification Tests</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 px-2">
                  <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                    <Calendar size={18} />
                  </div>
                  <p className="text-xs font-bold text-slate-700">Not Scheduled</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    You will receive an SMS and dashboard alert once the officer schedules the visit.
                  </p>
                </div>
              )}
            </div>

            {/* Need to Update Something? */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 shadow-xs text-xs space-y-2.5">
              <div className="flex items-center gap-2 text-blue-900 font-bold">
                <HelpCircle size={16} className="text-blue-600" />
                <span>Need to Update Something?</span>
              </div>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                If you want to add or update documents, contact the department or wait for their remarks.
              </p>
              <button
                onClick={() => alert('Support helpline: 1800-233-1234 (Legal Metrology Helpdesk)')}
                className="w-full py-1.5 bg-white border border-blue-300 text-blue-700 font-semibold rounded-md hover:bg-blue-50 transition-colors shadow-2xs cursor-pointer text-center"
              >
                Contact Department
              </button>
            </div>

            {/* Withdraw Application */}
            {!isCertReady && (
              <div className="bg-white rounded-xl border border-red-200 p-4 shadow-xs text-xs space-y-2.5">
                <div className="flex items-center gap-1.5 text-red-700 font-bold">
                  <AlertTriangle size={15} />
                  <span>Withdraw Application</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  You can withdraw this application before an on-site inspection is scheduled.
                </p>
                <button
                  disabled={withdrawn}
                  onClick={() => {
                    if (confirm('Are you sure you want to withdraw this application?')) {
                      setWithdrawn(true);
                    }
                  }}
                  className={`w-full py-1.5 rounded-md font-semibold transition-colors cursor-pointer border ${
                    withdrawn
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      : 'border-red-300 text-red-600 hover:bg-red-50'
                  }`}
                >
                  {withdrawn ? 'Application Withdrawn' : 'Withdraw Application'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
