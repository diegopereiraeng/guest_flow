import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @openapi
 * /api/version:
 *   get:
 *     summary: Application version info
 *     description: Returns the current build version, git commit SHA and environment.
 *     tags: [Observability]
 *     responses:
 *       200:
 *         description: Version information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 app:
 *                   type: string
 *                   example: guestflow-api
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 *                 commit:
 *                   type: string
 *                   example: a1b2c3d
 *                 environment:
 *                   type: string
 *                   example: production
 */
router.get('/version', (_req: Request, res: Response) => {
  res.json({
    app: 'guestflow-api',
    version: process.env.APP_VERSION ?? '1.0.0',
    commit: process.env.GIT_COMMIT ?? 'local-dev',
    environment: process.env.APP_ENV ?? 'local',
  });
});

export default router;
