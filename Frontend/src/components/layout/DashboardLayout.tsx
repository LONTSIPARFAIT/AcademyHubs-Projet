import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  BookOpen, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Settings, 
  ChevronRight,
  Menu,
  X,
  Search,
  Moon,
  Sun,
  Layers,
  Users as UsersIcon,
  Video,
  ClipboardList,
  FileText
} from 'lucide-react';
import { useState, useEffect } from 'react';
import NotificationDropdown from '../common/NotificationDropdown';

const DashboardLayout = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard' },
    { icon: BookOpen, label: 'Mes apprentissages', path: '/dashboard/courses' },
    { icon: User, label: 'Mon profil', path: '/dashboard/profile' },
  ];

  const managementItems = [];
  
  if (user?.role === 'teacher' || user?.role === 'admin' || user?.role === 'super_admin') {
    managementItems.push({ icon: Video, label: 'Gérer mes cours', path: '/dashboard/manage-courses' });
    managementItems.push({ icon: ClipboardList, label: 'Quiz', path: '/admin/quizzes' });
    managementItems.push({ icon: FileText, label: 'Blog', path: '/admin/blogs' });
  }

  if (user?.role === 'admin' || user?.role === 'super_admin') {
    managementItems.push({ icon: Layers, label: 'Catégories', path: '/dashboard/categories' });
  }

  if (user?.role === 'super_admin') {
    managementItems.push({ icon: UsersIcon, label: 'Utilisateurs', path: '/dashboard/users' });
    managementItems.push({ icon: Settings, label: 'Configuration', path: '/dashboard/settings' });
  }

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex overflow-hidden">
      {/* Sidebar Overlay (mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed, no scroll */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 flex flex-col h-screen`}
      >
        {/* Logo Section - Fixed at top */}
        <div className="flex-none h-16 px-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">AcademyHub</span>
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation - Scrollable middle section */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-6">
            <div className="px-3 mb-2 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Menu principal
            </div>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  location.pathname === item.path
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
                {location.pathname === item.path && (
                  <ChevronRight className="w-3 h-3 ml-auto" />
                )}
              </Link>
            ))}
          </div>

          {managementItems.length > 0 && (
            <div>
              <div className="px-3 mb-2 text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Gestion
              </div>
              {managementItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    location.pathname === item.path
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {location.pathname === item.path && (
                    <ChevronRight className="w-3 h-3 ml-auto" />
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Profile Section - Fixed at bottom */}
        <div className="flex-none p-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header - Fixed */}
        <header className="flex-none h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden btn-icon hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="input-field !w-64 !py-2 !pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode}
              className="btn-icon hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="z-50">
              <NotificationDropdown />
            </div>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
            <Link to="/dashboard/profile" className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white leading-none">{user?.name}</p>
                <p className="text-meta mt-1">
                  {user?.role === 'super_admin' ? 'Super Admin' : 
                   user?.role === 'admin' ? 'Admin' :
                   user?.role === 'teacher' ? 'Formateur' : 
                   'Apprenant'}
                </p>
              </div>
              <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  {user?.name?.charAt(0)}
                </span>
              </div>
            </Link>
          </div>
        </header>

        {/* Dynamic Content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
};

export default DashboardLayout;