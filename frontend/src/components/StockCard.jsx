export default function StockCard({ symbol }) {
  const seed = symbol.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const up = seed % 2 === 0;
  const pct = ((seed % 300) / 100).toFixed(2);

  return (
    <div className="card p-4 hover:scale-[1.01] transition">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{symbol}</h2>
        <span
          className={`text-sm px-2 py-1 rounded ${
            up ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
          }`}
        >
          {up ? "+" : "-"}
          {pct}%
        </span>
      </div>
      <div className="mt-2 h-2 bg-white/10 rounded">
        <div
          className={`h-2 rounded ${up ? "bg-green-500" : "bg-red-500"}`}
          style={{ width: `${(seed % 80) + 20}%` }}
        />
      </div>
    </div>
  );
}



