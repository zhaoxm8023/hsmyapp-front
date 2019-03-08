//app.js
import { getOpenId } from "service/service.js"
App({
  
  onLaunch: function () {
    var that=this
    //登录获取openId
    wx.login({
       success(res){
        getOpenId(that,res.code,function(openId){
        that.globalData.openId=openId
        app.globalData.openId = openId
       })
       console.log("===========url:" + that.globalData.url)
       console.log("===========openId:" + that.globalData.openId)
      }
    }),
    wx.setTabBarBadge({
      index: 1,
      text: '5' //可改 
    });
    wx.setTabBarBadge({
      index: 2,
      text: 'new' //可改 
    });
  },
  globalData: {
    userInfo: null,
    url: 'http://localhost:8000/app/',
    openId: '',
  },  
})