import express from "express";
import { addStock, getStocks } from "../controllers/stockController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addStock);
router.get("/", protect, getStocks);

export default router;
