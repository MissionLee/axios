'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * MissionLee: CacheControl enable whih cacheConfig
 *
 * 启用缓存，解析缓存配置，如果解析成功，
 *
 * ！important axios创建的方法有 直接 require，也有 create 这个factory，为了两种方式都可以
 * enableCacheControl，所以需要Axios.prototype 添加 enable，⭐⭐⭐ 最初希望能够讲 cacheAdpater做成单例，
 * 但是如果做成单例，
 *
 * @param cacheConfig
 */
Axios.prototype.enableCacheControl = function (cacheConfig) {
  // 每个 axios 实例 需要对应一个 cacheAdapter实例，避免相互影响
  var cacheAdapter = require('./adapters/cache')
  if (cacheAdapter.config(cacheConfig)) {
    // 某个实例开启了cacheAdpater的标志，同时方便让当前实例的流程中可以快速取到cacheAdapter
    this.cacheAdapter = cacheAdapter;
    this.interceptors.response.use(cacheAdapter.axiosResponseInterceptor)
  }
}

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);

    // Copy axios.prototype to instance
    utils.extend(instance, Axios.prototype, context);

    // Copy context to instance
    utils.extend(instance, context);

    return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;
