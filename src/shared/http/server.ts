import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';

/** express intance */
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

/** start on server */
const port = process.env.PORT || 5005;
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
