const { ajax } = getApp();
Page({
	route: "pages/goods/index",
	data: {
		banner: {
			img: [],
			title: [],
			price: [],
			remarkCateName: [],
			param: [],
			intro: []
		},
		a: false,
		b: true,
		c: false,
		m: true,
		id: [],
		index: []

		// goods: {
		//   dimensions: [],
		//   price: "",
		//   img: "",
		//   relate: [],
		//   index: "",
		//   InitArray: [],
		//   InitArray1: [],
		//   style: [],
		//   copyimg: [],
		//   copyprice: [],
		//   value: []
		// }
	},
	onLoad: function onload(options) {
		var id = options.id;
		this.setData({
			id: id
		});

		this.getbanner();
		this.cartbox();
		// this.initArray()
	},
	onUnLoad() {
		initArray = [];
		choiceArray = [];
		copychoiceArray1 = [];
		copyInitArray = JSON.parse(JSON.stringify(initArray));
	},
	// getbanner: function () {
	//   var that = this;
	//   wx.request({
	//     url: "https://api.lexj.com/wx/product/itemDetail/" + that.data.id,
	//     success: function (res) {
	//       var data = res.data;
	//       console.log(data);
	//       if (data.code === 10000) {
	//         var data = data.data;
	//         var intro = data.intro.filter(function (x) {
	//           return x.length !== 0 && x[0].content;
	//         });

	//         that.setData({
	//           "banner.img": data.banner,
	//           "banner.title": data.title,
	//           "banner.price": data.price,
	//           "banner.remarkCateName": data.remarkCateName,
	//           "banner.param": data.param,
	//           "banner.intro": intro
	//         });
	//         // console.log(data.intro)
	//       }
	//     }
	//   });
	// },
	getbanner: function() {
		var that = this;
		console.log(that.data.id);
		ajax
			.smRequest("/product/itemDetail/" + that.data.id, {}, "get", {
				"Content-Type": "application/json"
			})
			.then(function(data) {
				if (data.code === 10000) {
					var data = data.data;
					var intro = data.intro.filter(function(x) {
						return x.length !== 0 && x[0].content;
					});

					that.setData({
						"banner.img": data.banner,
						"banner.title": data.title,
						"banner.price": data.price,
						"banner.remarkCateName": data.remarkCateName,
						"banner.param": data.param,
						"banner.intro": intro
					});
					// console.log(data.intro)
				}
			});
	},
	parall: function(e) {
		console.log(this.data.a);
		this.setData({
			a: !this.data.a
		});
	},
	magnify: function(e) {
		console.log(e);
		var index = e.currentTarget.dataset.index;
		this.setData({
			b: false,
			index: index,
			c: true
		});
	},
	turn1: function() {
		this.setData({
			b: true,
			c: false
		});
	},
	shareTo: function() {
		wx.showShareMenu({
			withShareTicket: true
		});
	},
	cartbox: function() {
		var that = this;
		wx.request({
			url: "https://apiapi.lexj.com/wx/product/dimensions/" + that.data.id,

			success: res => {
				var res = res.data;
				if ((res.code = 10000)) {
					var data = res.data;
					that.selectComponent("#sku").cartbox1(data);
				}
			}

			// // 初始化数组
			// initArray: function (relate) {
			//   console.log(relate);
			//   var that = this;
			//   var style = [];
			//   relate[0].relateArr.forEach(() => {
			//     initArray.push([]),
			//       choiceArray.push([]),
			//       copyInitArray.push([]),
			//       copychoiceArray1.push([]),
			//       style.push(false);
			//   });

			//   // initArray=[[],[],[]]
			//   for (let item of relate) {
			//     item.relateArr.forEach((it, idx) => {
			//       if (!copyInitArray[idx].includes(it)) {
			//         copyInitArray[idx].push(it), initArray[idx].push(it);
			//       }
			//     });
			//   }

			//   that.setData({
			//     "goods.InitArray": copyInitArray,
			//     // "goods.InitArray1": copychoiceArray1,
			//     "goods.style": style
			//   });

			//   console.log(this.data.goods.style);
			//   console.log(initArray);
			//   this.caculateChoiceStatus();
			// },

			// choiceprop: function (e) {
			//   console.log(e);

			//   var style = this.data.goods.style;
			//   console.log(copyInitArray);

			//   var disable = e.currentTarget.dataset.disable;
			//   if (disable) {
			//     wx.showToast({
			//       title: "该按钮不可用"
			//     });
			//     return;
			//   }
			//   var id = e.currentTarget.dataset.id;

			//   var index = e.currentTarget.dataset.index;
			//   var idx = e.currentTarget.dataset.idx;
			//   //获取选取的规格放进style中
			//   if (id !== style[index]) {
			//     style[index] = id;
			//   } else {
			//     style[index] = false;
			//   }
			//   var dimensions = this.data.goods.dimensions;
			//   console.log(this.data.goods.relate);
			//   var value = [];
			//   for (let i = 0; i < dimensions.length; i++) {
			//     for (let j = 0; j < dimensions[i].choice.length; j++) {
			//       if (style.includes(dimensions[i].choice[j].id)) {
			//         dimensions[i].choice[j].checked = true;
			//         value.push(dimensions[i].choice[j].value);
			//       } else {
			//         dimensions[i].choice[j].checked = false;
			//       }
			//     }
			//   }
			//   console.log(value);
			//   this.setData({
			//     "goods.value": value,
			//     ["goods.style"]: style
			//   });
			//   this.caculateChoiceStatus();
			// },
			// // 检查选中后的状态
			// caculateChoiceStatus() {
			//   var that = this;
			//   var style = this.data.goods.style;
			//   var copychoiceArray = JSON.parse(JSON.stringify(choiceArray));
			//   // 获取当前点击相关的元素
			//   for (let i = 0; i < style.length; i++) {
			//     if (style[i] == false) {
			//       copychoiceArray1[i] = false;
			//     } else {
			//       var a = that.data.goods.relate.filter(x => {
			//         return x.relateArr[i] == style[i];
			//       });
			//       console.log(that.data.goods.relate);
			//       var copychoiceArray2 = JSON.parse(JSON.stringify(copychoiceArray));
			//       //将相关的规格加入相应的idx中并去重
			//       for (let item of a) {
			//         item.relateArr.forEach((it, idx) => {
			//           if (!copychoiceArray2[idx].includes(it)) {
			//             copychoiceArray2[idx].push(it);
			//           }
			//         });
			//       }
			//       copychoiceArray2[i] = initArray[i];
			//       copychoiceArray1[i] = copychoiceArray2;
			//     }
			//   }
			//   console.log(copychoiceArray1);

			//   var cinitArray = JSON.parse(JSON.stringify(initArray));
			//   console.log(cinitArray, initArray);
			//   for (let i = 0; i < cinitArray.length; i++) {
			//     if (copychoiceArray1[i]) {
			//       for (let j = 0; j < copychoiceArray1[i].length; j++) {
			//         cinitArray[j] = cinitArray[j].filter(x => {
			//           return copychoiceArray1[i][j].includes(x);
			//         });
			//       }
			//     }
			//   }

			//   // var m = cinitArray.join(",").split(',')
			//   var dimensions = that.data.goods.dimensions;
			//   for (let i = 0; i < dimensions.length; i++) {
			//     dimensions[i].choice.forEach(e => {
			//       return (e.disable = false);
			//     });
			//   }
			//   console.log({
			//     dimensions
			//   });
			//   for (let i = 0; i < dimensions.length; i++) {
			//     for (let j = 0; j < dimensions[i].choice.length; j++) {
			//       console.log(i, cinitArray[i], dimensions[i].choice[j].id);
			//       if (!cinitArray[i].includes(dimensions[i].choice[j].id)) {
			//         dimensions[i].choice[j].disable = true;
			//       }
			//     }
			//   }
			//   var data = that.data.goods;
			//   //
			//   if (!style.includes(false)) {
			//     var selected = that.data.goods.relate.filter(x => {
			//       return x.relateId == style.join(";");
			//     });

			//     that.setData({
			//       "goods.price": selected[0].price,
			//       "goods.img": selected[0].img,

			//     });
			//   } else {
			//     that.setData({
			//       "goods.price": data.copyprice,
			//       "goods.img": data.copyimg,

			//     });
			//   }

			//   var dataObj = {
			//     "goods.dimensions": dimensions,
			//     // ['goods.dimensions[' + index + '].checked']: !that.data.goods.dimensions[index].checked,
			//     // ['goods.dimensions[' + index + '].choice[' + idx + '].disable']: !that.data.goods.dimensions[index].choice[idx].disable,
			//     "goods.style": style
			//   };

			//   // that.data.goods.dimensions[index].choice.forEach(function (e, choiceIdx) {
			//   //   dataObj["goods.dimensions[" + index + "].choice[" + choiceIdx + "].checked"] = (choiceIdx === idx);
			//   // });

			//   that.setData(dataObj); //setData不能频繁调，影响性能

			//   // var {
			//   //   dimensions,
			//   //   index
			//   // } = this.data.goods;
			//   // console.log(dimensions, index, dimensions[index]);
			//   // console.log(dimensions[index].choice);
			//   // dimensions[index].choice.forEach(function (e) {
			//   //   e.checked = false;
			//   // });
			//   // this.setData({
			//   //   ["this.data.goods.dimensions [" + this.data.goods.index + "].choice[" + idx + "].checked"]: true
			//   // })
			// },
			// taphid: function () {
			//   this.setData({
			//     m: true
			//   });
			// },
			// tapbuy: function () {
			//   console.log(this.data.goods.style);
			//   if (this.data.goods.style.includes(false)) {
			//     this.setData({
			//       m: false
			//     });
			//   } else {
			//     var selected = this.data.goods.relate.filter(x => {
			//       return x.relateId == this.data.goods.style.join(";");
			//     });
			//     if (!selectedI[selected[0].skuId]) {
			//       selectedI[selected[0].skuId] = 1
			//     }

			//     this.setData({
			//       selectedIm: selectedI
			//     })
			//     var selectedIm = this.data.selectedIm
			//     console.log(selectedIm)
			//     wx.setStorageSync('sim', selectedIm)
			//   }
			// }
		});
	},
	taphid: function() {
		this.selectComponent("#sku").taphid();
	},
	tapbuy: function() {
		this.selectComponent("#sku").tapbuy();
	}
});
