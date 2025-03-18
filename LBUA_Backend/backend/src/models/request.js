// backend/src/models/Request.js
import { DataTypes, Model } from 'sequelize';

class Request extends Model {
  static initModel(sequelize) {
    Request.init(
      {
        request_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        lab_id: { type: DataTypes.INTEGER, allowNull: false },
        request_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        status: {
          type: DataTypes.STRING(50),
          allowNull: false,
          defaultValue: 'Pending',
        },
        reason: { type: DataTypes.TEXT },
      },
      {
        sequelize,
        modelName: 'Request',
        tableName: 'requests',
        timestamps: true,
      }
    );
  }
}

export default Request;
