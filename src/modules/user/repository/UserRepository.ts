
import AuthModel from "../../auth/model/AuthModel"
import Record from "../../record/entity/Record"
import RecordModel from "../../record/model/RecordModel"
import User from "../entity/User"
import fromUserModelToEntity from "../mapper/fromUserModelToEntity"
import UserModel from "../model/UserModel"

    export default class UserRepository{
        private userModel
        constructor(userModel :  UserModel){
            this.userModel = userModel as any
        }

  
        async addUser(newUser :User){
            
            const user =  UserModel.build({
                 name:newUser.name,
                 email:newUser.email,
                 hash:newUser.hash,  
                
            })
            await user.save()
         
            return user
           }
   
   
   
           async getByEmail( email: string){
               const user = await this.userModel.findOne({where:{email:email}})
               if(user===null) return null
               return  fromUserModelToEntity(user)
           }
   
   
           async getById(id :number ){
   
               const user = await this.userModel.findByPk(id)
               if(user===null) return null
               return fromUserModelToEntity(user)
           }
   
   
   
           async addRefreshToken(user :User, token :string){
   
               const refreshUser  = await this.userModel.findByPk(user.id)
               const refreshToken :AuthModel = await AuthModel.create({refreshToken:token},{isNewRecord:true})
               await refreshUser?.addAuth(refreshToken)
   
             
           }
           
           async addRecord(newRecord:Record,user:User){
               const  userToAddRecord = await this.userModel.findByPk(user.id)
              const recordToAdd  = await RecordModel.create({newRecord},{isNewRecord:true})
              await userToAddRecord?.addRecord(recordToAdd)
           }
   
           async getRecords(user:User){
             
               const userWithRecords = await this.userModel.findByPk(user.id,{include:'records',order:[['records','createdAt','DESC']]})
               return  fromUserModelToEntity(userWithRecords)
           }
       

    }
