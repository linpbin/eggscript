'use strict';

module.exports = app => {

  const APP_CONTEXT = 'indexy_api';

  const payload = app.middlewares.payload(); // 统一消息体

  app.get('/', app.controller.v1.index.index);

  app.resources('articles', `/${APP_CONTEXT}/api/v1/articles`, payload, app.controller.v1.articles);

  app.resources('users', `/${APP_CONTEXT}/api/v1/users`, payload, app.controller.v1.users);

  // 期刊管理
  app.resources('task', `/${APP_CONTEXT}/api/v1/tasks`, payload, app.controller.v1.tasks);

  // 领域管理
  app.resources('field', `/${APP_CONTEXT}/api/v1/fields`, payload, app.controller.v1.fields);

  // app.resources('userTask', `/${APP_CONTEXT}/api/v1/userTasks`, payload, app.controller.v1.userTasks);

  // 作者管理
  app.resources('authors', `/${APP_CONTEXT}/api/v1/authors`, payload, app.controller.v1.authors);

  app.post(`/${APP_CONTEXT}/api/v1/users/register`, payload, app.controller.v1.users.register);

  app.post(`/${APP_CONTEXT}/api/v1/users/login`, payload, app.controller.v1.users.login);

  app.post(`/${APP_CONTEXT}/api/v1/articles/:id/uploadPDF`, payload, app.controller.v1.articles.upload);

  app.post(`/${APP_CONTEXT}/api/v1/userTasks/follow`, payload, app.controller.v1.userTasks.follow);

  app.get(`/${APP_CONTEXT}/api/v1/users/:userId/follow/tasks/articles`, payload, app.controller.v1.users.getFollowArticles);

  app.put(`/${APP_CONTEXT}/api/v1/articles/:id/watch`, payload, app.controller.v1.articles.watch);

  // 用户关注作者
  app.post(`/${APP_CONTEXT}/api/v1/users/:userId/follow/authors/:authorId`, payload, app.controller.v1.authors.followAuthor);

  // 用户屏蔽作者
  app.post(`/${APP_CONTEXT}/api/v1/users/:userId/unfollow/authors/:authorId`, payload, app.controller.v1.authors.unFollowAuthor);
  // 获取用户关注的作者的文章
  app.get(`/${APP_CONTEXT}/api/v1/users/:userId/authors/articles`, payload, app.controller.v1.authors.getAuthorLatestArticle);

  /**
   * 领域-相关接口
   */
  // 获取一级领域
  app.get(`/${APP_CONTEXT}/api/v1/fields/firstLevel`, payload, app.controller.v1.fields.getFirstLevelFields);
  // 根据父级id获取子级领域
  app.get(`/${APP_CONTEXT}/api/v1/fields/:id/children`, payload, app.controller.v1.fields.getChildrensByParentId);

  // 根据父级id获取树形子级领域
  app.get(`/${APP_CONTEXT}/api/v1/fields/:id/childrenTree`, payload, app.controller.v1.fields.getChildrenTreeByParentId);

  // 用户关注领域
  app.post(`/${APP_CONTEXT}/api/v1/users/:userId/follow/fields/:fieldId`, payload, app.controller.v1.fields.followField);

  // 用户屏蔽领域
  app.post(`/${APP_CONTEXT}/api/v1/users/:userId/unfollow/fields/:fieldId`, payload, app.controller.v1.fields.unFollowField);

  // 获取用户关注的领域的文章
  app.get(`/${APP_CONTEXT}/api/v1/users/:userId/fields/articles`, payload, app.controller.v1.fields.getFieldLatestArticle);
  // 查看用户是否有关注的领域
  app.get(`/${APP_CONTEXT}/api/v1/users/:userId/hasFollowField`, payload, app.controller.v1.fields.hasFollowField);
  // 获取用户已关注的领域列表
  app.get(`/${APP_CONTEXT}/api/v1/users/:userId/fields`, payload, app.controller.v1.fields.getUserFields);

};
