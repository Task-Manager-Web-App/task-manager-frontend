import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase-client';

export default function Navbar( { session }: any ) {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) => {
    const baseClass = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95";
    return isActive(path) 
      ? `${baseClass} shadow-lg` 
      : baseClass;
  };

  const handleLogout = async () => {
    const confirm = window.confirm("Are you sure you want to logout?");
    if (confirm) {
      await supabase.auth.signOut();
      navigate("/login");
    }
  };

  return (
    <nav className="bg-linear-to-r from-slate-900 to-slate-800 shadow-2xl border-b-4 border-blue-500 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-5">
        {/* Logo/Branding */}
        <Link 
          to="/" 
          className="text-3xl font-bold text-white hover:text-blue-300 transition-colors duration-200 tracking-wide"
        >
          📋 Task Manager
        </Link>
        
        {/* User email display */}
        {session && (
          <div className="text-white text-sm">
            👤 {session.user.email}
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex gap-6 items-center">
          {!session ? (
            <>
              <Link 
                to="/login" 
                className={`${navLinkClass('/login')} bg-blue-600 text-white hover:bg-blue-700`}
              >
                🔐 Login
              </Link>
              <Link 
                to="/register" 
                className={`${navLinkClass('/register')} bg-green-600 text-white hover:bg-green-700`}
              >
                📝 Register
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/profile" 
                className={`${navLinkClass('/profile')} bg-emerald-600 text-white hover:bg-emerald-700`}
              >
                👤 Profile
              </Link>
              
              <Link 
                to="/add-task" 
                className={`${navLinkClass('/add-task')} bg-purple-600 text-white hover:bg-purple-700`}
              >
                ➕ Add Task
              </Link>

              <Link 
                to="/" 
                className={`${navLinkClass('/')} bg-orange-600 text-white hover:bg-orange-700`}
              >
                📝 Tasks
              </Link>

              <Link 
                to="/sample" 
                className={`${navLinkClass('/sample')} bg-gray-600 text-white hover:bg-gray-700`}
              >
                🧪 Sample
              </Link>

              <button
                onClick={handleLogout}
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 bg-red-600 text-white hover:bg-red-700"
              >
                🚪 Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
