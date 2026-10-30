// Central TypeScript types for LegalMetrix
// All pages share these types for consistency

export type UserRole = 'applicant' | 'officer' | 'admin' | 'public';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarInitials: string;
}

export interface Applicant {
  id: string;
  userId: string;
  ownerName: string;
  businessName: string;
  mobile: string;
  email: string;
  address: string;
  district: string;
  taluka: string;
  pincode: string;
}

export type InstrumentType =
  | 'Electronic Weighing Scale'
  | 'Petrol Dispenser'
  | 'Measuring Tape'
  | 'Measuring Tank'
  | 'LPG Dispenser'
  | 'Water Meter'
  | 'Milk Meter'
  | 'Platform Scale';

export type InstrumentStatus = 'Active' | 'Expired' | 'Pending' | 'Suspended';

export interface Instrument {
  id: string;
  applicantId: string;
  type: InstrumentType;
  make: string;
  model: string;
  serialNumber: string;
  capacity: string;
  leastCount: string;
  locationDescription: string;
  status: InstrumentStatus;
  lastVerifiedDate?: string;
  nextVerificationDue?: string;
}

export type ApplicationType = 'Verification' | 'Re-verification';

export type ApplicationStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Scheduled'
  | 'Field Verification'
  | 'Certificate Issued'
  | 'Rejected'
  | 'Clarification Required';

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedDate: string;
  status: 'Verified' | 'Pending' | 'Rejected';
  fileSize?: string;
}

export interface PaymentInfo {
  amount: number;
  status: 'Paid' | 'Pending' | 'Waived';
  date?: string;
  method?: string;
  transactionId?: string;
}

export interface Application {
  id: string;
  applicationNo: string;
  applicantId: string;
  instrumentId: string;
  type: ApplicationType;
  status: ApplicationStatus;
  submittedDate: string;
  lastUpdated: string;
  totalInstruments: number;
  assignedOfficerId?: string;
  inspectionSchedule?: Schedule;
  documents: Document[];
  payment: PaymentInfo;
  remarks?: string;
  rejectionReason?: string;
}

export interface Schedule {
  id: string;
  applicationId: string;
  officerId: string;
  date: string;
  time: string;
  location: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';
}

export type InspectionResult = 'Compliant' | 'Non-Compliant' | 'Draft';

export interface ChecklistItem {
  id: string;
  category: string;
  description: string;
  result: 'Pass' | 'Fail' | null;
}

export interface Inspection {
  id: string;
  applicationId: string;
  officerId: string;
  instrumentId: string;
  date: string;
  checklist: ChecklistItem[];
  observations: string;
  result: InspectionResult;
  standardWeight?: string;
  observedReadingBeforeAdjustment?: string;
  observedReadingAfterAdjustment?: string;
  errorObserved?: string;
  photos?: string[];
}

export interface Certificate {
  id: string;
  certificateNo: string;
  applicationId: string;
  instrumentId: string;
  applicantId: string;
  issueDate: string;
  validUpto: string;
  status: 'Valid' | 'Expired' | 'Revoked';
  qrCode: string;
}

export type NotificationType =
  | 'status_update'
  | 'reverification_due'
  | 'certificate_expiry'
  | 'inspection_scheduled'
  | 'document_query';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
  applicationId?: string;
  link?: string;
}

export interface Officer {
  id: string;
  name: string;
  designation: string;
  zone: string;
  district: string;
  phone: string;
  email: string;
  assignedCases: number;
  completedThisMonth: number;
}
