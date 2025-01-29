import express from "express";
import { index, show, storeReview, destroy, store } from "../controllers/booksControllers.js";

// Creiamo un instanza con il metodo router di express
const bookRouter = express.Router();
// READ - (INDEX) 
bookRouter.get("/", index);

// READ - (SHOW)
bookRouter.get("/:id", show);

// CREATE - (STORE LIBRI)
bookRouter.post("/", store);
// CREATE - (STORE REVIEW)
bookRouter.post("/reviews/:id", storeReview);

// UPDATE - (UPDATE)
//bookRouter.put("/:id", update)

// PATCH - (MODIFY)
//bookRouter.patch("/:id", modify)

// DELETE - (DESTROY)
bookRouter.delete("/:id", destroy);

// Esportiamo il nostro router
export default bookRouter;
