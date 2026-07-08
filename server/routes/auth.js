import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "../db.js";

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "supersecretkey";

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    const db = getDb();
    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length) return res.status(409).json({ error: "Email already registered" });

    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await db.query("INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)", [email, password_hash, name || null]);
    const token = jwt.sign({ userId: result.insertId, email }, jwtSecret, { expiresIn: "7d" });

    res.json({ token, user: { id: result.insertId, email, name } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required" });

    const db = getDb();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed" });
  }
});

router.get("/me", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Unauthorized" });

    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, jwtSecret);
    const db = getDb();
    const [rows] = await db.query("SELECT id, email, name FROM users WHERE id = ?", [payload.userId]);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;
