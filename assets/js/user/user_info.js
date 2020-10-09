$(function () { 
    // 1.定义校验规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) { 
                return '昵称长度为1-6位之间'
            }
         }
    })
    // 2.初始化用户信息
    initUserIndo();

    var layer = layui.layer;
    function initUserIndo() { 
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) { 
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                // 成功后进行渲染
                form.val('formUserInfo',res.data)
            }
        })
    }

    //表单点击重置
    $('#btnReset').on('click', function (e) {
        // alert(1)
        e.preventDefault();
        initUserIndo()
    })
    
    //表单提交
    $('.layui-form').on('submit', function (e) { 
        // 阻止表单默认行为 
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                layer.msg('修改用户信息成功')
                window.parent.getUserInfo();
            }
        })
    })

})