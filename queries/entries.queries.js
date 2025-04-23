const queries = {
    getAllEntries: `
    SELECT e.title, e.content, e.date, e.category, a.name, a.surname, a.email, a.image
    FROM public.entries AS e
    INNER JOIN authors AS a
    ON a.id_author = e.id_author;`,
    
    
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
    deleteEntry: `
    DELETE 
    FROM entries
    WHERE title=$1`
}
module.exports = queries;