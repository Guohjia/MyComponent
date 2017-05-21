class Dialog {
    constructor() {
        let defaultoptions = {
            title: '',
            content: '',
        }
        this.creatDialog();
        this.bindEvents();
        this.dialog = $('.dialog')
    }
    creatDialog() {
        var $dialog = '<div class="coverage"></div>'
            + '<div class="dialog">'
            + '<div class="header">'
            + '<h3></h3><span class="btn-close"></span>'
            + '</div>'
            + '<div class="content">'
            + '</div>'
            + '<div class="footer">'
            + '<a href="javascript:void(0)" class="cancel">Cancel</a>'
            + '<a href="javascript:void(0)" class="confirm">Confirm</a>'
            + '</div>'
            + '</div>';
        this.dialog = $dialog //便于之后调用
        $('body').prepend(this.dialog)
    }

    setOptions(options) {
        if (typeof options === 'string') {
            this.options = $.extend({}, this.defaultoptions, { content: options });
        } else if (typeof options === 'object') {
            this.options = $.extend({}, this.defaultoptions, options);
        }
        this.setDialog();
    }

    setDialog() {   
        if (!this.options.title) {
            this.dialog.find('.header').hide();
        } else {
            this.dialog.find('.header').show();
        }
        this.dialog.find('.header h3').text(this.options.title);
        this.dialog.find('.content').html(this.options.content);
        this.showDialog();
    }

    showDialog() {
        var _this = this;
        $('.coverage').fadeIn(800);
        this.dialog.fadeIn(800, function () {
        });
    }

    hideDialog() {
        var _this = this;
        $('.coverage').fadeOut(800);
        this.dialog.fadeOut(800, function () {
        });
    }

    bindEvents() {
        var _this = this;
        var choose = '<li>chose1</li><li>chose2</li><li>chose3</li><li>chose4</li><li>chose5</li>'
        $('.open1').on('click', function () {
                _this.setOptions('Hello,everyone')

        })
        $('.open2').on('click', function () {
                _this.setOptions('This is my first satisfying Dialog')

        })
        $('.open3').on('click', function () {
                _this.setOptions({ title: 'Your Choose', content: choose })

        })
        $('.open4').on('click', function () {
                _this.setOptions({ title: 'Your Advice', content: 'How do you feel about my dialog' })

        })
        $('.open5').on('click', function () {
                _this.setOptions({ title: 'GoodBye', content: 'Bye Bye! See you Next Time!' })

        })
        $('.btn-close').on('click', function () {
            _this.hideDialog();
        })
        $('.cancel').on('click', function () {
            alert('You have canceled!')
            _this.hideDialog();

        })
        $('.confirm').on('click', function () {
            alert('You have confirmed!')
            _this.hideDialog();
        })
    }
}


