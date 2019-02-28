var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["所有信息", "我的信息", "新建信息"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    date: "2019-02-27",

    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,

    countries: ["失物招领", "车位出租", "房屋出租"],
    countryIndex: 1,

    accounts: ["微信号", "QQ", "Email"],
    accountIndex: 0,

    isAgree: false,
    files: [],
    //后续做后台拉取的json 列表格式
    listdata : [
      {
        demo1:"1",
        demo2:"2",
        icon: './pics/icon20.png'
      },

      {
        demo1: "3",
        demo2: "4",
         icon: './pics/icon20.png'
         },
        

      {
        demo1: "1",
        demo2: "2",
        icon: './pics/icon20.png'},
      {
        demo1: "1",
        demo2: "2",
         icon: './pics/icon20.png'
      },
      {
        demo1: "1",
        demo2: "2",
        icon: './pics/icon20.png'
      },
      {
        demo1: "1",
        demo2: "2",
        icon: './pics/icon20.png'
      },
      {
        demo1: "1",
        demo2: "2",
        icon: './pics/icon20.png'
      },
      {
        demo1: "1",
        demo2: "2",
        icon: './pics/icon20.png'
      },
      {
        demo1: "1",
        demo2: "2",
        icon: './pics/icon20.png'
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
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
});