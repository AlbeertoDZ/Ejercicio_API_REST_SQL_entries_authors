const { Pool } = require('pg');
const queries = require('../queries/authors.queries'); // Queries SQL

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
        const data = await client.query(queries.getAllAuthors)
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
        const data = await client.query(queries.getAuthorsByEmail,[email])
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
        const data = await client.query(queries.insertEntry, [
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
        const data = await client.query(queries.updateAuthors, [
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

const updatedEntry = {
    name: "Pedro",
    surname: "Diez",
    email: "pepote@thebridgeschool.es",
    image: "https://randomuser.me/api/portraits/thumb/men/45.jpg",
    old_email: "pepote@thebridgeschool.es"
}

updateAuthors(updatedEntry)
.then(data => console.log("usuario modificado: " + updatedEntry.email))

// DELETE

const deleteEntry = async (email) => {

    let client;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteEntry, [email]);

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

deleteEntry()
    .then(data => console.log(data))


    const authors = {
        getAllAuthors,
        getAuthorsByEmail,
        insertEntry,
        updateAuthors,
        deleteEntry
    }


module.exports = authors;