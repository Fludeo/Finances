
import { initAuthModule } from '../module'

const app: any = jest.fn()

const controller = {
  configureRoutes: jest.fn()
}

const container = {
  get: jest.fn(() => controller)
}

test('Auth module gets initialized correctly', () => {
  initAuthModule(container, app)

  expect(container.get).toHaveBeenCalledTimes(1)

  expect(container.get).toHaveBeenCalledWith('AuthController')

  expect(controller.configureRoutes).toHaveBeenCalledTimes(1)

  expect(controller.configureRoutes).toHaveBeenCalledWith(app)
})
