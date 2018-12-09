//校验输入项
function validateInput(input) {
  if (input.title == "") {
    wx.showModal({
      title: '会议名称必输',
      content: '',
    })
    return false;
  } else if (input.startTime >= input.endTime) {
    wx.showModal({
      title: '开始时间不能大于等于结束时间',
      content: '',
    })
    return false;
  }
  return true;
}
//请求发起demo
function qryDemo(url, token, openId) {
  wx.request({
    url: url + 'user',
    method: 'GET',
    header: {
      Authorization: token,
      Subject: openId,
    },
    success: function (res) {
      if (res.data.success) {
        that.setData({
          schedules: res.data.payload
        })
      }

      console.log("========================请求发起demo成功====================")
    },
    fail: function () {
      console.log("========================请求发起demo失败====================")
    }
  })

}
   
//查询会议
function querySchedule(url, meetingRoomId, date, that, token, openId) {
  wx.request({
    url: url +  'qryuser',//'meetingRooms/' + meetingRoomId + '/schedule?date=' + date,
    method: 'GET',
    header: {
      Authorization: token,
      Subject: openId,
    },
    success: function (res) {
      if (res.data.success) {
        that.setData({
          schedules: res.data.payload
        })
      }

      console.log("========================查询会议成功====================")
    },
    fail: function () {
      console.log("========================查询会议失败====================")
    }
  })

}
//预定会议
function addSchedule(url, data, userInfo, openId, token, formId) {
  wx.request({
    url: url + 'meetingRooms/' + data.id + '/schedule?formId=' + formId,
    data: {
      title: data.title,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      creatorOpenId: openId,
      creatorNickName:  'zxm',//userInfo.nickName,
      creatorAvatarUrl: 'demo',//userInfo.avatarUrl,
      repeatMode: data.repeatMode,

    },
    header: {
      'content-type': 'application/json',
      Authorization: token,
      Subject: openId,
    },
    method: 'POST',
    success: function (res) {
      if (!res.data.success) {
        wx.showModal({
          title: '预定会议失败',
          content: res.data.responseMessage + '\n' + '请您选择其他时间段',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        wx.navigateTo({
          url: '../result/success?txn_type=save'
        })
        console.log("========================预定成功=======================");
      }
    },
    fail: function () {
      wx.navigateTo({
        url: '../result/fail'
      })
      console.log("===========================预定失败========================")
    }
  })
}
//修改会议
function modifySchedule(url, data, meetingRoomId, scheduleid, token, openId, formId) {
  wx.request({
    url: url + 'meetingRooms/' + meetingRoomId + '/schedule?formId=' + formId,
    data: {
      id: scheduleid,
      title: data.title,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      repeatMode: data.repeatMode
    },
    header: {
      'content-type': 'application/json',
      Authorization: token,
      Subject: openId,
    },
    method: 'POST',
    success: function (res) {
      if (!res.data.success) {
        wx.showModal({
          title: '修改会议失败',
          content: res.data.responseMessage + '\n' + '请您选择其他时间段',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else {
        wx.navigateTo({
          url: '../result/success?txn_type=modify'
        })
        console.log("========================修改成功=======================");
      }
    },
    fail: function () {
      wx.navigateTo({
        url: '../result/fail?txn_type=modify'
      })
      console.log("===========================修改失败========================")
    }
  })
}
//删除会议
function deleteSchedule(url, scheduleid, token, openId) {
  wx.request({
    url: url + 'meetingRooms/schedule/' + scheduleid,
    method: 'DELETE',
    header: {
      Authorization: token,
      Subject: openId,
    },
    success: function (res) {
      wx.navigateTo({
        url: '../result/success?txn_type=delete'
      })
      console.log("========================删除成功====================");
    },
    fail: function () {
      wx.navigateTo({
        url: '../result/fail?txn_type=delete'
      })
      console.log("========================删除失败======================")
    }
  })
}
//加入会议
function joinSchedule(url, userInfo, currentscheduleDetail, openId, token, formId) {
  //console.log("url:" + url + "|userInfo:" + userInfo.nickName + "|userInfo:" + userInfo.avatarUrl + "|currentscheduleDetail.id:" + currentscheduleDetail.id + "|openId:"+openId+'|token:'+token+'|formId: '+formId)
  wx.request({
    url: url + 'schedules/' + currentscheduleDetail.id + '/join',
    data: {
      openId: openId,
      date: currentscheduleDetail.date,
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
      formId: formId,

    },
    header: {
      'content-type': 'application/json',
      Authorization: token,
      Subject: openId,
    },
    method: 'POST',
    success: function (res) {
      if (res.data.success) {
        var currentschedule = JSON.stringify(res.data.payload);
        wx.navigateTo({
          url: '../detail/detail?currentscheduleId=' + currentscheduleDetail.id + '&isHidden=true',
        })
        console.log("========================加入会议成功====================");
      }
      else {
        console.log("========================加入会议失败====================")
        wx.showModal({
          content: res.data.responseMessage,
        })
      }
    },
    fail: function () {
      console.log("========================加入会议失败====================")
    }
  })
}
//查询加入的会议
function queryJoinSchedule(url, openId, date, that, token) {
  wx.request({
    url: url + 'participant/' + openId + '?date=' + date,
    method: 'GET',
    header: {
      Authorization: token,
      Subject: openId,
    },
    success: function (res) {
      if (res.data.success) {
        that.setData({
          schedules: res.data.payload
        })
      }

      console.log("========================查询加入会议成功====================")
    },
    fail: function () {
      console.log("========================查询加入会议失败====================")
    }
  })
}
//查询团队
function queryTeam(url, that, cb) {
  if (that.globalData.teams) {
    typeof cb == "function" && cb(that.globalData.teams)
  } else {
    wx.request({
      url: url + 'teams',
      method: 'GET',
      success: function (res) {
        if (res.data.success) {
          console.log("===========================查询团队成功=====================" + res.data.payload[0].name)
          that.globalData.teams = res.data.payload
          typeof cb == "function" && cb(that.globalData.teams)

        }
      }
    })
  }

}
function queryTeamMember(url, that, cb) {
  if (that.globalData.member) {
    typeof cb == "function" && cb(that.globalData.member)
  } else {
    wx.request({
      url: url + 'team/' + that.globalData.teamId + '/user/' + that.globalData.openId,
      method: 'GET',
      success: function (res) {
        if (res.data.success) {
          that.globalData.member = res.data.payload
          that.globalData.token = res.data.headers.token
          typeof cb == "function" && cb(that.globalData.member)

        }
        else {
          wx.showModal({
            title: '登录失败',
            content: res.data.responseCode + res.data.responseMessage,
            confirmText: '去绑定',
            success: function (res) {
              if (res.confirm) {
                that.globalData.member = null
                typeof cb == "function" && cb(that.globalData.member)
              } else if (res.cancel) {
                wx.navigateBack({
                })
              }
            }
          })
          console.log("===========================查询是否加入团队失败=====================" + res.data.payload)
        }
      }
    })
  }
}
//加入团队
function joinTeam(app, data, inviteBand) {
  wx.request({
    url: app.globalData.url + 'team/' + app.globalData.teamId + '/join?token=' + data.token,
    data: {
      name: data.name,
      mobileNo: data.mobileNo,
      openId: app.globalData.openId,
      nickName: app.globalData.nickName,
      avatarUrl: app.globalData.avatarUrl,

    },
    header: {
      'content-type': 'application/json'
    },
    method: 'POST',
    success: function (res) {
      if (res.data.success) {
        app.globalData.token = res.data.headers.token
        wx.setStorageSync('isLogin', true)
        wx.showToast({
          title: '绑定成功',
        })
        if (inviteBand == "y") {
          wx.navigateBack({

          })
        } else {
          wx.switchTab({
            url: '../schedule/list',
          })
        }

        console.log("======================加入团队成功================")
      }
      else {
        wx.showModal({
          title: '绑定失败',
          content: res.data.responseCode + ':' + res.data.responseMessage,
        })
        console.log("======================加入团队失败================")
      }
    }
  })
}
function queryScheduleById(url, id, token, openId, that, cb) {
  if (that.data.schedule) {
    typeof cb == "function" && cb(that.data.schedule)
  } else {
    wx.request({
      url: url + 'schedules/' + id,
      method: 'GET',
      header: {
        Authorization: token,
        Subject: openId,
      },
      success: function (res) {
        if (res.data.success) {
          typeof cb == "function" && cb(res.data.payload)
        }

        console.log("========================查询指定会议成功====================")
      },
      fail: function () {
        console.log("========================查询指定会议失败====================")
      }
    })
  }
}
function getOpenId(that,code,cb) {
  if (that.globalData.openId) {
    typeof cb == "function" && cb(that.globalData.openId)
  } else {
    wx.request({
      //获取openid接口
      url: that.globalData.url + 'wechat/openid/' + code,
      method: 'GET',
      success: function (res) {
        typeof cb == "function" && cb(res.data.payload)
      }
    })
  }
}
export { validateInput, querySchedule, addSchedule, modifySchedule, deleteSchedule, joinSchedule, queryJoinSchedule, queryTeam, queryTeamMember, joinTeam, queryScheduleById, getOpenId }

