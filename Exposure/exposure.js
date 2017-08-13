class Exposure {
    constructor($node) {
        this.node = $node;
        this.bindScroll();
        this.check();
    }
    bindScroll() {
        var _this = this;
        $(window).on('scroll', function () {   //注意$(window)污染this，所以外面要套一个funcition;on('scroll',_this.check)会报错；
            _this.check();
        })
    }
    show($imgs) {
        $imgs.each(function () {
            var imgUrl = $(this).attr('data-src');
            $(this).attr('src', imgUrl);
            $(this).addClass('showed')   //showed 标签作为已经加载的标志，避免再次判断isVisible
            console.log(1)  //图片懒加载比较快，不能直接判断懒加载，console.log(1)作为判断懒加载的标志,表示已经出现在页面中完成加载；
        })
    }

    check() {
        var _this = this;
        this.node.not('.showed').each(function () {

            if (_this.isVisible($(this))) {
                _this.show($(this))  //callback;
            }
        })
    }

    isVisible($node) {
        var windowHeight = $(window).height(),  //窗口高度
            scrollTop = $(window).scrollTop(),  //滚动距离
            offsetTop = $node.offset().top,  //结点距离顶部高度
            nodeHeight = $node.height();  //结点自身高度
        if (scrollTop + windowHeight > offsetTop && scrollTop < offsetTop + nodeHeight) {   //结点滚入页面&&结点滚入页面之后没有滚出去
            return true;
        } else {
            return false;
        }
    }

}

load = (function () {
        return {
            init: function ($content) {
                new Exposure($content)
            }
        }
})()