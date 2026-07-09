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

    if (!Array.isArray(items) || !items.length) {
      return res.status(400).json({ error: "No order items provided." });
    }
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip || !shippingPhone) {
      return res.status(400).json({ error: "Shipping information is incomplete." });
    }
    if (!paymentMethod) {
      return res.status(400).json({ error: "Payment method is required." });
    }

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
    console.error("Order creation error:", error);
    const message = process.env.NODE_ENV === "production"
      ? "Order creation failed"
      : error?.message || "Order creation failed";
    res.status(500).json({ error: message });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const db = getDb();
    const [orders] = await db.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [req.userId],
    );

    if (!orders.length) {
      return res.json({ orders: [] });
    }

    const orderIds = orders.map((order) => order.id);
    const [items] = await db.query(
      `SELECT * FROM order_items WHERE order_id IN (${orderIds.map(() => '?').join(',')})`,
      orderIds,
    );

    const itemsByOrder = items.reduce((acc, item) => {
      const orderId = item.order_id;
      if (!acc[orderId]) acc[orderId] = [];
      acc[orderId].push(item);
      return acc;
    }, {});

    const ordersWithItems = orders.map((order) => ({
      ...order,
      items: itemsByOrder[order.id] || [],
      shipping_address: order.shipping_address
        ? JSON.parse(order.shipping_address)
        : null,
    }));

    res.json({ orders: ordersWithItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

export default router;
