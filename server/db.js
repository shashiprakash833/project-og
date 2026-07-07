import mysql from "mysql2/promise";

let pool;

export async function initDb() {
  pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "og_store",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

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

  console.log("MySQL database initialized");
}

export function getDb() {
  if (!pool) {
    throw new Error("Database pool not initialized");
  }
  return pool;
}
