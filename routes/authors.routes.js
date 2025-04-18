const express = require('express');
const authorsController = require("../controllers/authors.controller");
const router = express.Router();

//GET http://localhost:3000/api/authors --> ALL
router.get('/authors', authorsController.getAllAuthors);

//GET http://localhost:3000/api/authors?email=alejandru@thebridgeschool.es
router.get('/authors/email', authorsController.getAuthorsByEmail);

//POST http://localhost:3000/api/authors/ 
router.post('/', authorsController.insertEntry);

//PUT http://localhost:3000/api/authors/ 
router.put('/', authorsController.updateAuthors);

//DELETE http://localhost:3000/api/authors/ 
router.delete('/', authorsController.deleteEntry)

module.exports = router;