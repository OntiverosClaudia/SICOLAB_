import { config } from 'dotenv';

config();

const dbConfig = () => {
  const env = process.env.NODE_ENV;

  return {
    username: process.env[`DB_${env}_USER`],
    password: process.env[`DB_${env}_PASSWORD`],
    database: process.env[`DB_${env}_DATABASE`],
    host: process.env[`DB_${env}_HOST`],
    dialect: 'mysql',
  };
};

export { dbConfig };
