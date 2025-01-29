//Import necessari
import connection from "../connection.js"

//Funzioni
//Index mostra tutti i libri
const index = (req, res) => {
    //Query
    const sql = "SELECT * FROM `books`";
    //Esecuzione query
    connection.query(sql, (err, results) => {
        //Se c'è un errore ritorna un error 500
        if (err) return res.status(500).json({ error: "Database query failed" });
        //Altrimenti ritorna tutti i libri
        res.json({
            length: results.length,
            items: results
        });
    });
};

//Show mostra un libro in base all'id
const show = (req, res) => {
    //recupero l'id
    const id = parseInt(req.params.id);
    //preparo la query
    const sql = `SELECT books.*, AVG(reviews.vote) AS vote_avarage FROM books
    LEFT JOIN reviews ON books.id = reviews.book_id
    WHERE books.id = ?`
    //Esecuzione query
    connection.query(sql, [id], (err, results) => {
        //Se c'è un errore ritorna un error 500
        if (err) return res.status(500).json({ error: err });
        //Se l'elemento non è presente ritorna un error 404
        if (!results[0]) return res.status(404).json({ error: "element not found" });
        //Altrimenti ritorna l'elemento ma prima dobbiamo estrarre le sue reviews
        if (results[0]) {
            //preparo la query
            const sql2 = `SELECT reviews.* FROM reviews
            WHERE book_id = ?`;
            //salvo l'elemento nella variabile item
            const item = results[0];
            //Esecuzione query
            connection.query(sql2, [id], (err, results2) => {
                //Se c'è un errore ritorna un error 500
                if (err) return res.status(500).json({ error: err });
                //Salvo le reviews nella variabile reviews
                const reviews = results2;
                //ritorno l'elemento
                return res.json({ item: item, reviews: reviews });
            });
        };
    });
};

//Store per libri e reviews
//Store per libri (Da modificare se implementeremo aggiunta di libri)
const store = (req, res) => {
    const { id } = req.params;
    const { name, text, vote } = req.body;
    const sql = "INSERT INTO reviews (name, text, vote, book_id) VALUES (?, ?, ?, ?)";
    connection.query(sql, [name, text, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.status(201);
        res.json({ message: "Reviews added", id: results.insertId });
    });
};

//Store per reviews
const storeReview = (req, res) => {
    //recupero l'id
    const { id } = req.params;
    //recupero i dati
    const { name, text, vote } = req.body;
    //preparo la query
    const sql = "INSERT INTO reviews (name, text, vote, book_id) VALUES (?, ?, ?, ?)";
    //Esecuzione query
    connection.query(sql, [name, text, vote, id], (err, results) => {
        //Se c'è un errore ritorna un error 500
        if (err) return res.status(500).json({ error: "Database query failed" });
        else return res.json({ message: "Reviews added", id: results.insertId });
    });
};

//Destroy per eliminare un libro
const destroy = (req, res) => {
    //recupero l'id
    const id = parseInt(req.params.id);
    //preparo la query
    const sql = "DELETE FROM `books` WHERE `id` = ? ";
    //Esecuzione query
    connection.query(sql, [id], () => {
        return res.json({ message: "element deleted" });
    });
};

//esporto le funzioni
export { index, show, store, storeReview, destroy } 