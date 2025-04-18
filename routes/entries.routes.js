const express = require('express');
const entriesController = require("../controllers/entries.controller");
const router = express.Router();

//http://localhost:3000/api/entries/ENTRIES
router.get('/entries', entriesController.getEntriesByID);

router.put('/', entriesController.updateEntry);

router.delete('/:title',entriesController.deleteEntry);


module.exports = router;

