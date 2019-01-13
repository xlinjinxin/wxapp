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
	route: "pages/main/index/index",
	data: {
		banner: {
			img: [],
			indicatorDots: false,
			vertical: false,
			autoplay: false,
			interval: 4000,
			duration: 1000,
			circular: true,
			current: 0
		},
		banner1: {
			img: [],
			indicatorDots: false,
			vertical: false,
			autoplay: false,
			interval: 4000,
			duration: 1000,
			circular: true,
			current: 0
		},
		limtime: [],
		convenient: [],
		xinpin: [],
		choice: [],
		day: [],
		hours: [],
		minute: [],
		second: [],
		id: []
	},

	onLoad: function onLoad() {
		this.getBanner();
		this.getConvenient();
		this.getXinpin();
		this.getBanner1();
		this.getLimtime();

		this.play();
		this.selectComponent("#list").setRequestConfig({
			url: "/index/recommend/0.3975559837800886"
		});
	},

	getBanner: function() {
		var _this = this;
		wx.get("/index/banners", function(res) {
			if (res.code == 10000) {
				var data = res.data;
				_this.setData({
					"banner.img": data
				});
			}
		});
	},
	getConvenient: function() {
		var athis = this;
		wx.get("/index/convenient", function(res) {
			if (res.code == 10000) {
				var data = res.data;
				athis.setData({
					convenient: data
				});
			}
		});
	},
	getXinpin: function() {
		wx.get("/index/weeks", res => {
			if (res.code == 10000) {
				var data = res.data.list;
				this.setData({
					xinpin: data
				});
			}
		});
	},
	getBanner1: function() {
		var athis = this;

		wx.get("/operation/shareHomes", function(res) {
			if (res.code == 10000) {
				var data = res.data;
				athis.setData({
					"banner1.img": data.list
				});
			}
		});
	},
	getLimtime: function() {
		// wx.get("/index/seckills", res => {
		//   if (res.code == 10000) {
		//     var data = res.data.list;
		//     this.setData({
		//       limtime: data
		//     });
		//   }
		// });
	},

	// getchoice: function(page) {
	//   wx.get(
	//     "/index/recommend/0.3975559837800886?page=" + page + "&pageSize=8",
	//     res => {
	//       if (res.code == 10000) {
	//         var data = res.data.list;
	//         this.setData({
	//           choice: this.data.choice.concat(data)
	//         });
	//       }
	//     }
	//   );
	// },
	timedown: function() {
		var that = this;
		var lefttime = new Date(2019, 11, 28, 17, 40, 0) - new Date();
		var days = parseInt(lefttime / 1000 / 60 / 60 / 24, 10);
		var hours = parseInt((lefttime / 1000 / 60 / 60) % 24, 10);
		var minute = parseInt((lefttime / 1000 / 60) % 60, 10);
		var second = parseInt((lefttime / 1000) % 60, 10);
		that.setData({
			day: days,
			hours: hours,
			minute: minute,
			second: second
		});
	},
	play: function() {
		var that = this;
		var timer = setInterval(function() {
			that.timedown();
		}, 1000);
	},
	entergood: function(e) {
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
			url: "/pages/goods/index?id=" + id
		});
	},
	getList: function(e) {
		var data = e.detail.list;
		this.setData({
			choice: this.data.choice.concat(data)
		});
	},
	goCalendar: function() {
		wx.navigateTo({
			url: "../../calendar/index"
		});
	}
});
