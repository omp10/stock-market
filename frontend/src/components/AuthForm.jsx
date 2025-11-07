import { useState } from "react";
import { api } from "../api.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { toast } from "react-hot-toast";
import { User, Lock, AlertTriangle, Loader2 } from "lucide-react"; // Importing icons

export default function AuthForm({ mode = "login" }) {
  const isLogin = mode === "login";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const { setToken, setUser } = useAuth();
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const fn = isLogin ? api.login : api.signup;
      const { ok, data } = await fn(username, password);
      if (!ok) throw new Error(data.message || "Authentication Failed");

      if (isLogin) {
        setToken(data.token);
        setUser({ username });
        toast.success("Logged in successfully");
        nav("/watchlist");
      } else {
        toast.success("Account created successfully! Please log in.");
        nav("/login");
      }
    } catch (e) {
      // Ensure error message is clean
      const msg = e.message.replace('Error: ', '');
      setErr(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }

  // Define input classes to match the dark theme and professional look
  const inputClasses = "w-full bg-gray-900/50 text-white placeholder-gray-500 border border-gray-700 focus:border-green-500 focus:ring-green-500 rounded-lg py-3 px-4 transition duration-200 outline-none";

  return (
    // Enhanced Card Container: Centered, darker background, shadow, and padding
    <div className="max-w-md mx-auto my-20 px-8 py-10 bg-gray-800/80 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm text-white">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          {isLogin ? "Welcome Back" : "Start Tracking Now"}
        </h1>
        <p className="text-gray-400 mt-2">
          {isLogin ? "Sign in to access your stock watchlist." : "Create your free account in seconds."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Username Input Group */}
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            className={`${inputClasses} pl-10`}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        {/* Password Input Group */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            className={`${inputClasses} pl-10`}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Error Message */}
        {err && (
          <div className="flex items-center gap-2 p-3 bg-red-900/40 border border-red-700 text-red-300 rounded-lg font-medium transition-all duration-300">
            <AlertTriangle className="w-5 h-5" />
            {err}
          </div>
        )}

        {/* Submit Button (Primary CTA) */}
        <button
          className="w-full py-3 text-lg font-semibold rounded-lg transition duration-300 ease-in-out bg-green-500 hover:bg-green-600 text-gray-900 shadow-lg flex items-center justify-center disabled:bg-gray-600 disabled:text-gray-400"
          disabled={busy}
        >
          {busy ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            isLogin ? "Log In to Watchlist" : "Create Account"
          )}
        </button>
      </form>

      {/* Footer Link */}
      <div className="mt-6 text-center text-sm text-gray-400">
        {isLogin ? (
          <>
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-400 hover:text-green-300 hover:underline font-medium transition">
              Sign Up here
            </Link>
          </>
        ) : (
          <>
            Already tracking stocks?{" "}
            <Link to="/login" className="text-green-400 hover:text-green-300 hover:underline font-medium transition">
              Log In
            </Link>
          </>
        )}
      </div>
    </div>
  );
}