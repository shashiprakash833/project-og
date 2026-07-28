import express from "express";
import { getDb } from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "supersecretkey";

function authenticate(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, jwtSecret);
    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

router.post("/", authenticate, async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, shippingPhone, shippingAddress } = req.body;
    const db = getDb();
    const [orderResult] = await db.query(
      "INSERT INTO orders (user_id, total_amount, payment_method, shipping_phone, shipping_address, status) VALUES (?, ?, ?, ?, ?, 'pending')",
      [req.userId, totalAmount, paymentMethod, shippingPhone, JSON.stringify(shippingAddress)]
    );

    const orderId = orderResult.insertId;
    const itemPromises = items.map((item) =>
      db.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [orderId, item.id, item.quantity, item.price]
      )
    );
    await Promise.all(itemPromises);

    res.json({ orderId, message: "Order placed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Order creation failed" });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const db = getDb();
    const [orders] = await db.query("SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC", [req.userId]);
    res.json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

router.post("/:id/cancel", authenticate, async (req, res) => {
  try {
    const db = getDb();
    const orderId = req.params.id;

    // First verify that this order belongs to the user and is in 'pending' or 'processing' status
    const [orders] = await db.query(
      "SELECT * FROM orders WHERE id = ? AND user_id = ?",
      [orderId, req.userId]
    );

    if (!orders || orders.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const order = orders[0];
    const status = (order.status || "pending").toLowerCase();
    if (status !== "pending" && status !== "processing") {
      return res.status(400).json({ error: "Only processing or pending orders can be cancelled." });
    }

    await db.query(
      "UPDATE orders SET status = 'cancelled' WHERE id = ?",
      [orderId]
    );

    res.json({ message: "Order cancelled successfully", orderId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to cancel order" });
  }
});

export default router;
