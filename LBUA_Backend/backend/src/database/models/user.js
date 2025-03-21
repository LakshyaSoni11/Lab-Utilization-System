import { DataTypes, Model } from 'sequelize';

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(100), allowNull: false },
        email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
        password: { type: DataTypes.STRING(255), allowNull: false },
        role_id: { type: DataTypes.INTEGER, allowNull: false }
      },
      { sequelize, modelName: 'User', timestamps: true }
    );
  }
}

export default User;
