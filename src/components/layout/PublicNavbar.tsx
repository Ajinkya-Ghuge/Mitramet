import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Menu, X } from 'lucide-react';

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="bg-[#1a2744] rounded-md p-1.5">
              <Scale size={18} className="text-white" />
            </div>
            <div>
              <span className="text-[#1a2744] font-bold text-lg leading-none">LegalMetrix</span>
              <p className="text-[10px] text-slate-500 leading-none mt-0.5">Department of Legal Metrology</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm text-slate-600 hover:text-slate-900 font-medium">
              How It Works
            </a>
            <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 font-medium">
              Features
            </a>
            <Link to="/certificates/verify" className="text-sm text-slate-600 hover:text-slate-900 font-medium">
              Verify Certificate
            </Link>
            <Link to="/track" className="text-sm text-slate-600 hover:text-slate-900 font-medium">
              Track Application
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md hover:bg-slate-50 transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] px-4 py-2 rounded-md transition-colors"
            >
              Apply for Verification
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          <a href="#how-it-works" className="block py-2 text-sm text-slate-700 font-medium" onClick={() => setMobileOpen(false)}>
            How It Works
          </a>
          <a href="#features" className="block py-2 text-sm text-slate-700 font-medium" onClick={() => setMobileOpen(false)}>
            Features
          </a>
          <Link to="/certificates/verify" className="block py-2 text-sm text-slate-700 font-medium" onClick={() => setMobileOpen(false)}>
            Verify Certificate
          </Link>
          <Link to="/track" className="block py-2 text-sm text-slate-700 font-medium" onClick={() => setMobileOpen(false)}>
            Track Application
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => { navigate('/login'); setMobileOpen(false); }}
              className="w-full text-sm font-medium border border-slate-300 text-slate-700 py-2 rounded-md hover:bg-slate-50"
            >
              Sign In
            </button>
            <button
              onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}
              className="w-full text-sm font-semibold text-white bg-[#2563eb] py-2 rounded-md hover:bg-[#1d4ed8]"
            >
              Apply for Verification
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
