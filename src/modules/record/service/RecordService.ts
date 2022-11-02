
import User from "../../user/entity/User";
import Record from "../entity/Record";
import { RecordDoesNotExist, RecordNotDefined } from "../errors/__index";
import RecordRepository from "../repository/RecordRepository";


export default class RecordService{

    private recordRepository;

    constructor(recordRepository:  RecordRepository ){
        this.recordRepository = recordRepository
    }

    async  addRecord(record:Record, user:User){

        if(!(record instanceof Record)){
            throw new RecordNotDefined()
        }
        
         await this.recordRepository.addRecord(record,user)
        
      }
      async deleteRecord(recordId :number){
        return await this.recordRepository.deleteRecord(recordId)
      }
    
    
      async updateRecord(record :Record){
        if(!(record instanceof Record)){
          throw new RecordNotDefined()
      }
        return await this.recordRepository.updateRecord(record)
      }
    
    
      async  getRecords(query : any){
      
       return await this.recordRepository.getRecords(query)
        
      }
    
      async getRecordById (recordId :number) {
       return await  this.recordRepository.getRecordById(recordId)
      }
    
    
      async deleteRecordById (recordId :number, user :User) {
        const recordToDelete = await this.recordRepository.getRecordById(recordId)
        if (await recordToDelete.userId !== user.id){
          throw new RecordDoesNotExist()
      
        }
        await  this.recordRepository.deleteRecordById(recordId)
      }
    
      async getBalance(user:User){
    
        const allRecords = await this.recordRepository.getAll(user)
    
        const balance = allRecords.reduce(balanceReducer,{amount:0})
    
    
        return await balance.amount
      }
    


    
}


const balanceReducer =( prev:any , current:any )=>{

    let result=prev.amount;
  
    current.type=="income"? result+=current.amount : result-=current.amount
  
    return {amount:result}
  
  }