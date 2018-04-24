'use strict';

// http://docs.sequelizejs.com/class/lib/model.js~Model.html

module.exports = app => {
  // const { in: opIn } = app.Sequelize.Op;

  class Article extends app.Service {

    /**
     * 分页获取文章列表
     * @method findArticles
     * @param  {[type]}  page {where:xx,offset:page*size,limit:size}
     * @return {Promise}      [description]
     */
    async findArticles(page) {
      return await this.ctx.model.Article.findAndCountAll(page);
    }

    /**
     * 根据id获取文章
     * @method findArticleById
     * @param  {[type]}        id [description]
     * @return {Promise}          [description]
     */
    async findArticleById(id) {
      return await this.ctx.model.Article.findById(id);
    }


    // 根据作者查找文章 TODO 排序
    async findArticlesOfAuthorNames(authors, page) {

      // 选出包含作者名的文章
      const articleTables = `(select id from (select id, (concat(author, ',')   regexp
      concat(replace('${authors.toString()}',',',',|'), ',')) as flag
        FROM articles) A where A.flag!=0 )`;

      const articles = await app.model.query(`select * from articles
        where id in ${articleTables}  order by publishTime desc  limit ${page.offset} , ${page.limit};`,
      { type: app.model.QueryTypes.SELECT }
      );

      const count = await app.model.query(`select count(*) as count from articles
        where id in ${articleTables}`,
      { type: app.model.QueryTypes.SELECT }
      );

      return { rows: articles, count: count && count.length > 0 ? count[0].count : 0 };
    }

    // 根据领域查找文章 TODO 排序
    async findArticlesOfFieldNames(fields, page) {

      // 选出包含领域的文章
      const articleTables = `(select id from (select id, (concat(tags, ',')   regexp
      concat(replace('${fields.toString()}',',',',|'), ',')) as flag
        FROM articles) A where A.flag!=0 )`;

      const articles = await app.model.query(`select * from articles
        where id in ${articleTables} order by publishTime desc   limit ${page.offset} , ${page.limit};`,
      { type: app.model.QueryTypes.SELECT }
      );

      const count = await app.model.query(`select count(*) as count from articles
        where id in ${articleTables}`,
      { type: app.model.QueryTypes.SELECT }
      );

      return { rows: articles, count: count && count.length > 0 ? count[0].count : 0 };
    }

    /**
     * 根据id更新文章
     * @method updateArticleById
     * @param  {[type]}          id      [description]
     * @param  {[type]}          updates [description]
     * @return {Promise}                 [description]
     */
    async updateArticleById(id, updates) {
      return await this.ctx.model.Article.update(updates, {
        where: {
          id,
        },
      });
    }
  }
  return Article;
};
