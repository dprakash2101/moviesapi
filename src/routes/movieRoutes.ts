import { Router } from 'express';
import * as movieController from '../controllers/movieController';

const router = Router();

router.get('/movies', movieController.getAllMovies);
router.post('/movies', movieController.addMovie);
router.get('/search/title', movieController.searchByTitle); 
router.get('/search/genre', movieController.searchByGenre);
router.put('/movies/title/:title', movieController.updateMovie);
router.delete('/movies/title/:title', movieController.deleteMovie);
export default router;
