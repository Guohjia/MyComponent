class Calendar {
  constructor($target) {
    this.$target = $target;
    this.init();
    this.render();
    this.setDate();
    this.bind();
  }
  init() {
    if (this.$target.attr('date-init')) {
      this.date = new Date(this.$target.attr('date-init'));   //用于记录当前日期或者指定的要展示的日期
      this.watchDate = new Date(this.$target.attr('date-init'));  //用户在切换月份时所看到的日期;其初始为当前日期
    } else {
      this.date = new Date();
      this.watchDate = new Date();
    }
  }

  render() {
    var tpl = '<div class="date-picker">'
      + '<div class="header"><span class="pre caret-left"></span><span class="cur header-date"></span><span class="next caret-right"></span></div>'
      + ' <table class="panel">'
      + '  <thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>'
      + ' <tbody></tbody>'
      + '</table>'
      + '</div>'
    this.$datapicker = $(tpl);
    this.$datapicker.insertAfter(this.$target).css({ 'display':'none','position': 'absolute', 'left': this.$target.offset().left, 'top': this.$target.offset().top + this.$target.height(true) })
    // $(tpl).find('tbody').html('');
  }

  setDate() {
    //  this.$datepicker.find('tbody').html('');
    var firstDay = this.getFirstDay(this.watchDate),
      lastDay = this.getLastDay(this.watchDate);
    var dateArr = [];

    for (var i = firstDay.getDay(); i > 0; i--) {   //i代表当前日子是本星期的第几天(以星期天为第一天)
      var d = new Date(firstDay.getTime() - i * 24 * 60 * 60 * 1000); //获取之前的日子
      dateArr.push({ type: 'pre', date: d });
    }  //获取当前月份第一个星期(前一个月)的几天

    for (var j = 0; j < lastDay.getDate() - firstDay.getDate() + 1; j++) { //getDate()代表获取一个月的第几天,循环次数就代表一个月的天数
      var d = new Date(firstDay.getTime() + j * 24 * 60 * 60 * 1000);
      dateArr.push({ type: 'cur', date: d });
    } //获取当前月份的所有日子

    for (var k = 1; k < 7 - lastDay.getDay(); k++) {
      var d = new Date(lastDay.getTime() + k * 24 * 60 * 60 * 1000);
      dateArr.push({ type: 'next', date: d })
    } //获取当前月份最后一个星期(下一个月)的剩余日子

    this.$datapicker.find('.header-date').text(this.watchDate.getFullYear() + '年' + (this.watchDate.getMonth() + 1) + '月');

    var tpl = '';
    for (var i = 0; i < dateArr.length; i++) {
      if (i % 7 === 0) {
        tpl = '<tr>' + tpl;
      }

      tpl += '<td class="';
      if (dateArr[i].type === 'pre') {
        tpl += 'pre-month';
      } else if (dateArr[i].type === 'cur') {
        tpl += 'cur-month'
      } else {
        tpl += 'next-month'
      }

      if (this.getYYMMDD(this.date) === this.getYYMMDD(dateArr[i].date)) {
        tpl += ' cur-date'
      }
      tpl += '"';

      tpl += 'data-date="' + this.getYYMMDD(dateArr[i].date) + '">';
      tpl += this.toFixed(dateArr[i].date.getDate()) + '</td>';

      if (i % 7 === 6) {
        tpl = tpl + '</tr>'
      }
    }
    this.$datapicker.find('tbody').html(tpl)
  }


  //获取 date 所在月份的第一天的时间对象
  getFirstDay(date) {
    var year = date.getFullYear(), //获取当前日期的年份
      month = date.getMonth(); //获取当前日期的月份，注意0代表1月
    var newDate = new Date(year, month, 1);
    return newDate;

  }


  //获取 date 所在月份最后一天的时间对象
  getLastDay(date) {
    var year = date.getFullYear(),
      month = date.getMonth();
    month++;

    if (month > 11) {
      month = 0;
      year++;
    }
    var newDate = new Date(year, month, 1); //(2017,0,1)代表2017年的1月1日,(2017,1,1)代表2017年的2月1日,
    return new Date(newDate.getTime() - 1000 * 60 * 60 * 24); //用下一个月的第一天减去一天来获取每个月的最后一天
  }

  // isValidDate(dateString) {
  //   return new Date(dateString).toString() !== ;
  // }

  getYYMMDD(date) {
    var yy = date.getFullYear(),
      mm = date.getMonth() + 1
    return date.getFullYear() + '/' + this.toFixed(date.getMonth() + 1) + '/' + this.toFixed(date.getDate())
  }

  toFixed(n) {
    return (n + '').length === 1 ? ('0' + n + '') : (n + '');
  }//使数字格式合理，如果日期尾数只有1位，则变为0x; 1-> '01' 11'->'11'

  getPreMonth(date) {
    var year = date.getFullYear(),
      month = date.getMonth();
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    return new Date(year, month, 1)
  }

  getNextMonth(date) {
    var year = date.getFullYear(),
      month = date.getMonth();
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    return new Date(year, month, 1)
  }

  bind() {
    var _this = this;
    this.$datapicker.find('.pre').on('click', function () {
      _this.watchDate = _this.getPreMonth(_this.watchDate);
      _this.setDate();
    });
    this.$datapicker.find('.next').on('click', function () {
      _this.watchDate = _this.getNextMonth(_this.watchDate);
      _this.setDate();
    })
    this.$datapicker.on('click', '.cur-month', function () {
      _this.$target.val($(this).attr('data-date'))
      _this.$datapicker.hide();
    })
    this.$target.on('click', function(e){
          e.stopPropagation();
          $('.date-picker').hide();//两个日历不同时显示
          _this.$datapicker.show();
        });
    this.$datapicker.on('click', function (e) {
      e.stopPropagation();  //阻止默认事件，表单向后台发送请求提交数据
    })
    $(window).on('click', function (e) {
      _this.$datapicker.hide();
    })
  }
}