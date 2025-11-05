import express, { Application, Request, Response } from 'express';

const app: Application = express();

// Middlewares
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP' });
});

export default app;