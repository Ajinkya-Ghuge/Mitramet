import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  linkText?: string;
  onLinkClick?: () => void;
  trend?: { value: string; positive: boolean };
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBg = 'bg-blue-50',
  linkText,
  onLinkClick,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col gap-3 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
        <div className={`${iconBg} ${iconColor} p-2.5 rounded-lg`}>
          <Icon size={20} />
        </div>
      </div>
      {linkText && (
        <button
          onClick={onLinkClick}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium text-left flex items-center gap-1 mt-auto"
        >
          {linkText} →
        </button>
      )}
    </div>
  );
}
