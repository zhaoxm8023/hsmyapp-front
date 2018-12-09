import { getOpenId } from "service/service.js" 
App({
  getMeetingRooms: function (cb) {
    var that = this
    if (this.globalData.meetingRooms) {
      typeof cb == "function" && cb(this.globalData.meetingRooms)
    } else {
      wx.request({
        url: that.globalData.url + 'meetingRooms'+'/'+this.globalData.teamId,
        method: 'GET',
        header: {
          Authorization:that.globalData.token,
          Subject: that.globalData.openId
        },
        success: function (res) {
          that.globalData.meetingRooms = res.data.payload
          typeof cb == "function" && cb(that.globalData.meetingRooms)
        },
        fail: function () {
          console.log("========================查询会议室失败=================")
        }
      })
    }
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  onLaunch: function (options) {
    //获取openId
    var that = this
    wx.login({
      success: function (res) {
        getOpenId(that,res.code,function(openId){
          that.globalData.openId=openId
        })
      
      }
    })
    //获取用户信息
    this.getUserInfo(function (userInfo) {
      that.globalData.userInfo = userInfo
      console.log("=============userInfo=================" + userInfo.openId)
    })
  },
  globalData: {
    meetingRooms: null,
    currentMeetingRoomIndex: 0,
    currentSelectedDate: "",
    activeIndex: 0,
    userInfo: null,
    url: 'http://127.0.0.1:8080/agileworking/',
    openId: '',
    teams: null,
    member:null,
    teamIndex:0,
    teamId:'',
  }
})
