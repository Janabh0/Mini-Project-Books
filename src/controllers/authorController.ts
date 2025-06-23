import { Request, Response } from "express";
import Author, { IAuthor } from "../models/Author";

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find().populate("books", "title");
    res.status(200).json({
      success: true,
      data: authors,
      count: authors.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching authors",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id).populate(
      "books",
      "title"
    );

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    res.status(200).json({
      success: true,
      data: author,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching author",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const { name, country } = req.body;

    if (!name || !country) {
      return res.status(400).json({
        success: false,
        message: "Name and country are required",
      });
    }

    const author = new Author({
      name,
      country,
      books: [],
    });

    const savedAuthor = await author.save();
    res.status(201).json({
      success: true,
      data: savedAuthor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating author",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const { name, country } = req.body;
    const updateData: Partial<IAuthor> = {};

    if (name) updateData.name = name;
    if (country) updateData.country = country;

    const author = await Author.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    res.status(200).json({
      success: true,
      data: author,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating author",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Author deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting author",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
