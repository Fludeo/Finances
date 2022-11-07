
import AuthModel from '../../auth/model/AuthModel'
import Record from '../../record/entity/Record'
import RecordModel from '../../record/model/RecordModel'
import User from '../entity/User'
import fromUserModelToEntity from '../mapper/fromUserModelToEntity'
import UserModel from '../model/UserModel'

export default class UserRepository {
  private readonly userModel
  private readonly recordModel
  private readonly authModel
  constructor (userModel: UserModel, recordModel: RecordModel, authModel: AuthModel) {
    this.authModel = authModel as any
    this.userModel = userModel as any
    this.recordModel = recordModel as any
  }

  async addUser (newUser: User): Promise<User> {
    const user = this.userModel.build({
      name: newUser.name,
      email: newUser.email,
      hash: newUser.hash

    })
    await user.save()

    return fromUserModelToEntity(user)
  }

  async getByEmail (email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email } })
    if (user === null) return null
    return fromUserModelToEntity(user)
  }

  async getById (id: number): Promise<User | null> {
    const user = await this.userModel.findByPk(id)
    if (user === null) return null
    return fromUserModelToEntity(user)
  }

  async addRefreshToken (user: User, token: string): Promise<void> {
    const refreshUser = await this.userModel.findByPk(user.id)
    const refreshToken = await this.authModel.create({ refreshToken: token }, { isNewRecord: true })
    await refreshUser?.addAuth(refreshToken)
  }

  async addRecord (newRecord: Record, user: User): Promise<void> {
    const userToAddRecord = await this.userModel.findByPk(user.id)
    const recordToAdd = await this.recordModel.create(newRecord as any, { isNewRecord: true })
    await userToAddRecord?.addRecord(recordToAdd)
  }

  async getRecords (user: User): Promise<User> {
    const userWithRecords = await this.userModel.findByPk(user.id, { include: 'records', order: [['records', 'createdAt', 'DESC']] })
    return fromUserModelToEntity(userWithRecords)
  }
}
