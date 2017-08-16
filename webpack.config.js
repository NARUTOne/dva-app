 /**
 * webpack 配置 in dva-app
 * author: NARUTOne
 */
 

var webpack = require('webpack')

let envToBeInjected = {
  API_HOST: process.env.API_HOST,
  FETCH: process.env.FETCH
};

module.exports = (webpackConfig, env) => {
 
  // Alias
  webpackConfig.resolve.alias = {
    components: `${__dirname}/src/components`,
    utils: `${__dirname}/src/utils`,
    config: `${__dirname}/src/utils/config`
  }

   envToBeInjected = Object.assign(envToBeInjected, {NODE_ENV: env})
  // 对roadhog默认配置进行操作，比如：
  webpackConfig.plugins.push(new webpack.DefinePlugin({
      'process.env': JSON.stringify(envToBeInjected),
      "__DEV__": JSON.stringify(env)
    }));


  return webpackConfig
}



