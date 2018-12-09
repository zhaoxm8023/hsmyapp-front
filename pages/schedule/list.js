var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
let app = getApp()
import { querySchedule } from "../../service/service.js"
import { formatDate } from "../../utils/util.js"
Page({
  data: {
    meetingRooms: [],
    schedules: [],
    sliderOffset: 0,
    sliderLeft: 0,
    hasEmptyGrid: false,
  },
  onLoad: function (options) {
    var that = this;
    if (app.globalData.currentSelectedDate == "") {
      app.globalData.currentSelectedDate = that.getCurrentDate();
    }
    that.setData({
      activeIndex: app.globalData.activeIndex,
    })
    //calendar
    const date = new Date(app.globalData.currentSelectedDate);
    const curYear = date.getFullYear();
    const curMonth = date.getMonth() + 1;
    const curDay = date.getDate();
    const weeksCh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    this.calculateEmptyGrids(curYear, curMonth);
    this.calculateDays(curYear, curMonth);
    this.setData({
      curYear,
      curMonth,
      curDay,
      weeksCh
    })
    //获取会议室
    app.getMeetingRooms(function (meetingRooms) {
      //更新数据
      that.setData({
        meetingRooms: meetingRooms,
        currentroomno: meetingRooms[0].roomNo,
        currentroomid: meetingRooms[0].id
      })
      //获取系统信息设置sliderleft
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            sliderLeft: (res.windowWidth / app.globalData.meetingRooms.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / app.globalData.meetingRooms.length * that.data.activeIndex
          })
          if(res.windowHeight<555){
            that.setData({
              scrollYStyle: "height: 200px;"
            })
          }else {
            that.setData({
              scrollYStyle: "height: 280px;"
            })
          }
        }
      });
      that.querySchedulebyDate(app.globalData.currentSelectedDate)
    })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      currentroomid: e.currentTarget.dataset.currentroomid,
      curDay: new Date().getDate(),
      schedules: [],
    });
    app.globalData.currentMeetingRoomIndex = e.currentTarget.id;
    app.globalData.activeIndex = e.currentTarget.id;
    this.querySchedulebyDate(this.getCurrentDate())
    app.globalData.currentSelectedDate = this.getCurrentDate()
    wx.switchTab({
      url: 'list',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  selectDate: function (e) {
    //设置当前日期全局变量，供后续增加操作使用
    app.globalData.currentSelectedDate = e.currentTarget.dataset.selecteddate;
    var that = this;
    that.setData({
      curDay: e.currentTarget.dataset.currentday
    })
    that.querySchedulebyDate(e.currentTarget.dataset.selecteddate)
    wx.switchTab({
      url: 'list',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //calendar
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push(i);
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    //清空数据
    this.setData({
      schedules: []
    })
    const handle = e.currentTarget.dataset.handle;
    const curYear = this.data.curYear;
    const curMonth = this.data.curMonth;
    if (handle === 'prev') {
      let newMonth = curMonth - 1;
      let newYear = curYear;
      if (newMonth < 1) {
        newYear = curYear - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        curYear: newYear,
        curMonth: newMonth,
        curDay: "1"
      })

    } else {
      let newMonth = curMonth + 1;
      let newYear = curYear;
      if (newMonth > 12) {
        newYear = curYear + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        curYear: newYear,
        curMonth: newMonth,
        curDay: "1"
      })
    }

    if (this.data.curMonth == new Date().getMonth() + 1) {
      this.querySchedulebyDate(this.getCurrentDate())
      this.setData({
        curDay: new Date().getDate()
      })
    } else {
      var month = this.data.curMonth > 9 ? this.data.curMonth.toString() : ('0' + this.data.curMonth.toString())
      var day = this.data.curDay > 9 ? this.data.curDay.toString() : ('0' + this.data.curDay.toString())
      var date = this.data.curYear.toString() + '-' + month + '-' + day;
      app.globalData.currentSelectedDate = date
      this.querySchedulebyDate(date)
    }

  },
  getCurrentDate: function () {

    return formatDate(new Date())

  },
  detail: function (e) {
    wx.navigateTo({
      url: '../schedule/detail/detail?currentscheduleId=' + e.currentTarget.dataset.currentscheduleid
    })
  },
  querySchedulebyDate: function (date) {
    querySchedule(app.globalData.url, this.data.meetingRooms[app.globalData.currentMeetingRoomIndex].id, date, this,app.globalData.token,app.globalData.openId)
  },  
  addSchedule: function (e) {
    wx.switchTab({
      url: '../schedule/add/add',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
});
