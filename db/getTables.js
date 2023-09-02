const client = require("./client");

async function getTables() {
  try {
    const result = await client.query(
      `SELECT tablename FROM pg_tables WHERE schemaname = 'public' `
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = getTables;
