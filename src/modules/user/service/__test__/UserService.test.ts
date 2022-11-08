import UserService from '../UserService'
import Record from '../../../record/entity/Record'
import User from '../../entity/User'
import UserNotFound from '../../errors/UserNotFound'
import UserNotDefined from '../../errors/UserNotDefined'
import CredentialsTaken from '../../errors/CredentialsTaken'

const mockUserRepository: any = {

  userModel: jest.fn(),
  addUser: jest.fn(),
  getByEmail: jest.fn(),
  getById: jest.fn(),
  addRefreshToken: jest.fn(),
  addRecord: jest.fn(),
  getRecords: jest.fn()
}

const mockService = new UserService(mockUserRepository)

describe('Testing all methods in UserService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Get user by email', async () => {
    const mockUser = new User(1, 'leandro', 'getuser@email.com', 'encriptedpass')

    mockUserRepository.getByEmail.mockReturnValue(mockUser)
    const user = await mockService.getUserByEmail(mockUser.email)

    expect(mockUserRepository.getByEmail).toBeCalledTimes(1)
    expect(mockUserRepository.getByEmail).toBeCalledWith(mockUser.email)
    expect(user).toEqual(mockUser)
  })

  test('Get not existing user by email', async () => {
    const mockUser = new User(1, 'leandro', 'getuser@email.com', 'encriptedpass')

    mockUserRepository.getByEmail.mockReturnValue(null)

    await expect(mockService.getUserByEmail(mockUser.email)).rejects.toThrowError(UserNotFound)
    expect(mockUserRepository.getByEmail).toBeCalledTimes(1)
    expect(mockUserRepository.getByEmail).toBeCalledWith(mockUser.email)
  })

  test('Get user by id', async () => {
    const mockUser = new User(1, 'leandro', 'getuser@email.com', 'encriptedpass')

    mockUserRepository.getById.mockReturnValue(mockUser)
    const user = await mockService.getUserById(mockUser.id as number)

    expect(mockUserRepository.getById).toBeCalledTimes(1)
    expect(mockUserRepository.getById).toBeCalledWith(mockUser.id)
    expect(user).toEqual(mockUser)
  })

  test('Get not existing user by id', async () => {
    const mockUser = new User(1, 'leandro', 'getuser@email.com', 'encriptedpass')

    mockUserRepository.getById.mockReturnValue(null)

    await expect(mockService.getUserById(mockUser.id as number)).rejects.toThrowError(UserNotFound)

    expect(mockUserRepository.getById).toBeCalledTimes(1)
    expect(mockUserRepository.getById).toBeCalledWith(mockUser.id)
  })

  test('Adding new user', async () => {
    const mockNewUser = new User(undefined, 'leandro', 'getuser@email.com', 'encriptedpass')

    const mockReturnedUser = new User(1, 'leandro', 'getuser@email.com', 'encriptedpass')

    mockUserRepository.addUser.mockReturnValue(mockReturnedUser)

    expect(await mockService.newUser(mockNewUser)).toEqual(mockReturnedUser)

    expect(mockUserRepository.addUser).toBeCalledTimes(1)
    expect(mockUserRepository.addUser).toBeCalledWith(mockNewUser)
    expect(mockUserRepository.getByEmail).toBeCalledTimes(1)
    expect(mockUserRepository.getByEmail).toBeCalledWith(mockNewUser.email)
  })

  test('User entity not defined', async () => {
    const mockNewUser = {
      id: undefined,
      name: 'leandro',
      email: 'user@email.com',
      hash: 'passsword',
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
      records: undefined
    }

    await expect(mockService.newUser(mockNewUser)).rejects.toThrowError(UserNotDefined)
  })

  test('User already exist', async () => {
    const mockNewUser = new User(undefined, 'leandro', 'getuser@email.com', 'encriptedpass')

    mockUserRepository.getByEmail.mockReturnValue(mockNewUser)
    await expect(mockService.newUser(mockNewUser)).rejects.toThrowError(CredentialsTaken)

    expect(mockUserRepository.getByEmail).toBeCalledTimes(1)
    expect(mockUserRepository.getByEmail).toBeCalledWith(mockNewUser.email)
  })

  test('Adds refresh token to user', async () => {
    const user = new User(1, 'leandro', 'getuser@email.com', 'encriptedpass')
    const token = 'refreshtoken'
    await mockService.saveRefreshToken(user, token)

    expect(mockUserRepository.addRefreshToken).toBeCalledTimes(1)
    expect(mockUserRepository.addRefreshToken).toBeCalledWith(user, token)
  })

  test('Adds record to user', async () => {
    const user = new User(2, 'leandro', 'addrecord@email.com', 'password')

    const record = new Record(undefined, 'job', 2000, 'income', 'Salary', new Date())

    await mockService.addRecord(record, user)

    expect(mockUserRepository.addRecord).toBeCalledTimes(1)
    expect(mockUserRepository.addRecord).toBeCalledWith(record, user)
  })
})
