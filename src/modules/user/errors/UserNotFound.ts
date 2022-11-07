
export default class UserNotFound extends Error {
  code: number
  constructor () {
    super()
    this.name = this.constructor.name
    this.message = 'User not found'
    this.code = 400
  }
}
