
import User from '../../../user/entity/User'
import Record from '../../entity/Record'
import RecordRepository from '../RecordRepository'

const mockRecordModel: any = {
  destroy: jest.fn(),
  build: jest.fn(),
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn()
}
const mockUserModel: any = {
  destroy: jest.fn(),
  build: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn()
}

const mockRecordRepository = new RecordRepository(mockRecordModel, mockUserModel)

describe('testing all methods in AuthRepository', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Adding record to user', async () => {
    const user = new User(1, 'leandro', 'record@email.com', 'encriptedpass')
    const record: any = new Record(1, 'Job', 2000, 'income', 'Salary', new Date())
    record.setUser = jest.fn()
    mockRecordModel.create.mockReturnValue(record)
    await mockRecordRepository.addRecord(record, user)
    expect(mockRecordModel.create).toBeCalledTimes(1)
    expect(mockUserModel.findByPk).toBeCalledTimes(1)
  })

  test('Deleting record by id', async () => {
    const record = new Record(1, 'Job', 2000, 'income', 'Salary', new Date())
    await mockRecordRepository.deleteRecordById(record.id as number)
    expect(mockRecordModel.destroy).toBeCalledTimes(1)
  })

  test('Getting all user records', async () => {
    const user = new User(1, 'leandro', 'record@email.com', 'encriptedpass')

    const record1 = new Record(1, 'Job', 2000, 'income', 'Salary', new Date())
    const record2 = new Record(2, 'Food', 2000, 'outgo', 'Food', new Date())

    mockRecordModel.findAll.mockReturnValue([record1, record2])

    const allRecords = await mockRecordRepository.getAll(user)

    expect(mockRecordModel.findAll).toBeCalledTimes(1)
    expect(allRecords).toEqual([record1, record2])
  })

  test('Getting record by Id', async () => {
    const record1 = new Record(1, 'Job', 2000, 'income', 'Salary', new Date())

    mockRecordModel.findByPk.mockReturnValue(record1)

    const record = await mockRecordRepository.getRecordById(record1.id as number)

    expect(mockRecordModel.findByPk).toBeCalledTimes(1)
    expect(record).toEqual(record1)
  })

  test('Getting record by query', async () => {
    const record1 = new Record(1, 'Job', 2000, 'income', 'Salary', new Date(), 5)

    mockRecordModel.findAll.mockReturnValue(record1)

    const query: any = { where: { user_id: 5 } }

    const record = await mockRecordRepository.getRecords(query)

    expect(mockRecordModel.findAll).toBeCalledTimes(1)
    expect(record).toEqual(record1)
  })

  test('Getting record by query', async () => {
    const record1 = new Record(1, 'Job', 2000, 'income', 'Salary', new Date())

    mockRecordModel.update.mockReturnValue(record1)

    await mockRecordRepository.updateRecord(record1)

    expect(mockRecordModel.update).toBeCalledTimes(1)
  })
})
