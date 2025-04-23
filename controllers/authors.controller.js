const author = require("../models/authors.model"); // Importar el modelo de la BBDD

//GET http://localhost:3000/api/authors --> Todos los Authors
const getAllAuthors = async (req, res) => {
    let authors;
    try {
        authors = await entry.getAllAuthors(req.query);
      res.status(200).json(authors); // [] con los authors encontradas
    } catch (error) {
      res.status(500).json({ error: "Error en la BBDD" });
    }
  };


// GET http://localhost:3000/api/authors?email=hola@gmail.com --> por email
  const getAuthorByEmail = async (req, res) => {
    const searchByEmail = req.query; //{title}
       try {
        const response = await author.getAuthorByEmail(searchByEmail);
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
      }
     
  };

// POST http://localhost:3000/api/authors/ 
const createAuthor = async (req, res) => {
    const newAuthor = req.body; // {name, surname, email, image}
    if (
      "name" in insertEntry &&
      "surname" in insertEntry &&
      "email" in insertEntry &&
      "image" in insertEntry 
      ) {
      try {
        const response = await entry.createAuthor(newAuthor);
        res.status(200).json({
            message: `usuario creado: ${newAuthor}`,
            "items_created": response,
            data: newAuthor 
        });
      } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
      }
    } else {
      res.status(400).json({ error: "Faltan campos en la entrada" });
    }
  };

//PUT 
//Devolver {message: "usuario actualizado: guillermu@thebridgeschool.es"}
const updateAuthor = async (req, res) => {
    const modifiedAuthor = req.body; // {title,content,date,email,category,old_title}
    if (
      "name" in modifiedAuthor &&
      "surname" in modifiedAuthor &&
      "email" in modifiedAuthor &&
      "image" in modifiedAuthor &&
      "old_email" in modifiedAuthor
    ) {
      try {
        const response = await author.updateAuthors(modifiedAuthor);
        res.status(200).json({
            message: 'Autor actualizado',
            "items_updated": response
        });
      } catch (error) {
        res.status(500).json({ error: "Error en la BBDD" });
      }
    } else {
      res.status(400).json({ error: "Faltan campos en la entrada" });
    }
  };

  // DELETE authors
const deleteAuthor = async (req, res) => {
    const email = req.body; // {email}
    try {
      const response = await entry.deleteAuthor(email);
      
      if(response.rowCount === 0){
        return res.status(404).json ({
          //data: result.data,
          message: `No existe ningun registro con ese titulo`
        });
      }

      res.status(200).json ({
        //data: response.data,
        message: `Se ha borrado ${email}`,
        "items_updated": response
      });
  
    } catch (error) {
      res.status(500).json({ error: "Error en la BBDD" });
    }
  }

module.exports = {
    getAllAuthors, // Get todos los autores
    getAuthorByEmail, // Get autor por email
    createAuthor,
    updateAuthor,
    deleteAuthor
};