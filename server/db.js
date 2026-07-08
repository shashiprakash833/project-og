import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

let pool;
let isMock = false;

// In-memory tables for graceful fallback
const usersTable = [];
const ordersTable = [];
const orderItemsTable = [];

async function initializeMockData() {
  const hash = await bcrypt.hash("password", 10);
  usersTable.push({
    id: 1,
    email: "guest@example.com",
    password_hash: hash,
    name: "Guest User",
    created_at: new Date()
  });
  console.log("[AI Studio] Mock DB seeded: guest@example.com / password");
}

const mockPool = {
  query: async (sql, params = []) => {
    const normalizedSql = sql.trim().replace(/\s+/g, ' ');

    // 1. SELECT id FROM users WHERE email = ?
    if (normalizedSql.includes("SELECT id FROM users WHERE email = ?")) {
      const email = params[0];
      const match = usersTable.filter(u => u.email === email);
      return [match];
    }

    // 2. INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)
    if (normalizedSql.includes("INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)")) {
      const [email, password_hash, name] = params;
      const newUser = {
        id: usersTable.length + 1,
        email,
        password_hash,
        name,
        created_at: new Date()
      };
      usersTable.push(newUser);
      return [{ insertId: newUser.id }];
    }

    // 3. SELECT * FROM users WHERE email = ?
    if (normalizedSql.includes("SELECT * FROM users WHERE email = ?")) {
      const email = params[0];
      const match = usersTable.filter(u => u.email === email);
      return [match];
    }

    // 4. SELECT id, email, name FROM users WHERE id = ?
    if (normalizedSql.includes("SELECT id, email, name FROM users WHERE id = ?")) {
      const id = Number(params[0]);
      const match = usersTable.filter(u => u.id === id).map(u => ({ id: u.id, email: u.email, name: u.name }));
      return [match];
    }

    // 5. INSERT INTO orders (user_id, total_amount, payment_method, shipping_phone, shipping_address, status) VALUES (?, ?, ?, ?, ?, 'pending')
    if (normalizedSql.includes("INSERT INTO orders")) {
      const [user_id, total_amount, payment_method, shipping_phone, shipping_address] = params;
      const newOrder = {
        id: ordersTable.length + 1,
        user_id: Number(user_id),
        total_amount: Number(total_amount),
        payment_method,
        shipping_phone,
        shipping_address,
        status: 'pending',
        created_at: new Date()
      };
      ordersTable.push(newOrder);
      return [{ insertId: newOrder.id }];
    }

    // 6. INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)
    if (normalizedSql.includes("INSERT INTO order_items")) {
      const [order_id, product_id, quantity, price] = params;
      const newItem = {
        id: orderItemsTable.length + 1,
        order_id: Number(order_id),
        product_id,
        quantity: Number(quantity),
        price: Number(price)
      };
      orderItemsTable.push(newItem);
      return [{ insertId: newItem.id }];
    }

    // 7. SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC
    if (normalizedSql.includes("SELECT * FROM orders WHERE user_id = ?")) {
      const user_id = Number(params[0]);
      const match = ordersTable
        .filter(o => o.user_id === user_id)
        .sort((a, b) => b.created_at - a.created_at);
      return [match];
    }

    // 8. Checking columns schema for migration
    if (normalizedSql.includes("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS")) {
      return [[]];
    }

    return [[]];
  },
  end: async () => {}
};

export async function initDb() {
  try {
    // Attempt real connection pool
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "og_store",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 2000, // Fail fast in 2s
    });

    // Test query to see if database is reachable
    await pool.query("SELECT 1");

    // Initialize schema on real DB
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50) DEFAULT 'card',
        shipping_phone VARCHAR(50),
        shipping_address TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      ) ENGINE=InnoDB;
    `);

    const [existingColumns] = await pool.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = ?
         AND TABLE_NAME = 'orders'
         AND COLUMN_NAME IN ('payment_method', 'shipping_phone', 'shipping_address')`,
      [process.env.DB_NAME || "og_store"]
    );

    const existingColumnNames = existingColumns.map((row) => row.COLUMN_NAME);

    if (!existingColumnNames.includes("payment_method")) {
      await pool.query(`ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50) DEFAULT 'card'`);
    }
    if (!existingColumnNames.includes("shipping_phone")) {
      await pool.query(`ALTER TABLE orders ADD COLUMN shipping_phone VARCHAR(50)`);
    }
    if (!existingColumnNames.includes("shipping_address")) {
      await pool.query(`ALTER TABLE orders ADD COLUMN shipping_address TEXT`);
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id VARCHAR(64) NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id)
      ) ENGINE=InnoDB;
    `);

    console.log("MySQL database initialized successfully");
  } catch (error) {
    console.warn("[AI Studio] Real database connection failed. Switching to transparent in-memory mock storage.");
    pool = mockPool;
    isMock = true;
    await initializeMockData();
  }
}

export function getDb() {
  if (!pool) {
    throw new Error("Database pool not initialized");
  }
  return pool;
}
