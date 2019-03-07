import { infoPub } from "../../service/service.js"
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp();
Page({
  data: {
    tabs: ["所有信息", "我的信息", "新建信息"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    infoEnddata: '',
    infoDesc:'',
    infoTitle:'',
    mobileNo:'',
    openId: app.globalData.openId,

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    infoTypes: ["失物招领", "车位出租", "房屋出租"],
    infoEnum: 1,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false,
    img_url: [],
    //后续做后台拉取的json 列表格式
    listdata : [
      {
        demo1:"1",
        demo2:"2",
        icon: '../pics/icon20.png'
      },

      {
        demo1: "3",
        demo2: "4",
         icon: '../pics/icon20.png'
         },
        

      {
        demo1: "1",
        demo2: "2",
        icon: '../pics/icon20.png'},
      {
        demo1: "1",
        demo2: "2",
         icon: '../pics/icon20.png'
      },
      {
        demo1: "1",
        demo2: "2",
        icon: '../pics/icon20.png'
      },
      {
        demo1: "1",
        demo2: "2",
        icon: '../pics/icon20.png'
      },
      {
        demo1: "1",
        demo2: "2",
        icon: '../pics/icon20.png'
      },
      {
        demo1: "1",
        demo2: "2",
        icon: '../pics/icon20.png'
      },
      {
        demo1: "1",
        demo2: "2",
        icon: '../pics/icon20.png'
      }
      


    ]
  },
  onLoad: function () {
    var that = this;
    this.setData({
     
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          scroll_height: res.windowHeight - res.windowWidth / 750 * 165

        });
      }
    });
    var today = util.formatDate(new Date());
    this.setData({
      infoEnddata: today
    })

  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  getinfoTitle: function(e) {
    this.setData({
      infoTitle: e.detail.value
    })
  },

  getinfoDesc: function(e) {
    this.setData({
      infoDesc: e.detail.value
    })
  },

  getmobileNo: function(e) {
    this.setData({
      mobileNo: e.detail.value
    })
  },

  chooseimage: function (e) {
    var that = this
    var count = 9 - that.data.img_url.length;
    var upload_picture_list = that.data.upload_picture_list
    wx.chooseImage({
      count: count,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        if(res.tempFilePaths.length > 0){
          let img_url = that.data.img_url
          for(let i = 0; i < res.tempFilePaths.length; i++){
            img_url.push(res.tempFilePaths[i])
          }
          that.setData({
            img_url: img_url
          })
          if(that.data.img_url.length >= 9){
            that.setData({
              hideAdd: 1
            })
          }else{
            that.setData({
              hideAdd: 0
            })
          }
        }
      }
    })
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

  bindCountryCodeChange: function(e) {
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },

  bindDateChange: function(e) {
    this.setData({
      infoEnddata: e.detail.value
    })
  },

  bindCountryChange: function(e) {
    this.setData({
      infoEnum: e.detail.value
    })
  },

  showTopTips: function(e) {
    var that = this
    console.log(e)
    wx.showLoading({
      title: '发布中--',
    })
    infoPub(this, this.data, function (data) {
      if (data.status == '0') {
        console.log('发布信息成功！')
        wx.hideLoading()
        var infoSero = data.payload
        //接下来上传图片

      } else if (data.status == '1') {
        wx.showToast({
          title: data.responseCode,
        })
      }
    })
  }

});