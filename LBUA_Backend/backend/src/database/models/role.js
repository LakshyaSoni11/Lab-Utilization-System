import { DataTypes, Model } from 'sequelize';

class Role extends Model {
  static initModel(sequelize) {
    Role.init(
      {
        role_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        role_name: {
          type: DataTypes.STRING(50),
          unique: true,
          allowNull: false,
          validate: {
            isIn: [['Admin', 'Faculty', 'Student']],
          },
        },
      },
      { sequelize, modelName: 'Role', timestamps: false }
    );
  }
}

export default Role;
