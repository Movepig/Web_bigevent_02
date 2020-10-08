// //开发环境服务器地址
// var baseURL = "http://ajax.frontend.itheima.net";
// //2.测试环境服务器地址
// // var baseURL = "http://ajax.frontend.itheima.net";
// // 3.生产环境服务器地址
// // var baseURL = "http://ajax.frontend.itheima.net";
// $.ajaxPrefilter(function (params) {
//     // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
//     params.url = baseURL + params.url
// })


//注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (params) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    params.url = 'http://ajax.frontend.itheima.net' + params.url
   
    //判断含有/my/开头的接口配置，可以使用这个函数的配置信息
    if (params.url.indexOf("/my/") !== -1) { 
        params.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
})

