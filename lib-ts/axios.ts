// import PromiseCacheController = require('./helper/CacheController')
import PromiseCacheController from "../node_modules/promise-cache-controller/index"
PromiseCacheController.setCache("a","hello");
console.log(PromiseCacheController.getCache("a"))
console.log(PromiseCacheController.getCache("b"))
