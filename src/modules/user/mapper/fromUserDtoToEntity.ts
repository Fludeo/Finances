import UserDto from '../dto/UserDto'
import User from '../entity/User'


export default function FromUserDtoToEntity({name,email,password}:UserDto){

    const user = new User( undefined, name, email, password, undefined, undefined, undefined, undefined)
  
    return user
}