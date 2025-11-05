import dotenv from 'dotenv';

// Carga las variables de entorno desde .env al inicio
dotenv.config();

// Exportamos un objeto 'config' congelado para evitar modificaciones
export const config = Object.freeze({
  port: process.env.PORT || 5000,
  mockApiUrl: process.env.MOCK_API_URL || 'http://localhost:3001',
});