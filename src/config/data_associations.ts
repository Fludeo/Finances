import { IDIContainer } from "rsdi";
import { AuthModel } from "../modules/auth/module";
import { RecordModel } from "../modules/record/module";
import { UserModel } from "../modules/user/module";

export default function SetDataAssociations(container :IDIContainer) {

    const token = container.get ('AuthModel')
    const record = container.get('RecordModel');
    const user  = container.get('UserModel');
    RecordModel.belongsTo(UserModel,{foreignKey: 'user_id'});
    UserModel.hasMany(RecordModel ,{as:'records', foreignKey: 'user_id'});
    AuthModel.belongsTo(UserModel ,{foreignKey: 'user_id'});
    UserModel.hasMany(AuthModel ,{foreignKey: 'user_id'})
  };