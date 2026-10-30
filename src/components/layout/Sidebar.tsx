import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Scale,
  Award,
  RefreshCw,
  CreditCard,
  Bell,
  Settings,
  Headphones,
  X,
  Calendar,
  ShieldCheck,
  BarChart3,
  WifiOff,
  UserCheck,
  Building,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ mobileOpen = false, onCloseMobile }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isOfficer = location.pathname.startsWith('/officer');
  const isAdmin = location.pathname.startsWith('/admin');

  // Role-specific nav items
  const applicantNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'New Application', path: '/applications/new', icon: FilePlus },
    { label: 'My Applications', path: '/my-applications', icon: FileText },
    { label: 'My Instruments', path: '/my-instruments', icon: Scale },
    { label: 'Certificates', path: '/certificates', icon: Award },
    { label: 'Re-verification', path: '/reverification', icon: RefreshCw },
    { label: 'Payments', path: '/payments', icon: CreditCard },
    { label: 'Notifications', path: '/notifications', icon: Bell, badge: 3 },
    { label: 'Profile / Settings', path: '/profile', icon: Settings },
  ];

  const officerNavItems = [
    { label: 'Dashboard', path: '/officer/dashboard', icon: LayoutDashboard },
    { label: 'Assigned Cases', path: '/officer/dashboard', icon: FileText, badge: 8 },
    { label: 'Scheduled Inspections', path: '/officer/dashboard', icon: Calendar, badge: 2 },
    { label: 'Field Verification', path: '/officer/cases/LM-2026-001482/verify', icon: ShieldCheck },
    { label: 'Reports', path: '/officer/dashboard', icon: BarChart3 },
    { label: 'Offline Data', path: '/officer/dashboard', icon: WifiOff },
    { label: 'Profile / Settings', path: '/profile', icon: Settings },
  ];

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Application Review', path: '/admin/applications/LM-2026-001482', icon: FileText, badge: 24 },
    { label: 'Officer Workload', path: '/admin/dashboard', icon: UserCheck },
    { label: 'Verification Registry', path: '/certificates', icon: Award },
    { label: 'Switch to Applicant', path: '/dashboard', icon: Building },
  ];

  const navItems = isOfficer ? officerNavItems : isAdmin ? adminNavItems : applicantNavItems;

  const handleNav = (path: string) => {
    navigate(path);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo & Department Branding */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => handleNav('/')}
            >
              <div className="bg-[#1a2744] text-white p-1.5 rounded-md flex-shrink-0 shadow-xs">
                <Scale size={20} />
              </div>
              <div>
                <h1 className="font-bold text-[#1a2744] text-base leading-tight tracking-tight">
                  LegalMetrix
                </h1>
                <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                  Department of Legal Metrology
                </p>
                <p className="text-[9px] text-slate-400 leading-none">
                  {isOfficer
                    ? 'Field Inspection Portal'
                    : isAdmin
                    ? 'District Admin Portal'
                    : 'Government of Maharashtra'}
                </p>
              </div>
            </div>

            {/* Close button on mobile */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item, idx) => {
              const Icon = item.icon;
              const isActive =
                item.path === location.pathname ||
                (item.label === 'Field Verification' && location.pathname.includes('/verify')) ||
                (item.label === 'Assigned Cases' && location.pathname === '/officer/dashboard');

              return (
                <button
                  key={`${item.label}-${idx}`}
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={17}
                      className={isActive ? 'text-blue-600' : 'text-slate-400'}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Need Help / Support Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/70 m-3 rounded-lg border">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-blue-100/70 text-blue-700 rounded-md mt-0.5">
              <Headphones size={15} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">Need Help?</p>
              <p className="text-[10px] text-slate-500 mb-1">
                {isOfficer ? 'Inspector Technical Desk' : 'Contact Support'}
              </p>
              <p className="text-xs font-bold text-blue-700 tracking-tight">1800-233-1234</p>
              <p className="text-[9px] text-slate-400 mt-0.5">Mon - Fri, 9:30 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
