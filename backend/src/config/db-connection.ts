// import {Pool} from 'pg';

// const pool = new Pool({
//   // user: process.env.DB_USER,
//   // host: process.env.DB_HOST,
//   // database: process.env.DB_NAME,
//   // password: process.env.DB_PASSWORD,
//   // port: Number(process.env.DB_PORT) || 5432,
//   connectionString: process.env.DATABASE_URL,
// });

// export const testDbConnection = async (): Promise<void> => {
//   try {
//     await pool.query('SELECT 1');
//     console.log('Connexion à la base de données réussie');
//   } catch (error) {
//     console.error('Erreur de connexion à la base de données :', error);
//     process.exit(1);
//   }
// };

// export default pool;