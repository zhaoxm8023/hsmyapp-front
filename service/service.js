
function getOpenId(that,code,cb) {
  if (that.globalData.openId) {
    // 如果是函数，则调用
    typeof cb == "function" && cb(that.globalData.openId)
  } else {
    wx.request({
      //获取openid接口
      url: that.globalData.url + 'wechat/openid/' + code,
      method: 'GET',
      success: function (res) {
        typeof cb == "function" && cb(res.data.payload)
        console.log("==========openId:" + that.globalData.openId)
      }
    })
  }
}

function isRegister(app,openId,cb){
  wx.request({
    url: app.globalData.url + 'hsmy/user/' + openId,
    method: 'GET',
    success:function(res) {
      console.log("==============success============")
      typeof cb == "function" && cb(res.data.status)
    },
    fail:function(res){
      console.log("==============failed=============")
      wx.showToast({
        title: '连接超时！',
        icon: 'none'
      })
    }
  })
}

function getMobileSeqNos(app,mobileNo,cb){
  wx.request({
    url: app.globalData.url + 'hsmy/sms/' + mobileNo,
    method: 'GET',
    success:function(res){
      console.log("======achieveSeqNos success========")
      typeof cb == "function" && cb(res.data.payload)
    }
  })
}

function joinUs(app,data,cb){
  wx.request({
    url: app.globalData.url + 'hsmy/user/join',
    data:{
      openId: app.globalData.openId,
      nickName: app.globalData.userInfo.nickName,
      avatarUrl: app.globalData.userInfo.avatarUrl,
      mobileNo:data.mobileNo,
      roomNo:data.roomNo
    },
    method: 'POST',
    success: function(res){
      console.log("==================success============")
      console.log("==================res.status=========" + res.data.status)
      console.log("==================res.responseCode===" + res.data.responseCode)
      typeof cb == "function" && cb(res.data)
    },
    fail: function(res){
      console.log("==================fail================")
    }

  })
}

function infoPub(app,data,cb){
  wx.request({
    url: app.globalData.url + 'hsmy/infopub',
    data:{
      openId: data.openId,
      mobileNo: data.mobileNo,
      infoTitle: data.infoTitle,
      infoEnum: data.infoEnum,
      infoEnddata: data.infoEnddata,
      infoDesc: data.infoDesc
    },
    method: 'POST',
    success: function (res) {
      console.log("==================success============")
      console.log("==================res.status=========" + res.data.status)
      console.log("==================res.responseCode===" + res.data.responseCode)
      typeof cb == "function" && cb(res.data)
    },
    fail: function (res) {
      console.log("==================fail================" + url)
    }
  })
}

function uploadImages(app, data, cb){
  console.log(data)
  var count = data.img_url.length
  var i = 0
  wx.showLoading({
    title: '上传中...',
    mask: true,
  })
  wx.uploadFile({
    url: app.globalData.url + 'hsmy/infopub',
    filePath: data.img_url[i],
    name: 'infopubfiles',
    formData: {
      data: {
        openId: data.openId,
        mobileNo: data.mobileNo,
        infoTitle: data.infoTitle,
        infoEnum: data.infoEnum,
        infoEnddata: data.infoEnddata,
        infoDesc: data.infoDesc
      },
      user:'test'
      },
    header:{
      openid:data.openid,
      'content-type': 'multipart/form-data'
      //add tokenKey Authorization
    },
    method: 'POST',
    success: (resp) => {
      wx.hideLoading();
      success++;
      var str = resp.data //返回的结果，可能不同项目结果不一样
      var pic = JSON.parse(str);
      typeof cb == "function" && cb(res.data)
      // var pic_name = resp.data.infoDesc + pic.Data;
      // var detailPics = that.data.detailPics;
      // detailPics.push(pic_name)
      // that.setData({
      //   detailPics: detailPics
      // })
    },
    fail: (res) => {
      fail++;
      console.log('fail:' + i + "fail:" + fail);
    },
    complete: () => {
      i++;
      if (i == count) { //当图片传完时，停止调用     
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
        var myEventDetail = {
          //picsList: that.data.detailPics
        } // detail对象，提供给事件监听函数
        var myEventOption = {} // 触发事件的选项
        that.triggerEvent('myevent', myEventDetail, myEventOption)
      } else { //若图片还没有传完，则继续调用函数
        that.uploadimg(data);
      }
    }
  })
}

export { getOpenId, isRegister, joinUs, getMobileSeqNos, infoPub, uploadImages}