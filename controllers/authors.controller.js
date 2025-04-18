const entry = require("../models/authors.model"); // Importar el modelo de la BBDD

//GET http://localhost:3000/api/authors --> Todos los Authors
const getAllAuthors = async (req, res) => {
    let authors;
    try {
        authors = await entry.getAllAuthors();
      res.status(200).json(authors); // [] con los authors encontradas
    } catch (error) {
      res.status(500).json({ error: "Error en la BBDD" });
    }
  };


// GET http://localhost:3000/api/authors?email=hola@gmail.com --> por email
  const getAuthorsByEmail = async (req, res) => {
    const alejandru = req.body; //{title}
    if (
      "email" in alejandru 
    ) {
      try {
        const response = await entry.getAuthorsByEmail(alejandru);
        res.status(200).json({
            items_updated: response,
            data: alejandru
        });
      } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
      }
    } else {
      res.status(400).json({ error: "Faltan campos en la entrada" });
    }
  };

// POST http://localhost:3000/api/authors/ 
const insertEntry = async (req, res) => {
    const insertEntry = req.body; // {name, surname, email, image}
    if (
      "name" in insertEntry &&
      "surname" in insertEntry &&
      "email" in insertEntry &&
      "image" in insertEntry 
      ) {
      try {
        const response = await entry.insertEntry(insertEntry);
        res.status(200).json({
            items_updated: response,
            data: insertEntry 
        });
      } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
      }
    } else {
      res.status(400).json({ error: "Faltan campos en la entrada" });
    }
  };

//PUT 
const updateAuthors = async (req, res) => {
    const modifiedEntry = req.body; // {title,content,date,email,category,old_title}
    if (
      "name" in modifiedEntry &&
      "surname" in modifiedEntry &&
      "email" in modifiedEntry &&
      "image" in modifiedEntry &&
      "old_email" in modifiedEntry
    ) {
      try {
        const response = await entry.updateAuthors(modifiedEntry);
        res.status(200).json({
            items_updated: response,
            data: modifiedEntry 
        });
      } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
      }
    } else {
      res.status(400).json({ error: "Faltan campos en la entrada" });
    }
  };

  // DELETE authors
const deleteEntry = async (req, res) => {
    const email = req.params.email;
    try {
      const result = await entry.deleteEntry(email);
  
      if(result.rowCount === 0){
        return res.status(404).json ({
          //data: result.data,
          message: `No existe ningun registro con ese titulo`
        });
      }
      res.status(200).json ({
        //data: result.data,
        message: result.message
      });
  
    } catch (error) {
      res.status(500).json({ error: "Error en la BBDD" });
    }
  }

module.exports = {
    getAllAuthors, // Get todos los autores
    getAuthorsByEmail, // Get autor por email
    insertEntry,
    updateAuthors,
    deleteEntry
};