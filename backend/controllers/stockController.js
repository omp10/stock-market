import Stock from "../models/Stock.js";

export const addStock = async (req, res) => {
  try {
    const { name } = req.body;
    if (!/^[A-Z]{1,12}$/.test(name))
      return res.status(400).json({ message: "Use 1–12 uppercase letters (e.g. AAPL, RELIANCE)" });

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
