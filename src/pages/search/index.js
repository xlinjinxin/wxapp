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
    route: "pages/search/index",
    data: {
        search1: [],
        a: true,
        text: [],
        texta: [],
        value: null,
        b: true,
        input: [],
        c: true


    },
    onLoad: function (options) {
        var save = wx.getStorageSync('save') || [];

        console.log(save)
        this.setData({
            "texta": save,
            a: save.length == 0 ? true : false
        })

        this.getSearch();

    },
    getSearch: function () {
        wx.get('/search/hotKeywords', (res) => {
            if (res.code == 10000) {
                var data = res.data;
                this.setData({
                    "search1": data
                });
            }
        });
    },
    //获取文本框信息和搜索记录

    gettext1: function (e) {
        var b = this.data.value;
        console.log(this.data.value)
        var texta = this.data.texta;
        texta = texta.filter(x => x != b);
        texta.unshift(b);
        console.log(texta)
        this.setData({
            "text": b,

            "texta": texta,
            "a": false,
        });

        wx.setStorageSync('save', texta);
        if (b.length > 0) {
            wx.navigateTo({
                url: '/pages/commodity/index?keyword=' + b

            })

        }
    },
    hotsearch: function (e) {
        console.log(e)
        var b = e.currentTarget.dataset.name;

        wx.navigateTo({
            url: '/pages/commodity/index?keyword=' + b



        })
    },
    //删除单行
    delete: function (e) {
        var index = e.currentTarget.dataset.index;
        this.data.texta.splice(index, 1);
        if (this.data.texta.length == 0) {
            this.setData({
                "a": true
            })
        } else
            this.setData({
                "texta": this.data.texta
            })
    },
    //取消数据
    cancel: function () {
        this.setData({
            value: "",
            b: true
        })
    },
    cancel2: function () {
        wx.clearStorage();
        this.setData({
            "a": true,
            "texta": []
        })
    },
    seachplace: function () {
        this.setData({
            "b": false

        })
    },
    serchblur: function () {
        this.setData({
            "b": true

        })
    },
    bindinput: function (e) {
        if (e.detail.value.length > 0) {
            this.setData({
                c: false,
                value: e.detail.value
            })
        } else if (e.detail.value.length === 0) {
            this.setData({
                c: true
            })
        }

        // this.setData({
        //     value: e.detail.value
        // })
        var that = this;
        wx.request({
            url: 'https://apiapi.lexj.com/wx/search/keyword?keyword=' + e.detail.value,

            success: function (res) {
                var res = res.data;
                if (res.code == 10000) {
                    var data = res.data;
                    var a = data.map(x => x.replace(/'/g, ' '));

                    that.setData({
                        "input": a
                    });

                }
            }

        })
    },
    turnback: function () {
        wx.navigateBack()
    },
    searchinput: function (e) {
        console.log(e)
        var index = e.currentTarget.dataset.index;
        var e = this.data.input[index];
        wx.navigateTo({
            url: '/pages/commodity/index?keyword=' + e

        })
    },
    searchhis: function (e) {
        console.log(e);
        var index = e.currentTarget.dataset.index;
        var e = this.data.texta [index];
        wx.navigateTo({
            url: '/pages/commodity/index?keyword=' + e

        })
    }
})