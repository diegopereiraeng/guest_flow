import { Router, Request, Response } from 'express';
import { getAllExperiences } from '../services/experiences.service';

const router = Router();

/**
 * @openapi
 * /api/experiences:
 *   get:
 *     summary: List all guest experiences
 *     description: Returns the full list of available guest-facing experiences with real-time status, wait time and satisfaction data.
 *     tags: [Experiences]
 *     responses:
 *       200:
 *         description: List of experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Experience'
 */
router.get('/experiences', (_req: Request, res: Response) => {
  res.json(getAllExperiences());
});

export default router;
