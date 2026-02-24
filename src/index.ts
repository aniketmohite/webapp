import express from 'express';
import { healthRouter } from './routes/health';
import { infoRouter } from './routes/info';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/health', healthRouter);
app.use('/api/info', infoRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
