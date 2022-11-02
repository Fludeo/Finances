
    import { Model, Sequelize, DataTypes } from "sequelize"

    export default class AuthModel extends Model{
       
        static setup(sequelizeInstance : Sequelize) {
          AuthModel.init(
            {
              id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true,
              },
              refreshToken: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
              },
              
            },
            {
              sequelize: sequelizeInstance,
              modelName: 'Auth',
              tableName: 'tokens',
              underscored: true,
              paranoid: false,
            }
          );
        
            return AuthModel;
          }
        
    }