
import User from '../../user/entity/User'
import { UserModel } from '../../user/module'
import Record from '../entity/Record'
import fromRecordModelToEntity from '../mapper/fromRecordModelToEntity'
import RecordModel from '../model/RecordModel'

export default class RecordRepository {
  private readonly recordModel
  constructor (recordModel: RecordModel) {
    this.recordModel = recordModel as any
  }

  async addRecord (newRecord: Record, user: User): Promise<void> {
    const record = await this.recordModel.create(newRecord, { isNewRecord: true })
    const userToAdd = await UserModel.findByPk(user.id)

    await record.setUser(userToAdd)
  }

  async deleteRecord (recordId: number): Promise<void> {
    await this.recordModel.destroy({ where: { recordId } })
  }

  async updateRecord (record: Record): Promise<void> {
    await this.recordModel.update(record, { where: { id: record.id } })
  }

  async getRecords (query: any): Promise<Record[]> {
    query.order = [
      ['createdAt', 'DESC']
    ]

    const records = await this.recordModel.findAll(query)

    return records
  }

  async getRecordById (recordId: number): Promise<Record> {
    const record = await this.recordModel.findByPk(recordId)
    return fromRecordModelToEntity(record)
  }

  async deleteRecordById (recordId: number): Promise<void> {
    await this.recordModel.destroy({ where: { id: recordId } })
  }

  async getAll (user: User): Promise<Record[]> {
    const records = await this.recordModel.findAll({ where: { user_id: user.id } })
    return records.map((record: any) => fromRecordModelToEntity(record))
  }
}
