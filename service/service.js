
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

function infoPub(that,data,cb){
  wx.request({
    url: that.globalData.url + '/hsmy/infopub',
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
      console.log("==================fail================")
    }
  })

}

function uploadImages(that,data,infoSero){
  var count = data.img_url.length

  wx.uploadFile({
    url: that.globalData.url + '/hsmy/infopub/uploadImage',
    filePath: img_url[count],
    name: 'file',
    formData: {
      goodsId: goodsId
    },
  })
}

export { getOpenId, isRegister, joinUs, getMobileSeqNos, infoPub }