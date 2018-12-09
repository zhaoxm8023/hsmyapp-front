
//获取应用实例 
let app = getApp()
Page({
  data: {
    
  },
  onLoad:function(options){
    let currentscheduleDetail = JSON.parse(options.currentschedule);
    console.log("============" + currentscheduleDetail.title)
    this.setData({
      currentscheduleDetail: currentscheduleDetail
    })
  },
})
