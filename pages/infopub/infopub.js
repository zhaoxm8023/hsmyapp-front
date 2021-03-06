import { infoPub, uploadImages, getPubInfo } from "../../service/service.js"
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
    picsSerno:'',

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    infoTypes: ["失物招领", "车位出租", "房屋出租"],
    infoEnum: 0,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false,
    img_url: [],
    //后续做后台拉取的json 列表格式
    listdata : [],
    countPic: 9,//上传图片最大数量
    curIndex: 0,//当前上传的图片序号
    showImgUrl: "", //路径拼接，一般上传返回的都是文件名，
    uploadImgUrl: '',//图片的上传的路径
    //查询参数
    qrydata: {
      isMine: 0,
      page: 1,
      pagesize: 10
    },
    count: 0 //当前页面信息列表总数
  },

   //监听组件事件，返回的结果
  myEventListener:function(e){
   console.log("上传的图片结果集合")
   console.log(e.detail.picsList)
  },

  //isMore 0:初始查询 1:查询更多
  getInfoList: function (isMore) {
    var that = this;
    getPubInfo(app, this.data.qrydata, function (res) {
      let listdata;
      if (isMore == 0){
        listdata = [];
      } else if (isMore == 1){
        listdata = that.data.listdata;
      }
      for (let i = 0; i < res.data.length; i++) {
        listdata.push(res.data[i])
      }
      that.setData({
        listdata: listdata,
        count: res.count
      })
    })
  },

  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          scroll_height: res.windowHeight - res.windowWidth / 750 * 165

        });
      }
    });
    this.resetInfo();
  },

  resetInfo: function () {
    this.setData({
      infoTitle: '',
      infoDesc: '',
      countryCodeIndex: 0,
      mobileNo: '',
      infoEnum: 0,
      img_url: []
    });
    var date = new Date()
    date.setMonth(date.getMonth() + 1)
    var nextMonth = util.formatDate(date);
    this.setData({
      infoEnddata: nextMonth
    });
    this.setData({
      qrydata: {
        isMine: 0,
        page: 1,
        pagesize: 10
      }
    });
    this.getInfoList(0);

  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });

    var index = this.data.activeIndex
    if(index == 0){
      this.setData({
        qrydata: {
          isMine: 0,
          page: 1,
          pagesize: 10
        }
      });
      this.getInfoList(0);
    } else if(index == 1){
      this.setData({
        qrydata: {
          isMine: 1,
          page: 1,
          pagesize: 10
        }
      });
      this.getInfoList(0);
    } else if(index == 2){
      this.resetInfo();
    }
    
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
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
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
    var mobile = that.data.mobileNo
    if (mobile.length != 11){
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'success',
        duration: 1500
      })
      return
    }
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'success',
        duration: 1500
      })
      return
    }

    var picsSerno = util.getRandomCode(12)
    console.log(picsSerno)
    console.log(this.data.infoTitle)
    this.setData({
      picsSerno: picsSerno
    })
    wx.showLoading({
      title: '发布中--',
    })
    //如果没有上传图片
    var index = that.data.img_url.length
    if (index == 0){
      infoPub(app, this.data, function(data){
        console.log(data)
        if (data.status == 0) {
          console.log('发布信息成功！返回主键 ： ' + data.payload.infoSerno)
          wx.hideLoading();
          wx.showToast({
            title: '上传成功!~~',
            icon: 'success'
          });
          that.setData({
            sliderOffset: 0,
            activeIndex: 0,
            sliderLeft: 0,
          })
          that.resetInfo()

        } else if (data.status == 1) {
          console.log('发布信息失败！失败原因 ： ' + data.responseMessage)
          wx.hideLoading();
          wx.showToast({
            title: data.responseMessage,
          })
        }
      })
    }else{
      uploadImages(app, this.data, function (data) {
        console.log(data)
        if (data.status == 0) {
          console.log('发布信息成功！返回主键 ： ' + data.payload.infoSerno)
          wx.hideLoading();
          wx.showToast({
            title: '上传成功!~~',
            icon: 'success'
          });
          that.setData({
            sliderOffset: 0,
            activeIndex: 0,
            sliderLeft: 0,
          })
          that.resetInfo()

        } else if (data.status == 1) {
          console.log('发布信息失败！失败原因 ： ' + data.responseMessage)
          wx.hideLoading();
          wx.showToast({
            title: data.responseMessage,
          })
        }
      })
    }

  },

  scroll: function(e) {
    
  },

  loadMoreall : function (e) {
    console.log("=========loadMoreall========")
    console.log("listdata.length:" + this.data.listdata.length)
    if (this.data.listdata.length >= this.data.count){
      console.log("已经到最底部了！");
      wx.showToast({
        title: '已经到最底部了！',
        icon: 'none',
      })
      return;
    }

    var page = this.data.qrydata.page + 1
    console.log("page:" + page)

    wx.showToast({
      title: '加载中...',
      duration: 100,
      icon: 'loading',
    })

    this.setData({
      qrydata: {
        isMine: 0,
        page: page,
        pagesize: 10
      }
    });
    this.getInfoList(1);


  },

  loadMoremine: function(e){
    console.log("=========loadMoremine========")

    console.log("listdata.length:" + this.data.listdata.length)
    if (this.data.listdata.length >= this.data.count) {
      console.log("已经到最底部了！");
      wx.showToast({
        title: '已经到最底部了！',
        icon: 'none',
      })
      return;
    }

    var page = this.data.qrydata.page + 1
    console.log("page:" + page)

    wx.showToast({
      title: '加载中...',
      duration: 100,
      icon: 'loading',
    })

    this.setData({
      qrydata: {
        isMine: 1,
        page: page,
        pagesize: 10
      }
    });
    this.getInfoList(1);

  },

  loadNewall: function (e) {
    console.log("=========loadNewall========")
    wx.showToast({
      title: '刷新中...',
      duration: 100,
      icon: 'loading',
    })
    this.setData({
      qrydata: {
        isMine: 0,
        page: 1,
        pagesize: 10
      }
    });
    this.getInfoList(0);

  },






});