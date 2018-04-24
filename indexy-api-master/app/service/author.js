'use strict';

// http://docs.sequelizejs.com/class/lib/model.js~Model.html

module.exports = app => {

  const { in: opIn } = app.Sequelize.Op;

  class AuthorService extends app.Service {
    /**
     * 分页获取作者列表
     * @method findAuthors
     * @param  {[type]}  page {where:xx,offset:page*size,limit:size}
     * @return {Promise}      [description]
     */
    async findAuthors(page) {
      return await this.ctx.model.Author.findAndCountAll(page);
    }

    /**
     * [findAuthorsWithFollow 发现->作者]
     * @param  {[type]}  userId [description]
     * @param  {[type]}  page   [{offset:page*size,limit:size}]
     * @return {Promise}        [description]
     */
    async findAuthorsWithFollow(userId, page) {

      const count = await this.ctx.model.Author.count();

      // 使用left join 可以判断作者是否被用户关注了，若已经关注则返回isFollow=true,
      // 已屏蔽返回isFollow=false,未关注不返回该字段
      const tasks = await app.model.query(`select a.id,a.realname,a.nickname,a.article_count as articleCount,a.fans,uA.is_follow as isFollow from authors a left join user_authors uA on  a.id=uA.author_id and uA.user_id=${userId} limit ${page.offset} , ${page.limit};`,
        { type: app.model.QueryTypes.SELECT }
      );

      // boolean类型在mysql存储的值为0,1 对isFollow字段统一返回:false:用户已屏蔽,true:用户已关注,null:用户未关注
      tasks.forEach(t => {
        if (t.isFollow === 0) {
          t.isFollow = false;
        }
        if (t.isFollow === 1) {
          t.isFollow = true;
        }
      });
      return { rows: tasks, count };
    }

    /**
     * [findList 查询所有用户]
     * @param  {[type]}  query [description]
     * @return {Promise}       [description]
     */
    async findList(query) {
      return await this.ctx.model.Author.findAll(query);
    }

    /**
     * 根据id获取用户
     * @method findAuthorById
     * @param  {[type]}     id [description]
     * @return {Promise}       [description]
     */
    async findAuthorById(id) {
      return await this.ctx.model.Author.findById(id);
    }


    /*
     * 创建作者
     * @method createAuthor
     * @param  {[type]}   Author [description]
     * @return {Promise}       [description]
     */
    async createAuthor(author) {
      return await this.ctx.model.Author.create(author);
    }


    /**
     * 根据id更新作者
     * @method updateAuthorById
     * @param  {[type]}       id      [description]
     * @param  {[type]}       updates [description]
     * @return {Promise}              [description]
     */
    async updateAuthorById(id, updates) {
      return await this.ctx.model.Author.update(updates, {
        where: {
          id,
        },
      });
    }


    /**
     * 根据id数组删除作者
     * @method deleteAuthorByIds
     * @param  {[type]}        ids [description]
     * @return {Promise}           [description]
     */
    async deleteAuthorByIds(ids) {
      return await this.ctx.model.Author.destroy({
        where: {
          id: {
            [ opIn ]: ids,
          },
        },
      });
    }


  }

  return AuthorService;
};
