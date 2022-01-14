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
