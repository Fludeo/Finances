
import { initRecordModule } from '../module'

const app: any = jest.fn()

const controller = {
  configureRoutes: jest.fn()
}

const container = {
  get: jest.fn(() => controller)
}

test('Record module gets initialized correctly', () => {
  initRecordModule(container, app)

  expect(container.get).toHaveBeenCalledTimes(1)

  expect(container.get).toHaveBeenCalledWith('RecordController')

  expect(controller.configureRoutes).toHaveBeenCalledTimes(1)

  expect(controller.configureRoutes).toHaveBeenCalledWith(app)
})
