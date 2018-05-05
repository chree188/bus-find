const util = require('../../util/util.js');
const storage = require('../../util/storage.js');

const globalData = getApp().globalData;

Page({
  // 是否已经允许获取用户定位
  canGetLocation: true,
  onLoad() {
    this.getMyLocation();
  },
  // 获取我的位置
  getMyLocation() {
    this.setData({ myLocation: '正在定位中...' });
    wx.showLoading({ title: '刷新中' });
    // 获取经纬度
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        const longitude = res.longitude;
        const latitude = res.latitude;
        globalData.myLocation = { longitude, latitude };
        // 获取位置描述信息
        util.getLocationDescription(longitude, latitude, (myCity, myLocation) => {
          globalData.myCity = myCity;
          this.setData({ myLocation });
        });
        // 获取周围站台列表
        util.getAroundStation(longitude, latitude, (nearestStation, otherStation) => {
          this.setData({ nearestStation, otherStation });
          // 获取最近站台线路列表
          util.getLineList(nearestStation.id, lineDetail => {
            // 最多显示3条线路信息
            const lineList = lineDetail.length > 3 ? lineDetail.slice(0, 3) : lineDetail;
            this.setData({ lineList });
            wx.hideLoading();
          });
        });
      },
      // 定位失败
      fail: () => {
        this.canGetLocation = false;
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '请允许小程序获取你的地理位置',
          showCancel: false,
          success(res) {
            res.confirm && wx.openSetting();
          },
        });
      },
    });
  },
  onShow() {
    // 强制用户必须允许访问位置信息
    if (!this.canGetLocation) {
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.userLocation']) {
            wx.openSetting();
          } else {
            this.canGetLocation = true;
            this.getMyLocation();
          }
        },
      });
    }
  },
  // 显示线路列表
  showLineList(e) {
    const { id, name } = e.currentTarget.dataset;
    // 记录最近使用记录
    storage.addRecently({ keyName: name, id, name, isStation: true });
    // 显示线路列表页
    wx.navigateTo({ url: `/pages/lineList/lineList?data=${JSON.stringify({ id, name })}` });
  },
});
