//index.js
import { isRegister } from "../../service/service.js"
//获取应用实例
const app = getApp()

Page({
  data: {
    // 判断小程序最新版的获取用户信息api是否能用
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openId:app.globalData.openId
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wx.getSetting({
      success(res){
        if (res.authSetting['scope.userInfo']){
          // 已经授权，可以直接获取用户信息
          wx.getUserInfo({
            success(res){
              app.globalData.userInfo = res.userInfo
              console.log("==========userInfo1:" + res.userInfo)
            }
          })
        }
      }
    })
   
  },
  bindGetUserInfo(res){
    app.globalData.userInfo = res.detail.userInfo
    console.log("==========userInfo2:" + app.globalData.userInfo)
    var that = this
    isRegister(app,app.globalData.openId,function(isRegit){
      console.log("=========status:" + isRegit)
      if(isRegit == '1'){
        wx.navigateTo({
          url: '../register/register',
        })
      } else if (isRegit == '0'){
        console.log("============已注册！============")
        wx.switchTab({
          url: '../main/main',
        })
      }

    })
  }
})
