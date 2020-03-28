/**
 *
 *
 */
var utils = require('../utils')
var hash = require('object-hash')
var bind = require('../helpers/bind');
var utils = require('../utils');
var defaultAutoCacheConfig = {
    cacheController: "auto",// 使用那种缓存方式：  auto 自动选择 ， localstorage ， sessionstorage, ram
    maxCacheItem: "100",// 最大存储条数
    optionWhenUseUp: "deleteold",// 缓存限额用尽时候的操作 delete:删除最老的 20%缓存， clear 清空当前缓存，abandon 放弃缓存操作
    match: "hash",// 缓存匹配方法  hash：hash相同 只实现了hash
    matchNotMatching: "delete",// 前缀匹配成功，但是缓存匹配不成功时，如何处理已有缓存  delete 删除， keep 保存
    baseURL: "",
    cacheLevel: "data",// all 缓存（还原）整个请求, 会占用非常多的空间
    // data 还原 data 和 status两个字段
    cacheOnlySuccess: true,// 仅当返回状态为 success / 200 的时候触发缓存
    defaultType:"times", //  默认缓存过期使用次数，因为客户电脑可能有还原卡，取前段时间控制缓存不安全
    defaultExpire:10,
    cacheQueryPrefix: [
        {
            urlPattern: "/gen/test/", // 这里指的是 具体一个请求的url
            url:"",// 同时出现 url 和 urlPattern 的时候， urlPattern 会被忽略
            type: "times",// 过期方式：  key:key值匹配过期  time:缓存时间 times:缓存使用次数 目前只实现了 times ， default:times
            expire: 3
        }
    ]

}

function urlPrefixMatch(prefix, prefixes) {

}

function mergeConfig(defaultConfig, userConfig) {

    return
}

function extractPrefix(config) {
    if (config && config.cacheQueryPrefix) {
        var prefixConfig = config.cacheQueryPrefix;
        if(!utils.isArray(prefixConfig)){
            prefixConfig=[prefixConfig]
        }
        var urlConfig = {};
        config.urlConfig = urlConfig;
        var urlArray = [];
        config.urlArray = urlArray;
        var urlPatternConfig = {};
        config.urlPatternConfig = urlPatternConfig;
        var urlPatternArray=[];
        config.urlPatternArray = urlPatternArray;
        for (let i = 0; i < prefixConfig.length; i++) {
            var conf = prefixConfig[i]
            var url = conf.url;
            var urlPattern = conf.urlPattern;
            if(utils.isString(url)){
                var included = false;
                for (let j = 0; j < urlArray.length; j++) {
                    if(url==urlArray[k]){
                        included = true;
                        break;
                    }
                }
                if(!included){
                    urlArray.push(url)
                    urlConfig[url] = {type:conf.type||config.defaultType,expire:conf.expire||config.defaultExpire}
                }
            }else if(utils.isPattern(urlPattern)){
                var included = false;
                for (let j = 0; j < urlPatternArray.length; j++) {
                    if(urlPattern.toString() == urlPatternArray[i].toString()){
                        included = true;
                        break;
                    }
                }
                if(!included){
                    urlPatternArray.push(urlPattern)
                    urlPatternConfig[urlPattern.toString()] ={type:conf.type||config.defaultType,expire:conf.expire||config.defaultExpire}
                }
            }
        }

    }
}

function _cacheAdapter(instanceConfig) {
    this.defaults = instanceConfig;
    this.Cacher = require('promise-cache-controller');
    this.config(instanceConfig)
}

_cacheAdapter.prototype.match = function (config) {
    // todo 先进行前缀验证
    var hashKey = this.getKey(config);
    var cached = this.Cacher.getItem(hashKey);
    if (cached) {
        return true;
    } else {
        return false;
    }
}
_cacheAdapter.prototype.getKey = function (config,) {

    var hashKey;
    if (config && config.method) {
        if (config && config.method == 'get') {
            hashKey = hash(config.baseURL + config.url)
        } else if (config && config.method == 'post') {
            var data = config.data || {};
            /**
             * !important 发送请求之前，data可能是一个对象，发送请求的时候 post请求的参数 data 会被转换成字符串
             * 这里是为了 请求前匹配，请求后拦截器写缓存的时候，计算出来的key一致
             *
             * 参考：dispatchRequest.js 33 / transformData.js
             */
            if (typeof config.data != 'string') {
                data = JSON.stringify(data)
            }
            var str = config.baseURL + config.url + data;
            hashKey = hash(str);
        }
    }
    return hashKey;
}
_cacheAdapter.prototype.getCache = function (config) {
    return this.Cacher.getCache(this.getKey(config))
}
_cacheAdapter.prototype.promise = function (config) {
    var _this = this;
    return new Promise(function (resolve, reject) {
        if (_this.match(config)) {
            var axiosResponseObject = {
                status: 200,
                data: _this.getCache(config),
                config: config,
                cached: true
            }
            resolve(axiosResponseObject)
        } else {
            reject("Cache exist when we do the check but lost when we take!")
        }
    })
}
_cacheAdapter.prototype.axiosResponseInterceptor = function (response) {
    this.Cacher.setCache(this.getKey(response.config), response.data);
    return response;
}
_cacheAdapter.prototype.config = function (cacheConfig) {

    return true;
}

function createCacheAdapter(instanceConfig) {
    var context = new _cacheAdapter(instanceConfig);
    instance = bind(_cacheAdapter.prototype.promise, context)
    utils.extend(instance, _cacheAdapter.prototype, context)
    utils.extend(instance, context);
    return instance;
}

var cacheAdapter = createCacheAdapter(defaultAutoCacheConfig);


module.exports = cacheAdapter;