//index.js
import { joinUs, getMobileSeqNos } from "../../service/service.js"
//获取应用实例
const app = getApp()

Page({

  data:{
    mobileNo:"",
    seqNos:"",
    mobileSeqNos:"",
    roomNo:"",
    disabled:false,
    seqNos_focus:false
  },

  achieveSeqNos:function(){
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.mobileNo == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.mobileNo)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    var that = this
    getMobileSeqNos(app,that.data.mobileNo,function(seqNos){
      that.data.disabled = true
      that.data.mobileSeqNos = seqNos
      console.log("========mobileSeqNos=======" + seqNos)
    })

    this.setData({
      disabled:true
    })
    

  },

  getMobileNo:function(res){
    this.setData({
      mobileNo:res.detail.value
    })
  },

  getSeqNos:function(res){
    this.setData({
      seqNos:res.detail.value
    })
  },

  getRoomNo:function(res){
    this.setData({
      roomNo:res.detail.value
    })
  },

  formSubmit(res){
    console.log("提交表单！")
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if(this.data.mobileNo == ""){
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.mobileNo)){
        wx.showToast({
          title: '请输入正确的手机号',
          icon: 'none',
          duration: 1000
        })
        return false;
    }
    if(this.data.seqNos == ""){
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    if(this.data.seqNos != this.data.mobileSeqNos){
      wx.showToast({
        title: '请输入正确的验证码',
        icon: 'none',
        duration: 1000
      })

      this.setData({
        seqNos:'',
        seqNos_focus:true
      })
      return false;
    }
    
    joinUs(app,this.data,function(data){
      if(data.status == '0'){
        wx.switchTab({
          url: '../home/home',
        })
      } else if (data.status == '1'){
        wx.showToast({
          title: data.responseCode,
        })
      }
    })
  }
})
