import express from 'express';
import mapRoutes from './routes';

const app = express();
const port = 1245;

app.use('/', mapRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;