'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_api&fcuibaba-TMS';

  // add your config here

  // ###### 框架自带的中间件配置区 ######
  config.bodyParser = {
    jsonLimit: '10mb',
  };

  // 默认按每天切
  // config.logrotator = {
  // 	filesRotateBySize: [
  // 		path.join( appInfo.root, 'logs', appInfo.name, 'indexy-crawler-web.log' ),
  // 		path.join( appInfo.root, 'logs', appInfo.name, 'common-error.log' )
  // 	],
  // 	maxFileSize: 100 * 1024,
  // 	rotateDuration: 80000
  // }

  // ###### 外部中间件配置区 ######

  // 配置需要的中间件，数组顺序即为中间件的加载顺序，这里的话gzip会去找 middleware/gzip.js
  // config.middleware = [ 'requestId', 'compress', 'notfoundHandler' ];
  config.middleware = [ 'requestId', 'compress', 'errorHandler', 'notfoundHandler' ];

  // 约定大于配置原则：框架会将 app.config[${middlewareName}] 传递参数到 middleware/xxx.js
  config.compress = {
    threshold: 2048,
    enable: true,
    // match: '/xxx',
    // match(ctx) {
    //   // 只有 ios 设备才开启
    //   const reg = /iphone|ipad|ipod/i;
    //   return reg.test(ctx.get('user-agent'));
    // },
    // ignore: '/xxx',
    // ignore(ctx) {
    //   const reg = /iphone|ipad|ipod/i;
    //   return reg.test(ctx.get('user-agent'));
    // }
  };

  // 从 query或header 获取请求的uuid，设置到 ctx.state.id 中
  config.requestId = {
    expose: 'X-Request-Id',
    // header: 'X-Req-Id',
    // query = 'requestId',
    enable: true,
  };


  config.security = {
    // 一般防止请求伪造，登录成功生成 { _csrf: csrfToken }，把 _csrf 发给客户端，每次请求都带上才是当前用户操作
    // 如果伪造的就没有 _csrf，自然能防止掉；这边说一下这个功能可能和我们的 前后端分离的 access_token 有点重叠
    // 建议暂时关闭 T_T.
    csrf: {
      enable: false,
      // 安全威胁CSRF设置： 忽略 JSON 请求
      // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      // 否则会要求带上 _csrf 参数
      ignoreJSON: true,
    },
  };

  // 静态文件
  // https://github.com/eggjs/egg-static
  config.static = {
    prefix: '/', // 静态文件url
    dir: appInfo.baseDir + '/app/public/', // 静态资源的位置,默认地址为app/public
    maxAge: appInfo.env === 'prod' ? 365 * 24 * 60 * 60 : 0,
    // cacheControl: 'no-cache', // Overrides maxAge options.
    gzip: true,
  };

  // 按文件大小切割文件
  config.logrotator = {
    filesRotateBySize: [
      path.join(appInfo.root, 'logs', appInfo.name, 'indexy-api-web.log'),
    ],
    maxFileSize: 5 * 1024,
  };

  // 文件上传大小及类型的限制
  config.multipart = {
    fileSize: '50mb',
    whitelist: [
      '.pdf'
    ]
  };

  return config;
};
