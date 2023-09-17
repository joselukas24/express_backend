const { system } = require("nodemon/lib/config");
const client = require("./client");
const bcrypt = require("bcrypt");

// Gets the users cart_id using the users email
async function getCartId(email) {
  try {
    const { rows } = await client.query(
      `SELECT user_id FROM users WHERE email=$1`,
      [email]
    );
    const user_id = rows[0].user_id;
    const cartRows = await client.query(
      `SELECT cart_id FROM shopping_carts WHERE user_id=$1`,
      [user_id]
    );
    const cart_id = cartRows.rows[0].cart_id;
    return cart_id;
  } catch (error) {
    throw error;
  }
}

// GET - users/ - get user
async function getUsers() {
  try {
    const { rows } = await client.query(`SELECT * FROM users`);
    return rows;
  } catch (error) {
    throw error;
  }
}

// POST - api/users/user/login - Login User
async function loginUser(body) {
  try {
    const { rows } = await client.query(
      `SELECT password FROM users WHERE email = $1`,
      [body.email]
    );
    if (rows[0]) {
      const hash = rows[0].password;
      if (bcrypt.compareSync(body.password, hash)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
}

// POST - users/user/ - post user
async function signupUser(body) {
  const hash = bcrypt.hashSync(body.password, 10);
  try {
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users(email, password) VALUES($1, $2) RETURNING *;`,
      [body.email, hash]
    );
    await client.query(`INSERT INTO shopping_carts(user_id) VALUES($1);`, [
      user.user_id,
    ]);
    return user;
  } catch (error) {
    throw error;
  }
}

// POST - users/user/cart/add - add product to cart
async function addToCart(body) {
  try {
    const cart_id = await getCartId(body.email);
    const cartItemRows = await client.query(
      `INSERT INTO cart_items(cart_id, game_id, title, sample_cover_image, price) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [cart_id, body.game_id, body.title, body.sample_cover_image, body.price]
    );
    return cartItemRows;
  } catch (error) {
    throw error;
  }
}

// POST - users/user/cart - get the cart items for user
async function getCartItems(email) {
  try {
    const cart_id = await getCartId(email);
    const cart_items = await client.query(
      `SELECT * FROM cart_items WHERE cart_id=$1`,
      [cart_id]
    );
    return cart_items.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { getUsers, loginUser, signupUser, addToCart, getCartItems };
