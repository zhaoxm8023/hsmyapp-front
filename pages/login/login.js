let app = getApp();
import { queryTeam, queryTeamMember, getOpenId ,qryDemo} from "../../service/service.js"
Page({
  data: {
    teamIndex: 0,
  },
  onLoad: function (options) {
    var that = this
    queryTeam(app.globalData.url, app, function (teams) {
      that.setData({
        teams: app.globalData.teams
      })
      app.globalData.teamId = that.data.teams[0].id
    })
    try {
      var isLogin = wx.getStorageSync('isLogin')
      if(isLogin){
        this.loginBtnClick()
      } 
    } catch (e) {
      
    }
    
  },
  bindSelectTeam: function (e) {
    console.log("选择的值：" + e.detail.value)
    this.setData({
      teamIndex: e.detail.value,

    })
    app.globalData.teamIndex = e.detail.value
    app.globalData.teamId = this.data.teams[e.detail.value].id
    console.log("选择的id" + app.globalData.teamId)
  },

  onGotUserInfo: function (e) {
    //qryDemo(app.globalData.url, app.globalData.token,app.globalData.openId)
    console.log("=====11111111=====")
    console.log(app.globalData.token)
    console.log(app.globalData.openId)
    
    console.log(e.detail.errMsg)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
  },

  loginBtnClick: function (e) {

    var that = this
    if (app.globalData.teamId == '' || app.globalData.openId == '') {
      wx.showLoading({
        title: '加载中',
      })
      queryTeam(app.globalData.url, app, function (teams) {
        that.setData({
          teams: app.globalData.teams
        })
        app.globalData.teamId = that.data.teams[0].id
        if (app.globalData.openId == '') {
          wx.login({
            success: function (res) {
              getOpenId(app, res.code, function (openId) {
                app.globalData.openId = openId
                wx.hideLoading()
                queryTeamMember(app.globalData.url, app, function (member) {
                  console.log("回调函数")
                  if (app.globalData.member != null) {
                    wx.setStorageSync('isLogin', true)
                    wx.switchTab({
                      url: '../schedule/list',
                    })
                  }
                  else {
                    wx.navigateTo({
                      url: '../regist/regist',
                    })
                  }
                })
              })
            }
          })
        } else {
          wx.hideLoading()
          queryTeamMember(app.globalData.url, app, function (member) {
            console.log("回调函数")
            if (app.globalData.member != null) {
              wx.setStorageSync('isLogin', true)
              wx.switchTab({
                url: '../schedule/list',
              })
            }
            else {
              wx.navigateTo({
                url: '../regist/regist',
              })
            }
          })
        }
      })
    }
    else{
      queryTeamMember(app.globalData.url, app, function (member) {
        console.log("回调函数")
        if (app.globalData.member != null) {
          wx.setStorageSync('isLogin', true)
          wx.switchTab({
            url: '../schedule/list',
          })
        }
        else {
          wx.navigateTo({
            url: '../regist/regist',
          })
        }
      })
    }
  }
})
