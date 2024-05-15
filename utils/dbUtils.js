const mysql = require("mysql2/promise");
let connection;
// Database connection
const connectToDatabase = async () => {
  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Stanika@143",
      database: "cms_data",
    });

    console.log("Database connection established.");

    return connection;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error; // Re-throw the error to handle it in the caller
  }
};

// Function to execute SQL queries
const executeQuery = async (sql, params) => {
  if (!connection) {
    throw new Error("Database connection is not established.");
  }
  const [rows, fields] = await connection.execute(sql, params);

  return rows;
};

// Create a new entity and its table
const createEntity = async (entityName, attributes) => {
  if (!connection) {
    throw new Error("Database connection is not established.");
  }
  // Create SQL query to create table
  let sql = `CREATE TABLE IF NOT EXISTS ${entityName} (id INT AUTO_INCREMENT PRIMARY KEY`;

  for (const [key, value] of Object.entries(attributes)) {
    sql += `, ${key} ${value.toUpperCase()} NOT NULL`;
  }

  sql += `)`;
  console.log(sql);
  // Execute SQL query
  await executeQuery(sql, []);

  console.log(
    `Entity '${entityName}' created successfully with attributes:`,
    attributes
  );
};

const getAllEntities = async () => {
  if (!connection) {
    throw new Error("Database connection is not established.");
  }

  try {
    // Create SQL query to fetch all entity names
    let sql = `SELECT table_name, table_schema FROM INFORMATION_SCHEMA.TABLES WHERE 
              TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA= ?`;

    // Execute SQL query
    const rows = await executeQuery(sql, [connection.config.database]);

    // Extract entity names from the rows
    const entityNames = rows.map((row) => row.TABLE_NAME);

    return entityNames;
  } catch (error) {
    throw error;
  }
};

// Create a new entry for an entity
const createEntry = async (entityName, data) => {
  if (!connection) {
    throw new Error("Database connection is not established.");
  }
  // Create SQL query to insert entry
  let sql = `INSERT INTO ${entityName} SET ${Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ")}`;

  // Extract values from the data object
  const values = Object.values(data);

  // Execute SQL query
  await executeQuery(sql, values);

  console.log(`Entry created successfully for entity '${entityName}'`);
};

// Get all entries for an entity
const getEntries = async (entityName) => {
  if (!connection) {
    throw new Error("Database connection is not established.");
  }
  // Create SQL query to fetch all entries
  let sql = `SELECT * FROM ${entityName}`;

  // Execute SQL query
  const entries = await executeQuery(sql, []);

  return entries;
};

// Update an existing entry for an entity
const updateEntry = async (entityName, id, data) => {
  if (!connection) {
    throw new Error("Database connection is not established.");
  }
  // Create SQL query to update entry
  let sql = `UPDATE ${entityName} SET ${Object.keys(data)
    .map((key) => `${key} = ?`)
    .join(", ")} WHERE id=?`;
  const values = Object.values(data);
  // Execute SQL query
  await executeQuery(sql, [...values, id]);

  console.log(
    `Entry with ID '${id}' updated successfully for entity '${entityName}'`
  );
};

// Delete an existing entry for an entity
const deleteEntry = async (entityName, id) => {
  if (!connection) {
    throw new Error("Database connection is not established.");
  }
  // Create SQL query to delete entry
  let sql = `DELETE FROM ${entityName} WHERE id = ?`;

  // Execute SQL query
  await executeQuery(sql, [id]);

  console.log(
    `Entry with ID '${id}' deleted successfully for entity '${entityName}'`
  );
};

module.exports = {
  connectToDatabase,
  executeQuery,
  getAllEntities,
  createEntity,
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
};
