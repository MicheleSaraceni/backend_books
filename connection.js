import mysql from "mysql2" // importiamo mysql2

// Inizializziamo una costante connectio a mysql.createCOnnectio({})
const connection = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err) throw err
    console.log("Connection to database completed")
});


export default connection  // Esportimao la costante connection 