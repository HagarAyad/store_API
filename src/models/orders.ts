import { UserModel } from './user';
import client from '../database';

export type Order = {
  order_id: number;
  status: string;
  user_id: number;
};

const userModel = new UserModel();

export class OrderModel {
  async createOrder(userId: number) {
    try {
      const user = await userModel.show(userId);
      if (user) {
        const conn = await client.connect();

        const sql = `INSERT INTO orders(
            status, user_id)
          VALUES ( $1, $2) RETURNING *;`;

        const result = await conn.query(sql, ['active', userId]);
        conn.release();
        return result.rows[0];
      }
    } catch (error) {
      throw new Error('failed to create order ');
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string,
  ): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO orders_products(
         quantity, order_id, product_id)
        VALUES ( $1, $2, $3) RETURNING *;`;

      const result = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error('failed to add product to order');
    }
  }

  async getUserOrders(userId: number) {
    try {
      const conn = await client.connect();
      const sql = `SELECT * from orders WHERE user_id = $1`;
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error('failed to get data');
    }
  }
}
