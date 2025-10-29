import cors from 'cors';

const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Your frontend URLs
  credentials: true,
};

export default cors(corsOptions);