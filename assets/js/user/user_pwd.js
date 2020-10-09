$(function () { 
    //校验规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,'密码必须是6到12位，且不能出现空格'
        ],
        samePwd: function (value) { 
            if(value === $("[name=oldPwd]").val()){
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) { 
            if(value !==  $("[name=newPwd]").val()){
                return '两次密码输入不一致'
            }
        }
    })

    // 提交修改密码表单
    var layer = layui.layer
    $('.layui-form').on('submit', function (e) { 
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data:$(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                layer.msg('修改密码成功')

                $('.layui-form')[0].reset()
            }
        })
    })
})