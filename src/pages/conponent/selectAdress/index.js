let app = getApp();
const { ajax } = getApp();
Component({
	data: {
		provinces: [],
		citys: [110000],
		areas: [110100],
		value: [0, 0, 0]
	},
	methods: {
		//初始化地址选择器
		setRequestConfig: function() {
			ajax
				.smRequest("/common/address", {}, "get", {
					"Content-Type": "application/json"
				})
				.then(res => {
					this.setData({ provinces: res.data });
				});

			ajax
				.smRequest("/common/address" + "/" + this.data.citys[0], {}, "get", {
					"Content-Type": "application/json"
				})
				.then(res => {
					this.setData({ citys: res.data });
				});
			ajax
				.smRequest(
					"/common/address" +
						"/" +
						this.data.citys[0] +
						"/" +
						this.data.areas[0],
					{},
					"get",
					{
						"Content-Type": "application/json"
					}
				)
				.then(res => {
					this.setData({ areas: res.data });
				});
		},
		bindChange: async function(e) {
			let num0 = e.detail.value[0];
			let num1 = e.detail.value[1];
			let num2 = e.detail.value[2];
			if (num0 !== this.data.value[0]) {
				this.setData({ value: [num0, 0, 0] });
				console.log(this.data.value);
				const citiysRes = await ajax.smRequest(
					"/common/address/" + this.data.provinces[num0].num,
					{},
					"get",
					{
						"Content-Type": "application/json"
					}
				);

				this.setData({ citys: citiysRes.data });
				const { provinces, citys } = this.data;
				const areasRes = await ajax.smRequest(
					`/common/address/${provinces[num0].num}/${citys[num1].num}`,
					{},
					"get",
					{
						"Content-Type": "application/json"
					}
				);
				this.setData({ areas: areasRes.data });
			}
			if (num1 !== this.data.value[1]) {
				this.setData({ value: [num0, num1, 0] });
				const { provinces, citys } = this.data;
				const areasRes = await ajax.smRequest(
					`/common/address/${provinces[num0].num}/${citys[num1].num}`,
					{},
					"get",
					{
						"Content-Type": "application/json"
					}
				);
				this.setData({ areas: areasRes.data });
			}
			if (num2 !== this.data.value[2]) {
				this.setData({ value: [num0, num1, num2] });
			}
		}
	},
	attached: function() {}
});
