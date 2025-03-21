// backend/src/models/index.js
import { Sequelize } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';
import Lab from './Lab.js';
import Request from './Request.js';
import Approval from './Approval.js';
import Role from './Role.js';

// Initialize Models
User.initModel(sequelize);
Lab.initModel(sequelize);
Request.initModel(sequelize);
Approval.initModel(sequelize);
Role.initModel(sequelize);

// Define Relationships
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Request.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Request.belongsTo(Lab, { foreignKey: 'lab_id', as: 'lab' });
Approval.belongsTo(Request, { foreignKey: 'request_id', as: 'request' });
Approval.belongsTo(User, { foreignKey: 'approved_by', as: 'approver' });

export { sequelize, User, Lab, Request, Approval, Role };
