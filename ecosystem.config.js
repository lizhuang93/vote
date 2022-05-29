module.exports = {
  apps: [{
    name: 'vote', // pm2管理进程的名字
    script: './app.js',   // node服务入口文件

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },

    // 传递给node的参数
    env_prd: {
      NODE_ENV: 'production',
      HOST: '0.0.0.0',
      PORT: '9000',
      ENABLE_NODE_LOG: 'YES',
    },

  }],
  // apps : [{
  //   script: 'index.js',
  //   watch: '.'
  // }, {
  //   script: './service-worker/',
  //   watch: ['./service-worker']
  // }],

  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
