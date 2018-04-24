'use strict';

module.exports = app => {

  class AuthorArticleService extends app.Service {


    /**
     * 分页获取用户关注的作者
     * @method findAuthorArticles
     * @param  {[type]}  page {where:xx,offset:page*size,limit:size}
     * @return {Promise}      [description]
     */
    async findAuthorArticles(page) {
      return await this.ctx.model.AuthorArticle.findAndCountAll(page);
    }

    /**
   * [createAuthorArticle 新增用户作者关系(感兴趣/不感兴趣)]
   * @param  {[type]}  AuthorArticle [description]
   * @return {Promise}            [description]
   */
    async createAuthorArticle(AuthorArticle) {
      return await this.ctx.model.AuthorArticle.create(AuthorArticle);
    }

  }

  return AuthorArticleService;


};
