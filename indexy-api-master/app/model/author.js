'use strict';

module.exports = app => {

  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Author = app.model.define('author', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    realname: { type: STRING, allowNull: false, unique: true },
    nickname: { type: STRING },
    articleCount: { type: INTEGER, defaultValue: 0, field: 'article_count' }, // 文章量
    fans: { type: INTEGER, defaultValue: 0 }, // 粉丝量
    created_at: { type: DATE },
    updated_at: { type: DATE },

  });

  return Author;
};
