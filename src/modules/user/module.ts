
import { Express } from 'express'
import { IDIContainer } from 'rsdi'
import UserController from './controller/UserController'
import UserService from './service/UserService'
import UserRepository from './repository/UserRepository'
import UserModel from './model/UserModel'

const initUserModule = (container: IDIContainer, app: Express): void => {
  const controller: UserController = container.get('UserController')
  controller.configureRoutes(app)
}

export {
  initUserModule,
  UserController,
  UserService,
  UserRepository,
  UserModel
}
