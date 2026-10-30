import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Clock,
  FileText,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Check,
  Filter,
} from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { mockNotifications as initialNotifs } from '../../data/mock';

export function NotificationsList() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifs);
  const [filterUnreadOnly, setFilterUnreadOnly] = useState(false);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const displayed = filterUnreadOnly ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span onClick={() => navigate('/dashboard')} className="hover:text-blue-600 cursor-pointer">
                Dashboard
              </span>
              <span>&gt;</span>
              <span className="text-slate-800 font-medium">Notifications</span>
            </div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Timely alerts regarding application review, officer inspection visits, and renewal countdowns.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setFilterUnreadOnly(!filterUnreadOnly)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                filterUnreadOnly
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {filterUnreadOnly ? 'Show All' : 'Unread Only'}
            </button>

            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Check size={13} className="text-emerald-600" />
                <span>Mark All Read</span>
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 max-w-4xl">
          {displayed.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
              <Bell size={32} className="mx-auto mb-2 text-slate-300" />
              <p className="font-semibold text-slate-700">No notifications to display</p>
              <p className="text-[11px] mt-0.5">You are all caught up with your updates.</p>
            </div>
          ) : (
            displayed.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xl border transition-all flex items-start justify-between gap-4 ${
                  !notif.read
                    ? 'bg-blue-50/40 border-blue-200 ring-1 ring-blue-100'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      notif.type === 'reverification_due'
                        ? 'bg-amber-100 text-amber-800'
                        : notif.type === 'document_query'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {notif.type === 'reverification_due' ? (
                      <Clock size={18} />
                    ) : notif.type === 'document_query' ? (
                      <FileText size={18} />
                    ) : (
                      <CheckCircle2 size={18} />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0"></span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">{notif.message}</p>
                    <span className="text-[10px] text-slate-400 block pt-0.5">{notif.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 self-center">
                  {!notif.read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-100"
                    >
                      Mark read
                    </button>
                  )}
                  {notif.link && (
                    <button
                      onClick={() => navigate(notif.link!)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>View</span>
                      <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
