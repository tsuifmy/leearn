import { Schema, model } from 'mongoose';

const ContentSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  ratings: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, score: Number }],
  createdAt: { type: Date, default: Date.now }
});

export default model('Content', ContentSchema);
