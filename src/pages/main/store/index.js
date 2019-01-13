Page({
  data: {
    loader: [{ cid: 3 }, { cid: 1 }, { cid: 1 }, { cid: 3 }],
    lists: [[], [], [], []],
    imageWidth: 0,
    movePage: 0
  },
  onShow: function() {
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    });
    this.selectComponent("#listsLoader").setRequestConfig({
      title: ["全部", "待付款", "待发货", "待收货"],
      loader: [{ cid: 3 }, { cid: 1 }, { cid: 1 }, { cid: 3 }]
    });
    this.renderLists();
  },
  renderLists(options) {
    console.log(options);
    let list = options.detail.data;
    let index = options.detail.index;
    this.setData({
      [`lists[${index}]`]: this.data.lists[index].concat(list),
      movePage: index
    });
    console.log(this.data.movePage, this.data.lists);
  }
});
