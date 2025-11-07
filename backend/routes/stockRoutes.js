import express from "express";
import { addStock, getStocks, deleteStock } from "../controllers/stockController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addStock);
router.get("/", protect, getStocks);
router.delete("/:name", protect, deleteStock);

export default router;
