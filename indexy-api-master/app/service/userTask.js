'use strict';

module.exports = app => {

  class UserTask extends app.Service {
    /**
     * [findTasksByUserId 查找关注的期刊]
     * @param  {[type]}  condition [description]
     * @return {Promise}           [description]
     */
    async findTasksByUserId(condition) {
      return await this.ctx.model.UserTask.findAll(condition);
    }

    /**
     * [createUserTask 关注期刊]
     * @param  {[type]}  userTask [description]
     * @return {Promise}          [description]
     */
    async createUserTask(userTask) {
      return await this.ctx.model.UserTask.create(userTask);
    }

  }

  return UserTask;


};
