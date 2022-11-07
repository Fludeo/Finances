export default class InvalidTokenError extends Error {
  code: number
  constructor () {
    super()
    this.name = this.constructor.name
    this.message = 'Invalid access token'
    this.code = 401
  }
}
