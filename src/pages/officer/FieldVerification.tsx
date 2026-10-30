import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Check,
  X,
  FileText,
  User,
  Scale,
  Calendar,
  MapPin,
  Camera,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Copy,
  ExternalLink,
  Award,
  ArrowLeft,
  Clock,
  Plus,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { currentApplicant, mockOfficers } from '../../data/mock';
import { getApplications, saveApplication } from '../../data/mock/store';
import type { ChecklistItem, InspectionResult, ApplicationStatus } from '../../types';

interface ChecklistRow {
  id: string;
  category: 'physical' | 'technical' | 'additional';
  text: string;
  checked: boolean;
  status: 'Pass' | 'Fail' | null;
}

export function FieldVerification() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const caseId = id || 'LM-2026-001482';
  const officer = mockOfficers[0]; // Inspector S. Patil

  const [activeTab, setActiveTab] = useState<'form' | 'details' | 'docs' | 'history'>('form');

  // Checklist items (exact match to screenshot)
  const [checklist, setChecklist] = useState<ChecklistRow[]>([
    // 1. Physical Inspection
    { id: 'c1', category: 'physical', text: 'Instrument available at site', checked: true, status: 'Pass' },
    { id: 'c2', category: 'physical', text: 'Make, Model and Serial Number match with records', checked: true, status: 'Pass' },
    { id: 'c3', category: 'physical', text: 'Instrument in good physical condition', checked: true, status: 'Pass' },
    { id: 'c4', category: 'physical', text: 'Seals and markings intact', checked: true, status: 'Pass' },
    // 2. Technical Verification
    { id: 'c5', category: 'technical', text: 'Zero error within permissible limit', checked: true, status: 'Pass' },
    { id: 'c6', category: 'technical', text: 'Accuracy test with standard weights', checked: true, status: 'Pass' },
    { id: 'c7', category: 'technical', text: 'Display functioning properly', checked: true, status: 'Pass' },
    { id: 'c8', category: 'technical', text: 'Other technical parameters (if applicable)', checked: true, status: 'Pass' },
    // 3. Additional Observations
    { id: 'c9', category: 'additional', text: 'Proper display of weights and measures act information', checked: true, status: 'Pass' },
    { id: 'c10', category: 'additional', text: 'No tampering or unauthorized modification', checked: true, status: 'Pass' },
  ]);

  // Measurements (exact match to screenshot)
  const [standardWeight, setStandardWeight] = useState('5');
  const [observedReading, setObservedReading] = useState('4.998');
  const [permissibleError, setPermissibleError] = useState('0.005');
  const [remarks, setRemarks] = useState(
    'Instrument is in good condition. Readings are within permissible limit. No external tampering observed.'
  );

  // Photos list
  const [photos, setPhotos] = useState([
    { id: 'p1', label: 'Front View', caption: 'Front view of scale in retail counter' },
    { id: 'p2', label: 'Serial Number', caption: 'Serial plate E012345678 stamped' },
    { id: 'p3', label: 'Seal / Marking', caption: 'Inspector lead seal applied' },
    { id: 'p4', label: 'Side View', caption: 'Side profile and leveling bubble intact' },
  ]);

  // Computed error
  const observedError = useMemo(() => {
    const std = parseFloat(standardWeight);
    const obs = parseFloat(observedReading);
    if (isNaN(std) || isNaN(obs)) return '-0.002';
    return (obs - std).toFixed(3);
  }, [standardWeight, observedReading]);

  const isWithinLimit = useMemo(() => {
    const err = Math.abs(parseFloat(observedError));
    const perm = parseFloat(permissibleError);
    if (isNaN(err) || isNaN(perm)) return true;
    return err <= perm;
  }, [observedError, permissibleError]);

  // Submission feedback
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [generatedCertNo, setGeneratedCertNo] = useState('');

  const toggleCheck = (checkId: string) => {
    setChecklist(
      checklist.map((item) =>
        item.id === checkId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const setItemStatus = (checkId: string, status: 'Pass' | 'Fail') => {
    setChecklist(
      checklist.map((item) =>
        item.id === checkId ? { ...item, status, checked: true } : item
      )
    );
  };

  // Submit Verification Handler
  const handleSubmitVerification = (compliant: boolean) => {
    const certNum = `MH-LM-2026-88${Math.floor(10 + Math.random() * 89)}`;
    setGeneratedCertNo(certNum);

    const apps = getApplications();
    const target = apps.find((a) => a.applicationNo === caseId) || apps[0];

    const updatedApp = {
      ...target,
      status: compliant ? ('Certificate Issued' as ApplicationStatus) : ('Rejected' as ApplicationStatus),
      remarks: remarks,
      lastUpdated: 'Just now by Inspector ' + officer.name,
    };

    saveApplication(updatedApp);

    if (compliant) {
      setSubmissionSuccess(
        `Field verification marked COMPLIANT. Certificate ${certNum} generated and digitally signed by Inspector S. Patil.`
      );
    } else {
      setSubmissionSuccess(
        `Field verification marked NON-COMPLIANT. Notice issued under Section 15 of Legal Metrology Act.`
      );
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Breadcrumb & Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span
                onClick={() => navigate('/officer/dashboard')}
                className="hover:text-blue-600 cursor-pointer"
              >
                Assigned Cases
              </span>
              <span>&gt;</span>
              <span className="font-mono text-slate-700">{caseId}</span>
              <span>&gt;</span>
              <span className="text-slate-900 font-medium">Field Verification</span>
            </div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Field Verification
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded">
                Scheduled
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Record inspection details, verify instrument and submit the result.
            </p>
          </div>

          <button
            onClick={() => navigate('/officer/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 px-3.5 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft size={14} />
            <span>Back to Assigned Cases</span>
          </button>
        </div>

        {/* 5-Block Case Metadata Banner (exact match to screenshot) */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {/* 1. Application No */}
            <div className="flex items-start gap-2.5 sm:px-2 pt-2 sm:pt-0">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                <FileText size={16} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                  Application No.
                </span>
                <p className="font-bold text-slate-900 mt-0.5 font-mono">{caseId}</p>
                <span className="text-[10px] text-slate-400">Fresh Verification</span>
              </div>
            </div>

            {/* 2. Applicant */}
            <div className="flex items-start gap-2.5 sm:px-3 pt-2 sm:pt-0">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 flex-shrink-0">
                <User size={16} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                  Applicant
                </span>
                <p className="font-bold text-slate-900 mt-0.5">{currentApplicant.businessName}</p>
                <p className="text-[11px] text-slate-500">{currentApplicant.ownerName}</p>
              </div>
            </div>

            {/* 3. Instrument */}
            <div className="flex items-start gap-2.5 sm:px-3 pt-2 sm:pt-0">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-600 flex-shrink-0">
                <Scale size={16} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                  Instrument
                </span>
                <p className="font-bold text-slate-900 mt-0.5">Electronic Weighing Scale</p>
                <p className="text-[10px] text-slate-500 font-mono">Model: DS-252 | SN: E012345678</p>
              </div>
            </div>

            {/* 4. Schedule */}
            <div className="flex items-start gap-2.5 sm:px-3 pt-2 sm:pt-0">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600 flex-shrink-0">
                <Calendar size={16} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                  Schedule
                </span>
                <p className="font-bold text-slate-900 mt-0.5">02 Oct 2026</p>
                <p className="text-[10px] text-slate-500">10:00 AM - 11:30 AM</p>
              </div>
            </div>

            {/* 5. Location */}
            <div className="flex items-start gap-2.5 sm:px-3 pt-2 sm:pt-0">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">
                  Location
                </span>
                <p className="font-bold text-slate-900 mt-0.5 line-clamp-1">
                  Shop No. 12, Near Bus Stand
                </p>
                <p className="text-[10px] text-slate-500">Sambhaji Nagar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation (Exact match to screenshot) */}
        <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-semibold">
          {[
            { id: 'form', label: 'Verification Form' },
            { id: 'details', label: 'Instrument Details' },
            { id: 'docs', label: 'Documents' },
            { id: 'history', label: 'Previous History' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 transition-colors cursor-pointer relative ${
                activeTab === tab.id
                  ? 'text-blue-600 font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Submission Feedback Banner */}
        {submissionSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-900 shadow-xs">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={18} className="text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold">Inspection Result Submitted Successfully</p>
                <p className="text-[11px] text-emerald-800 mt-0.5">{submissionSuccess}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => navigate('/certificates')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-semibold text-xs transition-colors cursor-pointer"
              >
                View Issued Certificates
              </button>
              <button
                onClick={() => navigate('/officer/dashboard')}
                className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 hover:bg-emerald-50 rounded-md font-semibold text-xs transition-colors cursor-pointer"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* 3-Column Inspection Workspace (exact match to screenshot layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Column 1: Verification Checklist (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide pb-2 border-b border-slate-100">
              Verification Checklist
            </h2>

            {/* 1. Physical Inspection */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-800">1. Physical Inspection</p>
              <div className="space-y-2 text-xs">
                {checklist
                  .filter((c) => c.category === 'physical')
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2"
                    >
                      <label className="flex items-center gap-2 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleCheck(item.id)}
                          className="w-3.5 h-3.5 text-blue-600 rounded"
                        />
                        <span className="text-slate-700 leading-snug">{item.text}</span>
                      </label>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setItemStatus(item.id, 'Pass')}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                            item.status === 'Pass'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          Pass
                        </button>
                        <button
                          type="button"
                          onClick={() => setItemStatus(item.id, 'Fail')}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                            item.status === 'Fail'
                              ? 'bg-red-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          Fail
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* 2. Technical Verification */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-800">2. Technical Verification</p>
              <div className="space-y-2 text-xs">
                {checklist
                  .filter((c) => c.category === 'technical')
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2"
                    >
                      <label className="flex items-center gap-2 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleCheck(item.id)}
                          className="w-3.5 h-3.5 text-blue-600 rounded"
                        />
                        <span className="text-slate-700 leading-snug">{item.text}</span>
                      </label>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setItemStatus(item.id, 'Pass')}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                            item.status === 'Pass'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          Pass
                        </button>
                        <button
                          type="button"
                          onClick={() => setItemStatus(item.id, 'Fail')}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                            item.status === 'Fail'
                              ? 'bg-red-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          Fail
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* 3. Additional Observations */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <p className="text-xs font-bold text-slate-800">3. Additional Observations</p>
              <div className="space-y-2 text-xs">
                {checklist
                  .filter((c) => c.category === 'additional')
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2"
                    >
                      <label className="flex items-center gap-2 cursor-pointer flex-1">
                        <input
                          type="checkbox"
                          checked={item.checked}
                          onChange={() => toggleCheck(item.id)}
                          className="w-3.5 h-3.5 text-blue-600 rounded"
                        />
                        <span className="text-slate-700 leading-snug">{item.text}</span>
                      </label>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setItemStatus(item.id, 'Pass')}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                            item.status === 'Pass'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          Pass
                        </button>
                        <button
                          type="button"
                          onClick={() => setItemStatus(item.id, 'Fail')}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer transition-colors ${
                            item.status === 'Fail'
                              ? 'bg-red-600 text-white'
                              : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-100'
                          }`}
                        >
                          Fail
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Column 2: Measurement Details & Observations (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Measurement Details Panel */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide pb-2 border-b border-slate-100">
                Measurement Details
              </h2>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Standard Weight Used (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={standardWeight}
                    onChange={(e) => setStandardWeight(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Working Standard: Class M1 20kg certified
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Observed Reading (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={observedReading}
                    onChange={(e) => setObservedReading(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Permissible Error (+/- kg)
                  </label>
                  <input
                    type="text"
                    value={permissibleError}
                    onChange={(e) => setPermissibleError(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Max Permissible Error (MPE) under Rule 18
                  </span>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Error Observed (kg)
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={observedError}
                    className="w-full px-3 py-2 border border-slate-200 bg-slate-50 font-mono text-slate-800 rounded-lg"
                  />
                </div>

                {/* Live Result Pill */}
                <div className="pt-2">
                  <div
                    className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 ${
                      isWithinLimit
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                        : 'bg-red-50 border-red-200 text-red-800'
                    }`}
                  >
                    {isWithinLimit ? (
                      <>
                        <CheckCircle2 size={15} />
                        <span>Result: Within Permissible Limit</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={15} />
                        <span>Result: Exceeds Permissible Limit</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Observations / Remarks Panel */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide pb-2 border-b border-slate-100">
                Observations / Remarks
              </h2>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter field testing findings and notes..."
              />
            </div>
          </div>

          {/* Column 3: Instrument Evidence Photos & GPS (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Instrument Photos
                  </h2>
                  <p className="text-[10px] text-slate-400">Photos of instrument &amp; seals</p>
                </div>
                <button
                  onClick={() => alert('Camera / Image upload selector opened')}
                  className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <Plus size={12} />
                  <span>Add Photo</span>
                </button>
              </div>

              {/* 4 Photos Grid */}
              <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                {photos.map((p) => (
                  <div
                    key={p.id}
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50 relative group"
                  >
                    <div className="w-full h-16 bg-white border border-slate-200 rounded flex items-center justify-center text-slate-400 mb-1 shadow-2xs">
                      <Camera size={20} className="text-slate-400 group-hover:text-blue-600" />
                    </div>
                    <p className="font-bold text-slate-700 truncate">{p.label}</p>
                    <button
                      onClick={() => setPhotos(photos.filter((item) => item.id !== p.id))}
                      className="absolute top-1 right-1 w-4 h-4 rounded-full bg-slate-900/60 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              {/* GPS Stamp Card */}
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs space-y-1">
                <div className="flex items-center justify-between text-blue-900">
                  <div className="flex items-center gap-1.5 font-bold text-[11px]">
                    <MapPin size={13} className="text-blue-700" />
                    <span>Location (Captured Automatically)</span>
                  </div>
                  <button
                    onClick={() => alert('GPS location refreshed: 19.8762, 75.3433')}
                    className="text-blue-600 hover:text-blue-800 p-0.5 cursor-pointer"
                    title="Refresh GPS"
                  >
                    <RefreshCw size={11} />
                  </button>
                </div>
                <p className="text-[11px] font-mono text-slate-600">19.8762° N, 75.3433° E</p>
                <p className="text-[10px] text-slate-400">Shop No. 12, Near Bus Stand, Sambhaji Nagar</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar (exact match to screenshot) */}
        <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-sm border-t border-slate-200 p-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <button
            type="button"
            onClick={() => alert('Field verification entries saved as draft.')}
            className="w-full sm:w-auto px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
          >
            Save as Draft
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleSubmitVerification(false)}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-white border border-red-300 hover:bg-red-50 text-red-600 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              Mark as Non-Compliant
            </button>

            <button
              type="button"
              onClick={() => handleSubmitVerification(true)}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-bold shadow-xs inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck size={15} />
              <span>Submit Verification</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
