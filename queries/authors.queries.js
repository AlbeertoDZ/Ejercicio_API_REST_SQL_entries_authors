const { insertEntry } = require("../models/authors.model");
const { updateEntry, deleteEntry } = require("./entries.queries");

const queries = {
    getAllAuthors: `SELECT * FROM authors;`,

    getAuthorsByEmail: `
    SELECT name, surname, email, image
    FROM public.authors
    WHERE email=$1`,

    insertEntry: `
    INSERT INTO public.authors (name, surname, email, image)
    VALUES
    ($1,$2,$3,$4)`,

    updateAuthors: `
    UPDATE public.authors
    SET
        name=$1,
        surname=$2,
        email=$3,
        image=$4
    WHERE
        email=$5;
    `,

    deleteEntry: `DELETE FROM public.authors
    WHERE email=$1`
}

module.exports = queries;