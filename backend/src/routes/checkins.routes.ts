import { Router, Request, Response } from 'express';
import { createCheckin, getAllCheckins } from '../services/checkins.service';

const router = Router();

/**
 * @openapi
 * /api/checkins:
 *   post:
 *     summary: Create a guest check-in
 *     description: Validates and records a guest check-in against an existing experience. Persisted in-memory for the session lifetime.
 *     tags: [Check-ins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckInRequest'
 *     responses:
 *       201:
 *         description: Check-in confirmed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CheckIn'
 *       400:
 *         description: Missing required field
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missingGuestName:
 *                 value: { "error": "Guest name is required" }
 *               missingExperienceId:
 *                 value: { "error": "Experience id is required" }
 *               missingReservationCode:
 *                 value: { "error": "Reservation code is required" }
 *       404:
 *         description: Experience not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               value: { "error": "Experience not found" }
 *   get:
 *     summary: List all check-ins
 *     description: Returns every check-in recorded during the current server session.
 *     tags: [Check-ins]
 *     responses:
 *       200:
 *         description: List of check-ins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CheckIn'
 */

router.post('/checkins', (req: Request, res: Response) => {
  const { guestName, experienceId, reservationCode } = req.body;

  if (!guestName) {
    res.status(400).json({ error: 'Guest name is required' });
    return;
  }
  if (!experienceId) {
    res.status(400).json({ error: 'Experience id is required' });
    return;
  }
  if (!reservationCode) {
    res.status(400).json({ error: 'Reservation code is required' });
    return;
  }

  try {
    const checkin = createCheckin(guestName, experienceId, reservationCode);
    res.status(201).json(checkin);
  } catch (err) {
    if (err instanceof Error && err.message === 'Experience not found') {
      res.status(404).json({ error: 'Experience not found' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

router.get('/checkins', (_req: Request, res: Response) => {
  res.json(getAllCheckins());
});

export default router;
