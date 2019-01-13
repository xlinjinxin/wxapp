var url = "";
var selectBox = {};
Page({
  data: {
    information: [],
    selectedp: [],
    num: [],
    a: false
  },
  onShow: function onload() {
    var that = this;
    var sim = wx.getStorageSync("sim") || [];
    this.setData({
      information: sim
    });

    this.inputSkuid(sim);
    console.log(url);
    wx.request({
      url: "" + url,
      success: function(res) {
        res = res.data;
        res.data.allCart.forEach(function(e) {
          e.checked = false;
        });
        console.log(res.data.allCart);
        if ((res.code = 10000)) {
          that.setData({
            selectedp: res.data.allCart
          });
        }
      }
    });
  },
  goShopping: function() {
    wx.switchTab({
      url: "/pages/main/index/index"
    });
  },
  inputSkuid: function(e) {
    let sku1;
    let num1;

    num1 = Object.values(e);
    sku1 = Object.keys(e);
    console.log(e, num1, sku1);
    this.setData({
      num: num1
    });
    console.log(this.data.information, sku1);

    url = "https://apiapi.lexj.com/wx/cart/group/info?skuId=";
    let sku = sku1[0];
    if (sku1 == 1) {
      url = url + sku1[0];
    } else {
      for (let i = 0; i < sku1.length; i++) {
        sku = sku + "%2C" + sku1[i];
      }
      url = url + sku;
    }
    console.log(url);
    return url;
  },
  //选取商品
  handleTap: function(e) {
    console.log(e);
    var skuId = e.currentTarget.dataset.skuid;
    console.log(skuId);
    if (!selectBox[skuId]) {
      selectBox[skuId] = 1;
    } else {
      delete selectBox[skuId];
    }

    var index = e.currentTarget.dataset.index;
    this.data.selectedp[index].checked = !this.data.selectedp[index].checked;
    this.setData({
      selectedp: this.data.selectedp
    });
    if (JSON.stringify(selectBox) == "{}") {
      this.setData({
        a: false
      });
    } else {
      this.setData({
        a: true
      });
    }
  },
  deleteTap: function() {
    var that = this;

    if (this.data.a == false) {
      return;
    } else {
      var information = this.data.information;
      for (let x in selectBox) {
        if (information[x]) {
          delete information[x];
        }
      }
      console.log(information);
      this.inputSkuid(information);
      wx.request({
        url: "" + url,
        success: function(res) {
          res = res.data;
          if (res.code == 10000) {
            that.setData({
              selectedp: res.data.allCart,
              a: false
            });
          }
        }
      });
      selectBox = {};

      wx.setStorageSync("sim", information);
    }
  }
});
