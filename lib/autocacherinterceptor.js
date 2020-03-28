/**
 * 思路说明：通过拦截器，入侵请求连接，这个拦截器必须在 请求拦截器的最后一个，响应拦截器的第一个执行，才能保证功能正确
 * 请求拦截器：如果匹配成功（url匹配成功+数据缓存匹配成功），像 config 里面注入 match:{data}
 * Adapter修改， 如果config里面出现 match:{data:data,hash:hash} 则使用缓存数据
 * 相应拦截器
 *
 * 为什么不直接修改 Adapter 的代码，在内部完成缓存控制？
 *      答：直接卸载Adapter和写在interceptor中都是可以的，这里仅为了代码组织更明确一些
 */
var cacherAdapterResponseInterceptor = require('./adapters/cache').axiosResponseInterceptor

var axios = require('./axios').create({
    baseURL:'http://localhost:19117/test/'
});
axios.interceptors.response.use(cacherAdapterResponseInterceptor)
axios.enableCacheControl()
var x = function(){
    axios.post('/gen/test/hello',{
        a:"b"
    }).then(function(res){
        // console.log(res)
        console.log("请求2")

        console.log(res.cached)

        // console.log(res.data)
        console.log("=========================================================")

    })
}
var y = function(){
    axios.post('/gen/test/hello',{
        a:"c"
    }).then(function(res){
        // console.log(res)
        console.log("请求3")

        console.log(res.cached)
        // console.log(res.data)
        console.log("=========================================================")

    })
}
setTimeout(x,1000)
// setTimeout(y,2000)
setTimeout(x,3000)
setTimeout(x,4000)
// setTimeout(x,5000)
// setTimeout(x,6000)