'use strict';

module.exports = app => {

  const { STRING, INTEGER, DATE } = app.Sequelize;

  const UserTask = app.model.define('user_task', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },

    taskId: { type: INTEGER, allowNull: false, field: 'task_id' }, // FK
    userId: { type: INTEGER, allowNull: false, field: 'user_id' }, // FK

    name: { type: STRING, allowNull: false },
    type: { type: STRING, allowNull: false },
    url: { type: STRING, allowNull: false, validate: { isUrl: true } },
    created_at: { type: DATE },
    updated_at: { type: DATE },
  });

  // 外键关联
  UserTask.associate = () => {
    app.model.UserTask.belongsTo(app.model.Task, { as: 'task', foreignKey: 'taskId' });
    app.model.UserTask.belongsTo(app.model.User, { as: 'user', foreignKey: 'userId' });
  };

  return UserTask;

};
