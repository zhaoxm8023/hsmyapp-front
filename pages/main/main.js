const app = getApp()
var bmap = require('../../libs/bmap-wx.js'); 
Page({

  /**
   * 页面的初始数据
   * 后续可以url 通过web查询得来 进行动态的进行页面灰度发布
   */
  data: {
    current: 'homepage',
    routers: [
      {
        name: '通讯录',
        url: '/pages/addbook/addbook',
        icon: './pics/ui-1.png',
        code: '通讯录页面'
      },
      {
        name: '快递',
        url: '/pages/main/main',
        icon: './pics/ui-2.png',
        code: '2'
      },
      {
        name: '停车位',
        url: '/pages/main/main',
        icon: './pics/ui-3.png',
        code: '3'
      },
      {
        name: '物业保修',
        url: '/pages/main/main',
        icon: './pics/ui-4.png',
        code: '4'
      },
      {
        name: '活动',
        url: '/pages/main/main',
        icon: './pics/ui-5.png',
        code: '5'
      },
      {
        name: '投票',
        url: '/pages/main/main',
        icon: './pics/ui-6.png',
        code: '6'
      },
      {
        name: '团购',
        url: '/pages/main/main',
        icon: './pics/ui-7.png',
        code: '7'
      },
      {
        name: '信息发布',
        url: '/pages/infopub/infopub',
        icon: './pics/ui-8.png',
        code: '8'
      }
    ],
    weatherData:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this;
    //新建百度地图对象
    var BMap = new bmap.BMapWX({ ak:'w5plbmpc0539geLczaIXptK5Z1iC2sP4'});
    var fail = function(data){
      console.log("查询天气失败！")
    };
    var success = function(data){
      var weatherData = data.currentWeather[0];
      console.log('currentCity:' + weatherData.currentCity);
      console.log('weather:' + weatherData.weatherDesc);
      weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n';
      that.setData({
        weatherData: weatherData
      });
    }
    BMap.weather({
      fail: fail,
      success: success
    });
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

  /**
   * tab-bar处理
   */
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  }
})