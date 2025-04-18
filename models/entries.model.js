const { Pool } = require('pg');
const queries = require('../queries/entries.queries'); // Queries SQL

// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     port: '5432',
//     database: 'postgres',
//     password: '123456'
// });

const pool = new Pool({
  user: 'albertodz30',
  host: 'dpg-d01bm4be5dus73e3l350-a.oregon-postgres.render.com',
  database: 'bbdd_api_sql_entries',
  password: 'jSW2JdIHRGAEReHlD1gr82zlEElNXUeL',
  port: 5432,
  ssl: true, 
});

// 1er GET entries

const getEntriesByID = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getEntriesByID)
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
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// DELETE

const deleteEntry = async (title) => {

    let client;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteEntry, [title]);

        return {
            //data: data,
            rowCount: data.rowCount,
            message: data.rowCount > 0
                ? `Se borró ${data.rowCount} entrada`
                : 'No se encontró el registro a borrar'
        };
    } catch (err) {
        console.error(err);
        return {
            error: err.message
        };
    } finally {
        client.release();
    }
}

const entries = {
    getEntriesByID,
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

//1er PUT
updateEntry(updatedEntry)
    .then(data => console.log(data))

//1er Get
getEntriesByID()
    .then(data => console.log(data))

//1er Delete
deleteEntry()
    .then(data => console.log(data))


module.exports = entries;

