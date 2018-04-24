'use strict';

module.exports = app => {

  class Task extends app.Service {

  /**
   * [findTasks 分页查找期刊列表-->发现：期刊列表接口]
   * @param  {[type]}  userId [description]
   * @param  {[type]}  page   [{offset:page,size:size}]
   * @return {Promise}        [description]
   */
    async findTasks(userId, page) {

      const count = await this.ctx.model.Task.count();

      // 使用left join 可以判断期刊是否被用户关注了，若已经关注则返回isFollow=true
      const tasks = await app.model.query(`select t.id , t.name , t.type , t.url , u.user_id from tasks as t
       left join ( select * from user_tasks  where user_id = ${userId}  ) as u on  t.id = u.task_id
       limit ${page.offset} , ${page.size};`,
      { type: app.model.QueryTypes.SELECT });

      const rows = [];

      tasks.forEach(val => {
        rows.push({
          journal: val,
          isFollow: !!(val.user_id || val.user_id === 0),
        });
      });

      return {
        rows,
        count,
      };

    }

    /**
     * 根据id获取期刊
     * @method findTaskById
     * @param  {[type]}        id [description]
     * @return {Promise}          [description]
     */
    async findTaskById(id) {
      return await this.ctx.model.Task.findById(id);
    }


  }

  return Task;


};
