var curIndex = 0
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
  console.log(curIndex)
  var that = this
  var count = data.img_url.length
  var infopubstring = {
    "openId": app.globalData.openId,
    "mobileNo": data.mobileNo,
    "infoTitle": data.infoTitle,
    "infoEnum": data.infoEnum,
    "infoEnddata": data.infoEnddata,
    "infoDesc": data.infoDesc
  }
  wx.showLoading({
    title: '上传中...',
    mask: true,
  })
  wx.uploadFile({
    url: app.globalData.url + 'hsmy/infopub',
    filePath: data.img_url[curIndex],
    name: 'infopubfiles',
    formData: {
      dataInfo: JSON.stringify(infopubstring),
      maxCount: count - 1,
      curIndex: curIndex,
      picsSerno: data.picsSerno,
      },
    header:{
       openId: app.globalData.openId,
      'content-type': 'multipart/form-data'
      //add tokenKey Authorization
    },
    method: 'POST',
    success: (resp) => {
      
    },
    fail: (res) => {
      
    },
    complete: function(res) {
      curIndex++;
      console.log(res)
      console.log(res.errMsg)
      if(typeof res.data == "undefined"){
        wx.hideLoading()
        wx.showToast({
          title: res.errMsg,
        });
        curIndex = 0
        return
      }
      var response = JSON.parse(res.data)
      //如果失败，则返回
      if(response.status == 1){
        typeof cb == "function" && cb(response)
        curIndex = 0
        return
      }
      if (curIndex == count) { //当图片传完时，停止调用     
        console.log('执行完毕');
        //console.log('成功：' + success + " 失败：" + fail);
        if (response.status == 0){
          //全部上传成功，也返回
          typeof cb == "function" && cb(response)
          curIndex = 0
        } 
      } else { //若图片还没有传完，则继续调用函数
        uploadImages(app, data, cb);
      }
    }
  })
}

export { getOpenId, isRegister, joinUs, getMobileSeqNos, infoPub, uploadImages}