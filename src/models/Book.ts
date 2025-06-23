import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: Types.ObjectId;
  categories: Types.ObjectId[];
  coverImage?: string;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  coverImage: { type: String },
});

export default mongoose.model<IBook>("Book", BookSchema);
