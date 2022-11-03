import { IDIContainer } from 'rsdi';
import  { initUserModule } from '../module';

const app :any = jest.fn();

const controller = {
  configureRoutes: jest.fn(),
};

const container = {
  get: jest.fn(() => controller),
} as IDIContainer;

test('User module gets initialized correctly', () => {

  initUserModule(container,app);

  expect(container.get).toHaveBeenCalledTimes(1);

  expect(container.get).toHaveBeenCalledWith('UserController');

  expect(controller.configureRoutes).toHaveBeenCalledTimes(1);

  expect(controller.configureRoutes).toHaveBeenCalledWith(app);
});