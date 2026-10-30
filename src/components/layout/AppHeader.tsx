import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, Menu, UserCheck, ShieldCheck, Building } from 'lucide-react';
import { currentUser, currentAdmin, mockOfficers } from '../../data/mock';

interface AppHeaderProps {
  onToggleMobileMenu?: () => void;
}

export function AppHeader({ onToggleMobileMenu }: AppHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isOfficer = location.pathname.startsWith('/officer');
  const isAdmin = location.pathname.startsWith('/admin');

  const profile = isOfficer
    ? {
        name: mockOfficers[0].name, // Inspector S. Patil
        role: 'Field Officer / Inspector',
        initials: 'SP',
        color: 'bg-indigo-900',
      }
    : isAdmin
    ? {
        name: currentAdmin.name, // D. K. Deshmukh
        role: 'Assistant Controller (Admin)',
        initials: currentAdmin.avatarInitials,
        color: 'bg-slate-900',
      }
    : {
        name: currentUser.name, // Ajinkya Ghuge
        role: 'Shop / Business Owner',
        initials: currentUser.avatarInitials,
        color: 'bg-[#1a2744]',
      };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={onToggleMobileMenu}
          className="p-2 -ml-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <span className="font-bold text-[#1a2744] text-sm">LegalMetrix</span>
      </div>

      {/* Role Switcher Pills for Demonstration */}
      <div className="hidden md:flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
        <button
          onClick={() => navigate('/dashboard')}
          className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            !isOfficer && !isAdmin
              ? 'bg-white text-blue-700 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Building size={13} />
          <span>Applicant View</span>
        </button>

        <button
          onClick={() => navigate('/officer/dashboard')}
          className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            isOfficer
              ? 'bg-white text-indigo-700 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck size={13} />
          <span>Officer View</span>
        </button>

        <button
          onClick={() => navigate('/admin/dashboard')}
          className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
            isAdmin
              ? 'bg-white text-slate-900 shadow-2xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck size={13} />
          <span>Admin View</span>
        </button>
      </div>

      {/* Right User Bar */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notification Bell */}
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 rounded-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div
            className={`w-8 h-8 rounded-full ${profile.color} text-white flex items-center justify-center text-xs font-bold ring-2 ring-blue-100 shadow-xs`}
          >
            {profile.initials}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-xs font-semibold text-slate-800 leading-tight">{profile.name}</p>
            <p className="text-[10px] text-slate-500 leading-tight">{profile.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
