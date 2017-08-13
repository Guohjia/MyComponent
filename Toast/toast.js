
function Toast(message, time) {
    this.message = message;
    this.dismissTime = time || 1000;
    this.createToast();
    this.showToast();
}

Toast.prototype = {
    createToast: function () {
        var tpl = '<div class="toast">' + this.message + '</div>';
        this.$toast = $(tpl);
        $('body').append(this.$toast)
    },
    showToast: function () {
        var _this = this;
        this.$toast.fadeIn(300, function () {
            setTimeout(function () {
                _this.$toast.fadeOut(300, function () {
                    _this.$toast.remove();
                })
            }, _this.dismissTime);
        });
    }
};

toast=(function(){
            return {
                init: function(message,time){
                    new Toast(message,time)
            }
    }            
})()




