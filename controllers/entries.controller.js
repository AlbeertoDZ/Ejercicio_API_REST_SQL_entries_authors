const entry = require("../models/entries.model"); // Importar el modelo de la BBDD

//Get entries
const getAllEntries = async (req, res) => {
    let entries;
    try {
        entries = await entry.getAllEntries(req.query);
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
        message: `Se actualizó la entry '${modifiedEntry.title}'`,
        "items_updated": response,
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
  const title = req.body.title;
  try {
    const response = await entry.deleteEntry(title);

    res.status(200).json ({
      //data: result.data,
      "item_deleted": response,
      message: `Se ha borrado la entry: ${title}`,
    });

  } catch (error) {
    res.status(500).json({ error: "Error en la BBDD" });
  }
}

module.exports = {
  getAllEntries,
  deleteEntry, //--> DELETE
  updateEntry, //--> PUT
};
