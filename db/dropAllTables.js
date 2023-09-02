const client = require("./client");
const tables = require("./tables");

async function dropAllTables() {
  try {
    // Start the transaction
    await client.query(`BEGIN`);

    // Iterate over tables array in reverse order in case ther are dependencies
    for (let i = tables.length - 1; i >= 0; i--) {
      let tableName = tables[i].tablename;
      console.log(`Droping table ${tableName}...`);
      await client.query(`DROP TABLE IF EXISTS ${tableName} CASCADE`);
    }

    // Drop order_status
    await client.query(`DROP TYPE order_status`);

    // Commit the transaction
    await client.query(`COMMIT`);
    console.log("All tables dropped successfully");
  } catch (error) {
    console.log(error);
    await client.query(`ROLLBACK`);
  }
}

module.exports = dropAllTables;
