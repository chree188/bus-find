const storage = require('../../util/storage.js');
const recently = storage.getRecently();

Page({
  onLoad(options) {
    this.updateData();
  },
  onShow() {
    this.updateData();
  },
  // 更新数据
  updateData() {
    this.setData({ recentlyList: recently.value });
  },
  // 显示详情
  showDetail(e) {
    const index = e.currentTarget.dataset.index;
    const { id, name, isStation } = this.data.recentlyList[index];
    // 使当前项置顶
    storage.addRecently({ keyName: name, id, name, isStation });
    // 导航到相应页面
    const data = JSON.stringify({ id, name });
    const url = `/pages/${isStation ? 'lineList/lineList' : 'lineDetail/lineDetail'}?data=${data}`;
    wx.navigateTo({ url });
  },
  // 删除该项目
  deleteItem(e) {
    const index = e.currentTarget.dataset.index;
    const keyName = recently.keyName[index];
    storage.deleteRecently(keyName);
    this.updateData();
  },
  // 清空最近使用记录
  clearRecently() {
    wx.showModal({
      title: '提示',
      content: '确定清空记录',
      confirmText: '确定',
      cancelText: '取消',
      success: res => {
        if (res.confirm) {
          storage.clearRecently();
          this.updateData();
        }
      },
    });
  },
});
