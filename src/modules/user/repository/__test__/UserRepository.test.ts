import Record from '../../../record/entity/Record'
import User from '../../entity/User'
import UserRepository from '../UserRepository'

const mockRecordModel: any = {

  build: jest.fn(),
  create: jest.fn()
}

const mockUserModel: any = {
  destroy: jest.fn(),
  build: jest.fn(),
  findOne: jest.fn(),
  findByPk: jest.fn()
}

const mockAuthModel: any = {
  create: jest.fn()
}

const mockUserRepository = new UserRepository(mockUserModel, mockRecordModel, mockAuthModel)

describe('testing all methods in AuthRepository', () => {
  test('Adding new user', async () => {
    const user: any = new User(1, 'leandro', 'newuser@email.com', 'encryptedpass')
    user as (User & { save: any })
    user.save = jest.fn()

    await mockUserModel.build.mockReturnValue(user)
    await mockUserRepository.addUser(user)

    expect(mockUserModel.build).toBeCalledWith({ name: user.name, email: user.email, hash: user.hash })
    expect(user.save).toBeCalledTimes(1)
  })

  test('Find user by email', async () => {
    const user: any = new User(2, 'leandro', 'findbyemail@email.com', 'encryptedpass')

    mockUserModel.findOne.mockReturnValue(user)

    const result = await mockUserRepository.getByEmail(user.email)

    expect(mockUserModel.findOne).toBeCalledWith({ where: { email: user.email } })

    expect((result as User).id).toEqual(user.id)
  })

  test('Find user by Id', async () => {
    const user: any = new User(2, 'leandro', 'findbyid@email.com', 'encryptedpass')

    mockUserModel.findByPk.mockReturnValue(user)

    const result = await mockUserRepository.getById(user.id)

    expect(mockUserModel.findByPk).toBeCalledWith(user.id)

    expect((result as User).id).toEqual(user.id)
  })

  test('Adds record to user', async () => {
    const user: any = new User(2, 'leandro', 'addrecord@email.com', 'encryptedpass')

    user.addRecord = jest.fn()

    const record = new Record(undefined, 'job', 2000, 'income', 'Salary', new Date())

    mockUserModel.findByPk.mockReturnValue(user)

    await mockUserRepository.addRecord(record, user)

    expect(mockUserModel.findByPk).toBeCalledWith(user.id)
    expect(user.addRecord).toBeCalledTimes(1)
    expect(mockRecordModel.create).toBeCalledTimes(1)
    expect(mockRecordModel.create).toBeCalledWith(record, { isNewRecord: true })
  })

  test('Adds session token to user', async () => {
    const user: any = new User(2, 'leandro', 'addrecord@email.com', 'encryptedpass')

    user.addAuth = jest.fn()

    const token: string = 'refreshtoken'

    mockUserModel.findByPk.mockReturnValue(user)

    await mockUserRepository.addRefreshToken(user, token)

    expect(mockUserModel.findByPk).toBeCalledWith(user.id)
    expect(user.addAuth).toBeCalledTimes(1)
    expect(mockRecordModel.create).toBeCalledTimes(1)
  })

  test('Adds session token to user', async () => {
    const user: any = new User(2, 'leandro', 'addrecord@email.com', 'encryptedpass')

    user.addAuth = jest.fn()

    const record1 = new Record(1, 'job', 2000, 'income', 'Salary', new Date())
    const record2 = new Record(2, 'Food', 500, 'outgo', 'Food', new Date())
    user.records = [record1, record2]

    mockUserModel.findByPk.mockReturnValue(user)

    const result = await mockUserRepository.getRecords(user)

    expect(mockUserModel.findByPk).toBeCalled()
    expect(result.records).toEqual(user.records)
  })
})
