import { Router, Request, Response } from 'express';
import { getDashboardMetrics } from '../services/dashboard.service';

const router = Router();

/**
 * @openapi
 * /api/dashboard:
 *   get:
 *     summary: Dashboard KPI metrics
 *     description: Returns real-time guest experience health indicators, release confidence and DevOps maturity metrics.
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard metrics
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DashboardMetrics'
 */
router.get('/dashboard', (_req: Request, res: Response) => {
  res.json(getDashboardMetrics());
});

export default router;
