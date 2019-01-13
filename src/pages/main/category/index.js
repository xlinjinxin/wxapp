var get = function get(url, fn) {
    wx.request({
        url: "https://apiapi.lexj.com/wx" + url,
        success: function success(response) {

            var res = response.data;

            if (typeof fn === 'function') {
                fn(res);
            }
        }
    });
};
wx.get = get;
Page({
    route: "pages/mian/category/index",
    data: {
        category1: [],
        category2: [],
        nowindex: 0
    },
    onLoad: function onLoad() {
        this.getcategory();
    },
    tapName: function (event) {
        var index = event.currentTarget.dataset.index;
        console.log(index)
        this.setData({
            "nowindex": index
        })
    },


    //获取数据
    getcategory: function () {
        var _this = this;
        wx.get("/product/category", function (res) {
            if (res.code == 10000) {
                var data = res.data.category1;
                var data2 = res.data.category2;

                _this.setData({
                    "category1": data,
                    "category2": data2
                });
                console.log(_this.data.category2[0], 321)
            }
        });
    },
    goShopping: function () {
        wx.navigateTo({
            url: '/pages/commodity/index?keyword=美'

        })
    },
    categoryblock: function (e) {
        console.log(e)
        var e = e.currentTarget.dataset.cid;
        wx.navigateTo({
            url: '/pages/commodity/index?cid=' + e

        })
    }
})