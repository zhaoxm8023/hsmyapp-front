const app = getApp()

Page({

  /**
   * 页面的初始数据
   * 后续可以url 通过web查询得来 进行动态的进行页面灰度发布
   */
  data: {
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
        url: '/pages/main/main',
        icon: './pics/ui-8.png',
        code: '8'
      }



    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
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

  }
})