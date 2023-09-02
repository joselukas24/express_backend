const client = require("./client");

async function createAllTables() {
  try {
    const queries = [
      `BEGIN`,
      `CREATE TABLE IF NOT EXISTS users(
        user_id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    )`,
      `CREATE TABLE IF NOT EXISTS games(
        game_id INTEGER PRIMARY KEY, 
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        sample_cover_image TEXT NOT NULL,
        sample_cover_thumbnail TEXT NOT NULL
    )`,
      `CREATE TABLE IF NOT EXISTS platforms(
        platform_id INTEGER PRIMARY KEY,
        platform_name VARCHAR(255)
    )`,
      `CREATE TABLE IF NOT EXISTS game_platforms (
        game_id INTEGER REFERENCES games(game_id),
        platform_id INTEGER REFERENCES platforms(platform_id),
        first_release_date DATE,
        PRIMARY KEY (game_id, platform_id)
    )`,
      `CREATE TABLE IF NOT EXISTS game_covers (
        cover_id SERIAL PRIMARY KEY,
        game_id INTEGER REFERENCES games(game_id),
        image TEXT NOT NULL,
        thumbnail_image TEXT NOT NULL
    )`,
      `CREATE TABLE IF NOT EXISTS game_screenshots (
        screenshot_id SERIAL PRIMARY KEY,
        game_id INTEGER REFERENCES games(game_id),
        caption TEXT,
        image TEXT NOT NULL,
        thumbnail_image TEXT NOT NULL
    )`,
      `CREATE TYPE order_status AS ENUM ('Pending', 'Shipped', 'Delivered', 'Cancelled')`,
      `CREATE TABLE IF NOT EXISTS orders (
        order_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id),
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        total_price DECIMAL(10, 2),
        order_status VARCHAR(50) DEFAULT 'Pending'
    )`,
      `CREATE TABLE IF NOT EXISTS order_items (
        order_item_id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(order_id),
        game_id INTEGER REFERENCES games(game_id),
        quantity INTEGER NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL
    )`,
      `CREATE TABLE IF NOT EXISTS shopping_carts (
        cart_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(user_id)
    )`,
      `CREATE TABLE IF NOT EXISTS cart_items (
        cart_item_id SERIAL PRIMARY KEY,
        cart_id INTEGER REFERENCES shopping_carts(cart_id),
        game_id INTEGER REFERENCES games(game_id),
        quantity INTEGER NOT NULL
    )`,
    ];

    // Execute each query
    for (let i = 0; i < queries.length; i++) {
      console.log(`Creating table ${queries[i]}...`);
      await client.query(queries[i]);
    }

    // Commit the transaction
    await client.query(`COMMIT`);
    console.log("All tables created successfully");
  } catch (error) {
    await client.query(`ROLLBACK`);
    console.log(error);
  }
}

module.exports = createAllTables;
