'use strict';

// Restful Api 加载形式，详见：
// https://eggjs.org/zh-cn/basics/router.html

const lodash = require('lodash');

module.exports = app => {

  const { like } = app.Sequelize.Op;

  class AuthorController extends app.Controller {

    // GET: /api/v1/authors?userId=1
    // 分页获取作者列表（根据粉丝数、文章数排序）
    async index({ page = 0, size = 10, orders = [ 'id,desc' ] }) {
      this.logger.info(`分页获取作者列表 :${JSON.stringify(this.ctx.query)}`);

      // step1: 查出所有的author
      const query = this.ctx.query;
      if (query.page) page = +query.page;
      if (query.size) size = +query.size;
      if (this.ctx.queries.order) orders = this.ctx.queries.order;

      const ords = orders.map(item => {
        return item.trim().split(',');
      });

      const condition = {
        offset: page * size,
        limit: size,
        order: ords,
      };
      if (query.search) {
        condition.where = {
          realname: { [like]: `%${query.search}%` },
        };
      }

      this.ctx.logger.debug(condition);
      try {
        if (!query.userId) {
          this.ctx.body = await this.service.author.findAuthors(condition);
        } else {
          this.ctx.body = await this.service.author.findAuthorsWithFollow(query.userId, condition);
        }
      } catch (err) {
        this.ctx.throw(500, `获取数据失败，请稍后再试...${err.message}`);
      }
    }

    // 用户关注作者
    // POST  /api/v1/users/:userId/follow/authors/:authorId
    async followAuthor() {
      this.logger.info(`用户关注作者:${JSON.stringify(this.ctx.params)}`);

      const userId = this.ctx.params.userId;
      const authorId = this.ctx.params.authorId;

      const author = await this.service.author.findAuthorById(authorId);
      if (!author) this.ctx.throw(400, `没有该作者[authorId:${authorId}]`);
      try {
        const uA = await this.service.userAuthor.findByUserIdAndAuthorId(userId, authorId);
        if (uA && uA.length !== 0 && uA[0].isFollow) this.ctx.throw(400, '用户已经关注了该作者');
        if (uA && uA.length !== 0 && !uA[0].isFollow) this.ctx.throw(400, '用户已经屏蔽了该作者');

        const userAuthor = {
          userId,
          authorId,
          authorName: author.realname,
          isFollow: true, // 感兴趣
        };
        this.ctx.body = await this.service.userAuthor.createUserAuthor(userAuthor);
        // 更新author粉丝量
        const count = await this.service.userAuthor.findFollowCountOfAuthor(authorId);
        await this.service.author.updateAuthorById(authorId, { fans: count });
      } catch (err) {
        this.ctx.throw(err.status || 500, `关注作者失败，请稍后重试... ${err.message}`);
      }
    }

    // 用户屏蔽作者
    // POST  /api/v1/users/:userId/unfollow/authors/:authorId
    async unFollowAuthor() {
      this.logger.info(`用户关注作者:${JSON.stringify(this.ctx.params)}`);

      const userId = this.ctx.params.userId;
      const authorId = this.ctx.params.authorId;

      const author = await this.service.author.findAuthorById(authorId);
      if (!author) this.ctx.throw(400, `没有该作者[authorId:${authorId}]`);
      try {
        const userAuthor = {
          userId,
          authorId,
          authorName: author.realname,
          isFollow: false, // 不感兴趣
        };
        this.ctx.body = await this.service.userAuthor.createUserAuthor(userAuthor);
      } catch (err) {
        this.ctx.throw(500, `屏蔽作者失败，请稍后重试... ${err.message}`);
      }
    }

    // 获取用户关注的所有作者最新的文章
    // GET  /api/v1/users/:userId/authors/articles
    async getAuthorLatestArticle({ page = 0, size = 10 /* orders = [ 'publishTime,desc' ]*/ }) {
      this.logger.info(`分页获取用户关注的所有作者最新的文章 :${this.ctx.query}`);

      try {

        const userId = this.ctx.params.userId;
        // step1:用户关注的作者
        const userAuthors = await this.service.userAuthor.findUserAuthorsByUserId(userId);

        const authors = lodash.map(userAuthors, userAuthor => {
          return userAuthor.authorName;
        });

        if (authors && authors.length !== 0) {
          const query = this.ctx.query;
          if (query.page) page = +query.page;
          if (query.size) size = +query.size;
          // if (this.ctx.queries.order) orders = this.ctx.queries.orders;

          const pageCondition = {
            offset: page * size,
            limit: size,
          };

          this.ctx.body = await this.service.article.findArticlesOfAuthorNames(authors, pageCondition);
        } else {
          this.ctx.body = {
            rows: [],
            count: 0,
          };
        }

        // TODO 以后提倡的查询方式
        // step2:根据作者查询文章 按文章发布时间排序
        // const authorIds = lodash.map(userAuthors, userAuthor => {
        //   return userAuthor.authorId;
        // });
        //
        // const query = this.ctx.query;
        // if (query.page) page = +query.page;
        // if (query.size) size = +query.size;
        // if (this.ctx.queries.order) orders = this.ctx.queries.orders;
        //
        // const ords = orders.map(item => {
        //   return item.trim().split(',');
        // });
        //
        // const condition = {
        //   offset: page * size,
        //   limit: size,
        //   order: ords,
        //   where: {
        //     authorId: { [ opIn ]: authorIds },
        //   },
        // };
        //
        // this.ctx.body = await this.service.authorArticle.findAuthorArticles(condition);
      } catch (err) {
        console.trace(err);
        this.ctx.throw(500, `获取用户关注的作者最新发布的文章列表失败，请稍后重试... ${err.message}`);
      }

    }


    // POST: /api/v1/authors
    async create() {
      this.logger.info(`新增作者:${JSON.stringify(this.ctx.request.body)}`);

      const body = this.ctx.request.body;
      try {
        const author = await this.service.author.createAuthor(body);
        this.ctx.body = author;
      } catch (err) {
        this.logger.error(JSON.stringify(err));
        if (err.message.indexOf('Validation error') >= 0) {
          this.ctx.throw(400, `作者信息异常... ${err.message}`);
        }
        this.ctx.throw(500, `新增作者异常，请稍后重试... ${err.message}`);
      }

    }


    // PUT: /api/v1/authors/:id
    async update() {
      this.logger.info(`修改作者:${this.ctx.params.id},${JSON.stringify(this.ctx.request.body)}`);

      const author_id = this.ctx.params.id;
      const body = this.ctx.request.body;
      try {
        this.ctx.body = await this.service.author.updateAuthorById(author_id, body);
      } catch (err) {
        this.logger.error(JSON.stringify(err));

        if (err.message.indexOf('Validation error') >= 0) {
          this.ctx.throw(400, `作者信息异常... ${err.message}`);
        }
        this.ctx.throw(500, `修改作者信息异常，请稍后重试... ${err.message}`);
      }

    }

    // DELETE: /api/v1/authors/:id1,:id2,:id3...
    async destroy() {
      this.logger.info(`删除作者:${this.ctx.params.id}`);

      let author_ids = this.ctx.params.id; // `GET /api/authors/1,2,3` => `['1', '2', '3']`
      author_ids = author_ids.split(',');
      try {
        this.ctx.body = await this.service.author.deleteAuthorByIds(author_ids);
      } catch (err) {
        this.ctx.throw(500, `删除作者异常，请稍后重试... ${err.message}`);
      }
    }

  }
  return AuthorController;
};
