const storage = require('../../util/storage.js');
const collected = storage.getCollected();

Page({
  onLoad() {
    this.updateData();
  },
  onShow() {
    this.updateData();
  },
  // 更新数据
  updateData() {
    this.setData({ collectedList: collected.value });
  },
  // 取消收藏
  cancleCollection(e) {
    const index = e.detail.index;
    const keyName = collected.keyName[index];
    storage.deleteCollected(keyName);
    this.updateData();
  },
  // 清空收藏数据
  clearCollected() {
    wx.showModal({
      title: '提示',
      content: '确定清空收藏',
      confirmText: '确定',
      cancelText: '取消',
      success: res => {
        if (res.confirm) {
          storage.clearCollected();
          this.updateData();
        }
      },
    });
  },
});
