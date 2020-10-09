$(function () {
    getUserInfo()
    //点击退出
    $('#btnLogout').on('click', function () {
        // alert(1)
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.删除本地存储token
            localStorage.removeItem('token');
            // 2.返回登录页面
            location.href = "/login.html"
            layer.close(index);
        });
    })
})

//设置为全局变量（写在如口函数外边），后边好调用
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem("token") || ""
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderAvatar(res.data)
        },
        //无论成功或者失败，都会触发complete方法
        complete: function (res) {
            // console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //1.删除本地token
                localStorage.removeItem('token');
                // 2.强制返回登录页面
                location.href = "/login.html"
            }
        }

    })
}
//封装用户头像渲染函数
function renderAvatar(user) {
    //用户名（昵称优先nickname（有头像），没有则使用首字母）
    var name = user.nickname || user.username;
    //渲染到页面上
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //用户头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".user-avatar").hide()
    } else {
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".user-avatar").show().html(text)
    }
}