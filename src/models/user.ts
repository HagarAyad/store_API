import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import client from '../database';

export type User = {
  id?: number;
  user_name?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
};

const saltRounds = 10;

function getUserToken(userId: number) {
  const token = jwt.sign(
    {
      id: userId,
    },
    'secret',
    { expiresIn: '1h' },
  );
  return token;
}

export class UserModel {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT id,first_name,last_name,user_name FROM users ;`;
      const result = await conn.query(sql);
      const users = result.rows;
      conn.release();
      return users;
    } catch (error) {
      throw new Error(`Failed to get data of users`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `SELECT first_name,last_name,user_name FROM users WHERE id = $1;`;
      const result = await conn.query(sql, [id]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (error) {
      throw new Error(`Failed to get data of : user_id ( ${id} )`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const { first_name, last_name, user_name, password = '' } = user;
      const conn = await client.connect();
      const sql = `INSERT INTO users(
        user_name, first_name,last_name, password)
        VALUES ($1, $2, $3,$4);`;
      const password_hash = bcrypt.hashSync(password, saltRounds);
      await conn.query(sql, [user_name, first_name, last_name, password_hash]);
      conn.release();
      return user;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async loginUser(user_name: string, password: string): Promise<string> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM users WHERE user_name = $1;`;
      const result = await conn.query(sql, [user_name]);
      const user = result.rows[0];
      conn.release();
      if (user) {
        const { id, password: hashedPassword } = user;
        const isValidPassword = await bcrypt.compare(
          password,
          `${hashedPassword}`,
        );
        return isValidPassword ? getUserToken(id) : '';
      }
      return '';
    } catch (error) {
      throw new Error('failed to check valid user');
    }
  }
}
