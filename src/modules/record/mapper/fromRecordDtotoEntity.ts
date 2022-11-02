import RecordDto from "../dto/RecordDto"
import Record from '../entity/Record'


export default function FromRecordDtoToEntity({id,concept,date,amount,type,category}:RecordDto){

    const record = new Record(id,concept,amount,type,category,date,undefined,undefined,undefined,undefined)
    return record
}