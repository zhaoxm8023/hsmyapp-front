import { queryTeam, joinTeam } from "../../service/service.js"
let app=getApp()
Page({
  data: {
    teamIndex: 0,
  },
  onLoad: function (options) {
    var that = this;
    queryTeam(app.globalData.url, app, function (teams) {
      console.log("================appdata" + app.globalData.teams[0].name)
      that.setData({
        teams: app.globalData.teams
      })
      app.globalData.teamId = that.data.teams[0].id
    })
    this.setData({
      inviteBand: options.inviteBand
    })
  },
  bindSelectTeam: function (e) {
    console.log("选择的值：" + e.detail.value)
    this.setData({
      teamIndex: e.detail.value,

    })
    app.globalData.teamId = this.data.teams[e.detail.value].id
    console.log("选择的id" + app.globalData.teamId)
  },
  formSubmit:function(e){
    var data = e.detail.value
    if(data.name==""){
      wx.showModal({
        title: '姓名不能为空',
      })
    } else if (data.mobileNo==""){
      wx.showModal({
        title: '手机号不能为空',
      })
    } else if (data.token == ""){
      wx.showModal({
        title: '口令不能为空',
      })
    }
    else{
      joinTeam(app, data,this.data.inviteBand)
    }
    
  }
})
