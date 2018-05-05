const getLinePlan = require('../../util/util.js').getLinePlan;

const globalData = getApp().globalData;

Page({
  data: {
    start: '',
    terminal: '',
  },
  // 本地数据
  localData: {
    myCity: '',
    start: {},
    terminal: {},
  },
  onLoad(options) {
    // 记录当前城市名
    this.localData.myCity = globalData.myCity || '';
    // 获取当前位置，默认起点就是当前位置
    const startLocation = globalData.myLocation || {};
    if (startLocation.hasOwnProperty('longitude') && startLocation.hasOwnProperty('latitude')) {
      this.localData.start = startLocation;
      this.setData({ start: '我的位置' });
    }
  },
  // 获取起点位置
  getStartLocation() {
    wx.chooseLocation({
      success: res => {
        const { longitude, latitude, name } = res;
        this.localData.start = { longitude, latitude };
        this.setData({ start: name });
      },
    });
  },
  // 获取终点位置
  getTerminalLocation() {
    wx.chooseLocation({
      success: res => {
        const { longitude, latitude, name } = res;
        this.localData.terminal = { longitude, latitude };
        this.setData({ terminal: name });
      },
    });
  },
  // 切换起点和终点
  switchStartTerminal() {
    // 切换起点和终点显示的内容
    const startValue = this.data.start;
    const terminalValue = this.data.terminal;
    this.setData({ start: terminalValue, terminal: startValue });
    // 切换起点和终点坐标
    let { start, terminal } = this.localData;
    [start, terminal] = [terminal, start];
    this.localData.start = start;
    this.localData.terminal = terminal;
  },
  // 获取线路规划
  getLinePlan() {
    const startName = this.data.start;
    const terminalName = this.data.terminal;
    // 确认起点和终点不为空
    if (startName && terminalName) {
      const { start, terminal, myCity } = this.localData;
      const startLocation = `${start.longitude},${start.latitude}`;
      const terminalLocation = `${terminal.longitude},${terminal.latitude}`;
      // 确定起点和终点经纬度不为空
      if (startLocation && terminalLocation) {
        // 确定起点和终点不相同
        if (startName === terminalName || startLocation === terminalLocation) {
          wx.showModal({
            title: '提示',
            content: '起点和终点不能相同',
            showCancel: false,
          });
        } else {
          getLinePlan(startLocation, terminalLocation, myCity, linePlans => {
            const data = JSON.stringify({ linePlans, start: startName, terminal: terminalName });
            wx.navigateTo({ url: `/pages/linePlanResult/linePlanResult?data=${data}` });
          });
        }
      } else {
        wx.showModal({
          title: '提示',
          content: '请重新选择位置',
          showCancel: false,
        });
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '输入不能为空',
        showCancel: false,
      });
    }
  },
});
