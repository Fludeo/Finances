
import { Express } from 'express'
import { IDIContainer } from 'rsdi'
import AuthController from './controller/AuthController'
import AuthService from './service/AuthService'
import AuthRepository from './repository/AuthRepository'
import AuthModel from './model/AuthModel'

const initAuthModule = (container: IDIContainer, app: Express): void => {
  const controller: AuthController = container.get('AuthController')
  controller.configureRoutes(app)
}

export {
  initAuthModule,
  AuthController,
  AuthService,
  AuthRepository,
  AuthModel
}
