import express from 'express';
import bodyParser from 'body-parser';
import {connect} from './database/client';
import linkRoutes from './routes/linkRoutes';

connect();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());

app.use(linkRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
