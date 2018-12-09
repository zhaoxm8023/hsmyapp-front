let app = getApp()
import { validateInput,addSchedule } from "../../../service/service.js" 
Page({
  data: {
    meetingRoomIndex: app.globalData.currentMeetingRoomIndex,
    repeatModeIndex: 0,
    startTime: "09:00",
    endTime: "12:00",
    repeatModes: [
      {
        repeatMode: "N",
        repeatModeName: "不重复"
      },
      {
        repeatMode: "W",
        repeatModeName: "按周重复"
      }
    ]
  },
  bindSelectRepeatMode: function (e) {
    this.setData({
      repeatModeIndex: e.detail.value
    })
  },
  bindDateChange: function (e) {
    app.globalData.currentSelectedDate = e.detail.value
    this.setData({
      date: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },
  onLoad: function (options) {
    var that = this
    //获取会议室
    app.getMeetingRooms(function (meetingRooms) {
      //更新数据
      that.setData({
        meetingRooms: meetingRooms,
        vnedor: meetingRooms[0].vnedor == null ? "无" : meetingRooms[0].vnedor,
        terminalId: meetingRooms[0].terminalId == null ? "无" : meetingRooms[0].terminalId,
      })
    })
    that.setCurrentDate();

  },
  onShow: function () {
    var meetingRoomIndex = app.globalData.currentMeetingRoomIndex;
    this.setData({
      meetingRoomIndex: meetingRoomIndex,
      vnedor: this.data.meetingRooms[meetingRoomIndex].vnedor == null ? "无" : this.data.meetingRooms[meetingRoomIndex].vnedor,
      terminalId: this.data.meetingRooms[meetingRoomIndex].terminalId == null ? "无" : this.data.meetingRooms[meetingRoomIndex].terminalId,
      date: app.globalData.currentSelectedDate
    })

  },
  bindSelectMeetingRoom: function (e) {
    app.globalData.currentMeetingRoomIndex = e.detail.value
    app.globalData.activeIndex = e.detail.value
    this.setData({
      meetingRoomIndex: e.detail.value,
      vnedor: this.data.meetingRooms[e.detail.value].vnedor == null ? "无" : this.data.meetingRooms[e.detail.value].vnedor,
      terminalId: this.data.meetingRooms[e.detail.value].terminalId == null ? "无" : this.data.meetingRooms[e.detail.value].terminalId
    })
  },
  setCurrentDate: function () {
    var util = require('../../../utils/util.js');
    this.setData({
      date: util.formatDate(new Date())
    })
  },
  formSubmit: function (e) {
    var that = this;
    var data = e.detail.value
    if (validateInput(data)) {
      addSchedule(app.globalData.url, data, app.globalData.userInfo, app.globalData.openId,app.globalData.token,e.detail.formId)
    }

  },
});