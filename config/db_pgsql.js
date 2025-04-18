const { Pool } = require('pg');
const queriesAuthor = require('../queries/authors.queries'); // Queries SQL
const queries = require('../queries/entries.queries'); // Queries SQL

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    port: '5432',
    database: 'postgres',
    password: '123456'
});

//1er Get Todos los Authors

const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queriesAuthor.getAllAuthors)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

getAllAuthors()
    .then(data => console.log(data))

// 1er GET Authors por email

const getAuthorsByEmail = async ({email}) => { //OBJETO PORQUE NO COGE COMO VARIABLE
    //const {email} = entry
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queriesAuthor.getAuthorsByEmail,[email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const getOneAuthor = {
    email: "alejandru@thebridgeschool.es"
}

getAuthorsByEmail(getOneAuthor)
    .then(data => console.log(data))

//  POST authors
const insertEntry = async (entry) => {
    const {name, surname, email, image} = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queriesAuthor.insertEntry, [
            name,
            surname,
            email,
            image
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

const insertObject = {
    name: "Elena",
    surname: "Diez",
    email: "elenaSobrina@gmail.com",
    image: "https://randomuser.me/api/portraits/thumb/women/11.jpg"
}

insertEntry(insertObject)
    .then(data => console.log("usuario creado: " + insertObject.email))

//PUT

const updateAuthors = async (entry) => {
    const { name, surname, email, image, old_email } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queriesAuthor.updateAuthors, [
            name,
            surname,
            email,
            image,
            old_email
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

const updatedAuthors = {
    name: "Pedro",
    surname: "Diez",
    email: "pepote@thebridgeschool.es",
    image: "https://randomuser.me/api/portraits/thumb/men/45.jpg",
    old_email: "pepote@thebridgeschool.es"
}

updateAuthors(updatedAuthors)
.then(data => console.log("usuario modificado: " + updatedAuthors.email))

// DELETE

const deleteAuthor = async (email) => {

    let client;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queriesAuthor.deleteAuthors, [email]);

        return {
            //data: data,
            rowCount: data.rowCount,
            message: data.rowCount > 0
                ? `Se borró ${data.rowCount} `
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

deleteAuthor()
    .then(data => console.log(data))


    const authors = {
        getAllAuthors,
        getAuthorsByEmail,
        insertEntry,
        updateAuthors,
        deleteAuthor
    }


module.exports = authors;


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

