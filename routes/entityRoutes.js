const express = require("express");
const router = express.Router();
const entityController = require("../controllers/entityController");

// Create a new entity
router.post("/", entityController.createNewEntity);

// Create a new entry for an entity
router.post("/:entityName/entries", entityController.createNewEntry);

// Get all entries for an entity
router.get("/:entityName/entries", entityController.getAllEntries);

// Update an existing entry for an entity
router.put("/:entityName/entries/:id", entityController.updateExistingEntry);

// Delete an existing entry for an entity
router.delete("/:entityName/entries/:id", entityController.deleteExistingEntry);

router.get("/", entityController.getAllEntities);

// Get attributes for an entity
router.get("/:entityName/attributes", entityController.getEntityAttributes);

module.exports = router;
