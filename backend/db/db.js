import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const { Pool } = pkg;

const dbConfig = {
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
      require: true,
    },
  }

const pool = new Pool(dbConfig);

const connectToDatabase = async () => {
    try {
        await pool.connect();
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
    }
};

export {
    pool,
    connectToDatabase
};