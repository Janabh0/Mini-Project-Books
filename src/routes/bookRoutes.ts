import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import upload from "../middlewares/upload";

const router = Router();

// GET /books - Get all books
router.get("/", getAllBooks);

// GET /books/:id - Get book by ID
router.get("/:id", getBookById);

// POST /books - Create new book
router.post("/", upload.single("coverImage"), createBook);

// PUT /books/:id - Update book
router.put("/:id", upload.single("coverImage"), updateBook);

// DELETE /books/:id - Delete book
router.delete("/:id", deleteBook);

export default router;
