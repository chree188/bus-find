const getSearchResultFun = require('../../util/util.js').getSearchResult;
const storage = require('../../util/storage.js');

const globalData = getApp().globalData;

Page({
  // 本地数据
  localData: {
    myCity: '',
    inputValue: '',
  },
  onLoad(options) {
    this.localData.myCity = globalData.myCity;
  },
  // 获取输入值
  getInputValue(e) {
    this.localData.inputValue = e.detail.value;
  },
  // 获取搜索结果
  getSearchResult() {
    // 去除输入值两端的空格
    const searchValue = this.localData.inputValue.trim();
    if (!searchValue) {
      // 输入为空
      wx.showModal({
        title: '输入为空',
        content: '请输入公交线路、站台',
        showCancel: false,
      });
    } else {
      // 输入不为空
      getSearchResultFun(searchValue, this.localData.myCity, searchResult => {
        this.setData({ searchResult });
      });
    }
  },
  // 显示详情
  showDetail(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.searchResult[index];
    const { id, name, isStation } = this.data.searchResult[index];
    storage.addRecently({ keyName: name, id, name, isStation });
    const data = JSON.stringify({ id, name });
    if (item.isStation) {
      // 站台
      wx.navigateTo({ url: `/pages/lineList/lineList?data=${data}` });
    } else {
      // 线路
      wx.navigateTo({ url: `/pages/lineDetail/lineDetail?data=${data}` });
    }
  },
});
