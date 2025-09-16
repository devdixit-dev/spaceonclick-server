import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import connectDatabase from './config/db.config.js';

const app = express();
const port = process.env.PORT || 4040;

connectDatabase();

app.use(express.json());
app.use(cors());

app.get('/', (_, response) => {
  response.end('Home route working');
});

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port} 🚀`);
});