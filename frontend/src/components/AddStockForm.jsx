import { useState } from "react";

export default function AddStockForm({ onAdd }) {
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  function submit(e) {
    e.preventDefault();
    const n = name.trim().toUpperCase();
    if (!/^[A-Z]{1,12}$/.test(n)) {
      setErr("Use 1–12 uppercase letters (e.g. AAPL, RELIANCE, HDFCBANK)");
      return;
    }
    setErr("");
    onAdd(n);
    setName("");
  }

  return (
    <form
      onSubmit={submit}
      className="card p-4 mt-6 flex flex-col md:flex-row gap-3"
    >
      <input
        className="input flex-1"
        placeholder="Enter Stock Symbol (e.g. RELIANCE, TCS, AAPL)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn-primary h-11 md:w-40">Add</button>
      {err && <p className="text-red-400 text-sm">{err}</p>}
    </form>
  );
}
