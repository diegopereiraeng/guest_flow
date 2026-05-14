import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes';
import versionRoutes from './routes/version.routes';
import dashboardRoutes from './routes/dashboard.routes';
import experiencesRoutes from './routes/experiences.routes';
import reservationsRoutes from './routes/reservations.routes';
import checkinsRoutes from './routes/checkins.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', healthRoutes);
app.use('/api', versionRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', experiencesRoutes);
app.use('/api', reservationsRoutes);
app.use('/api', checkinsRoutes);

app.use(errorHandler);

export default app;
