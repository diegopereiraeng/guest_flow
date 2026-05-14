import { Router, Request, Response } from 'express';
import { getAllReservations } from '../services/reservations.service';

const router = Router();

/**
 * @openapi
 * /api/reservations:
 *   get:
 *     summary: List all reservations
 *     description: Returns the list of guest reservations with their status and scheduled times.
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: List of reservations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 */
router.get('/reservations', (_req: Request, res: Response) => {
  res.json(getAllReservations());
});

export default router;
