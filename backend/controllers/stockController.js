import Stock from "../models/Stock.js";

export const addStock = async (req, res) => {
  try {
    const { name } = req.body;
    
    // ✅ Allow only 1–5 uppercase letters (A–Z)
    if (!/^[A-Z]{1,5}$/.test(name))
      return res.status(400).json({ 
        message: "Stock name must be 1–5 uppercase letters (e.g. AAPL, TCS, INFY)" 
      });

    const stock = await Stock.create({ user: req.user.id, name });
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({ user: req.user.id });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStock = async (req, res) => {
  try {
    const { name } = req.params;
    const s = await Stock.findOneAndDelete({ user: req.user.id, name });
    if (!s) return res.status(404).json({ message: "Stock not found" });
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
