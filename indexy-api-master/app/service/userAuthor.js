'use strict';

module.exports = app => {

  class UserAuthorService extends app.Service {


    /**
     * 分页获取用户关注的作者
     * @method findUserAuthors
     * @param  {[type]}  page {where:xx,offset:page*size,limit:size}
     * @return {Promise}      [description]
     */
    async findUserAuthors(page) {
      return await this.ctx.model.UserAuthor.findAndCountAll(page);
    }

    async findByUserIdAndAuthorId(userId, authorId) {
      return await this.ctx.model.UserAuthor.findAll({
        where: { userId, authorId },
      });
    }

    // 查找用户关注的所有作者
    async findUserAuthorsByUserId(userId) {
      return await this.ctx.model.UserAuthor.findAll({
        where: {
          userId,
          isFollow: true,
        },
      });
    }

    // 查找作者的关注量
    async findFollowCountOfAuthor(authorId) {
      return await this.ctx.model.UserAuthor.count({
        where: {
          authorId,
          isFollow: true,
        },
      });
    }

    /**
   * [createUserAuthor 新增用户作者关系(感兴趣/不感兴趣)]
   * @param  {[type]}  userAuthor [description]
   * @return {Promise}            [description]
   */
    async createUserAuthor(userAuthor) {
      return await this.ctx.model.UserAuthor.create(userAuthor);
    }

  }

  return UserAuthorService;


};
