// pages/addbook/addbook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "搜索 ",
    inputShowed: false,
    inputVal: "",
    searchTmpArray:[],
    searchArray:[],
    showHistory:true,
    listdata:[
      {info_desc: "123",info_enddata: "2020-02-11",info_enum: "0",info_serno: "375869157463941120",info_title: "123",info_workdata: "2020-01-11",last_date: 1578725801000,
mobile_no: "15467890987",open_id: "oquGP4i9_AsHCB5m22J1Tgp2WzCk",pics_desc: "Rza3c4DPkbCp"},
      { info_enum: "0", info_desc: "123", info_serno: "375868503324483584", info_title: "233", open_id: "oquGP4i9_AsHCB5m22J1Tgp2WzCk", pics_desc: "S5bN4leYvMPa"}
    ],
    isShowResult:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: this.data.title
    })

    var searchArray = wx.getStorageSync("history")
    this.setData({
      searchTmpArray: searchArray,
      searchArray: searchArray.reverse()
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
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: "",
      isShowResult: false
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
      isShowResult: false
    });
  },


  deleteHistory:function(e) {
    wx.removeStorageSync("history")
      this.setData({
        searchTmpArray:[],
        searchArray: [],
        showHistory: false
      })
  },


  btn_search: function(e) {
    if (this.data.inputVal == ""){
      wx.showToast({
        title: '搜索内容为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    this.buildHistory(this.data.inputVal)
  },

  buildHistory: function (e) {
    var searchArray = this.data.searchTmpArray
    if (wx.getStorageSync("history").length > 0 && wx.getStorageSync("history").length < 8) {//有搜索记录且小于8个时
      let index = wx.getStorageSync("history").indexOf(e)
      if (index < 0) {//若搜索记录不存在，则直接追加
        searchArray = wx.getStorageSync("history").concat(e)
        wx.setStorageSync("history", searchArray)
      } else {//若搜索记录存在，则调到头部
        searchArray = wx.getStorageSync("history")
        searchArray.splice(index, 1)
        searchArray = searchArray.concat(e)
        wx.setStorageSync("history", searchArray)
      }
    } else if (wx.getStorageSync("history").length >= 8) {//搜索记录大于8个
      let index1 = wx.getStorageSync("history").indexOf(e)
      if (index1 > -1) {//若搜索记录存在，则调到头部
        searchArray = wx.getStorageSync("history")
        searchArray.splice(index1, 1)
        searchArray = searchArray.concat(e)
        wx.setStorageSync("history", searchArray)
      } else {
        //若搜索记录不存在，则删除最老的一个，然后追加
        searchArray = wx.getStorageSync("history")
        searchArray.splice(0, 1)
        searchArray = searchArray.concat(e)
        wx.setStorageSync("history", searchArray)
      }
      

    } else {//无搜索记录则直接追加
      searchArray = searchArray.concat(e)
      wx.setStorageSync("history", searchArray)
      this.setData({
        showHistory: true
      })
    }
    this.setData({
      searchTmpArray: searchArray,
      searchArray: searchArray.reverse(),
      isShowResult: true
    })
  },

  /** 
   * 直接显示历史搜索记录
  **/
  toSearch: function(e){
    this.setData({
      inputVal: e.currentTarget.dataset.value,
    })
    this.buildHistory(this.data.inputVal)
  }
  

})