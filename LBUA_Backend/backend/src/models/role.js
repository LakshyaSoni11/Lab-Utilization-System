// backend/src/models/Role.js
import { DataTypes, Model } from 'sequelize';

class Role extends Model {
  static initModel(sequelize) {
    Role.init(
      {
        role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        role_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
          validate: { isIn: [['Admin', 'Faculty', 'Student']] },
        },
      },
      {
        sequelize,
        modelName: 'Role',
        tableName: 'roles',
        timestamps: false,
      }
    );
  }
}

export default Role;
