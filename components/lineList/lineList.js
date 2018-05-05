const storage = require('../../util/storage.js');

Component({
  // 属性传值
  properties: {
    lineList: {
      type: Array,
      value: [],
    },
    showPrice: {
      type: Boolean,
      value: true,
    },
  },
  methods: {
    // 显示线路详情
    showLineDetail(e) {
      const index = e.currentTarget.dataset.index;
      const item = this.properties.lineList[index];
      const { id, name } = item;
      storage.addRecently({ keyName: name, id, name, isStation: false });
      wx.navigateTo({ url: `/pages/lineDetail/lineDetail?data=${JSON.stringify(item)}` });
    },
    cancleCollection(e) {
      const index = e.currentTarget.dataset.index;
      const detail = { index };
      this.triggerEvent('canclecollection', detail);
    },
  },
});
