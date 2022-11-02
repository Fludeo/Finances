"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("../modules/auth/module");
const module_2 = require("../modules/record/module");
const module_3 = require("../modules/user/module");
function SetDataAssociations(container) {
    const token = container.get('AuthModel');
    const record = container.get('RecordModel');
    const user = container.get('UserModel');
    module_2.RecordModel.belongsTo(module_3.UserModel, { foreignKey: 'user_id' });
    module_3.UserModel.hasMany(module_2.RecordModel, { as: 'records', foreignKey: 'user_id' });
    module_1.AuthModel.belongsTo(module_3.UserModel, { foreignKey: 'user_id' });
    module_3.UserModel.hasMany(module_1.AuthModel, { foreignKey: 'user_id' });
}
exports.default = SetDataAssociations;
;
