import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/landing/LandingPage';
import { ApplicantDashboard } from '../pages/applicant/ApplicantDashboard';
import { NewApplication } from '../pages/applications/NewApplication';
import { ApplicationDetail } from '../pages/applications/ApplicationDetail';
import { MyApplications } from '../pages/applicant/MyApplications';
import { MyInstruments } from '../pages/applicant/MyInstruments';
import { CertificatesList } from '../pages/certificates/CertificatesList';
import { PublicVerify } from '../pages/certificates/PublicVerify';
import { ReverificationTracker } from '../pages/applicant/ReverificationTracker';
import { PaymentsList } from '../pages/applicant/PaymentsList';
import { NotificationsList } from '../pages/applicant/NotificationsList';
import { ProfileSettings } from '../pages/applicant/ProfileSettings';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { ApplicationReview } from '../pages/admin/ApplicationReview';
import { OfficerDashboard } from '../pages/officer/OfficerDashboard';
import { FieldVerification } from '../pages/officer/FieldVerification';
import { PlaceholderPage } from '../pages/PlaceholderPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="/track" element={<Navigate to="/applications/LM-2026-001482" replace />} />
        <Route path="/certificates/verify" element={<PublicVerify />} />
        <Route path="/certificates/:id" element={<PublicVerify />} />

        {/* ── Applicant (Left Panel Routes) ── */}
        <Route path="/dashboard" element={<ApplicantDashboard />} />
        <Route path="/applications/new" element={<NewApplication />} />
        <Route path="/applications/:id" element={<ApplicationDetail />} />
        <Route path="/my-applications" element={<MyApplications />} />
        <Route path="/my-instruments" element={<MyInstruments />} />
        <Route path="/certificates" element={<CertificatesList />} />
        <Route path="/reverification" element={<ReverificationTracker />} />
        <Route path="/payments" element={<PaymentsList />} />
        <Route path="/notifications" element={<NotificationsList />} />
        <Route path="/profile" element={<ProfileSettings />} />

        {/* ── Admin ── */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/applications/:id" element={<ApplicationReview />} />

        {/* ── Officer ── */}
        <Route path="/officer/dashboard" element={<OfficerDashboard />} />
        <Route path="/officer/cases/:id/verify" element={<FieldVerification />} />

        {/* ── Instruments ── */}
        <Route path="/instruments/:id" element={<MyInstruments />} />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
