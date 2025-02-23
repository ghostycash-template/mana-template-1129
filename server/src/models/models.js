import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
  img: { type: String, required: [true, "Please Enter blog img"] },
  title: { type: String, required: [true, "Please enter blog Title"], },
  heading: { type: String, required: [true, "Please enter blog heading"], },
  createdAt: { type: Date, default: Date.now, },
  content: { type: String, required: [true, "Please enter blog content"] },
  updatedAt: { type: Date, default: Date.now, },
});

export const Blog = model('Blog', blogSchema);
