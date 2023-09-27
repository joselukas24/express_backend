const client = require("./client");

async function makeAdmin() {
  try {
    // Connect client
    client.connect();

    // Begin Transaction
    await client.query("BEGIN");

    // Make admin@admin.com an admin
    const { rows } = await client.query(
      ` UPDATE users
        SET admin = true
        WHERE email = $1`,
      ["admin@admin.com"]
    );

    // Commit Transaction
    await client.query("COMMIT");
  } catch (error) {
    // Rollback if there's any error
    await client.query("ROLLBACK");
    throw error;
  }
}

makeAdmin()
  .catch(console.error)
  .finally(() => client.end());
