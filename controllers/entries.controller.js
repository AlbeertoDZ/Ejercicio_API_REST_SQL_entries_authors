const entry = require("../config/db_pgsql"); // Importar el modelo de la BBDD

//Get entries
const getEntriesByID = async (req, res) => {
    let entries;
    try {
        entries = await entry.getEntriesByID();
      res.status(200).json(entries); // [] con las entries encontradas
    } catch (error) {
      res.status(500).json({ error: "Error en la BBDD" });
    }
  };

  
//Put entries
const updateEntry = async (req, res) => {
  const modifiedEntry = req.body; // {title,content,date,email,category,old_title}
  if (
    "title" in modifiedEntry &&
    "content" in modifiedEntry &&
    "date" in modifiedEntry &&
    "email" in modifiedEntry &&
    "category" in modifiedEntry &&
    "old_title" in modifiedEntry
  ) {
    try {
      const response = await entry.updateEntry(modifiedEntry);
      res.status(200).json({
        message: `Se actualizó el registro '${modifiedEntry.title}'`,
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

// DELETE entries
const deleteEntry = async (req, res) => {
  const title = req.params.title;
  try {
    const result = await entry.deleteEntry(title);

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
  getEntriesByID,
  deleteEntry, //--> DELETE
  updateEntry, //--> PUT
};
