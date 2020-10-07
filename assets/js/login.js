$(function () {
    //1 点击“去注册账户”显示影藏
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击“去登录”显示影藏
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })



    //2自定义验证规则
    var form = layui.form;
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,16}$/,"密码必须6-16位，且不能输入空格"
        ],
        //两次密码确认校验规则
        repwd: function (value) { 
            var pwd = $(".reg-box [name=password]").val();
            // 判断
            if (pwd !== value) {
                return '两次密码输入不正确'
             }
        }
    })

    //3.注册功能
    //监听注册表单的提交事件
    var layer = layui.layer;
    $("#form_reg").on('submit', function (e) {
        //阻止表单默认行为
        e.preventDefault();
        //发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val()
            },
            success: function (res) { 
                if (res.status != 0) { 
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                //模拟手动点击a链接
                $('#link-login').click();
            }
        })
    })
    
    // 监听登录表单的提交事件
    $("#form_login").submit(function (e) {
        // 阻止表单默认行为
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                //将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
     })
})