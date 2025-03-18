import { Sequelize } from 'sequelize';
import { sequelize } from '../../config/db.js';
import User from './User.js';
import Lab from './Lab.js';
import Request from './Request.js';
import Role from './Role.js';
import Approval from './Approval.js';

// Initialize models
User.initModel(sequelize);
Lab.initModel(sequelize);
Request.initModel(sequelize);
Role.initModel(sequelize);
Approval.initModel(sequelize);

// Define relationships
Role.hasMany(User, { foreignKey: 'role_id' });
User.belongsTo(Role, { foreignKey: 'role_id' });

Lab.hasMany(Request, { foreignKey: 'lab_id' });
Request.belongsTo(Lab, { foreignKey: 'lab_id' });

User.hasMany(Request, { foreignKey: 'user_id' });
Request.belongsTo(User, { foreignKey: 'user_id' });

Request.hasOne(Approval, { foreignKey: 'request_id' });
Approval.belongsTo(Request, { foreignKey: 'request_id' });

User.hasMany(Approval, { foreignKey: 'approved_by' });
Approval.belongsTo(User, { foreignKey: 'approved_by' });

export { sequelize, User, Lab, Request, Role, Approval };
