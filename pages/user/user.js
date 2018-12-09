import { queryTeam, queryTeamMember } from "../../service/service.js"
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    queryTeam(app.globalData.url, app, function (teams) {
      that.setData({
        team: app.globalData.teams[app.globalData.teamIndex]
      })
      queryTeamMember(app.globalData.url, app, function (member) {
        that.setData({
          userInfo:member
        })
      })

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  todo:function(){
  wx.navigateTo({
    url: '../todo/todolist',
  })
  },
  logout:function(){
    wx.showModal({
      title: '退出当前登录？',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('isLogin', false)
        wx.navigateTo({
          url: '../login/login',
        })
        } else if (res.cancel) {
          wx.navigateBack({
          })
        }
      }
    })
  }
})
