'use strict';

// Restful Api 加载形式，详见：
// https://eggjs.org/zh-cn/basics/router.html
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');

module.exports = app => {

  const { or, like } = app.Sequelize.Op;

  class ArticleController extends app.Controller {

    // GET: /api/v1/articles
    async index({ page = 0, size = 10, orders = [ 'id,desc' ] }) {
      this.logger.info(`分页获取领域文章:${JSON.stringify(this.ctx.query)}`);

      const query = this.ctx.query;
      if (query.page) page = +query.page;
      if (query.size) size = +query.size;
      if (this.ctx.queries.order) orders = this.ctx.queries.order;

      const ords = orders.map(item => { // [["id","desc"]]
        return item.trim().split(',');
      });
      this.logger.debug(ords);

      const condition = {
        offset: page * size,
        limit: size,
        order: ords,
      };
      if (query.title) {
        if (!condition.where) condition.where = {};
        condition.where.title = {
          [like]: `%${query.title}%`,
        };
      }
      if (query.journal) {
        if (!condition.where) condition.where = {};
        condition.where.journal = {
          [ like ]: `%${query.journal}%`,
        };
      }
      if (query.author) {
        if (!condition.where) condition.where = {};
        condition.where.author = {
          [like]: `%${query.author}%`,
        };
      }
      if (query.tags) {
        if (!condition.where) condition.where = {};

        const tags = query.tags.split(',');
        const orCondition = [];
        tags.map(tag => {
          const cond = {
            tags: {
              [like]: '%' + tag + '%',
            },
          };
          return orCondition.push(cond);
        });
        condition.where[ or ] = orCondition;
      }
      this.ctx.logger.debug(condition);

      try {
        this.ctx.body = await this.service.article.findArticles(condition);
      } catch (err) {
        this.ctx.throw(500, `获取数据失败，请稍后再试...${err.message}`);
      }
    }

    // GET: /api/v1/articles/:id
    async show() {
      this.logger.info(`获取领域文章详情:${JSON.stringify(this.ctx.params)}`);

      const task_id = this.ctx.params.id;
      try {
        this.ctx.body = await this.service.article.findArticleById(task_id);
      } catch (err) {
        this.ctx.throw(500, `任务查询异常，请稍后重试... ${err.message}`, {
          extra_info: task_id,
        });
      }
    }

    // post: /api/v1/articles/:id/uploadPDF
    async upload() {
      const ctx = this.ctx;
      const stream = await ctx.getFileStream();
      const name = `${new Date().getTime()}_${path.basename(stream.filename)}`;
      const pdfUrl = `${app.baseDir}/pdf/${name}`;
      const id = ctx.params.id;
      try {
        fs.writeFileSync(pdfUrl, stream);
        await this.service.article.updateArticleById(id, { pdfUrl });
      } catch (err) {
        // must consume the stream, otherwise browser will be stuck.
        await sendToWormhole(stream);
        this.ctx.throw(500, `上传文件或保存数据失败，请稍后再试...${err.message}`);
      }

      ctx.body = {
        name,
      };
    }

    // PUT: /api/v1/articles/:id/watch
    async watch() {
      try {
        const id = this.ctx.params.id;
        this.ctx.body = await this.service.article.updateArticleById(id, { watch: app.model.literal('`watch` + 1') });
      } catch (err) {
        this.ctx.throw(500, `请求全文失败，请稍后再试...${err.message}`);
      }

    }

    // POST: /api/v1/articles
    // async create() {
    //   this.logger.info(`新增文章:${JSON.stringify(this.ctx.request.body)}`);
    //
    //   const body = this.ctx.request.body;
    //   try {
    //     const article = await this.service.article.createArticle(body);
    //     this.ctx.body = article;
    //   } catch (err) {
    //     console.trace(err);
    //     if (err.message.indexOf('Validation error') >= 0) {
    //       this.ctx.throw(400, `新增的文章信息格式异常... ${err.message}`);
    //     }
    //     this.ctx.throw(500, `新增文章异常，请稍后重试... ${err.message}`);
    //   }
    //
    // }


  }
  return ArticleController;
};
