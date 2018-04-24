'use strict';

module.exports = app => {

  class UserTaskController extends app.Controller {

    // POST: /api/v1/userTasks/follow
    async follow() {
      try {
        const taskId = this.ctx.request.body.taskId;
        const task = await this.service.task.findTaskById(taskId);
        if (!task) this.ctx.throw(400, `没有该期刊[${taskId}]`);
        const userTask = {
          userId: this.ctx.request.body.userId,
          taskId,
          name: task.name,
          type: task.type,
          url: task.url,
        };
        // 目前并没有判断该用户是否已订阅该期刊
        this.ctx.body = await this.service.userTask.createUserTask(userTask);
      } catch (err) {
        this.ctx.throw(err.status || 500, `订阅失败，请稍后重试... ${err.message}`);
      }

    }

  }

  return UserTaskController;
};
