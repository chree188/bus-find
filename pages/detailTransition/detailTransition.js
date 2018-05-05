Page({
  onLoad(options) {
    const data = JSON.parse(options.data);
    const { start, terminal, detailTransition } = JSON.parse(options.data);
    this.setData({ start, terminal, detailTransition });
  },
});
