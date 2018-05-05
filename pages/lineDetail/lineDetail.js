const getLineDetail = require('../../util/util.js').getLineDetail;
const storage = require('../../util/storage.js');

const globalData = getApp().globalData;

Page({
  // 收藏需要的数据
  collectedData: {},
  onLoad(options) {
    wx.showLoading({ title: '加载中...' });
    // 获取窗口高度，只获取一次
    if (!globalData.hasOwnProperty('windowHeight')) {
      globalData.windowHeight = wx.getSystemInfoSync().windowHeight;
    }
    const data = JSON.parse(options.data);
    const { id, name } = data;
    this.setData({ id, name, height: globalData.windowHeight - 126 });
    // 设置标题
    wx.setNavigationBarTitle({ title: name });
    // 获取线路信息
    getLineDetail(id, lineDetail => {
      const { keyName, start, terminal, price, stations } = lineDetail[0];
      this.setData({ start, terminal, price, stations });
      this.collectedData = { keyName, id, name, start, terminal };
      // 是否被收藏
      this.setData({ isCollected: storage.hasCollected(keyName) });
      wx.hideLoading();
    });
  },
  // 换向
  reverseDirection() {
    const { start, terminal, stations } = this.data;
    this.setData({
      start: terminal,
      terminal: start,
      stations: stations.reverse(),
    });
  },
  // 收藏
  collectLine() {
    if (this.data.isCollected) {
      // 移除数据
      this.setData({ isCollected: false });
      storage.deleteCollected(this.collectedData.keyName);
    } else {
      // 保存数据
      this.setData({ isCollected: true });
      storage.addCollected(this.collectedData);
    }
  },
});
