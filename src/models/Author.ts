import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  country: string;
  books: Types.ObjectId[];
}

const AuthorSchema: Schema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

export default mongoose.model<IAuthor>("Author", AuthorSchema);
