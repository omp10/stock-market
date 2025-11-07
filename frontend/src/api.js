// Default to same-origin when served behind the backend; override with VITE_API_URL when needed
const BASE_URL = import.meta.env.VITE_API_URL || "";

async function parseResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      const json = await res.json();
      return { ok: res.ok, data: json };
    } catch (e) {
      return { ok: res.ok, data: null };
    }
  }
  // Fallback: try text so we can surface HTML/error pages as messages
  try {
    const text = await res.text();
    return { ok: res.ok, data: text ? { message: text } : null };
  } catch {
    return { ok: res.ok, data: null };
  }
}

export const api = {
  async signup(username, password) {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return parseResponse(res);
  },

  async login(username, password) {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return parseResponse(res);
  },

  async getStocks(token) {
    const res = await fetch(`${BASE_URL}/api/stocks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return parseResponse(res);
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
    return parseResponse(res);
  },
};
