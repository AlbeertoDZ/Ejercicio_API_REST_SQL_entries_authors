const queries = require('../queries/authors.queries'); // Queries SQL
const pool = require('../config/db_pgsql'); // Configuracion de la BBDD

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

const getAuthorByEmail = async ({email}) => { //OBJETO PORQUE NO COGE COMO VARIABLE
    //const {email} = entry
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAuthorByEmail,[email])
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
/*
getAuthorByEmail(getOneAuthor)
    .then(data => console.log(data))
*/
//  POST authors
const createAuthor = async (author) => {
    const {name, surname, email, image} = author;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createAuthor, [
            name,
            surname,
            email,
            image
        ]);
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

const insertObject = {
    name: "Elena",
    surname: "Diez",
    email: "elenaSobrina@gmail.com",
    image: "https://randomuser.me/api/portraits/thumb/women/11.jpg"
}
/*
createAuthor(insertObject)
    .then(data => console.log("usuario creado: " + insertObject.email))
*/
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

const updatedAuthor = {
    name: "Pedro",
    surname: "Diez",
    email: "pepote@thebridgeschool.es",
    image: "https://randomuser.me/api/portraits/thumb/men/45.jpg",
    old_email: "pepote@thebridgeschool.es"
}
/*
updateAuthors(updatedAuthor)
.then(data => console.log("usuario modificado: " + updatedAuthor.email))
*/
// DELETE

const deleteAuthor = async (email) => {

    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.deleteAuthor, [email]);
        result = data.rows
        /*
        return {
            //data: data,
            rowCount: data.rowCount,
            message: data.rowCount > 0
                ? `Se borró ${data.rowCount} `
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
/*
deleteAuthor() // Probar
    .then(data => console.log(data))
*/

    const authors = {
        getAllAuthors,
        getAuthorByEmail,
        createAuthor,
        updateAuthors,
        deleteAuthor
    }


module.exports = authors;