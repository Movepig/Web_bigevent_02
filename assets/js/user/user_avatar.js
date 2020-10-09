$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //点击上传事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })

    //修改裁剪图片
    var layer = layui.layer
    $('#file').on('change', function (e) {
        // console.log(this.files);
        var files = e.target.files;
        if (files.length === 0) {
            return layer.msg('请选择用户头像')
        }
        //  修改成功
        // 1. 拿到用户选择的文件
        var file = e.target.files[0]
        // 2. 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 3. 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

    })

    //上传头像
    $('#btnUpload').on('click', function () {
        // 获取裁剪头像(要拿到用户裁剪之后的头像)
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        //发送请求(把头像上传到服务器)
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar:dataURL
            },
            success: function (res) {
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                layer.msg('更换成功')
                window.parent.getUserInfo();
             }
        })
    })
})