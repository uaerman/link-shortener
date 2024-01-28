import express, {Request, Response} from 'express';
import client from './database/db';

client.connect();
const app = express();
const PORT = process.env.PORT;

app.get('/', async (req: Request, res: Response) => {
  try {
    const result = await client.query('SELECT * FROM visits');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({error: 'Internal server error'});
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
