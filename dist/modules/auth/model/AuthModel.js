"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class AuthModel extends sequelize_1.Model {
    static setup(sequelizeInstance) {
        AuthModel.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true,
            },
            refreshToken: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        }, {
            sequelize: sequelizeInstance,
            modelName: 'Auth',
            tableName: 'tokens',
            underscored: true,
            paranoid: false,
        });
        return AuthModel;
    }
}
exports.default = AuthModel;
