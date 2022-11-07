import ValidationError from '../errors/ValidationError'

export default class UserDto {
  id: number
  email: string
  name: string
  password: string

  constructor ({ id, email, name, password }: { id: number, email: string, name: string, password: string }) {
    this.id = id
    this.email = email
    this.name = name
    this.password = password
  }

  validate (): void {
    if (this.email === undefined || this.name === undefined || this.password === undefined) {
      throw new ValidationError('There is an empty field...')
    }
    if (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,4})+$/.test(this.email))) {
      throw new ValidationError('Invalid email!!!')
    }
    if (!(/^[a-zA-Z ]{2,30}$/.test(this.name))) {
      throw new ValidationError('Invalid Name: 2-30 characters excluding numbers and symbols')
    }
    if (!(/^[A-Za-z]\w{7,14}$/.test(this.password))) {
      throw new ValidationError('Invalid Password: 8-16 characters including numbers and starting with a letter')
    }
  }
}
