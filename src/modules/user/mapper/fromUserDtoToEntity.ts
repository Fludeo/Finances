import UserDto from '../dto/UserDto'
import User from '../entity/User'

export default function FromUserDtoToEntity ({ id, name, email, password }: UserDto): User {
  const user = new User(id, name, email, password)

  return user
}
