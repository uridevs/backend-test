import dotenv from "dotenv";

dotenv.config();

// to avoid it to be modified
export const config = Object.freeze({
  port: process.env.PORT || 5000,
  mockApiUrl: process.env.MOCK_API_URL || "http://localhost:3001",
});
