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
       })
       console.log("===========url:" + that.globalData.url)
       console.log("===========openId:" + that.globalData.openId)
      }
    })
      
    

  },
  globalData: {
    userInfo: null,
    url: 'http://localhost:8000/app/',
    openId: '',
  },
})