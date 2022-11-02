"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class RecordModel extends sequelize_1.Model {
    static setup(sequelizeInstance) {
        RecordModel.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true,
            },
            concept: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            amount: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            type: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            category: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false
            },
            date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
        }, {
            sequelize: sequelizeInstance,
            modelName: 'Record',
            tableName: 'records',
            underscored: true,
            paranoid: true
        });
        return RecordModel;
    }
}
exports.default = RecordModel;
