const util = require('../../util/util.js');

Page({
  onLoad(options) {
    wx.showLoading({ title: '加载中...' });
    const data = JSON.parse(options.data);
    // 设置标题
    wx.setNavigationBarTitle({ title: data.name });
    // 获取线路列表
    util.getLineList(data.id, lineList => {
      this.setData({ lineList });
      wx.hideLoading();
    });
  },
});
