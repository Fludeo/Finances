
export default class RecordDoesNotExist extends Error {
  code: number

  constructor () {
    super()
    this.name = this.constructor.name
    this.message = 'Record does not exist in this user'
    this.code = 400
  }
}
