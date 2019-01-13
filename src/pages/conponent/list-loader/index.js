var get = function get(url, data, fn) {
  wx.request({
    url: "https://apiapi.lexj.com/wx" + url,
    data,
    success: function success(response) {
      var res = response.data;

      if (typeof fn === "function") {
        fn(res);
      }
    }
  });
};
Component({
  properties: {},
  data: {
    page: 0,
    url: "",
    loading: false,
    loadError: false,
    allLoaded: false,
    isEmpty: false
  },
  methods: {
    setRequestConfig: function(requestConfig) {
      this.setData(requestConfig);
      this.nextPage();
    },
    getchoice: function() {
      var that = this;
      let page = this.data.page;
      get(this.data.url, { pageSize: 8, page: page }, res => {
        if (res.code == 10000) {
          var data = res.data.list;
          if (data.length == 0) {
            that.setData({
              loading: true
            });
          }
          this.triggerEvent("render", { list: data });
        }
      });
    },

    nextPage: function() {
      this.data.page++;
      this.getchoice();
    }
  },
  attached: function() {
    let that = this;
    let page = getCurrentPages();
    let curPage = page[page.length - 1];
    curPage.onReachBottom = function() {
      that.nextPage();
    };
  }
});
