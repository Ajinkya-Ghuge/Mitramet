import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  Shield,
  CheckCircle2,
  Save,
  Bell,
  Scale,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { currentApplicant, currentUser } from '../../data/mock';

export function ProfileSettings() {
  const navigate = useNavigate();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    businessName: currentApplicant.businessName,
    ownerName: currentApplicant.ownerName,
    mobile: currentApplicant.mobile,
    email: currentApplicant.email,
    address: currentApplicant.address,
    district: currentApplicant.district,
    taluka: currentApplicant.taluka,
    pincode: currentApplicant.pincode,
    shopActReg: 'MH-CSN-COMM-2024-88912',
    gstin: '27AABCU9603R1ZM',
  });

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <AppShell>
      <div className="space-y-6 max-w-4xl">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span onClick={() => navigate('/dashboard')} className="hover:text-blue-600 cursor-pointer">
                Dashboard
              </span>
              <span>&gt;</span>
              <span className="text-slate-800 font-medium">Profile / Settings</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Merchant Profile &amp; Establishment Details
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Statutory registration records on file with the Department of Legal Metrology.
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Profile and notification preferences updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Card 1: Establishment Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Building size={16} className="text-blue-600" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Commercial Establishment Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Registered Business Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Shop &amp; Establishment Act Reg No.
                </label>
                <input
                  type="text"
                  value={formData.shopActReg}
                  onChange={(e) => setFormData({ ...formData, shopActReg: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">GSTIN Number</label>
                <input
                  type="text"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Establishment Category</label>
                <input
                  type="text"
                  readOnly
                  value="Retail Merchant / General Provisions"
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Physical Store Address</label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">District</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pincode</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Authorized Applicant Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <User size={16} className="text-blue-600" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Authorized Signatory / Business Owner
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Designation / Capacity</label>
                <input
                  type="text"
                  readOnly
                  value="Sole Proprietor"
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile (SMS Alerts)</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Jurisdictional Office */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Scale size={16} className="text-[#1a2744]" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Assigned Legal Metrology Jurisdiction
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">District Office:</span>
                <p className="font-bold text-slate-800 mt-0.5">Chhatrapati Sambhaji Nagar</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Division:</span>
                <p className="font-bold text-slate-800 mt-0.5">Marathwada Division</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[11px]">Enforcement Zone:</span>
                <p className="font-bold text-slate-800 mt-0.5">Zone 1 (Central &amp; CIDCO)</p>
              </div>
            </div>
          </div>

          {/* Card 4: Preferences & Toggles */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs text-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Bell size={16} className="text-blue-600" />
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Alerts &amp; Notification Preferences
              </h2>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-800">SMS Alerts for Inspection Visits</p>
                  <p className="text-[11px] text-slate-500">
                    Receive direct SMS messages when an officer schedules a physical testing slot.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-100">
                <div>
                  <p className="font-semibold text-slate-800">Email Re-verification Reminders</p>
                  <p className="text-[11px] text-slate-500">
                    Receive advance alerts 60, 30, and 15 days before certificate expiration.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-bold shadow-xs inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Save size={14} />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
