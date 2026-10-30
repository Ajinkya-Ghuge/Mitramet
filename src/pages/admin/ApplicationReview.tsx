import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building,
  Scale,
  FileText,
  UserCheck,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Check,
  ShieldCheck,
  HelpCircle,
  FileCheck,
  MapPin,
  Phone,
  Mail,
  Send,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { currentAdmin, mockOfficers, currentApplicant } from '../../data/mock';
import { getApplications, saveApplication } from '../../data/mock/store';
import type { ApplicationStatus } from '../../types';

export function ApplicationReview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Load application from store
  const applications = useMemo(() => getApplications(), []);
  const initialApp = useMemo(() => {
    if (!id) return applications[0];
    const found = applications.find(
      (a) => a.applicationNo.toLowerCase() === id.toLowerCase() || a.id === id
    );
    return found || applications[0];
  }, [id, applications]);

  // Working state for the review form
  const [appRecord, setAppRecord] = useState(initialApp);
  const [selectedOfficerId, setSelectedOfficerId] = useState(
    mockOfficers[0].id // Inspector S. Patil by default
  );
  const [inspectionDate, setInspectionDate] = useState('2026-11-04');
  const [inspectionTime, setInspectionTime] = useState('10:00 AM - 12:00 PM');
  const [inspectorInstructions, setInspectorInstructions] = useState(
    'Verify serial number DS-1003 on physical plate. Perform zero-load and 20kg accuracy check using M1 certified test weights.'
  );
  const [scrutinyRemarks, setScrutinyRemarks] = useState(
    'Documents verified. Identity proof, GST Shop Act, and invoice verified against registered merchant record.'
  );

  // Document checklist status in review
  const [docStatuses, setDocStatuses] = useState({
    aadhaar: true,
    shopAct: true,
    invoice: true,
    photo: true,
  });

  // Action status / feedback
  const [decisionSuccess, setDecisionSuccess] = useState<string | null>(null);
  const [clarificationModal, setClarificationModal] = useState(false);
  const [clarificationText, setClarificationText] = useState('');

  const selectedOfficer = useMemo(
    () => mockOfficers.find((o) => o.id === selectedOfficerId) || mockOfficers[0],
    [selectedOfficerId]
  );

  // Approve & Schedule handler
  const handleApproveAndAssign = () => {
    const updatedStatus: ApplicationStatus = 'Scheduled';
    const updatedApp = {
      ...appRecord,
      status: updatedStatus,
      assignedOfficerId: selectedOfficer.id,
      inspectionSchedule: {
        id: `sch-${Date.now()}`,
        applicationId: appRecord.id,
        officerId: selectedOfficer.id,
        date: inspectionDate,
        time: inspectionTime,
        location: `${currentApplicant.businessName}, ${currentApplicant.address}`,
        status: 'Scheduled' as const,
      },
      remarks: scrutinyRemarks,
      lastUpdated: 'Just now by Admin ' + currentAdmin.name,
    };

    saveApplication(updatedApp);
    setAppRecord(updatedApp);
    setDecisionSuccess(
      `Application approved! Assigned to ${selectedOfficer.name} for field inspection on ${inspectionDate} (${inspectionTime}).`
    );
  };

  // Clarification handler
  const handleRequestClarification = () => {
    if (!clarificationText.trim()) return;
    const updatedApp = {
      ...appRecord,
      status: 'Clarification Required' as ApplicationStatus,
      remarks: `Admin Query: ${clarificationText}`,
      lastUpdated: 'Just now by Admin ' + currentAdmin.name,
    };
    saveApplication(updatedApp);
    setAppRecord(updatedApp);
    setClarificationModal(false);
    setDecisionSuccess(
      `Clarification request sent to applicant: "${clarificationText}". Application status updated.`
    );
  };

  // Rejection handler
  const handleReject = () => {
    const reason = prompt('Enter statutory reason for application rejection:');
    if (!reason) return;

    const updatedApp = {
      ...appRecord,
      status: 'Rejected' as ApplicationStatus,
      rejectionReason: reason,
      lastUpdated: 'Just now by Admin ' + currentAdmin.name,
    };
    saveApplication(updatedApp);
    setAppRecord(updatedApp);
    setDecisionSuccess(`Application has been rejected under Legal Metrology Act provisions: ${reason}`);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span
                onClick={() => navigate('/admin/dashboard')}
                className="hover:text-blue-600 cursor-pointer"
              >
                Admin Dashboard
              </span>
              <span>&gt;</span>
              <span className="text-slate-800 font-medium">Scrutiny &amp; Assignment</span>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Application Review: {appRecord.applicationNo}
              </h1>
              <StatusBadge status={appRecord.status} size="sm" />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review applicant documentation, allocate district inspector, and schedule field testing date.
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft size={14} />
            <span>Back to Admin Dashboard</span>
          </button>
        </div>

        {/* Confirmation Banner if Action Completed */}
        {decisionSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900 shadow-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold">Administrative Decision Recorded</p>
                <p className="text-[11px] text-emerald-800 mt-0.5">{decisionSuccess}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => navigate('/officer/dashboard')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold text-xs transition-colors cursor-pointer"
              >
                View in Officer Portal
              </button>
              <button
                onClick={() => navigate(`/applications/${appRecord.applicationNo}`)}
                className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 rounded-md font-semibold text-xs transition-colors cursor-pointer"
              >
                View Applicant Tracking
              </button>
            </div>
          </div>
        )}

        {/* 2-Column Scrutiny Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Applicant Summary, Instrument Details, Documents Checklist */}
          <div className="lg:col-span-8 space-y-6">
            {/* Applicant & Business Record */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Building size={15} className="text-blue-600" />
                  <span>Applicant &amp; Commercial Establishment</span>
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Fee Paid: ₹{appRecord.payment.amount}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Trade / Business Name</span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">
                    {currentApplicant.businessName}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Applicant / Owner Name</span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {currentApplicant.ownerName}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Contact Details</span>
                  <p className="font-semibold text-slate-800 mt-0.5 flex items-center gap-2">
                    <span>{currentApplicant.mobile}</span>
                    <span className="text-slate-300">•</span>
                    <span>{currentApplicant.email}</span>
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Jurisdiction Office</span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {currentApplicant.district} / {currentApplicant.taluka}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[11px]">Establishment Address</span>
                  <p className="font-semibold text-slate-800 mt-0.5 leading-relaxed">
                    {currentApplicant.address}, Maharashtra - {currentApplicant.pincode}
                  </p>
                </div>
              </div>
            </div>

            {/* Instrument Under Verification */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <Scale size={15} className="text-indigo-600" />
                  <span>Instrument Specification for Field Test</span>
                </h3>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  Non-Automatic Weighing Instrument (NAWI)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Instrument Type</span>
                  <p className="font-bold text-slate-900 mt-0.5">Electronic Weighing Scale</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Manufacturer / Make</span>
                  <p className="font-semibold text-slate-800 mt-0.5">Essae</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Model Number</span>
                  <p className="font-semibold text-slate-800 mt-0.5">DS-252</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Serial Number</span>
                  <p className="font-semibold text-slate-800 font-mono mt-0.5">E012345678</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Capacity / Range</span>
                  <p className="font-semibold text-slate-800 mt-0.5">0 - 30 kg</p>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Least Count / Accuracy</span>
                  <p className="font-semibold text-slate-800 mt-0.5">5 g (Class III)</p>
                </div>
              </div>
            </div>

            {/* Document Scrutiny Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <FileCheck size={16} className="text-blue-600" />
                    <span>Document Scrutiny Checklist</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Verify statutory documents submitted under Legal Metrology Rules
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  All 4 Verified
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  {
                    key: 'aadhaar',
                    title: '1. Identity Proof of Applicant',
                    file: 'Aadhaar_Card_AjinkyaGhuge.pdf',
                    rule: 'Rule 11(1) — Proof of Applicant Identity',
                  },
                  {
                    key: 'shopAct',
                    title: '2. Commercial Establishment License',
                    file: 'Shop_Act_License_2026.pdf',
                    rule: 'Rule 11(2) — Municipal / Shop Act Registration',
                  },
                  {
                    key: 'invoice',
                    title: '3. Instrument Purchase Invoice / Bill',
                    file: 'Essae_WeighingScale_Invoice.pdf',
                    rule: 'Rule 14(3) — Make, Model, and Serial Validation',
                  },
                  {
                    key: 'photo',
                    title: '4. Photograph of Instrument & Serial Plate',
                    file: 'Scale_Serial_Plate_Photo.jpg',
                    rule: 'Rule 14(4) — Tamper Seal & Plate Legibility',
                  },
                ].map((doc) => {
                  const isChecked = docStatuses[doc.key as keyof typeof docStatuses];

                  return (
                    <div
                      key={doc.key}
                      className="p-3.5 bg-slate-50/70 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-slate-800">{doc.title}</p>
                          <span className="text-[10px] text-slate-400 font-mono">({doc.file})</span>
                        </div>
                        <p className="text-[11px] text-slate-500">{doc.rule}</p>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => alert(`Reviewing document: ${doc.file}`)}
                          className="px-2.5 py-1 text-xs bg-white border border-slate-300 hover:bg-slate-50 rounded-md text-slate-700 font-medium inline-flex items-center gap-1 cursor-pointer shadow-2xs"
                        >
                          <Eye size={12} className="text-blue-600" />
                          <span>View Doc</span>
                        </button>

                        <button
                          onClick={() =>
                            setDocStatuses({
                              ...docStatuses,
                              [doc.key]: !isChecked,
                            })
                          }
                          className={`px-2.5 py-1 text-xs rounded-md font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          <Check size={12} />
                          <span>{isChecked ? 'Verified' : 'Mark Verified'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scrutiny Remarks Field */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Departmental Scrutiny Remarks
                </label>
                <textarea
                  rows={2}
                  value={scrutinyRemarks}
                  onChange={(e) => setScrutinyRemarks(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter remarks for the field inspector..."
                />
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Officer Assignment, Schedule Selector, Decisions */}
          <div className="lg:col-span-4 space-y-6">
            {/* Officer Assignment Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <UserCheck size={16} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Assign Field Officer (Inspector)
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Designated Legal Metrology Inspector
                  </label>
                  <select
                    value={selectedOfficerId}
                    onChange={(e) => setSelectedOfficerId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white font-medium text-slate-800"
                  >
                    {mockOfficers.map((off) => (
                      <option key={off.id} value={off.id}>
                        {off.name} ({off.assignedCases} Active Cases)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Officer Bio Card */}
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900">{selectedOfficer.name}</span>
                    <span className="text-[10px] font-semibold bg-blue-200/70 text-blue-900 px-1.5 py-0.5 rounded">
                      {selectedOfficer.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-800">{selectedOfficer.designation}</p>
                  <p className="text-[11px] text-blue-700">Jurisdiction: {selectedOfficer.zone}</p>
                  <div className="pt-1 border-t border-blue-200/60 flex justify-between text-[10px] text-blue-900">
                    <span>Workload: {selectedOfficer.assignedCases} pending cases</span>
                    <span>{selectedOfficer.completedThisMonth} cleared this month</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inspection Scheduling Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Calendar size={16} className="text-purple-600" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Inspection Schedule Slot
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Inspection Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={inspectionDate}
                    onChange={(e) => setInspectionDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white font-medium text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Time Window Slot <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={inspectionTime}
                    onChange={(e) => setInspectionTime(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white text-slate-800"
                  >
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM (Morning Slot)</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM (Afternoon Slot)</option>
                    <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM (Evening Slot)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Special Field Instructions
                  </label>
                  <textarea
                    rows={2}
                    value={inspectorInstructions}
                    onChange={(e) => setInspectorInstructions(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-xs"
                    placeholder="Instructions for the testing officer..."
                  />
                </div>
              </div>
            </div>

            {/* Decision Action Buttons */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide pb-1 border-b border-slate-100">
                Administrative Actions
              </h3>

              {/* Primary: Approve & Schedule */}
              <button
                type="button"
                onClick={handleApproveAndAssign}
                className="w-full py-2.5 px-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <CheckCircle2 size={16} />
                <span>Approve &amp; Assign Officer</span>
              </button>

              {/* Secondary: Request Clarification */}
              <button
                type="button"
                onClick={() => setClarificationModal(true)}
                className="w-full py-2 px-4 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <HelpCircle size={15} />
                <span>Request Clarification from Merchant</span>
              </button>

              {/* Danger: Reject Application */}
              <button
                type="button"
                onClick={handleReject}
                className="w-full py-2 px-4 bg-white hover:bg-red-50 text-red-600 border border-red-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <XCircle size={15} />
                <span>Reject Application</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal: Request Clarification from Merchant */}
        {clarificationModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle size={16} className="text-amber-600" />
                  <span>Request Clarification from Applicant</span>
                </h3>
                <button
                  onClick={() => setClarificationModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-600">
                Enter your query or request for re-uploading documents. The applicant will receive this remark on their dashboard and status timeline.
              </p>

              <textarea
                rows={4}
                value={clarificationText}
                onChange={(e) => setClarificationText(e.target.value)}
                placeholder="e.g. Please re-upload a clear photograph of the scale serial number plate showing the stamped approval mark."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setClarificationModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestClarification}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send size={13} />
                  <span>Send Query to Applicant</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
