// pages/infopub/info/info.js
import { getOneInfo } from "../../../service/service.js"
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoTypes: ["失物招领", "车位出租", "房屋出租"],
    infoItem: {},
    img_url: [],
    isDisabled: true,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("info_serno:" + options.id)
    this.setData({
      info_serno: options.id
    })
    var that = this
    getOneInfo(app, this.data, function(res){
      let infodata = res.payload
      that.setData({
        infoItem: infodata
      })
      let picsDesc = infodata.picsDesc
      let openId = infodata.openId
      var listImage = new Array();
      listImage = picsDesc.split("?|")

      let img_url = []
      for (let i = 0; i < listImage.length; i++){
        var url = "http://192.168.0.102:8000/app/image/get?openId=" + openId + "&imageName=" + listImage[i]
        console.log(url)
        img_url.push(url)
      }
      that.setData({
        img_url: img_url
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

  previewImg: function (e) {
    var that = this
    let index = e.currentTarget.dataset.index
    var img_url = that.data.img_url
    wx.previewImage({
      current: img_url[index], // 当前显示图片的http链接
      urls: img_url, // 需要预览的图片http链接列表
      success: function (res) {
        console.log(res);
      }
    })
  },

  deleteImg: function (e) {
    var that = this
    let img_url = this.data.img_url
    let index = e.currentTarget.dataset.index
    img_url.splice(index, 1)
    this.setData({
      img_url: img_url,
      hideAdd: that.data.img_url.length < 9 ? false : true
    })

  },

  return: function(){
    wx.navigateBack({
      delta: 2
    })
  }
})