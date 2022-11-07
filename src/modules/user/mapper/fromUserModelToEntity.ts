
import fromRecordModelToEntity from '../../record/mapper/fromRecordModelToEntity'

import User from '../entity/User'

export default function FromUserModelToEntity ({ id, name, email, hash, createdAt, updatedAt, deletedAt, records }: any): User {
  const user = new User(
    id,
    name,
    email,
    hash,
    createdAt,
    updatedAt,
    deletedAt,
    records?.map((record: any) => fromRecordModelToEntity(record))
  )
  return user
};
