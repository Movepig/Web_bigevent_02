$(function () {
    //文章类别展示
    initArtCateList();
    // 封装函数
    function initArtCateList() { 
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                var str = template("tpl_table", res)
                $('tbody').html(str)
            }
        })
    }

    // 显示添加文章分类列表（点击添加）
    var indexAdd = null
    $('#btnAdd').on('click', function () { 
        indexAdd = layer.open({
            type: 1,//当等于1的时候，确认框就没有了
            title: '添加文章分类',
            area: ['500px', '260px'],
            content:$('#dialog-add').html()
            
        })
    })

    //表单提交事件(添加)
    $('body').on('submit', '#form-add',function (e) { 
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                initArtCateList();
                layer.msg('添加成功');
                layer.close(indexAdd);
            }
        })
    })


    // 点击编辑（修改）

    var indexEdit = null
    $('tbody').on('click', '.btn-edit',function () { 
        indexEdit = layer.open({
            type: 1,//当等于1的时候，确认框就没有了
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html()
            
        });
        var Id = $(this).attr("data-id");
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) { 
                layui.form.val("form-edit",res.data)
            }
        })
    })

    //表单提交事件(编辑)
    $('body').on('submit', '#form-edit',function (e) { 
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) { 
                if (res.status !== 0) { 
                    return layer.msg(res.message)
                }
                layer.msg('更新数据成功');
                layer.close(indexEdit);
                initArtCateList();
            }
        })
    })

    //删除
    $("tbody").on('click', ".btn-delete", function () {
        var Id = $(this).attr("data-id");
        layer.confirm('是否确认删除', { icon: 3, title: '提示' },
            function (index) { 
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + Id,
                    success: function (res) { 
                        if (res.status !== 0) { 
                            return layer.msg(res.message)
                        }
                        initArtCateList();
                        layer.msg('删除成功')
                        layer.close(index)
                    }
                })
            })
     })
    
})