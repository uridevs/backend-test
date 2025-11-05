import app from './app';
import { config } from './config'; 

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`[Server]: Aplicación 'yourApp' escuchando en http://localhost:${PORT}`);
  console.log(`[Server]: Conectando a Mocks en ${config.mockApiUrl}`);
});