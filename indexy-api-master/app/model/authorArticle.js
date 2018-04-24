'use strict';
/**
 * [exports 由于一篇文章包含多个作者,一个作者有多篇文章,多对多采用中间表更好管理]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
// module.exports = app => {
//
//   const { STRING, INTEGER, DATE } = app.Sequelize;
//
//   const AuthorArticle = app.model.define('author_article', {
//     id: { type: INTEGER, primaryKey: true, autoIncrement: true },
//
//     authorId: { type: INTEGER, allowNull: false, field: 'author_id' }, // FK
//     articleId: { type: INTEGER, allowNull: false, field: 'article_id' }, // FK
//
//     authorName: { type: STRING, allowNull: false, field: 'author_name' },
//     title: { type: STRING, allowNull: false },
//     keywords: { type: STRING },
//     publishTime: { type: DATE, allowNull: false, field: 'publish_time' },
//     created_at: { type: DATE },
//     updated_at: { type: DATE },
//   });
//
//   // 外键关联
//   AuthorArticle.associate = () => {
//     app.model.AuthorArticle.belongsTo(app.model.Author, { as: 'author', foreignKey: 'authorId' });
//     app.model.AuthorArticle.belongsTo(app.model.Article, { as: 'article', foreignKey: 'articleId' });
//   };
//
//   return AuthorArticle;
//
// };
