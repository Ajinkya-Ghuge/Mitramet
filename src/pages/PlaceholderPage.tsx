import { useNavigate, useLocation } from 'react-router-dom';
import { Scale, Construction, ArrowLeft } from 'lucide-react';

interface PlaceholderPageProps {
  title?: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const label = title || `Page: ${location.pathname}`;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white border border-slate-200 rounded-xl p-8 max-w-md w-full text-center shadow-sm">
        <div className="bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
          <Construction size={24} className="text-blue-600" />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Scale size={16} className="text-[#1a2744]" />
          <span className="font-bold text-[#1a2744] text-sm">LegalMetrix</span>
        </div>
        <h1 className="text-base font-bold text-slate-900 mb-2">{label}</h1>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          This page is planned and will be built in the next phase after approval of the current page.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 border border-slate-300 px-4 py-2 rounded-md hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={14} /> Go Back
        </button>
        <button
          onClick={() => navigate('/')}
          className="ml-3 inline-flex items-center gap-1.5 text-sm font-medium text-white bg-[#2563eb] px-4 py-2 rounded-md hover:bg-[#1d4ed8] transition-colors"
        >
          Home
        </button>
      </div>
    </div>
  );
}
