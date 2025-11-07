// Default to same-origin when served behind the backend; override with VITE_API_URL when needed
const BASE_URL = import.meta.env.VITE_API_URL || "";

export const api = {
  async signup(username, password) {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return res.json().then((d) => ({ ok: res.ok, data: d }));
  },

  async login(username, password) {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return res.json().then((d) => ({ ok: res.ok, data: d }));
  },

  async getStocks(token) {
    const res = await fetch(`${BASE_URL}/api/stocks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.json().then((d) => ({ ok: res.ok, data: d }));
  },

  async addStock(token, name) {
    const res = await fetch(`${BASE_URL}/api/stocks/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    return res.json().then((d) => ({ ok: res.ok, data: d }));
  },
};
