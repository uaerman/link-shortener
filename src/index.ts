import bodyParser from 'body-parser';
import linkRoutes from './routes/linkRoutes';
import {connect} from './database/client';
import express from 'express';

connect();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());

app.use(linkRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
