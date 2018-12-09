let app = getApp()
import { joinSchedule, queryTeamMember, queryScheduleById, getOpenId } from "../../../service/service.js"
Page({
  data: {
    isHidden: false,
    jhDataForTabbar: [
      {
        sIconUrl: "../../../images/base/schedule-invite-selected.png",
        sTitle: "邀请同事",
        event: "invite",
        openType: "share"
      },
      {
        sIconUrl: "../../../images/base/schedule-modify-selected.png",
        sTitle: "编辑会议",
        event: "modify"
      },
    ]
  },
  onLoad: function (options) {
    var that = this;
    queryScheduleById(app.globalData.url, options.currentscheduleId, app.globalData.token, app.globalData.openId, this, function (schedule) {
      var currentschedule = JSON.stringify(schedule);
      that.setData({
        currentschedule: currentschedule,
        currentscheduleDetail: schedule,

      })
    })
    if (options.isInvite == "true") {
      this.setData({
        jhDataForTabbar: [
          {
            sIconUrl: "../../../images/base/acceptInvite.png",
            sTitle: "接受邀请",
            event: "acceptInvite"
          },
          {
            sIconUrl: "../../../images/base/noAccpetInvite.png",
            sTitle: "拒绝邀请",
            event: "notAcceptInvite"
          }
        ]
      })

    }
    if (options.isHidden == "true") {
      this.setData({
        isHidden: true
      })
      wx.showToast({
        title: '已加入会议',
      })

    }
  },
  onShow: function () {

  },
  modify: function () {
    var that = this;
    if (app.globalData.openId != that.data.currentscheduleDetail.creatorOpenId) {
      wx.showModal({
        title: '无权限编辑',
        content: '只有创建者' + that.data.currentscheduleDetail.creatorNickName + '能编辑',
      })
    } else {
      wx.navigateTo({
        url: '../modify/modify?currentschedule=' + that.data.currentschedule,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }

  },
  acceptInvite: function (e) {
    var that = this
    app.globalData.teamId = that.data.currentscheduleDetail.meetingRoom.teamId
    if (app.globalData.member == null) {
      if (app.globalData.openId == '') {
        wx.showLoading({
          title: '加载中',
        })
        wx.login({
          success: function (res) {
            getOpenId(app, res.code, function (openId) {
              app.globalData.openId = openId
              wx.hideLoading()
              queryTeamMember(app.globalData.url, app, function (member) {
                console.log("回调函数")
                if (app.globalData.member != null) {
                  wx.hideLoading()
                  joinSchedule(app.globalData.url, app.globalData.userInfo, that.data.currentscheduleDetail, app.globalData.openId, app.globalData.token, e.detail.formId)
                }
                else {
                  wx.hideLoading()
                  wx.navigateTo({
                    url: '../../regist/regist?inviteBand=y',
                  })
                }
              })
            })
          }
        })
      }
      else {
        console.log('called2========================')
        queryTeamMember(app.globalData.url, app, function (member) {
          if (app.globalData.member != null) {
            joinSchedule(app.globalData.url, app.globalData.userInfo, that.data.currentscheduleDetail, app.globalData.openId, app.globalData.token, e.detail.formId)
          }
          else {
            wx.navigateTo({
              url: '../../regist/regist?inviteBand=y',
            })
          }
        })
      }
    } else {
      console.log('called=========================')
      joinSchedule(app.globalData.url, app.globalData.userInfo, that.data.currentscheduleDetail, app.globalData.member.openId, app.globalData.token, e.detail.formId)
    }

  },
  notAcceptInvite: function () {
    wx.navigateBack({
    })
  },
  onShareAppMessage: function (res) {
    wx.showShareMenu({
      withShareTicket: false
    })
    var that = this;
    if (res.from == 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '邀请您加入会议:' + that.data.currentscheduleDetail.title,
      path: 'pages/schedule/detail/detail?currentscheduleId=' + that.data.currentscheduleDetail.id + '&isInvite=true',
      success: function (res) {
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
