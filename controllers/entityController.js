const {
  getAllEntities,
  executeQuery,
  createEntity,
  createEntry,
  getEntries,
  updateEntry,
  deleteEntry,
} = require("../utils/dbUtils");

// Create a new entity
exports.createNewEntity = async (req, res) => {
  try {
    const { entityName, attributes } = req.body;
    await createEntity(entityName, attributes);
    res.status(201).json({ message: "Entity created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEntities = async (req, res) => {
  try {
    const entityNames = await getAllEntities();
    res.status(200).json(entityNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new entry for an entity
exports.createNewEntry = async (req, res) => {
  try {
    const { entityName } = req.params;
    const data = req.body;
    await createEntry(entityName, data);
    res.status(201).json({ message: "Entry created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all entries for an entity
exports.getAllEntries = async (req, res) => {
  try {
    const { entityName } = req.params;
    const entries = await getEntries(entityName);
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing entry for an entity
exports.updateExistingEntry = async (req, res) => {
  try {
    const { entityName, id } = req.params;
    const data = req.body;
    console.log(data);
    await updateEntry(entityName, id, data);
    res.status(200).json({ message: "Entry updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an existing entry for an entity
exports.deleteExistingEntry = async (req, res) => {
  try {
    const { entityName, id } = req.params;
    await deleteEntry(entityName, id);
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEntityAttributes = async (req, res) => {
  const { entityName } = req.params;
  try {
    const sql = `DESCRIBE ${entityName}`; // Describe the table to get column information
    const rows = await executeQuery(sql, []);
    const attributes = rows.map((row) => ({ name: row.Field, type: row.Type }));
    res.status(200).json(attributes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
