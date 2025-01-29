import express from "express" // Importiamo express dovo averlo installato
import cors from "cors" // Importiamo cors dopo averlo installato 
import booksRouter from "./routers/booksRouter.js" // Importiamo il nostro router

// Creiamo istanza server
const server = express() 

// importiamo dal file env le variabili di ambiente
const PORT = process.env.PORT || 3000; 

{/* USO DI MIDDLEWARE EXPRESS E CORS */ }
server.use(express.static("public"));
server.use(cors());
server.use(express.json());


{/* PRIMA ROTTA */ }
server.use("/books", booksRouter);

{/* ROTTA GENERICA IN CASO DI URL NON TROVATA */ }
server.get("*", (req, res) => {
    res.send("page not found");
});

{/* SERVER IN ASCOLTO SULLA PORTA 3000 */ }
server.listen(PORT, () => {
    console.log(`Il server è in ascolto su http://localhost:${PORT}`);
});

