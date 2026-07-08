import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { createServer as createViteServer } from "vite";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/orders.js";
import chatRoutes from "./routes/chat.js";
import { initDb } from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

await initDb();

// API routes FIRST
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/chat", chatRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Vite middleware setup
if (process.env.NODE_ENV !== "production") {
  console.log("[AI Studio] Starting Vite in middleware mode...");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
    root: process.cwd(),
  });
  app.use(vite.middlewares);
} else {
  console.log("[AI Studio] Serving static production build...");
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${port}`);
});
