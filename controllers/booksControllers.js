
import connection from "../connection.js"

// const indexBooks = (req, res) => {
//     const limit = 2;
//     const { page } = req.query;
//     const offset = page === 1 ? 0 : limit * (page - 1);
//     const sql = "SELECT * FROM BOOKS LIMIT ? OFFSET ?";
//     connection.query(sql, [limit, offset], (err, results) => {
//         if (err) res.status(500).json({ error: "errore del server" });
//         const count = results[0].count;
//         const response = {
//             count,
//             items: results,
//         };
//         res.json(response);
//     });
// }
const index = (req, res) => {

    const sql = "SELECT * FROM `books`"
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: "Database query failed"
        })
        res.json({

            length: results.length,
            items: results

        })

    })


}


const show = (req, res) => {

    const id = parseInt(req.params.id)
    const sql = `SELECT books.*, AVG(reviews.vote) AS vote_avarage FROM books
    LEFT JOIN reviews ON books.id = reviews.book_id
    WHERE books.id = ?`
    connection.query(sql, [id], (err, results) => {

        if (err)
            return res.status(500).json({ error: err })

        if (!results[0])
            return res.status(404).json({ error: "element not found" })

        if (results[0]) {
            const sql2 = `SELECT reviews.* FROM reviews
            WHERE book_id = ?`;
            const item = results[0]
            connection.query(sql2, [id], (err, results2) => {

                if (err)
                    return res.status(500).json({ error: err })

                const reviews = results2
                return res.json({ item: item, reviews: reviews })

            })
        }

    })

}

const store = (req, res) => {
    //recuper l'id
    const { id } = req.params;

    //recupero il body
    const { name, text, vote } = req.body;

    //preparo la query
    const sql = "INSERT INTO reviews (name, text, vote, book_id) VALUES (?, ?, ?, ?)";

    //Eseguiamo la query
    //console.log(results); // results contiene la riga che ci ritorna il server
    //console.log(fields); // fields contiene dati extra di results, se disponibili
    connection.query(sql, [name, text, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.status(201);
        res.json({ message: "Reviews added", id: results.insertId });
    });
}

const storeReview = (req, res) => {

    const { id } = req.params;
    const { name, text, vote } = req.body;


    const sql = "INSERT INTO reviews (name, text, vote, book_id) VALUES (?, ?, ?, ?)";

    connection.query(sql, [name, text, vote, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        } else {
            return res.json({ message: "Reviews added", id: results.insertId });
        }

    });
}

const destroy = (req, res) => {

    const id = parseInt(req.params.id)
    const sql = "DELETE FROM `books` WHERE `id` = ? "
    connection.query(sql, [id], () => {

        return res.json({ message: "element deleted" })


    })

}

export { index, show, store, storeReview, destroy } 