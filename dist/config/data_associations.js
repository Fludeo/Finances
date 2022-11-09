"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SetDataAssociations(container) {
    const record = container.get('RecordModel');
    const user = container.get('UserModel');
    const token = container.get('AuthModel');
    record.belongsTo(user, { foreignKey: 'user_id' });
    user.hasMany(record, { as: 'records', foreignKey: 'user_id' });
    token.belongsTo(user, { foreignKey: 'user_id' });
    user.hasMany(token, { foreignKey: 'user_id' });
}
exports.default = SetDataAssociations;
;
