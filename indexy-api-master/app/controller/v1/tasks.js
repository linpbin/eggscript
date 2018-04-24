'use strict';

module.exports = app => {

  class UserTaskController extends app.Controller {


    // GET: /api/v1/tasks?userId=xxx
    // 需要用户id 来确定该期刊是否已订阅
    async index({ page = 0, size = 10 }) {
      const query = this.ctx.query;
      const userId = query.userId;
      if (!userId) this.ctx.throw(400, 'userId不能为空，请稍后重试...');
      try {
        if (query.page) page = +(query.page);
        if (query.size) size = +query.size;
        this.ctx.body = await this.service.task.findTasks(userId, { offset: page * size, size });

      } catch (err) {
        this.ctx.throw(500, `分页查询期刊，请稍后重试... ${err.message}`);
      }
    }

  }

  return UserTaskController;
};
