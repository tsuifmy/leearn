import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contentRef: { type: Schema.Types.ObjectId, ref: 'Content', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('Comment', CommentSchema);
