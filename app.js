App({
  // 全局数据
  globalData: {
    // storage存储的键值
    storageKey: {
      collected: 'collected',
      recently: 'recently',
    },
    // storage存储的数据
    storageValue: {
      collected: { keyName: [], value: [] },
      recently: { keyName: [], value: [] },
    },
  },
  onLaunch() {
    // 收藏数据和最近使用
    const collected = wx.getStorageSync(this.globalData.storageKey.collected);
    const recently = wx.getStorageSync(this.globalData.storageKey.recently);
    // 整理成Object
    if (collected) this.globalData.storageValue.collected = JSON.parse(collected);
    if (recently) this.globalData.storageValue.recently = JSON.parse(recently);
  },
});
