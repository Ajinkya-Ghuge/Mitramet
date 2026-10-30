import type { ApplicationStatus, InstrumentStatus, Certificate } from '../../types';

type BadgeVariant = ApplicationStatus | InstrumentStatus | Certificate['status'] | 'Paid' | 'Pending' | 'Waived' | 'Verified' | 'Rejected' | string;

const variantStyles: Record<string, string> = {
  // Application statuses
  'Submitted': 'bg-blue-50 text-blue-700 border-blue-200',
  'Under Review': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Approved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Scheduled': 'bg-purple-50 text-purple-700 border-purple-200',
  'Field Verification': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Certificate Issued': 'bg-green-50 text-green-700 border-green-200',
  'Rejected': 'bg-red-50 text-red-700 border-red-200',
  'Clarification Required': 'bg-orange-50 text-orange-700 border-orange-200',
  // Instrument statuses
  'Active': 'bg-green-50 text-green-700 border-green-200',
  'Expired': 'bg-red-50 text-red-700 border-red-200',
  'Suspended': 'bg-gray-100 text-gray-600 border-gray-300',
  // Certificate statuses
  'Valid': 'bg-green-50 text-green-700 border-green-200',
  'Revoked': 'bg-red-50 text-red-700 border-red-200',
  // Payment
  'Paid': 'bg-green-50 text-green-700 border-green-200',
  'Waived': 'bg-gray-50 text-gray-600 border-gray-200',
  // Document
  'Verified': 'bg-green-50 text-green-700 border-green-200',
};

interface StatusBadgeProps {
  status: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusBadge({ status, size = 'md', className = '' }: StatusBadgeProps) {
  const style = variantStyles[status] || 'bg-gray-100 text-gray-600 border-gray-200';
  const sizeClass = size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-medium rounded border ${sizeClass} ${style} ${className}`}
    >
      {status}
    </span>
  );
}
