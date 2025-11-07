import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { toast } from "react-hot-toast";
import { TrendingUp, User } from "lucide-react"; // Importing icons

export default function Navbar() {
  const { token, setToken, setUser, user } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();

  function logout() {
    setToken("");
    setUser(null);
    toast.success("Logged out successfully");
    nav("/login");
  }

  // Enhanced active state styling: pill shape for better visual feedback
  const active = (p) =>
    loc.pathname === p
      ? "bg-green-700/50 text-white px-3 py-1 rounded-full font-semibold transition duration-300"
      : "text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 py-1 rounded-full transition duration-300";

  return (
    // Enhanced Header: Deeper background color for a professional dark mode
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-green-500/10 sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Brand/Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <TrendingUp className="text-green-400 w-6 h-6 transform rotate-45" />
          <span className="text-white font-extrabold text-xl tracking-wider">
            Stock<span className="text-green-400">Tracker</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          {!token ? (
            <>
              {/* Login Link */}
              <Link className={active("/login")} to="/login">
                Login
              </Link>
              {/* Signup Link (styled as primary CTA) */}
              <Link
                className="bg-green-500 hover:bg-green-600 text-gray-900 font-semibold px-4 py-1.5 rounded-lg transition duration-300 shadow-md"
                to="/signup"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {/* Watchlist Link */}
              <Link className={active("/watchlist")} to="/watchlist">
                Watchlist
              </Link>
              
              {/* User Indicator */}
              {user?.username && (
                <span className="hidden lg:flex items-center text-sm text-gray-400 border border-gray-700/50 px-3 py-1 rounded-full">
                  <User className="w-4 h-4 mr-1 text-gray-500" />
                  {user.username}
                </span>
              )}
              
              {/* Logout Button (styled as a ghost button, but with green hover) */}
              <button 
                onClick={logout} 
                className="text-gray-300 hover:text-green-400 hover:bg-gray-800/50 px-3 py-1 rounded-full transition duration-300 font-medium"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}