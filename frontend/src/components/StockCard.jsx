import { XCircle, TrendingUp, TrendingDown } from "lucide-react";

// Assuming you pass a real price or value from the API later, for now we use the mock data.
export default function StockCard({ symbol, onRemove }) {
  // Mock Data generation logic (kept for demo)
  const seed = symbol.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const up = seed % 2 === 0;
  const pct = ((seed % 300) / 100).toFixed(2);
  const price = (seed * 10 + 100).toFixed(2); // Mock price

  const handleDelete = () => {
    // In a real application, you would call an API here to delete the stock first.
    // Example: api.deleteStock(token, symbol).then(() => onRemove(symbol));
    
    // For this example, we just call the removal function passed from the parent Watchlist.
    if (window.confirm(`Are you sure you want to remove ${symbol}?`)) {
        onRemove(symbol); 
    }
  };

  return (
    // Enhanced Card Style: Darker, defined background, subtle shadow, and border on hover
    <div className="bg-gray-800/70 p-5 rounded-xl border border-gray-700 shadow-xl transition duration-300 hover:border-green-500/50 hover:shadow-green-500/20 relative group cursor-pointer">
      
      {/* Absolute positioned delete button */}
      {onRemove && (
        <button 
          onClick={handleDelete}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition duration-300"
          aria-label={`Remove ${symbol} from watchlist`}
        >
          <XCircle className="w-5 h-5" />
        </button>
      )}

      {/* Main Symbol and Price Change */}
      <div className="flex items-center justify-between mb-4">
        {/* Symbol */}
        <h2 className="text-2xl font-bold tracking-wider text-white flex items-center gap-2">
          {symbol}
        </h2>
        
        {/* Mock Price */}
        <span className="text-white text-lg font-medium">
            ${price}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        {/* Percentage Change Tag */}
        <span
          className={`text-sm font-bold px-3 py-1 rounded-full flex items-center gap-1 
            ${up ? "bg-green-600/30 text-green-400" : "bg-red-600/30 text-red-400"}`}
        >
          {up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {up ? "+" : "-"}
          {pct}%
        </span>

        {/* Mock additional metric */}
        <span className="text-xs text-gray-500">
            24h Vol: {((seed % 100) / 10).toFixed(1)}M
        </span>
      </div>


      {/* Visualization (Mock Bar Graph) */}
      <div className="mt-4">
        <p className="text-sm text-gray-400 mb-1">Performance (Mock)</p>
        <div className="h-2 bg-gray-700 rounded-full">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${up ? "bg-green-500" : "bg-red-500"}`}
            // Use Math.max/min to ensure width is always between 10% and 100%
            style={{ width: `${Math.min(100, Math.max(10, (seed % 80) + 20))}%` }} 
          />
        </div>
      </div>
    </div>
  );
}