import { sql } from '../database/database.js';

const addUser = async (email, password) => {
  await sql`INSERT INTO admins
      (email, password)
        VALUES (${email}, ${password})`;
};

const findUserByEmail = async email => {
  const result = await sql`SELECT * FROM admins WHERE email = ${email};`;
  return result;
};

export { addUser, findUserByEmail };
