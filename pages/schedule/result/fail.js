Page({
  onLoad: function (options) {
    if (options.txn_type == "save") {
      this.setData({ result: "预定失败！" });
    } else if (options.txn_type == "modify") {
      this.setData({ result: "修改失败！" });
    } else if (options.txn_type == "delete") {
      this.setData({ result: "删除失败！" });
    };
    this.setData({errorMessage:options.errorMessage})
  },
  confirm: function () {
    //由于list页面是在tar配置，需要使用reLaunch实现
    wx.reLaunch({
      url: '../../schedule/list'
    })
  }
});