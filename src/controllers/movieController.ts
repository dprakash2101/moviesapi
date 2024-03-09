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
    
    // Check for duplicate movies based on title and release year
    const existingMovie: IMovie | null = await Movie.findOne({ title, releaseYear });
    if (existingMovie) {
      res.status(400).json({ error: 'A movie with the same title and release year already exists' });
      return;
    }
    
    // If the movie doesn't exist, create a new one and save it
    const newMovie: IMovie = new Movie({ title, releaseYear, releaseDate, genre, writers, actors, directors, sequel, rating });
    const savedMovie: IMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      res.status(400).json({ error: 'A movie with the same title and release year already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const searchByTitle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title } = req.query;
    if (!title) {
      res.status(400).json({ error: 'Query parameter "title" is required' });
      return;
    }
    const movies: IMovie[] = await Movie.find({
      title: { $regex: title.toString(), $options: 'i' } 
    });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const searchByGenre = async (req: Request, res: Response): Promise<void> => {
  try {
    const { genre } = req.query;
    if (!genre) {
      res.status(400).json({ error: 'Query parameter "genre" is required' });
      return;
    }

    const movies: IMovie[] = await Movie.find({
      genre: { $regex: genre.toString(), $options: 'i' } 
    });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Helper function to normalize the title
const normalizeTitle = (title: string): string => {
  return title.toLowerCase().trim().replace(/\s+/g, ' ');
};
export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.params;
  const { releaseYear, releaseDate, genre, writers, actors, directors, sequel, rating } = req.body;

  try {
    // Normalize the title (convert to lowercase and remove extra spaces)
    const normalizedTitle: string = title.toLowerCase().replace(/\s+/g, ' ').trim();

    // Find the movie by normalized title (case-insensitive and space-tolerant)
    const movieToUpdate: IMovie | null = await Movie.findOne({ title: { $regex: new RegExp(`^${normalizedTitle}$`, 'i') } });

    // If movie not found, return error
    if (!movieToUpdate) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    // Update the movie properties
    movieToUpdate.releaseYear = releaseYear;
    movieToUpdate.releaseDate = releaseDate;
    movieToUpdate.genre = genre;
    movieToUpdate.writers = writers;
    movieToUpdate.actors = actors;
    movieToUpdate.directors = directors;
    movieToUpdate.sequel = sequel;
    movieToUpdate.rating = rating;

    // Save the updated movie
    const updatedMovie: IMovie = await movieToUpdate.save();

    // Return the updated movie
    res.json(updatedMovie);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.params;

  try {
    const normalizedTitle = normalizeTitle(title);

    // Find and delete the movie by normalized title
    await Movie.findOneAndDelete({ title: normalizedTitle });
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
