import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileText,
  RefreshCw,
  Plus,
  Trash2,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  CreditCard,
  ShieldCheck,
  Info,
  Building,
  User,
  Scale,
  ChevronRight,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { currentApplicant, currentUser } from '../../data/mock';
import { saveApplication } from '../../data/mock/store';
import type { Application, InstrumentType } from '../../types';

interface InstrumentFormItem {
  id: string;
  type: InstrumentType;
  make: string;
  model: string;
  serialNumber: string;
  capacity: string;
  leastCount: string;
}

export function NewApplication() {
  const navigate = useNavigate();

  // Multi-step state: 1 = Details, 2 = Documents, 3 = Review, 4 = Payment, 5 = Success
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form states
  const [applicationType, setApplicationType] = useState<'Verification' | 'Re-verification'>('Verification');

  // Applicant info
  const [applicantData, setApplicantData] = useState({
    ownerName: currentApplicant.ownerName,
    businessName: currentApplicant.businessName,
    mobile: currentApplicant.mobile,
    email: currentApplicant.email,
    address: currentApplicant.address,
    district: currentApplicant.district,
    taluka: currentApplicant.taluka,
    pincode: currentApplicant.pincode,
  });

  // Instruments list
  const [instruments, setInstruments] = useState<InstrumentFormItem[]>([
    {
      id: 'inst-form-1',
      type: 'Electronic Weighing Scale',
      make: 'Essae',
      model: 'DS-252',
      serialNumber: 'E012345678',
      capacity: '0 - 30 kg',
      leastCount: '5 g',
    },
  ]);

  // Uploaded docs mock state
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>({
    aadhaar: 'Aadhaar_Card_AjinkyaGhuge.pdf',
    shopAct: 'Shop_Act_License_2026.pdf',
    invoice: 'Essae_WeighingScale_Invoice.pdf',
    photo: 'Scale_Serial_Plate_Photo.jpg',
  });

  // Payment mock state
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [declarationChecked, setDeclarationChecked] = useState(true);

  // Submission result reference
  const [generatedAppNo, setGeneratedAppNo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle adding another instrument
  const addInstrument = () => {
    const newItem: InstrumentFormItem = {
      id: `inst-form-${Date.now()}`,
      type: 'Electronic Weighing Scale',
      make: '',
      model: '',
      serialNumber: '',
      capacity: '',
      leastCount: '',
    };
    setInstruments([...instruments, newItem]);
  };

  // Handle removing instrument
  const removeInstrument = (id: string) => {
    if (instruments.length === 1) return;
    setInstruments(instruments.filter((i) => i.id !== id));
  };

  // Handle instrument field changes
  const updateInstrument = (id: string, field: keyof InstrumentFormItem, value: string) => {
    setInstruments(
      instruments.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Validate step 1
  const handleProceedToStep2 = (e: FormEvent) => {
    e.preventDefault();
    if (!applicantData.ownerName || !applicantData.businessName || !applicantData.mobile) {
      setErrorMessage('Please fill in all mandatory applicant details.');
      return;
    }
    for (const inst of instruments) {
      if (!inst.make || !inst.model || !inst.serialNumber) {
        setErrorMessage('Please complete all required fields for each instrument.');
        return;
      }
    }
    setErrorMessage('');
    setCurrentStep(2);
  };

  // Handle mock file upload
  const handleFileUpload = (docKey: string, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedDocs({
        ...uploadedDocs,
        [docKey]: e.target.files[0].name,
      });
    }
  };

  // Final submission action
  const handleFinalSubmit = () => {
    const newRef = `LM-2026-00${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedAppNo(newRef);

    const newAppRecord: Application = {
      id: `app-rec-${Date.now()}`,
      applicationNo: newRef,
      applicantId: currentApplicant.id,
      instrumentId: 'inst-001',
      type: applicationType,
      status: 'Submitted',
      submittedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      lastUpdated: 'Just now',
      totalInstruments: instruments.length,
      remarks: `${applicationType} application submitted by ${applicantData.ownerName} (${applicantData.businessName}).`,
      payment: {
        amount: instruments.length * 500,
        status: 'Paid',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        method: paymentMethod === 'upi' ? 'UPI (Google Pay)' : paymentMethod === 'card' ? 'Debit Card' : 'Net Banking',
        transactionId: `TXN${Date.now().toString().slice(-8)}`,
      },
      documents: [
        { id: 'doc-1', name: 'Identity Proof', type: 'PDF', uploadedDate: 'Today', status: 'Verified' },
        { id: 'doc-2', name: 'Business Proof', type: 'PDF', uploadedDate: 'Today', status: 'Verified' },
        { id: 'doc-3', name: 'Purchase Invoice', type: 'PDF', uploadedDate: 'Today', status: 'Pending' },
        { id: 'doc-4', name: 'Instrument Photograph', type: 'JPG', uploadedDate: 'Today', status: 'Pending' },
      ],
    };

    saveApplication(newAppRecord);
    setCurrentStep(5);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Top Header / Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span
                onClick={() => navigate('/dashboard')}
                className="hover:text-blue-600 cursor-pointer"
              >
                Dashboard
              </span>
              <span>&gt;</span>
              <span className="text-slate-800 font-medium">New Application</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">New Application</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Apply for verification or re-verification of weighing and measuring instruments.
            </p>
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft size={14} />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Role & Workflow Context Banner */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <span className="font-bold bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              Applicant Portal
            </span>
            <span>
              Logged in as <strong>{currentUser.name}</strong> (Commercial Shop / Business Owner)
            </span>
          </div>
          <div className="text-[11px] text-blue-700 flex items-center gap-1">
            <Info size={13} className="flex-shrink-0" />
            <span>Upon submission, your case will be assigned to a district Legal Metrology Officer (Inspector).</span>
          </div>
        </div>

        {/* Success Screen (Step 5) */}
        {currentStep === 5 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>

            <span className="text-xs font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full">
              Application Submitted Successfully
            </span>

            <h2 className="text-2xl font-bold text-slate-900 mt-3 mb-2">
              Application Reference: {generatedAppNo}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
              Your application has been logged into the Department of Legal Metrology portal. It will be reviewed by the District Admin and assigned to a Field Officer for on-site inspection.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left max-w-md mx-auto mb-6 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant Name:</span>
                <span className="font-semibold text-slate-800">{applicantData.ownerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Business Name:</span>
                <span className="font-semibold text-slate-800">{applicantData.businessName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Instruments Included:</span>
                <span className="font-semibold text-slate-800">{instruments.length} Unit(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Statutory Fee Paid:</span>
                <span className="font-semibold text-emerald-700">₹{instruments.length * 500} (Completed)</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                <span className="text-slate-500">Next Action:</span>
                <span className="font-semibold text-blue-700">Officer Assignment by District Admin</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => navigate(`/applications/${generatedAppNo}`)}
                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
              >
                Track This Application
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Main 2-Column Form Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8-Columns: Main Form Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* STEP 1: Applicant & Instrument Details */}
              {currentStep === 1 && (
                <form onSubmit={handleProceedToStep2} className="space-y-6">
                  {/* Section 1: Application Type */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
                      Application Type
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Verification Option */}
                      <label
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          applicationType === 'Verification'
                            ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="appType"
                          checked={applicationType === 'Verification'}
                          onChange={() => setApplicationType('Verification')}
                          className="mt-1 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <FileText size={16} className="text-blue-600" />
                            <span className="text-xs font-bold text-slate-900">Verification</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                            For new instruments or first-time verification.
                          </p>
                        </div>
                      </label>

                      {/* Re-verification Option */}
                      <label
                        className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                          applicationType === 'Re-verification'
                            ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="appType"
                          checked={applicationType === 'Re-verification'}
                          onChange={() => setApplicationType('Re-verification')}
                          className="mt-1 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <RefreshCw size={16} className="text-indigo-600" />
                            <span className="text-xs font-bold text-slate-900">Re-verification</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                            For instruments whose certificate is expiring or expired.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Section 2: Applicant / Business Details */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                        <Building size={15} className="text-blue-600" />
                        <span>Applicant / Business Details</span>
                      </h2>
                      <span className="text-[11px] text-slate-400">* Required fields</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Owner / Applicant Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantData.ownerName}
                          onChange={(e) => setApplicantData({ ...applicantData, ownerName: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Business Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantData.businessName}
                          onChange={(e) => setApplicantData({ ...applicantData, businessName: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={applicantData.mobile}
                          onChange={(e) => setApplicantData({ ...applicantData, mobile: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Email ID</label>
                        <input
                          type="email"
                          value={applicantData.email}
                          onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-semibold text-slate-700 mb-1">
                          Business Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={2}
                          required
                          value={applicantData.address}
                          onChange={(e) => setApplicantData({ ...applicantData, address: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          District <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={applicantData.district}
                          onChange={(e) => setApplicantData({ ...applicantData, district: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                        >
                          <option value="Chhatrapati Sambhaji Nagar">Chhatrapati Sambhaji Nagar</option>
                          <option value="Pune">Pune</option>
                          <option value="Mumbai City">Mumbai City</option>
                          <option value="Nagpur">Nagpur</option>
                          <option value="Nashik">Nashik</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Taluka <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={applicantData.taluka}
                          onChange={(e) => setApplicantData({ ...applicantData, taluka: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                        >
                          <option value="Chhatrapati Sambhaji Nagar">Chhatrapati Sambhaji Nagar</option>
                          <option value="Paithan">Paithan</option>
                          <option value="Vaijapur">Vaijapur</option>
                          <option value="Gangapur">Gangapur</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Pincode <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={applicantData.pincode}
                          onChange={(e) => setApplicantData({ ...applicantData, pincode: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Instrument Details */}
                  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                        <Scale size={15} className="text-indigo-600" />
                        <span>Instrument Details</span>
                      </h2>
                      <button
                        type="button"
                        onClick={addInstrument}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/70 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                      >
                        <Plus size={13} />
                        <span>Add Another Instrument</span>
                      </button>
                    </div>

                    {instruments.map((inst, index) => (
                      <div
                        key={inst.id}
                        className="p-4 bg-slate-50/80 border border-slate-200 rounded-xl space-y-3 relative"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                          <span className="text-xs font-bold text-slate-800">
                            Instrument {index + 1}
                          </span>
                          {instruments.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeInstrument(inst.id)}
                              className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                              title="Delete Instrument"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                          <div>
                            <label className="block font-medium text-slate-700 mb-1">
                              Instrument Type <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={inst.type}
                              onChange={(e) => updateInstrument(inst.id, 'type', e.target.value as InstrumentType)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                              <option value="Electronic Weighing Scale">Electronic Weighing Scale</option>
                              <option value="Petrol Dispenser">Petrol Dispenser</option>
                              <option value="LPG Dispenser">LPG Dispenser</option>
                              <option value="Measuring Tank">Measuring Tank</option>
                              <option value="Water Meter">Water Meter</option>
                              <option value="Platform Scale">Platform Scale</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-medium text-slate-700 mb-1">
                              Manufacturer / Make <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={inst.make}
                              onChange={(e) => updateInstrument(inst.id, 'make', e.target.value)}
                              placeholder="e.g. Essae"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-slate-700 mb-1">
                              Model No. <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={inst.model}
                              onChange={(e) => updateInstrument(inst.id, 'model', e.target.value)}
                              placeholder="e.g. DS-252"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-slate-700 mb-1">
                              Serial Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={inst.serialNumber}
                              onChange={(e) => updateInstrument(inst.id, 'serialNumber', e.target.value)}
                              placeholder="e.g. E012345678"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-slate-700 mb-1">
                              Capacity / Range <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={inst.capacity}
                              onChange={(e) => updateInstrument(inst.id, 'capacity', e.target.value)}
                              placeholder="e.g. 0 - 30 kg"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block font-medium text-slate-700 mb-1">
                              Least Count / Accuracy <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={inst.leastCount}
                              onChange={(e) => updateInstrument(inst.id, 'leastCount', e.target.value)}
                              placeholder="e.g. 5 g"
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs flex items-center gap-2">
                      <AlertCircle size={15} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Step 1 Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Proceed to Document Upload</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Document Upload */}
              {currentStep === 2 && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
                  <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                        Step 2: Required Document Uploads
                      </h2>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Upload clear scanned copies or photos (PDF, PNG, JPG up to 5MB each).
                      </p>
                    </div>
                    <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">
                      4 of 4 Ready
                    </span>
                  </div>

                  <div className="space-y-4 text-xs">
                    {[
                      { key: 'aadhaar', label: '1. Identity Proof (Aadhaar / PAN / Other)', required: true },
                      { key: 'shopAct', label: '2. Business Proof (Shop Act / GST / Udyam)', required: true },
                      { key: 'invoice', label: '3. Instrument Purchase Invoice', required: true },
                      { key: 'photo', label: '4. Instrument Photograph (with serial plate)', required: true },
                      { key: 'prevCert', label: '5. Previous Certificate (for Re-verification)', required: false },
                    ].map((doc) => (
                      <div
                        key={doc.key}
                        className="p-3.5 border border-slate-200 rounded-xl hover:border-slate-300 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-800">
                            {doc.label} {doc.required && <span className="text-red-500">*</span>}
                          </p>
                          {uploadedDocs[doc.key] ? (
                            <div className="flex items-center gap-1.5 text-emerald-700 text-[11px]">
                              <CheckCircle2 size={13} />
                              <span className="font-medium">{uploadedDocs[doc.key]}</span>
                              <span className="text-slate-400">• Ready</span>
                            </div>
                          ) : (
                            <p className="text-[11px] text-slate-400">No document chosen yet</p>
                          )}
                        </div>

                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md font-medium text-xs cursor-pointer shadow-2xs self-start sm:self-auto">
                          <UploadCloud size={14} className="text-blue-600" />
                          <span>{uploadedDocs[doc.key] ? 'Change File' : 'Upload File'}</span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(doc.key, e)}
                          />
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                    >
                      ← Back to Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-6 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Proceed to Review</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Review & Submit */}
              {currentStep === 3 && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
                  <div className="pb-3 border-b border-slate-100">
                    <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Step 3: Review Application Information
                    </h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Verify all applicant details, instrument specifications and uploaded documents before continuing.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="space-y-4 text-xs">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-bold text-slate-800">Application Type</span>
                        <span className="bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded text-[11px]">
                          {applicationType}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                        <div>
                          <span className="text-slate-500">Applicant:</span>
                          <p className="font-semibold text-slate-800">{applicantData.ownerName}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Business:</span>
                          <p className="font-semibold text-slate-800">{applicantData.businessName}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Contact:</span>
                          <p className="font-semibold text-slate-800">{applicantData.mobile}</p>
                        </div>
                        <div className="sm:col-span-3">
                          <span className="text-slate-500">Address:</span>
                          <p className="font-semibold text-slate-800">
                            {applicantData.address}, {applicantData.district} - {applicantData.pincode}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Instruments Summary */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <span className="font-bold text-slate-800">
                        Instruments to be Verified ({instruments.length})
                      </span>
                      {instruments.map((inst, i) => (
                        <div
                          key={inst.id}
                          className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]"
                        >
                          <div>
                            <p className="font-bold text-slate-800">
                              {i + 1}. {inst.type}
                            </p>
                            <p className="text-slate-500">
                              Make: {inst.make} | Model: {inst.model} | S/N: {inst.serialNumber}
                            </p>
                          </div>
                          <span className="text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded self-start sm:self-auto">
                            Capacity: {inst.capacity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Officer Inspection Notice */}
                    <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
                      <ShieldCheck size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Officer Field Inspection Requirement</p>
                        <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                          After fee payment, this application is routed to the District Legal Metrology Admin who schedules an inspection and assigns a certified Weights &amp; Measures Officer to test and verify these instruments at your premises.
                        </p>
                      </div>
                    </div>

                    {/* Declaration */}
                    <label className="flex items-start gap-2.5 pt-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={declarationChecked}
                        onChange={(e) => setDeclarationChecked(e.target.checked)}
                        className="mt-0.5 text-blue-600 rounded"
                      />
                      <span className="text-[11px] text-slate-600 leading-snug">
                        I hereby declare that the particulars submitted are true to the best of my knowledge, and I undertake to present the instrument(s) for physical verification by the designated Inspector.
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                    >
                      ← Back to Documents
                    </button>
                    <button
                      type="button"
                      disabled={!declarationChecked}
                      onClick={() => setCurrentStep(4)}
                      className={`px-6 py-2.5 rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer ${
                        declarationChecked
                          ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <span>Proceed to Fee Payment</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Fee Payment */}
              {currentStep === 4 && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
                  <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                        Step 4: Statutory Government Fee Payment
                      </h2>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Statutory fee under the Legal Metrology (General) Rules, 2011.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                      Demo Mode: No Real Charge
                    </span>
                  </div>

                  {/* Fee Breakdown */}
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between text-slate-600">
                      <span>Verification Fee ({instruments.length} Instrument × ₹500)</span>
                      <span>₹{instruments.length * 500}.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>User Portal Processing Charge</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 text-sm border-t border-slate-200 pt-2 mt-2">
                      <span>Total Amount Payable</span>
                      <span className="text-blue-700">₹{instruments.length * 500}.00</span>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-800">Select Demo Payment Method</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      {[
                        { id: 'upi', label: 'UPI / QR (GPay / PhonePe)', icon: CreditCard },
                        { id: 'card', label: 'Debit / Credit Card', icon: CreditCard },
                        { id: 'netbanking', label: 'Net Banking (SBI / HDFC)', icon: Building },
                      ].map((m) => (
                        <label
                          key={m.id}
                          className={`p-3 rounded-xl border cursor-pointer flex flex-col justify-between gap-2 transition-all ${
                            paymentMethod === m.id
                              ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800">{m.id.toUpperCase()}</span>
                            <input
                              type="radio"
                              name="payMethod"
                              checked={paymentMethod === m.id}
                              onChange={() => setPaymentMethod(m.id as any)}
                              className="text-blue-600"
                            />
                          </div>
                          <span className="text-[11px] text-slate-500 leading-tight">{m.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                    >
                      ← Back to Review
                    </button>
                    <button
                      type="button"
                      onClick={handleFinalSubmit}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 size={15} />
                      <span>Pay ₹{instruments.length * 500} &amp; Submit Application</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right 4-Columns: Progress, Requirements & Info Panels */}
            <div className="lg:col-span-4 space-y-6">
              {/* Application Progress Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Application Progress
                  </h3>
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Step {currentStep} of 4
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { stepNum: 1, title: 'Applicant & Instrument Details', subtitle: 'Fill basic details' },
                    { stepNum: 2, title: 'Document Upload', subtitle: 'Upload required documents' },
                    { stepNum: 3, title: 'Review & Submit', subtitle: 'Verify information before submission' },
                    { stepNum: 4, title: 'Payment', subtitle: 'Pay application fee' },
                  ].map((s) => {
                    const isDone = currentStep > s.stepNum;
                    const isCurrent = currentStep === s.stepNum;

                    return (
                      <div key={s.stepNum} className="flex items-start gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : isCurrent
                              ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          }`}
                        >
                          {isDone ? <CheckCircle2 size={14} /> : s.stepNum}
                        </div>
                        <div>
                          <p
                            className={`text-xs font-bold leading-tight ${
                              isCurrent ? 'text-blue-700' : isDone ? 'text-slate-800' : 'text-slate-400'
                            }`}
                          >
                            {s.title}
                          </p>
                          <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                            {s.subtitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Required Documents Card (from screenshot) */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
                  <FileCheck size={16} className="text-blue-600" />
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Required Documents
                  </h3>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-600 mb-3">
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-400">1.</span>
                    <span>Identity Proof (Aadhaar / PAN / Other)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-400">2.</span>
                    <span>Business Proof (Shop Act / GST / Udyam)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-400">3.</span>
                    <span>Instrument Purchase Invoice</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-400">4.</span>
                    <span>Instrument Photograph</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-slate-400">5.</span>
                    <span>Any Previous Certificate (if re-verification)</span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>View Sample Documents</span>
                  <ChevronRight size={13} />
                </button>
              </div>

              {/* Application Process Card (from screenshot) */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 shadow-xs">
                <div className="flex items-center gap-2 mb-1.5 text-emerald-800">
                  <Info size={16} />
                  <h3 className="text-xs font-bold uppercase tracking-wide">
                    Application Process
                  </h3>
                </div>
                <p className="text-xs text-emerald-900/90 leading-relaxed">
                  After submission, your application will be reviewed by the department. You can track the status in &quot;My Applications&quot;.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
