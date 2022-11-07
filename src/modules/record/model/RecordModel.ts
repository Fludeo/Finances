
import { Model, Sequelize, DataTypes } from 'sequelize'

export default class RecordModel extends Model {
  static setup (sequelizeInstance: Sequelize): typeof RecordModel {
    RecordModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        concept: {
          type: DataTypes.STRING,
          allowNull: false
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false
        },
        category: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false
        }
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Record',
        tableName: 'records',
        underscored: true,
        paranoid: true
      }
    )

    return RecordModel
  }
}
