/* eslint-disable @typescript-eslint/naming-convention */
import Record from '../entity/Record'

export default function fromRecordModelToEntity ({ id, concept, date, amount, type, category, user_id, createdAt, updatedAt, deletedAt }:
{ id: number
  concept: string
  amount: number
  type: string
  category: string
  date: Date
  user_id: number
  createdAt: string
  updatedAt: string
  deletedAt: string }): Record {
  const record = new Record(id, concept, amount, type, category, date, user_id, createdAt, updatedAt, deletedAt)
  return record
}
