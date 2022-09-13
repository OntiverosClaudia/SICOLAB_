import express from 'express';
import cors from 'cors';

import { database } from './database/index.js';
import { router } from './routes/router.js';
import { Console } from './utils/index.js';

database.connect();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  Console.log(`servidor en ${PORT} iniciado`);
});
