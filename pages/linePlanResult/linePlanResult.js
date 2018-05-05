const getLineDetail = require('../../util/util.js').getLineDetail;

Page({
  onLoad(options) {
    const data = JSON.parse(options.data);
    const { start, terminal, linePlans } = data;
    this.setData({ start, terminal, linePlans });
  },
  // 显示详细规划信息
  showDetail(e) {
    const index = e.currentTarget.dataset.index;
    const { detailTransition } = this.data.linePlans[index];
    const { start, terminal } = this.data;
    const data = JSON.stringify({ start, terminal, detailTransition });
    wx.navigateTo({ url: `/pages/detailTransition/detailTransition?data=${data}` });
  },
});
