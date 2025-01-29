import express from "express"
const bookRouter = express.Router() // Creiamo un instanza con il metodo router di express
import { index, show, storeReview, destroy, store } from "../controllers/booksControllers.js"

//bookRouter.get("/", indexBooks)

// READ - (INDEX) 
bookRouter.get("/", index)

// READ - (SHOW)
bookRouter.get("/:id", show)

// CREATE - (STORE LIBRI)
bookRouter.post("/", store)
// CREATE - (STORE REVIEW)
bookRouter.post("/reviews/:id", storeReview)

// UPDATE - (UPDATE)
//bookRouter.put("/:id", update)

// PATCH - (MODIFY)
//bookRouter.patch("/:id", modify)

// DELETE - (DESTROY)
bookRouter.delete("/:id", destroy)

export default bookRouter
