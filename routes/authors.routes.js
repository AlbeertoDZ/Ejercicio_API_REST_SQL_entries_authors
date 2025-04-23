const express = require('express');
const authorsController = require("../controllers/authors.controller");
const router = express.Router();

//GET http://localhost:3000/api/authors --> ALL
router.get('/', authorsController.getAllAuthors);

//GET http://localhost:3000/api/authors?email=alejandru@thebridgeschool.es
router.get('/email', authorsController.getAuthorByEmail);

//POST http://localhost:3000/api/authors/ 
router.post('/', authorsController.createAuthor);

//PUT http://localhost:3000/api/authors/ 
router.put('/', authorsController.updateAuthor);

//DELETE http://localhost:3000/api/authors/ 
router.delete('/email', authorsController.deleteAuthor)

module.exports = router;