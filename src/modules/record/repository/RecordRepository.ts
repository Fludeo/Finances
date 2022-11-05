
import { InstanceDestroyOptions} from "sequelize"
import User from "../../user/entity/User"
import { UserModel } from "../../user/module"
import Record from "../entity/Record"
import fromRecordModelToEntity from "../mapper/fromRecordModelToEntity"
import RecordModel  from "../model/RecordModel"

    export default class RecordRepository{
        private recordModel  
        constructor(recordModel: RecordModel){
            this.recordModel  = recordModel as any 
        }

    
     async addRecord (newRecord:Record, user:User){

        const record = await this.recordModel.create(newRecord,{isNewRecord:true})
          const userToAdd  = await UserModel.findByPk(user.id)
         
          await record.setUser(userToAdd)
 
      }
 
      async deleteRecord(recordId:number){
       await this.recordModel.destroy({where:{recordId}} as InstanceDestroyOptions)
      
     }
 
      async updateRecord(record :Record){
        await this.recordModel.update(record,{where:{id:record.id}})
     
     }
 
      async getRecords (query :any){
       query.order = [
         ['createdAt', 'DESC']
       ]
      
       const records = await this.recordModel.findAll(query)
     
       return records
 
 
     }
 
 
      async getRecordById (recordId:number){
 
       const record :any = await this.recordModel.findByPk(recordId)
       return fromRecordModelToEntity(record)
     
 
     }
     async deleteRecordById (recordId : number){
 
       return await this.recordModel.destroy({where:{id:recordId}} as InstanceDestroyOptions)
    
     }
 
     async getAll(user:User){
       const records = await this.recordModel.findAll({where:{user_id:user.id}})
       return records.map((record:any)=>fromRecordModelToEntity(record))
     }
     
     }

    
