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
    const { user_name, password } = newUser;
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
