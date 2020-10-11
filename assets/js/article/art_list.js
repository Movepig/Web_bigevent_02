$(function () {
    var layer = layui.layer;
    var form = layui.form

    //2. 美化时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr);
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());
        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    //2.1 补0
    function padZero(n) {
        return n > 9 ? n : '0' + n;
    }

    //0. 定义查询参数
    var p = {
        pagenum: 1,     //	页码值
        pagesize: 2,    //	每页显示多少条数据
        cate_id: "",    //	文章分类的 Id
        state: "",      //	文章的状态，可选值有：已发布、草稿
    };
    initTable()
    initCate()

    //1. 获取表格中的数据(文章列表)
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: p,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var str = template('tpl_table', res);
                $('tbody').html(str)
                //分页
                renderPage(res.total)
            }
        })
    }

    //3. 获取所有分类中所添加的后台数据（文章分类）
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl_cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }


    //4.筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        // 获取值
        var state = $("[name=state]").val();
        var cate_id = $("[name=cate_id]").val();
        //赋值
        p.state = state;
        p.cate_id = cate_id
        //初始化列表
        initTable()
    })

    //5.分页
    var laypage = layui.laypage
     function renderPage(total) {
        // alert(num)
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: p.pagesize,//每页显示的条数
            curr: p.pagenum,//起始页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],//count（总条目输区域）、prev（上一页区域）、page（分页区域）、next（下一页区域）、limit（条目选项区域）、refresh（页面刷新区域。注意：layui 2.3.0 新增） 、skip（快捷跳页区域）
            limits:[2,3,5,7],
            // 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function (obj, first) {
                // 把最新的页码值，
                p.pagenum = obj.curr;
                p.pagesize = obj.limit;
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 如果 first 的值为 true，证明是方式2触发的
                // 否则就是方式1触发的
                if (!first) (
                    initTable()
                )
            }
        });

    }


    //6.点击删除
    var layer = layui.layer
    $('tbody').on('click', '#btn-delete', function () { 
        var Id = $(this).attr('data-id');
        layer.confirm('是否确认删除？', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + Id,
                success: function (res) { 
                    if (res.status !== 0) { 
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    if ($('#btn-delete').length == 1 && p.pagenum > 1) p.pagenum--;
                    initTable()
                }
            })
            
            
          });
    })
})