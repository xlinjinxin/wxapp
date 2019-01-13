var get = function get(url, fn) {
    wx.request({
        url: "https://apiapi.lexj.com/wx" + url,
        success: function success(response) {
            var res = response.data;

            if (typeof fn === "function") {
                fn(res);
            }
        }
    });
};
wx.get = get;
Page({
    route: "pages/commodity/index",
    data: {
        filter: {
            type: {
                list: [{
                        name: "综合排序",
                        tid: 1
                    },
                    {
                        name: "价格从低到高",
                        tid: 2
                    },
                    {
                        name: "价格从高到低",
                        tid: 3
                    }
                ]
            },
            style: {
                list: [],
                category: []
            }
        },
        strc: {
            mid: [],
            bid: []
        },
        a: true,
        b: true,
        c: false,
        d: false,
        e: true,
        f: false,
        g: true,
        min: "",
        max: "",
        brand: [],
        shoppingBox: [],
        keyword: [],
        url: "",
        cid: ""
    },
    onLoad: function onLoad(options) {
        var keyword = options.keyword;
        var cid = options.cid;
        console.log(options.keyword);
        this.setData({
            keyword: keyword,
            cid: cid
        });
        this.styleList(), this.shoppingf();
    },
    styleList: function () {
        var that = this;
        wx.get("/product/filter", function (res) {
            if (res.code === 10000) {
                var data = res.data;
                data.material.forEach(function (value) {
                    value.checked = false;
                });
                data.brand.forEach(function (value) {
                    value.checked = false;
                });
                that.setData({
                    "filter.style.list": data.style,
                    "filter.style.category": data.material,
                    brand: data.brand
                });

                console.log(data.material);
            }
        });
    },

    tapN: function () {
        this.setData({
            a: !this.data.a,
            b: true
        });
    },
    tapN1: function () {
        this.setData({
            b: !this.data.b,
            a: true
        });
    },
    more: function () {
        this.setData({
            d: !this.data.d
        });
    },
    inputmin: function (e) {
        var data = e.detail.value;
        console.log(data);
        this.setData({
            min: parseInt(data)
        });
    },
    inputmax: function (e) {
        var data = e.detail.value;
        this.setData({
            max: parseInt(data)
        });
    },
    taphid: function () {
        this.data.brand.forEach(function (e) {
            e.checked = false;
        });
        this.data.filter.style.category.forEach(function (e) {
            e.checked = false;
        });

        this.setData({
            more: true,
            e: true,
            d: false,
            "filter.style.category": this.data.filter.style.category,
            brand: this.data.brand,
            min: "",
            max: ""
        });
    },
    filterpage: function () {
        this.setData({
            b: true,
            a: true,
            e: false,
            g: true
        });
    },
    greenborder: function (e) {
        console.log(e);
        var midx = e.currentTarget.dataset.mid;
        var index = e.currentTarget.dataset.index;
        if (this.data.strc.mid.indexOf(midx) == -1) {
            this.data.strc.mid.push(midx);
            this.setData({
                ["filter.style.category" + "[" + index + "].checked"]: true
            });
        } else {
            this.data.strc.mid.splice(this.data.strc.mid.indexOf(midx), 1);
            this.setData({
                ["filter.style.category" + "[" + index + "].checked"]: false
            });
        }
    },
    greenborder1: function (e) {
        var midx = e.currentTarget.dataset.mid;
        var index = e.currentTarget.dataset.index;
        if (this.data.strc.bid.indexOf(midx) == -1) {
            this.data.strc.bid.push(midx);
            this.setData({
                ["brand" + "[" + index + "].checked"]: true
            });
        } else {
            this.data.strc.bid.splice(this.data.strc.bid.indexOf(midx), 1);
            this.setData({
                ["brand" + "[" + index + "].checked"]: false
            });
        }
    },
    reseted: function () {
        this.data.brand.forEach(function (e) {
            e.checked = false;
        });
        this.data.filter.style.category.forEach(function (e) {
            e.checked = false;
        });
        this.setData({
            "filter.style.category": this.data.filter.style.category,
            brand: this.data.brand,
            min: "",
            max: ""
        });
    },
    shoppingf: function () {
        var that = this;

        if (that.data.cid) {
            var url =
                "https://apiapi.lexj.com/wx/product/forCategory?cid=" +
                that.data.cid +
                "&page=1&pageSize=8";
            wx.request({
                url: "https://apiapi.lexj.com/wx/product/forCategory?cid=" +
                    that.data.cid +
                    "&page=1&pageSize=8",
                success: function success(response) {
                    var res = response.data;
                    if (res.code === 10000) {
                        var data = res.data.list;
                        that.setData({
                            shoppingBox: data,
                            url: url
                        });
                    }
                }
            });
        } else {
            var url =
                "https://apiapi.lexj.com/wx/product/forKeyword?keyword=" +
                this.data.keyword +
                "&page=1&pageSize=8";
            wx.request({
                url: "https://apiapi.lexj.com/wx/product/forKeyword?keyword=" +
                    this.data.keyword +
                    "&page=1&pageSize=8",
                success: function success(response) {
                    var res = response.data;
                    if (res.code === 10000) {
                        var data = res.data.list;
                        that.setData({
                            shoppingBox: data,
                            url: url
                        });
                    }
                }
            });
        }
    },
    arrange: function (e) {
        var tid = e.currentTarget.dataset.tid;
        var that = this;
        wx.request({
            url: that.data.url + "&tid=" + tid,

            success: function success(response) {
                var res = response.data;
                if (res.code === 10000) {
                    var data = res.data.list;
                    that.setData({
                        shoppingBox: data,
                        b: true
                    });
                }
            }
        });
    },
    shopfilter: function (e) {
        console.log(e);
        var that = this;
        var name = e.currentTarget.dataset.name;
        var url =
            "https://apiapi.lexj.com/wx/product/forKeyword?keyword=" +
            name +
            "&page=1&pageSize=8";

        wx.request({
            url: url,

            success: function (e) {
                var res = e.data;
                if (res.code === 10000) {
                    var data = res.data.list;
                    that.setData({
                        shoppingBox: data,
                        url: url,
                        a: true
                    });
                }
            }
        });
    },
    comfirmfilter: function () {
        var that = this;
        var sid = that.data.strc.mid;
        var min = that.data.min;
        var max = that.data.max;
        var url =
            "https://apiapi.lexj.com/wx/product/forKeyword?&sid=" +
            sid +
            "&page=1&pageSize=8";
        if (that.data.strc.mid.length > 0) {
            wx.request({
                url: url,
                success: function (res) {
                    var res = res.data;
                    if (res.code === 10000) {
                        var data = res.data.list;
                        that.setData({
                            shoppingBox: data,
                            url: url
                        });
                    }
                }
            });
        }
        if (that.data.min.length !== 0) {
            wx.request({
                url: url + "&minPrice=" + min,
                success: function (res) {
                    var res = res.data;
                    if (res.code === 10000) {
                        var data = res.data.list;
                        that.setData({
                            shoppingBox: data,
                            url: url + "&minPrice=" + min
                        });
                    }
                }
            });
        }
        if (that.data.max.length !== 0) {
            wx.request({
                url: url + "&maxPrice=" + max,
                success: function (res) {
                    var res = res.data;
                    if (res.code === 10000) {
                        var data = res.data.list;
                        that.setData({
                            shoppingBox: data,
                            url: url + "&maxPrice=" + max
                        });
                    }
                }
            });
        }
        that.data.brand.forEach(function (e) {
            e.checked = false;
        });
        that.data.filter.style.category.forEach(function (e) {
            e.checked = false;
        });

        that.setData({
            more: true,
            e: true,
            d: false,
            "filter.style.category": that.data.filter.style.category,
            brand: that.data.brand,
            "strc.mid": []
        });
    },
    hotchoice: function () {
        var that = this;
        wx.request({
            url: that.data.url + "&tid=4",
            success: function (res) {
                var res = res.data;
                if (res.code === 10000) {
                    var data = res.data.list;
                    that.setData({
                        shoppingBox: data,
                        g: false
                    });
                }
            }
        });
    },
    jump: function (e) {
        console.log(e);
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/goods/index?id=' + id,
        })
    }
});