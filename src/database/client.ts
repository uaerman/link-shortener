import {Client} from 'pg';

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

async function connect() {
  try {
    await client.connect();
    console.log('Connected the database!');
  } catch (error) {
    console.error('Error while connecting database:', error);
  }
}
export {client, connect};
