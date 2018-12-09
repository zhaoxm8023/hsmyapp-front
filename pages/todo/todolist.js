import { queryJoinSchedule, queryScheduleById } from '../../service/service.js'
import { formatDate } from "../../utils/util.js"
//获取应用实例 
let app = getApp()
Page({
  data: {
    userInfo: {},
    schedule: null
  },
  onLoad: function (options) {
    var that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo,
      })
      console.log("======================nickName" + that.data.userInfo.nickName)
      that.querySchedulebyDate(that.getCurrentDate())
    })
    that.setData({
      date: that.getCurrentDate()
    })
    //获取会议室
    app.getMeetingRooms(function (meetingRooms) {
      //更新数据
      that.setData({
        meetingRooms: meetingRooms,
      })
    })
  },
  bindDateChange: function (e) {
    app.globalData.currentSelectedDate = e.detail.value
    this.setData({
      date: e.detail.value
    })
    this.querySchedulebyDate(e.detail.value)
  },
  //调用后台查询会议服务
  querySchedulebyDate: function (date) {
    var that = this;

    queryJoinSchedule(app.globalData.url, app.globalData.openId, date, that, app.globalData.token)
  },
  getCurrentDate: function () {
    return formatDate(new Date())

  },
  detail: function (e) {
    wx.navigateTo({
      url: '../schedule/detail/detail?currentscheduleId=' + e.currentTarget.dataset.scheduleid
    })
  },
  addSchedule: function (e) {
    wx.switchTab({
      url: '../schedule/add/add',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getCurrentMeetingRoomIndex(id) {
    var meetingRooms = this.data.meetingRooms;
    var index = 0;
    for (var i = 0; i < meetingRooms.length; i++) {
      if (meetingRooms[i].id == id) {
        index = i;
        return index;
      }
    }
  }
})
