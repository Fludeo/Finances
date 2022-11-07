import RecordDto from '../dto/RecordDto'
import Record from '../entity/Record'

export default function FromRecordDtoToEntity ({ id, concept, date, amount, type, category }: RecordDto): Record {
  const record = new Record(id, concept, amount, type, category, date)
  return record
}
