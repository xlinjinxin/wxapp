Component({
    data: {
        num: 1
    },
    methods: {
        minusTap: function (params) {
            if (this.data.num == 1) {
                return
            }
            var nums = this.data.num;
            nums--
            this.setData({
                num: nums
            })
            this.updata()
        },

        addTap: function () {

            if (this.data.num == 9999) {
                return
            }
            var nums = this.data.num;
            nums++
            this.setData({
                num: nums
            })
            this.updata()

        }, //传输数据
        updata: function () {

            this.triggerEvent("numEvent", {
                'num': this.data.num
            })
        }

    }

})