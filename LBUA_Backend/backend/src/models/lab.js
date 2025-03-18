// backend/src/models/Lab.js
import { DataTypes, Model } from 'sequelize';

class Lab extends Model {
  static initModel(sequelize) {
    Lab.init(
      {
        lab_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        lab_name: { type: DataTypes.STRING(100), allowNull: false },
        location: { type: DataTypes.STRING(100), allowNull: false },
        capacity: { type: DataTypes.INTEGER, allowNull: false },
        available_resources: { type: DataTypes.TEXT },
      },
      {
        sequelize,
        modelName: 'Lab',
        tableName: 'labs',
        timestamps: true,
      }
    );
  }
}

export default Lab;
