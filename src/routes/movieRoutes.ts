import { Router } from 'express';
import * as movieController from '../controllers/movieController';

const router = Router();

router.get('/movies', movieController.getAllMovies);
router.post('/movies', movieController.addMovie);
// Add routes for updating, deleting movies

export default router;
