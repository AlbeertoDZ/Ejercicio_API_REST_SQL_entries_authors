const queries = require('../queries/entries.queries'); // Queries SQL
const pool = require('../config/db_pgsql'); // Configuracion de la BBDD

// 1er GET entries

const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//PUT entries
const updateEntry = async (entry) => {
    const { title, content, date, email, category, old_title } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.updateEntry, [
            title,
            content,
            date,
            email,
            category,
            old_title
        ]);
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// DELETE

const deleteEntry = async (title) => { // Intentar que funcione el return comentado
    let client , result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteEntry, [title]);
        result = data.rowCount
        /*
        return {
            //data: data,
            rowCount: data.rowCount,
            message: data.rowCount > 0
                ? `Se borró ${data.rowCount} entrada`
                : 'No se encontró el registro a borrar'
        };*/
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

const entries = {
    getAllEntries,
    updateEntry,
    deleteEntry
}



//1er PUT

const updatedEntry = {
    title: "Se acabaron los pepitos del Martina 2. La venganza de Jonha.",
    content: "Tenia hambre y se revento la cocina",
    date: "2025-04-17",
    category: "Sucesos",
    old_title: "Se acabaron los pepitos del Martina 2. La venganza de Jonha."
}

//1er Get
getAllEntries()
    .then(data => console.log(data))
/*
//1er PUT
updateEntry(updatedEntry)
    .then(data => console.log(data))



//1er Delete
deleteEntry()
    .then(data => console.log(data))
*/

module.exports = entries;

