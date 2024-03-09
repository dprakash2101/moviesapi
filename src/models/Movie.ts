import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  releaseYear: number;
  releaseDate: string;
  genre: string;
  writers: string[];
  actors: string[];
  directors: string[];
  sequel: boolean;
  rating: number;
}

const MovieSchema: Schema = new Schema({
  title: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  releaseDate: { type: String, required: true },
  genre: { type: String, required: true },
  writers: { type: [String], required: true },
  actors: { type: [String], required: true },
  directors: { type: [String], required: true },
  sequel: { type: Boolean, required: true },
  rating: { type: Number, required: true }
});

// Ensure uniqueness of title and releaseYear
MovieSchema.index({ title: 1, releaseYear: 1 }, { unique: true });

export default mongoose.model<IMovie>('Movie', MovieSchema);
