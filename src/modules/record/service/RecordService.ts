
import User from '../../user/entity/User'
import Record from '../entity/Record'
import { RecordDoesNotExist, RecordNotDefined } from '../errors/__index'
import RecordRepository from '../repository/RecordRepository'

export default class RecordService {
  private readonly recordRepository

  constructor (recordRepository: RecordRepository) {
    this.recordRepository = recordRepository
  }

  async addRecord (record: Record, user: User): Promise<void> {
    if (!(record instanceof Record)) {
      throw new RecordNotDefined()
    }

    await this.recordRepository.addRecord(record, user)
  }

  async deleteRecord (recordId: number): Promise<void> {
    return await this.recordRepository.deleteRecord(recordId)
  }

  async updateRecord (record: Record): Promise<void> {
    if (!(record instanceof Record)) {
      throw new RecordNotDefined()
    }
    return await this.recordRepository.updateRecord(record)
  }

  async getRecords (query: any): Promise<Record[]> {
    return await this.recordRepository.getRecords(query)
  }

  async getRecordById (recordId: number): Promise<Record> {
    return await this.recordRepository.getRecordById(recordId)
  }

  async deleteRecordById (recordId: number, user: User): Promise<void> {
    const recordToDelete = await this.recordRepository.getRecordById(recordId)
    if (recordToDelete.userId !== user.id) {
      throw new RecordDoesNotExist()
    }
    await this.recordRepository.deleteRecordById(recordId)
  }

  async getBalance (user: User): Promise<number> {
    const allRecords = await this.recordRepository.getAll(user)

    const balance = allRecords.reduce(balanceReducer, { amount: 0 })

    const result = balance.amount

    return result
  }
}

const balanceReducer = (prev: { amount: number }, current: { amount: number, type: string }): { amount: number } => {
  let result = prev.amount

  current.type === 'income' ? result += current.amount : result -= current.amount

  return { amount: result }
}
