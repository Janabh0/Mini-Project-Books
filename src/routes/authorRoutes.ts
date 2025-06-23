import { Router } from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/authorController";

const router = Router();

// GET /authors - Get all authors
router.get("/", getAllAuthors);

// GET /authors/:id - Get author by ID
router.get("/:id", getAuthorById);

// POST /authors - Create new author
router.post("/", createAuthor);

// PUT /authors/:id - Update author
router.put("/:id", updateAuthor);

// DELETE /authors/:id - Delete author
router.delete("/:id", deleteAuthor);

export default router;
