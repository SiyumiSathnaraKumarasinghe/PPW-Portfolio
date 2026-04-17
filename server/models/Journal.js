import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  week: { type: Number, required: true },
  topic: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Journal', journalSchema);
