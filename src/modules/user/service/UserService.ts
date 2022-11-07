
import UserRepository from '../repository/UserRepository'

import User from '../entity/User'
import { CredentialsTaken, UserNotDefined, UserNotFound } from '../errors/_index'
import Record from '../../record/entity/Record'

export default class UserService {
  private readonly userRepository

  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async newUser (newUser: User): Promise<User> {
    if (!(newUser instanceof User)) {
      throw new UserNotDefined()
    }
    if ((await this.userRepository.getByEmail(newUser.email)) != null) {
      throw new CredentialsTaken()
    }
    return await this.userRepository.addUser(newUser)
  }

  async getUserByEmail (email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email)

    if (user === null) {
      throw new UserNotFound()
    }
    return user
  }

  async getUserById (id: number): Promise<User> {
    const user = await this.userRepository.getById(id)
    if (user === null) {
      throw new UserNotFound()
    }

    return user
  }

  async saveRefreshToken (user: User, token: string): Promise<void> {
    await this.userRepository.addRefreshToken(user, token)
  }

  async addRecord (record: Record, user: User): Promise<void> {
    return await this.userRepository.addRecord(record, user)
  }

  async getRecords (user: User): Promise<Record[] | undefined> {
    const userWithRecords = await this.userRepository.getRecords(user)

    return userWithRecords.records
  }
}
