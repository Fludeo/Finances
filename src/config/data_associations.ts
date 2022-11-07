import { IDIContainer } from 'rsdi'
import { AuthModel } from '../modules/auth/module'
import { RecordModel } from '../modules/record/module'
import { UserModel } from '../modules/user/module'

export default function SetDataAssociations (container: IDIContainer): void {
  const record: typeof RecordModel = container.get('RecordModel')
  const user: typeof UserModel = container.get('UserModel')
  const token: typeof AuthModel = container.get('AuthModel')
  record.belongsTo(user, { foreignKey: 'user_id' })
  user.hasMany(record, { as: 'records', foreignKey: 'user_id' })
  token.belongsTo(user, { foreignKey: 'user_id' })
  user.hasMany(token, { foreignKey: 'user_id' })
};
