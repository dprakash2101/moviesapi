import { Request, Response } from 'express';
import Movie, { IMovie } from '../models/Movie';

export const getAllMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies: IMovie[] = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, releaseYear, releaseDate, genre, writers, actors, directors, sequel, rating } = req.body;
    const newMovie: IMovie = new Movie({ title, releaseYear, releaseDate, genre, writers, actors, directors, sequel, rating });
    const savedMovie: IMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add other controller methods for updating, deleting movies
