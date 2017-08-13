   function goTop(timeInterval,offset) {
        this.init(timeInterval,offset);
        this.bind();
        // this.btnVisible();//刚打开页面即做出判断
    }
    goTop.prototype = {
        init: function (timeInterval,offset) {
            this.timeInterval = parseInt(timeInterval, 10) || 300; //获取设置的默认回到顶部时间；默认回到顶部是时间为300ms
            this.offset = offset||500; //获取回到顶部按钮出现的时机,默认页面滚动500之后出现
            var _this=this; 
            this.backTop = $('<div class="back-top"> <span>^</span></div>')
                .appendTo('body').click(function () {
                    $('html,body').animate({
                        scrollTop: 0,
                    }, _this.timeInterval)
                })
        },
        btnVisible:function () {
            var scrollTop = $(window).scrollTop();
            (scrollTop > this.offset) ? this.backTop.fadeIn(500) : this.backTop.fadeOut(500);
        },
        bind:function(){
            var _this=this;
            $(window).on('scroll',function(){
                _this.btnVisible();
            })
        }
    }

gotop=(function(){
    return {
        init:function (time,position){
            new goTop(time,position)
        }
    }
})()
