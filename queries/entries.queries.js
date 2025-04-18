
const queries = {
    getEntriesByID: `
    SELECT title, content, date, category, name, surname, image 
    FROM public.entries
    INNER JOIN authors
    ON authors.id_author = entries.id_author;`,
    
    
    updateEntry: `UPDATE entries
	SET 
        title=$1, 
        content=$2, 
        date=$3, 
        id_author=(SELECT id_author FROM authors WHERE email=$4), 
        category=$5
	WHERE 
        title=$6;`,

    //DELETE
    deleteEntry: `DELETE FROM entries
    WHERE title=$1`
}
module.exports = queries;