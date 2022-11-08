import DIContainer, { IDIContainer, object, use, factory } from 'rsdi'
import { Sequelize } from 'sequelize'
import { RecordController, RecordService, RecordRepository, RecordModel } from '../modules/record/module'
import { UserController, UserService, UserRepository, UserModel } from '../modules/user/module'
import { AuthController, AuthService, AuthRepository, AuthModel } from '../modules/auth/module'
import SetDataAssociations from './data_associations'

const dbConfig = (): Sequelize => {
  if (process.env.PROJECT_STATUS === 'development') {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './data/development_database.db'
    })
    return sequelize
  } else if (process.env.PROJECT_STATUS === 'test') {
    const sequelize = new Sequelize('sqlite::memory:')
    return sequelize
  } else if (process.env.PROJECT_STATUS === 'production') {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: './data/production_database.db'
    })
    return sequelize
  }
  throw Error('PROJECT_STATUS  env variable not found')
}

function configureAuthModel (container: IDIContainer): typeof AuthModel {
  return AuthModel.setup(container.get('sequelize'))
}

function configureRecordModel (container: IDIContainer): typeof RecordModel {
  return RecordModel.setup(container.get('sequelize'))
}

function configureUserModel (container: IDIContainer): typeof UserModel {
  return UserModel.setup(container.get('sequelize'))
}

function addCommonDefinitions (container: DIContainer): void {
  container.add({
    sequelize: factory(dbConfig)
  })
}

function addRecordDefinitions (container: DIContainer): void {
  container.add({
    RecordController: object(RecordController).construct(use(RecordService), use(AuthService)),
    RecordService: object(RecordService).construct(use(RecordRepository)),
    RecordRepository: object(RecordRepository).construct(use(RecordModel), use(UserModel)),
    RecordModel: factory(configureRecordModel)

  })
}

function addUserDefinitions (container: DIContainer): void {
  container.add({
    UserController: object(UserController).construct(use(UserService), use(AuthService)),
    UserService: object(UserService).construct(use(UserRepository)),
    UserRepository: object(UserRepository).construct(use(UserModel), use(RecordModel), use(AuthModel)),
    UserModel: factory(configureUserModel)

  })
}

function addAuthDefinitions (container: DIContainer): void {
  container.add({
    AuthController: object(AuthController).construct(use(AuthService)),
    AuthService: object(AuthService).construct(use(UserService), use(AuthRepository)),
    AuthRepository: object(AuthRepository).construct(use(AuthModel)),
    AuthModel: factory(configureAuthModel)

  })
}

export default function ConfigDIC (): DIContainer {
  const container = new DIContainer()

  addCommonDefinitions(container)
  addAuthDefinitions(container)
  addRecordDefinitions(container)
  addUserDefinitions(container);
  (container as IDIContainer).get('sequelize').sync()
  SetDataAssociations(container as IDIContainer)
  return container
};
