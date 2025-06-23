import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  books: Types.ObjectId[];
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

export default mongoose.model<ICategory>("Category", CategorySchema);
