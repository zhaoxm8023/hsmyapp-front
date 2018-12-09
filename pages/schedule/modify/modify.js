var app = getApp()
import { validateInput, modifySchedule,deleteSchedule } from "../../../service/service.js" 
Page({
  data: {
    meetingRoomIndex: app.globalData.currentMeetingRoomIndex,
    repeatModes: [
      {
        repeatMode: "N",
        repeatModeName: "不重复"
      },
      {
        repeatMode: "W",
        repeatModeName: "按周重复"
      }
    ],
    repeatModeIndex: 0,
    meetingRoomIndex: app.globalData.currentMeetingRoomIndex,
  },
  bindDateChange: function (e) {
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
    let currentschedule = JSON.parse(options.currentschedule);
    this.setData({
      scheduleid: currentschedule.id,
      title: currentschedule.title,
      roomNo: currentschedule.meetingRoom.roomNo,
      meetingRoomId: currentschedule.meetingRoom.id,
      date: currentschedule.date,
      startTime: currentschedule.startTime,
      endTime: currentschedule.endTime,
      repeatMode: currentschedule.repeatMode,
      vnedor: currentschedule.meetingRoom.vnedor,
      terminalId: currentschedule.meetingRoom.terminalId


    })
  },
  delete: function (e) {
    deleteSchedule(app.globalData.url, e.currentTarget.dataset.scheduleid, app.globalData.token, app.globalData.openId)
  },
  formSubmit: function (e) {
    var that = this;
    var data = e.detail.value
    if (validateInput(data)) {
      modifySchedule(app.globalData.url, data, that.data.meetingRoomId,that.data.scheduleid,app.globalData.token,app.globalData.openId,data.formId)
    }

  },
});
