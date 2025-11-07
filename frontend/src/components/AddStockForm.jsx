import { useState } from "react";
import toast from "react-hot-toast";

export default function AddStockForm({ onAdd }) {
  const [name, setName] = useState("");

  function submit(e) {
    e.preventDefault();
    const n = name.trim().toUpperCase();

    // ✅ Match backend: allow 1–5 uppercase letters only
    if (!/^[A-Z]{1,5}$/.test(n)) {
      toast.error("❌ Stock symbol must be 1–5 uppercase letters (e.g. TCS, AAPL, HDFC)");
      return;
    }

    onAdd(n);
    setName("");
    toast.success(`✅ ${n} added to your watchlist!`);
  }

  return (
    <form
      onSubmit={submit}
      className="card p-4 mt-6 flex flex-col md:flex-row gap-3"
    >
      <input
        className="input flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
        placeholder="Enter Stock Symbol (e.g. TCS, AAPL, HDFC)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="submit"
        className="btn-primary h-11 md:w-40 bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 transition-colors"
      >
        Add
      </button>
    </form>
  );
}
