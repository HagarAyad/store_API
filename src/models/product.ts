import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
};

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products ;`;
      const result = await conn.query(sql);
      const products = result.rows;
      conn.release();
      return products;
    } catch (error) {
      throw new Error(`Failed to get data of products`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products WHERE id = $1;`;
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      return product;
    } catch (error) {
      throw new Error(`Failed to get data of : product_id ( ${id} )`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const { name, price } = product;
      const conn = await client.connect();
      const sql = `INSERT INTO products(
          name, price)
          VALUES ($1, $2);`;
      await conn.query(sql, [name, price]);
      conn.release();
      return product;
    } catch (error) {
      throw new Error('Failed to create product');
    }
  }
}
