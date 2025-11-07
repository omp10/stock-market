import { useEffect, useState } from "react";
import { api } from "../api.js";
import { toast } from "react-hot-toast";
import { useAuth } from "../state/AuthContext.jsx";
import AddStockForm from "./AddStockForm.jsx";
import StockCard from "./StockCard.jsx";
import { Loader2, AlertTriangle, ListChecks } from "lucide-react"; // Importing icons

export default function Watchlist() {
  const { token } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function fetchData() {
    // Clear any previous error before fetching
    setErr(""); 
    setLoading(true);
    const { ok, data } = await api.getStocks(token);
    if (ok) setStocks(data);
    else {
      const msg = data?.message || "Error fetching stocks";
      setErr(msg);
      toast.error(msg);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function addStock(name) {
    // Clear error before attempting to add
    setErr(""); 
    const { ok, data } = await api.addStock(token, name);
    if (ok) {
      setStocks((prev) => [data, ...prev]);
      toast.success(`${name} added to watchlist`);
    } else {
      const msg = data?.message || "Failed to add stock";
      setErr(msg);
      toast.error(msg);
    }
  }

  // Function to remove stock from state after successful deletion (assuming StockCard handles deletion and calls a prop function)
  function removeStock(symbol) {
    setStocks((prev) => prev.filter((s) => s.name !== symbol));
  }

  return (
    // Max width and padding for a centered, clean look
    <section className="max-w-6xl mx-auto px-6 py-10 min-h-screen bg-gray-950 text-white">
      
      {/* Header and Description */}
      <div className="flex items-center gap-3 border-b border-gray-800 pb-4 mb-8">
        <ListChecks className="w-8 h-8 text-green-400" />
        <h1 className="text-4xl font-extrabold tracking-tight">
          Your <span className="text-green-400">Watchlist</span>
        </h1>
      </div>
      
      <p className="text-gray-400 max-w-2xl mb-8 text-lg">
        Add and view your favorite US and Indian stock tickers. Click on a card to see real-time performance.
      </p>

      {/* Add Stock Form */}
      <div className="mb-10 p-5 bg-gray-800/50 rounded-xl border border-gray-800 shadow-xl">
        <AddStockForm onAdd={addStock} />
      </div>

      {/* Error Message */}
      {err && (
        <div className="flex items-center gap-2 p-3 bg-red-900/40 border border-red-700 text-red-300 rounded-lg mb-6 transition-all duration-300">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">{err}</span>
        </div>
      )}

      {/* Conditional Content (Loading, Empty, Stocks) */}
      {loading ? (
        // Loading State: Centered spinner
        <div className="mt-12 flex flex-col items-center justify-center text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-green-500" />
          <p className="mt-3 text-lg">Fetching your stocks...</p>
        </div>
      ) : stocks.length === 0 ? (
        // Empty State: Clear call to action
        <div className="mt-12 p-8 bg-gray-800/50 border border-gray-700 rounded-xl text-center text-gray-400 shadow-inner">
          <ListChecks className="w-10 h-10 mx-auto mb-4 text-gray-600" />
          <p className="text-xl font-semibold">
            No stocks found in your list.
          </p>
          <p className="mt-2">
            Use the input above to start tracking your first investment!
          </p>
        </div>
      ) : (
        // Stocks Grid
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {stocks.map((s) => (
            // Pass removeStock function down for removal capability
            <StockCard 
              key={s._id} 
              symbol={s.name} 
              onRemove={removeStock} 
              // Assuming StockCard also needs the token and API access for real-time updates/delete
              token={token} 
            />
          ))}
        </div>
      )}
    </section>
  );
}