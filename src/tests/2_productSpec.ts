import { request, loginUser } from './index';
import { Product, ProductModel } from '../models/product';

const productModel = new ProductModel();

const products: Product[] = [
  {
    name: 'book',
    price: 100,
  },
  {
    name: 'pen',
    price: 90,
  },
];

describe('Product Model :', () => {
  beforeAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
  });

  it('it should create products', async () => {
    const product_1 = await productModel.create(products[0]);
    const product_2 = await productModel.create(products[1]);
    expect(product_1).toBeDefined();
    expect(product_2).toBeDefined();
  });

  it('it should get all Products', async () => {
    const all_products = await productModel.index();
    expect(all_products.length).toEqual(products.length);
  });

  it('it should get product by (Id)', async () => {
    const product = await productModel.show(1);
    const { name, price } = product;
    expect(product).toBeDefined();
    expect(name).toEqual(products[0]?.name);
    expect(price).toEqual(products[0]?.price);
  });
});

const testProduct = {
  name: 'pen',
  price: 9,
};

describe('Product API', () => {
  let token = '';
  beforeAll(async function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
    token = await loginUser();
  });
  it("it shouldn't add Product (require Auth)", async () => {
    const response = await request.post('/product').send(testProduct);
    expect(response.status).toBe(401);
  });

  it("it shouldn't add Product (name required)", async () => {
    const reqBody = {
      price: 80,
    };
    const response = await request
      .post('/product')
      .set('Authorization', `Bearer ${token}`)
      .send(reqBody);
    expect(response.status).toBe(400);
    expect(response.text).toContain('name is required');
  });

  it("it shouldn't add Product (price required)", async () => {
    const reqBody = {
      name: 'banana',
    };
    const response = await request
      .post('/product')
      .set('Authorization', `Bearer ${token}`)
      .send(reqBody);
    expect(response.status).toBe(400);
    expect(response.text).toContain('price is required');
  });

  it("it shouldn't add Product (name,price: required)", async () => {
    const reqBody = {};
    const response = await request
      .post('/product')
      .set('Authorization', `Bearer ${token}`)
      .send(reqBody);
    expect(response.status).toBe(400);
    expect(response.text).toContain('name is required');
    expect(response.text).toContain('price is required');
  });

  it('it should add products', async () => {
    const response = await request
      .post('/product')
      .set('Authorization', `Bearer ${token}`)
      .send(testProduct);
    expect(response.status).toBe(201);
  });

  it('it should get all Products', async () => {
    const response = await request.get('/product');
    expect(response.status).toBe(200);
  });

  it('it should get product by (Id):1', async () => {
    const productId = 1;
    const response = await request.get(`/product/${productId}`);
    expect(response.status).toBe(200);
  });

  it("it shouldn't get product by (Id):11", async () => {
    const productId = 11;
    const response = await request.get(`/product/${productId}`);
    expect(response.status).toBe(404);
  });

  it("it shouldn't get product by (Id):abc", async () => {
    const productId = 'abc';
    const response = await request.get(`/product/${productId}`);
    expect(response.status).toBe(400);
    expect(response.text).toContain('id must be number');
  });
});
