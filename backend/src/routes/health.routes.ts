import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns the live status of the GuestFlow API service.
 *     tags: [Observability]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: UP
 *                 service:
 *                   type: string
 *                   example: guestflow-api
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'UP',
    service: 'guestflow-api',
    version: process.env.APP_VERSION ?? '1.0.0',
  });
});

/**
 * @openapi
 * /ready:
 *   get:
 *     summary: Readiness check
 *     description: Returns the readiness state of all internal dependencies.
 *     tags: [Observability]
 *     responses:
 *       200:
 *         description: Service is ready to receive traffic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: READY
 *                 dependencies:
 *                   type: object
 *                   properties:
 *                     inMemoryStore:
 *                       type: string
 *                       example: UP
 *                     recommendationEngine:
 *                       type: string
 *                       example: MOCKED
 */
router.get('/ready', (_req: Request, res: Response) => {
  res.json({
    status: 'READY',
    dependencies: {
      inMemoryStore: 'UP',
      recommendationEngine: 'MOCKED',
    },
  });
});

export default router;
