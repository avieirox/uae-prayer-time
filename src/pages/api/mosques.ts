import { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { city } = req.query;

  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    const [rows] = await connection.execute(
      'SELECT * FROM Mosque WHERE city = ? ORDER BY title',
      [city]
    );

    await connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching mosques:', error);
    res.status(500).json({ message: 'Error fetching mosques' });
  }
}
