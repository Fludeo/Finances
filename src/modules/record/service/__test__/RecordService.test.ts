import User from '../../../user/entity/User'
import Record from '../../entity/Record'
import RecordNotDefined from '../../errors/RecordNotDefined'
import RecordService from '../RecordService'

const mockRecordRepository: any = {
  recordModel: jest.fn(),
  getRecordById: jest.fn(),
  addRecord: jest.fn(),
  getRecords: jest.fn(),
  getAll: jest.fn(),
  deleteRecordById: jest.fn(),
  updateRecord: jest.fn()
}

const mockService = new RecordService(mockRecordRepository)

describe('Testing all methods in RecordService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('Add new record to user', async () => {
    const user = new User(1, 'leandro', 'record@email.com', 'encriptedpass')
    const record = new Record(undefined, 'Food', 500, 'outgo', 'Food', new Date())

    await mockService.addRecord(record, user)

    expect(mockRecordRepository.addRecord).toBeCalledTimes(1)
  })

  test('Add not defined record to user', async () => {
    const user = new User(1, 'leandro', 'record@email.com', 'encriptedpass')
    const record: any = { id: undefined, concept: 'Food', amount: 500, type: 'outgo', category: 'Food', date: new Date() }

    await expect(mockService.addRecord(record, user)).rejects.toThrowError(RecordNotDefined)
  })

  test('Deleting record by Id', async () => {
    const user = new User(1, 'leandro', 'record@email.com', 'encriptedpass')
    const record = new Record(1, 'Food', 500, 'outgo', 'Food', new Date(), 1)

    mockRecordRepository.getRecordById.mockReturnValue(record)
    await mockService.deleteRecordById(record.id as number, user)
    expect(mockRecordRepository.getRecordById).toBeCalledTimes(1)
    expect(mockRecordRepository.deleteRecordById).toBeCalledTimes(1)
  })

  test('Getting total balance', async () => {
    const user = new User(1, 'leandro', 'record@email.com', 'encriptedpass')
    const record1 = new Record(1, 'Job', 2000, 'income', 'Salary', new Date())
    const record2 = new Record(2, 'Food', 500, 'outgo', 'Food', new Date())
    const record3 = new Record(3, 'Freelance job', 2000, 'income', 'Freelance job', new Date())
    const record4 = new Record(4, 'Food', 500, 'outgo', 'Food', new Date())

    mockRecordRepository.getAll.mockReturnValue([record1, record2, record3, record4])

    const balance = await mockService.getBalance(user)

    expect(mockRecordRepository.getAll).toBeCalledTimes(1)
    expect(balance).toEqual(record1.amount + record3.amount - record2.amount - record4.amount)
  })

  test('Getting record by id', async () => {
    const record = new Record(1, 'Job', 2000, 'income', 'Salary', new Date())

    mockRecordRepository.getRecordById.mockReturnValue(record)

    const result = await mockService.getRecordById(record.id as number)

    expect(result).toEqual(record)
  })

  test('Get all records from user', async () => {
    await mockService.getRecords({ where: {} })

    expect(mockRecordRepository.getRecords).toBeCalledTimes(1)
  })
  test('Updating not defined record', async () => {
    const updatedRecord: any = { id: 1, cocept: 'Job', amount: 2000, type: 'income', category: 'Salary', date: new Date() }

    await expect(mockService.updateRecord(updatedRecord)).rejects.toThrowError(RecordNotDefined)
  })

  test('Updating record', async () => {
    const updatedRecord = new Record(1, 'Job', 2000, 'income', 'Salary', new Date())
    await mockService.updateRecord(updatedRecord)

    expect(mockRecordRepository.updateRecord).toBeCalledTimes(1)
  })
})
