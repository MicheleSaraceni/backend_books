import express from "express"
const bookRouter = express.Router() // Creiamo un instanza con il metodo router di express
import { index, show, store, destroy } from "../controllers/booksControllers.js"

// READ - (INDEX) 
bookRouter.get("/", index)

// READ - (SHOW)
bookRouter.get("/:id", show)

// CREATE - (STORE)
bookRouter.post("/", store)

// UPDATE - (UPDATE)
//bookRouter.put("/:id", update)

// PATCH - (MODIFY)
//bookRouter.patch("/:id", modify)

// DELETE - (DESTROY)
bookRouter.delete("/:id", destroy)

export default bookRouter
