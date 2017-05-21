let dom = {
    every: function (nodeList, fn) {
        for (var i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i], i)
        }
        return nodeList
    },
    onSwipe: function (element, fn) {
        let x0, y0
        element.addEventListener('touchstart', function (e) {
            x0 = e.touches[0].clientX                          //touch为触摸屏手指放上去触发的事件
            y0 = e.touches[0].clientY
        })
        element.addEventListener('touchmove', function (e) {   //touchmove 为触摸屏手指移动时触发的事件
            if (!x0 || !y0) {
                return
            }
            let xDiff = e.touches[0].clientX - x0
            let yDiff = e.touches[0].clientY - y0

            if (Math.abs(xDiff) > Math.abs(yDiff)) {   //判断总体是在水平移动 还是 上下移动
                if (xDiff > 0) {                       //总体水平移动
                    fn.call(element, e, 'right')
                } else {
                    fn.call(element, e, 'left')
                }
            } else {                                //总体上下移动
                if (yDiff > 0) {
                    fn.call(element, e, 'down')
                } else {
                    fn.call(element, e, 'up')
                }
            }
            x0 = undefined;
            y0 = undefined;
        })
    }
}
class FullPage {
    constructor(options) {
        let defaultoptions = {
            element: '',
            duration: '1s',
        }
        this.currentIndex = 0; //初始化当前所在页号
        this.options = Object.assign({}, defaultoptions, options) //将后面两个对象复制到this.options,this指的是FullPage这个类，options是new一个类的时候传递过来的对象，this.options就是FullPage这个类里面的options对象；
        this.animating = false;
        this.checkOptions().initHtml().bindEvents();

    }
    checkOptions() {    //判断是否element是否为空
        if (!this.options.element) {
            throw new Error('element is required')
        }
        return this;
    }

    initHtml() {
        this.options.element.style.overflow = 'hidden';///避免出现滚轮 保证每一个section都是铺满整个屏幕
        dom.every(this.options.element.children, section => {
            section.style.transition = `transform ${this.options.duration}`    //设置跳转时间
        })
        return this
    }

    bindEvents() {
        this.options.element.addEventListener('wheel', e => {          //滚轮事件判断用户向上or向下滚 执行goTOsection转换页面
            let targetIndex = this.currentIndex + (e.deltaY > 0 ? 1 : -1)   //e.deltaY>0,页面往下走，即展示下一页；<0则展示上一页

            this.goTosection(targetIndex).then(
                () => {
                    this.currentIndex = targetIndex; //goTosection执行成功，即滚动成功，目标页数变为当前页数，否则什么都不做，执行空函数
                },
                () => {}
            )
        })
        dom.onSwipe(this.options.element, (e, dir) => {
            
            let targetIndex
            if (dir === 'down') {
                targetIndex = this.currentIndex - 1
            } else if (dir === 'up') {
                targetIndex = this.currentIndex + 1
            } else {
                return
            }
            this.goTosection(targetIndex).then(
                () => {
                    this.currentIndex = targetIndex     
                },
                () => {}
            )
        })
        return this // onSwipe方法判断用户移动端触摸的手指动作，或者是屏幕可触摸的pc端
    }


    goTosection(targetIndex) {

        return new Promise((resolve, reject) => {
            if (this.animating) {
                reject()
            } else if (targetIndex < 0) {
                reject()
            } else if (targetIndex >= this.options.element.children.length) {
                reject()
            } else {
                this.animating = true
                let that = this
                this.options.element.children[0].addEventListener('transitionend', function callback() {   ///为了在页面转换完成之后打开状态锁，children[0]是因为每一次转换，第一页总是会动,只是一个标识而已,children都无所谓，每一页都会动
                    this.removeEventListener('transitioned', callback)  //转换完成之后去掉监听函数
                    that.animating = false
                    resolve()  //表示以成功状态返回对象，继续跟随then，执行then函数中的this.currentIndex = targetIndex；如果没有resolve，则表示失败，执行then第二个空函数
                })
                dom.every(this.options.element.children, section => {
                    section.style.transform = `translateY(-${100 * targetIndex}%)`
                    // section.style.transform = `translateY(-${100 * targetIndex}%)` 
                })
            }
        })
    }
}


