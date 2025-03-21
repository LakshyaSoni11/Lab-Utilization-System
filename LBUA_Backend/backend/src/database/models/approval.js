import { DataTypes, Model } from 'sequelize';

class Approval extends Model {
  static initModel(sequelize) {
    Approval.init(
      {
        approval_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        request_id: { type: DataTypes.INTEGER, allowNull: false },
        approved_by: { type: DataTypes.INTEGER },
        approval_status: {
          type: DataTypes.STRING(50),
          validate: {
            isIn: [['Approved', 'Rejected']],
          },
        },
        remarks: { type: DataTypes.TEXT },
      },
      { sequelize, modelName: 'Approval', timestamps: true }
    );
  }
}

export default Approval;
