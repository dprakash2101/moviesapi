import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  title: string;
  releaseYear: number;
  releaseDate: Date;
  genre: string[];
  writers: string[];
  actors: string[];
  directors: string[];
  sequel: number;
  rating: number;
}

const MovieSchema: Schema = new Schema({
  title: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: [String], required: true },
  writers: { type: [String], required: true },
  actors: { type: [String], required: true },
  directors: { type: [String], required: true },
  sequel: { type: Number, default: 0 },
  rating: { type: Number, required: true }
});

export default mongoose.model<IMovie>('Movie', MovieSchema);
