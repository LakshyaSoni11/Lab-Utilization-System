import { DataTypes, Model } from 'sequelize';

class Request extends Model {
  static initModel(sequelize) {
    Request.init(
      {
        request_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        lab_id: { type: DataTypes.INTEGER, allowNull: false },
        status: {
          type: DataTypes.STRING(50),
          defaultValue: 'Pending',
          validate: {
            isIn: [['Pending', 'Approved', 'Rejected']],
          },
        },
        reason: { type: DataTypes.TEXT },
      },
      { sequelize, modelName: 'Request', timestamps: true }
    );
  }
}

export default Request;
