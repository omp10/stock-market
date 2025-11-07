import { Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext.jsx";
import { ArrowRight, Zap, Lock, Feather } from "lucide-react";

export default function Home() {
  const { token } = useAuth();

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gray-950 text-white">
      <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-700/10 blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-violet-700/10 blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6 py-20 sm:py-32 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center text-sm font-medium px-3 py-1 bg-green-700/30 text-green-300 rounded-full mb-4 border border-green-700">
            <ArrowRight className="w-4 h-4 mr-1 transform rotate-45" />
            Market Data Simplified
          </div>

          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Track your investments, <br className="hidden sm:inline" />
            <span className="text-green-400">visualize your future.</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-gray-300 text-xl font-light">
            Create a personalized watchlist for US and Indian markets. Fast, intuitive, and secure.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            {token ? (
              <Link className="px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out bg-green-500 hover:bg-green-600 text-gray-900 flex items-center" to="/watchlist">
                Go to Watchlist
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            ) : (
              <>
                <Link className="px-8 py-3 text-lg font-semibold rounded-lg shadow-xl transition duration-300 ease-in-out bg-green-500 hover:bg-green-600 text-gray-900 transform hover:scale-[1.02] flex items-center" to="/signup">
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link className="px-8 py-3 text-lg font-medium rounded-lg transition duration-300 ease-in-out text-white border border-gray-700 hover:bg-gray-800" to="/login">
                  I already have an account
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-800 shadow-2xl backdrop-blur-sm transition duration-300 hover:border-green-500/50 hover:shadow-green-500/10">
            <Zap className="w-8 h-8 text-green-400 mb-3" />
            <h3 className="text-xl font-semibold text-white">Blazing Fast</h3>
            <p className="text-gray-400 mt-2 text-sm">Built with Vite + React for instant navigation and minimal load times.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-800 shadow-2xl backdrop-blur-sm transition duration-300 hover:border-violet-500/50 hover:shadow-violet-500/10">
            <Lock className="w-8 h-8 text-violet-400 mb-3" />
            <h3 className="text-xl font-semibold text-white">Bank-Grade Secure</h3>
            <p className="text-gray-400 mt-2 text-sm">Your data is protected with token-based JWT authentication.</p>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-800 shadow-2xl backdrop-blur-sm transition duration-300 hover:border-cyan-500/50 hover:shadow-cyan-500/10">
            <Feather className="w-8 h-8 text-cyan-400 mb-3" />
            <h3 className="text-xl font-semibold text-white">Intuitive & Simple</h3>
            <p className="text-gray-4 00 mt-2 text-sm">Track symbols like RELIANCE, TCS, and AAPL in a clean interface.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


