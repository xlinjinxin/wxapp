Component({
  options: {
    multipleSlots: true
  },
  data: {
    title: [],
    tWidth: 0,
    loader: [],
    movePoint: [],
    moveWidth: 0,
    pageIndex: 0,
    lists: []
  },
  nowIndex: 0,
  methods: {
    getLoader: function() {
      return {
        page: 1,
        params: {},
        loading: false,
        loadError: false,
        allLoaded: false,
        isEmpty: false,
        scrollIntoView: ""
      };
    },
    setRequestConfig: function(requestConfig) {
      let width;

      width = 720 / requestConfig.title.length;
      this.setData({
        title: requestConfig.title,
        tWidth: width,
        loader: requestConfig.loader
      });
      this.movePointPosition(0);
      let loaders = [];
      for (let i = 0; i < this.data.title.length; i++) {
        loaders.push(this.getLoader());
      }
      this.setData({ lists: loaders });

      this.transmitRenderParam(this.data.pageIndex);
    },
    movePoint: function(e) {
      let x = e.currentTarget.dataset.index;

      this.transmitRenderParam(x);
      this.movePointPosition(x);
      this.setData({
        pageIndex: x
      });
    },
    movePointPosition: function(index) {
      let movePoint = this.data.tWidth * (index + 0.25);

      let mWidth = this.data.tWidth * 0.5;
      this.setData({ movePoint: movePoint, moveWidth: mWidth });
    },
    transmitRenderParam: function(e) {
      var that = this;
      console.log(that.data.lists[e].loading, that.data.lists, e);
      let cid = this.data.loader[e].cid;
      if (that.data.lists[e].loading === false) {
        wx.request({
          url: "https://apiapi.lexj.com/wx/product/forCategory",
          data: { cid: cid, page: that.data.lists[e].page, pageSize: 8 },
          success: res => {
            var res = res.data;
            if (res.code == 10000) {
              var data = res.data.list;
              that.triggerEvent("render", { index: e, data: data });
              console.log(this.data.lists, e);
              that.setData({
                [`lists[${e}].loading`]: true,
                [`lists[${e}].page`]: that.data.lists[e].page + 1
              });
            }
          }
        });

        console.log(that.data.lists);
      } else {
        return;
      }
    },
    changeIndex: function(e) {
      var current = e.detail.current;

      this.movePointPosition(current);
      this.transmitRenderParam(current);
    },
    nextPage: function(x) {
      var that = this;
      x = this.data.pageIndex;
      let cid = this.data.loader[x].cid;
      wx.request({
        url: "https://apiapi.lexj.com/wx/product/forCategory",
        data: { cid: cid, page: that.data.lists[x].page, pageSize: 8 },
        success: res => {
          var res = res.data;
          if (res.code == 10000) {
            var data = res.data.list;
            that.triggerEvent("render", { index: x, data: data });
          }
        }
      });
    }
  }
});
