//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    msg:'http://172.17.0.197:8080/agileworking/'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log("===============home.js================")
  },
  clickMe:function(){
    this.setData({msg:"You make me happy"})
  }

})
