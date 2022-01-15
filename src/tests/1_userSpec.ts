import { request, loginUser } from './index';
import { User, UserModel } from '../models/user';

const userModel = new UserModel();

const newUser: User = {
  user_name: 'hagarAyad',
  first_name: 'hagar',
  last_name: 'ayad',
  password: '123456',
};

describe('User Model :', () => {
  beforeAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
  });

  it('it should create user', async () => {
    const createdUser = await userModel.create(newUser);
    expect(createdUser).toBeDefined();
  });

  it('it should login user', async () => {
    const { user_name = '', password = '' } = newUser;
    const userToken = await userModel.loginUser(user_name, password);
    expect(userToken).toMatch(
      /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/,
    );
  });

  it('it should get all users', async () => {
    const users = await userModel.index();
    expect(users.length).toEqual(1);
  });

  it('it should get user by (Id)', async () => {
    const user = await userModel.show(1);
    const { user_name, first_name, last_name } = user;
    expect(user).toBeDefined();
    expect(user_name).toEqual(newUser.user_name);
    expect(first_name).toEqual(newUser.first_name);
    expect(last_name).toEqual(newUser.last_name);
  });
});

// //--TESTING API-----

const testUser: User = {
  user_name: 'userTest',
  first_name: 'user',
  last_name: 'test',
  password: '123456',
};

describe('User API: create user', () => {
  beforeAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
  });

  it('it should create user', async () => {
    const response = await request.post('/user').send(testUser);
    expect(response.status).toBe(201);
  });

  it("it shouldn't create user : user_name required", async () => {
    const invalid_testUser = testUser;
    delete invalid_testUser.user_name;
    const response = await request.post('/user').send(invalid_testUser);
    expect(response.status).toBe(400);
    expect(response.text).toContain('user_name is required');
  });

  it("it shouldn't create user : first_name required", async () => {
    const invalid_testUser = testUser;
    delete invalid_testUser.first_name;
    const response = await request.post('/user').send(invalid_testUser);
    expect(response.status).toBe(400);
    expect(response.text).toContain('first_name is required');
  });

  it("it shouldn't create user : password required", async () => {
    const invalid_testUser = testUser;
    delete invalid_testUser.password;
    const response = await request.post('/user').send(invalid_testUser);
    expect(response.status).toBe(400);
    expect(response.text).toContain('password is required');
  });
});

//----TEST API : Login
describe('User API: login user', () => {
  beforeAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
  });

  it('it should Login user', async () => {
    const reqBody = {
      user_name: 'userTest',
      password: '123456',
    };
    const response = await request.post('/user/login').send(reqBody);
    expect(response.status).toBe(200);
    expect(response.text).toMatch(
      /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/,
    );
  });

  it("it shouldn't login user : user_name required", async () => {
    const reqBody = {
      password: '123456',
    };
    const response = await request.post('/user/login').send(reqBody);
    expect(response.status).toBe(400);
    expect(response.text).toContain('user_name is required');
  });

  it("it shouldn't login user : password required", async () => {
    const reqBody = {
      user_name: 'userTest',
    };
    const response = await request.post('/user/login').send(reqBody);
    expect(response.status).toBe(400);
    expect(response.text).toContain('password is required');
  });
});

//---TEST API : ------
describe('User API: get Users', () => {
  let authToken = '';
  beforeAll(async function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
    authToken = await loginUser();
  });

  it("it shouldn't get users:( require Auth) ", async () => {
    const response = await request.get('/user');
    expect(response.status).toBe(401);
  });

  it('it should get users', async () => {
    const response = await request
      .get('/user')
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it('it should get user by Id (1)', async () => {
    const userId = 1;
    const response = await request
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(200);
  });

  it("it shouldn't get user by Id (11)", async () => {
    const userId = 11;
    const response = await request
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(404);
  });

  it("it shouldn't get user by Id (abc)", async () => {
    const userId = 'abc';
    const response = await request
      .get(`/user/${userId}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(response.status).toBe(400);
    expect(response.text).toContain('user_id must be number');
  });

  it("it shouldn't get user by Id (require Auth)", async () => {
    const userId = 1;
    const response = await request.get(`/user/${userId}`);
    expect(response.status).toBe(401);
  });
});
