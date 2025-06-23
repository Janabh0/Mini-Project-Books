import { Request, Response } from "express";
import Book, { IBook } from "../models/Book";
import Author from "../models/Author";
import Category from "../models/Category";

// GET /books - Get all books with populated author and categories
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find()
      .populate("author", "name country")
      .populate("categories", "name");

    res.status(200).json({
      success: true,
      data: books,
      count: books.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// GET /books/:id - Get book by ID with populated author and categories
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author", "name country")
      .populate("categories", "name");

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// POST /books - Create new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, categories } = req.body;
    const coverImage = req.file?.filename;

    if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: "Title and author are required",
      });
    }

    // Verify author exists
    const authorExists = await Author.findById(author);
    if (!authorExists) {
      return res.status(400).json({
        success: false,
        message: "Author not found",
      });
    }

    // Verify categories exist if provided
    if (categories && categories.length > 0) {
      const categoryPromises = categories.map((catId: string) =>
        Category.findById(catId)
      );
      const categoryResults = await Promise.all(categoryPromises);
      const invalidCategories = categoryResults.filter((cat: any) => !cat);

      if (invalidCategories.length > 0) {
        return res.status(400).json({
          success: false,
          message: "One or more categories not found",
        });
      }
    }

    const book = new Book({
      title,
      author,
      categories: categories || [],
      coverImage,
    });

    const savedBook = await book.save();

    // Update author's books array
    await Author.findByIdAndUpdate(author, { $push: { books: savedBook._id } });

    // Update categories' books arrays
    if (categories && categories.length > 0) {
      await Category.updateMany(
        { _id: { $in: categories } },
        { $push: { books: savedBook._id } }
      );
    }

    // Return populated book
    const populatedBook = await Book.findById(savedBook._id)
      .populate("author", "name country")
      .populate("categories", "name");

    res.status(201).json({
      success: true,
      data: populatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// PUT /books/:id - Update book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { title, author, categories } = req.body;
    const coverImage = req.file?.filename;
    const updateData: Partial<IBook> = {};

    if (title) updateData.title = title;
    if (author) updateData.author = author;
    if (categories !== undefined) updateData.categories = categories;
    if (coverImage) updateData.coverImage = coverImage;

    // Get the original book to handle relationship updates
    const originalBook = await Book.findById(req.params.id);
    if (!originalBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Verify author exists if being updated
    if (author) {
      const authorExists = await Author.findById(author);
      if (!authorExists) {
        return res.status(400).json({
          success: false,
          message: "Author not found",
        });
      }
    }

    // Verify categories exist if being updated
    if (categories && categories.length > 0) {
      const categoryPromises = categories.map((catId: string) =>
        Category.findById(catId)
      );
      const categoryResults = await Promise.all(categoryPromises);
      const invalidCategories = categoryResults.filter((cat) => !cat);

      if (invalidCategories.length > 0) {
        return res.status(400).json({
          success: false,
          message: "One or more categories not found",
        });
      }
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Handle relationship updates
    const bookId = req.params.id;

    // Update author relationships
    if (author && author !== originalBook.author.toString()) {
      // Remove from old author
      await Author.findByIdAndUpdate(originalBook.author, {
        $pull: { books: bookId },
      });
      // Add to new author
      await Author.findByIdAndUpdate(author, { $push: { books: bookId } });
    }

    // Update category relationships
    if (categories !== undefined) {
      const originalCategories = originalBook.categories.map((cat) =>
        cat.toString()
      );
      const newCategories = categories;

      // Remove from categories that are no longer associated
      const categoriesToRemove = originalCategories.filter(
        (cat) => !newCategories.includes(cat)
      );
      if (categoriesToRemove.length > 0) {
        await Category.updateMany(
          { _id: { $in: categoriesToRemove } },
          { $pull: { books: bookId } }
        );
      }

      // Add to new categories
      const categoriesToAdd = newCategories.filter(
        (cat) => !originalCategories.includes(cat)
      );
      if (categoriesToAdd.length > 0) {
        await Category.updateMany(
          { _id: { $in: categoriesToAdd } },
          { $push: { books: bookId } }
        );
      }
    }

    // Return populated book
    const populatedBook = await Book.findById(updatedBook._id)
      .populate("author", "name country")
      .populate("categories", "name");

    res.status(200).json({
      success: true,
      data: populatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// DELETE /books/:id - Delete book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Remove from author's books array
    await Author.findByIdAndUpdate(book.author, { $pull: { books: book._id } });

    // Remove from categories' books arrays
    if (book.categories.length > 0) {
      await Category.updateMany(
        { _id: { $in: book.categories } },
        { $pull: { books: book._id } }
      );
    }

    // Delete the book
    await Book.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
