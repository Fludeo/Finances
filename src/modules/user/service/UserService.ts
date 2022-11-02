
import UserRepository from "../repository/UserRepository";

import User from '../entity/User';
import {CredentialsTaken, UserNotDefined, UserNotFound} from "../errors/_index";
import Record from "../../record/entity/Record";


export default class UserService{

    private userRepository;

    constructor(userRepository: UserRepository ){
        this.userRepository = userRepository
    }

    async newUser(newUser : User) {

        if(!(newUser instanceof User)){
            throw new UserNotDefined()
        }    
        if(await this.userRepository.getByEmail(newUser.email))
        {
            throw new CredentialsTaken()
        }
        return this.userRepository.addUser(newUser)
    
       }
       
    
       async getUserByEmail(email:string){
        
        const user = await this.userRepository.getByEmail(email)
        
        if(user===null){
            throw new UserNotFound()
        }
        return user
       }
    
    
      
        async getUserById(id:number){
            const user = await this.userRepository.getById(id)
            if(user===null){
                throw new UserNotFound()
            }
        
            return user
        
    
        }
    
        async saveRefreshToken(user :User,token :string){
    
            await this.userRepository.addRefreshToken(user,token)
        }
    
        async addRecord(record :Record,user:User){
            
            return await this.userRepository.addRecord(record,user)
        }
    
        async getRecords(user : User){
            const userWithRecords = await this.userRepository.getRecords(user)
           
            return  userWithRecords.records
    
        }


    
}
