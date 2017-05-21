class Tab {
    constructor(wrap) {
        this.wrap = wrap;
        this.init().bind()
    }
    init() {
        var tab = this.wrap.querySelector('.tab')
        var tabLi = this.wrap.querySelectorAll('.tab li')
        var contentLi = this.wrap.querySelectorAll('.content li')
        this.tab=tab;
        this.tabLi=tabLi;
        this.contentLi=contentLi; 
        return this
    }
    bind() {
        var _this=this;
        this.tab.addEventListener('click', function (e) {
            if (e.target.tagName.toLowerCase() === 'li') {
                for (var i = 0; i < _this.tabLi.length; i++) {
                    _this.tabLi[i].classList.remove('chosen')
                    _this.contentLi[i].classList.remove('active')
                }
                e.target.classList.add('chosen')
                var index = [].indexOf.call(_this.tabLi, e.target)
                _this.contentLi[index].classList.add('active')
            }
        })
    }
}



// var tab1 = new Tab(document.querySelectorAll('.wrap')[0])
// var tab2=new Tab(document.querySelectorAll('.wrap')[1])


//原生JS封装之前
// var tab = document.querySelector('.tab')
// var tabLi = document.querySelectorAll('.tab li')
// var contentLi = document.querySelectorAll('.content li')
// tab.addEventListener('click', function (e) {
//     if (e.target.tagName.toLowerCase() === 'li') {
//         for (var i = 0; i < tabLi.length; i++) {
//             tabLi[i].classList.remove('chosen')
//             contentLi[i].classList.remove('active')
//         }
//         e.target.classList.add('chosen')
//         var index = [].indexOf.call(tabLi, e.target)
//         contentLi[index].classList.add('active')
//     }
// })

