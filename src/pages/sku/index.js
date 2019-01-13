let initArray = [];
let choiceArray = [];
let copychoiceArray1 = [];
var copyInitArray = JSON.parse(JSON.stringify(initArray));
var selectedI = {}
Component({
    data: {
        selectedIm: {},
        goods: {
            dimensions: [],
            price: "",
            img: "",
            relate: [],
            index: "",
            InitArray: [],
            InitArray1: [],
            style: [],
            copyimg: [],
            copyprice: [],
            value: [],


        },
        num: 1
    },
    methods: {
        cartbox1: function (data) {

            var that = this
            console.log(data);
            for (let i = 0; i < data.dimensions.length; i++) {
                data.dimensions[i].choice.forEach(function (e) {
                    e.checked = false;
                    e.disable = false;
                });
            }

            data.dimensions.forEach(function (e) {
                e.checked = false;
            });


            data.relate.forEach(function (x) {
                x.relateArr = x.relateId.split(";");
            });



            that.setData({
                "goods.price": data.price,
                "goods.img": data.img,
                "goods.dimensions": data.dimensions,
                "goods.relate": data.relate,
                "goods.copyimg": data.img,
                "goods.copyprice": data.price
            });
            this.initArray(data.relate);


        },
        // 初始化数组
        initArray: function (relate) {

            var that = this;
            var style = [];
            relate[0].relateArr.forEach(() => {
                initArray.push([]),
                    choiceArray.push([]),
                    copyInitArray.push([]),
                    copychoiceArray1.push([]),
                    style.push(false);
            });

            // initArray=[[],[],[]]
            for (let item of relate) {
                item.relateArr.forEach((it, idx) => {
                    if (!copyInitArray[idx].includes(it)) {
                        copyInitArray[idx].push(it), initArray[idx].push(it);
                    }
                });
            }

            that.setData({
                "goods.InitArray": copyInitArray,
                // "goods.InitArray1": copychoiceArray1,
                "goods.style": style
            });


            this.caculateChoiceStatus();
        },

        choiceprop: function (e) {


            var style = this.data.goods.style;


            var disable = e.currentTarget.dataset.disable;
            if (disable) {
                wx.showToast({
                    title: "该按钮不可用"
                });
                return;
            }
            var id = e.currentTarget.dataset.id;

            var index = e.currentTarget.dataset.index;
            var idx = e.currentTarget.dataset.idx;
            //获取选取的规格放进style中
            if (id !== style[index]) {
                style[index] = id;
            } else {
                style[index] = false;
            }
            var dimensions = this.data.goods.dimensions;

            var value = [];
            for (let i = 0; i < dimensions.length; i++) {
                for (let j = 0; j < dimensions[i].choice.length; j++) {
                    if (style.includes(dimensions[i].choice[j].id)) {
                        dimensions[i].choice[j].checked = true;
                        value.push(dimensions[i].choice[j].value);
                    } else {
                        dimensions[i].choice[j].checked = false;
                    }
                }
            }

            this.setData({
                "goods.value": value,
                ["goods.style"]: style
            });
            this.caculateChoiceStatus();
        },
        // 检查选中后的状态
        caculateChoiceStatus() {
            var that = this;
            var style = this.data.goods.style;
            var copychoiceArray = JSON.parse(JSON.stringify(choiceArray));
            // 获取当前点击相关的元素
            for (let i = 0; i < style.length; i++) {
                if (style[i] == false) {
                    copychoiceArray1[i] = false;
                } else {
                    var a = that.data.goods.relate.filter(x => {
                        return x.relateArr[i] == style[i];
                    });

                    var copychoiceArray2 = JSON.parse(JSON.stringify(copychoiceArray));
                    //将相关的规格加入相应的idx中并去重
                    for (let item of a) {
                        item.relateArr.forEach((it, idx) => {
                            if (!copychoiceArray2[idx].includes(it)) {
                                copychoiceArray2[idx].push(it);
                            }
                        });
                    }
                    copychoiceArray2[i] = initArray[i];
                    copychoiceArray1[i] = copychoiceArray2;
                }
            }


            var cinitArray = JSON.parse(JSON.stringify(initArray));


            for (let i = 0; i < cinitArray.length; i++) {
                if (copychoiceArray1[i]) {
                    for (let j = 0; j < copychoiceArray1[i].length; j++) {
                        cinitArray[j] = cinitArray[j].filter(x => {
                            return copychoiceArray1[i][j].includes(x);
                        });
                    }
                }
            }

            // var m = cinitArray.join(",").split(',')
            var dimensions = that.data.goods.dimensions;
            for (let i = 0; i < dimensions.length; i++) {
                dimensions[i].choice.forEach(e => {
                    return (e.disable = false);
                });
            }

            for (let i = 0; i < dimensions.length; i++) {
                for (let j = 0; j < dimensions[i].choice.length; j++) {
                    console.log(i, cinitArray[i], dimensions[i].choice[j].id);
                    if (!cinitArray[i].includes(dimensions[i].choice[j].id)) {
                        dimensions[i].choice[j].disable = true;
                    }
                }
            }
            var data = that.data.goods;
            //
            if (!style.includes(false)) {
                var selected = that.data.goods.relate.filter(x => {
                    return x.relateId == style.join(";");
                });


                that.setData({
                    "goods.price": selected[0].price,
                    "goods.img": selected[0].img,

                });
            } else {
                that.setData({
                    "goods.price": data.copyprice,
                    "goods.img": data.copyimg,

                });
            }

            var dataObj = {
                "goods.dimensions": dimensions,
                // ['goods.dimensions[' + index + '].checked']: !that.data.goods.dimensions[index].checked,
                // ['goods.dimensions[' + index + '].choice[' + idx + '].disable']: !that.data.goods.dimensions[index].choice[idx].disable,
                "goods.style": style
            };

            // that.data.goods.dimensions[index].choice.forEach(function (e, choiceIdx) {
            //   dataObj["goods.dimensions[" + index + "].choice[" + choiceIdx + "].checked"] = (choiceIdx === idx);
            // });

            that.setData(dataObj); //setData不能频繁调，影响性能

            // var {
            //   dimensions,
            //   index
            // } = this.data.goods;
            // console.log(dimensions, index, dimensions[index]);
            // console.log(dimensions[index].choice);
            // dimensions[index].choice.forEach(function (e) {
            //   e.checked = false;
            // });
            // this.setData({
            //   ["this.data.goods.dimensions [" + this.data.goods.index + "].choice[" + idx + "].checked"]: true
            // })
        },
        taphid: function () {
            this.setData({
                m: true
            });
        },
        tapbuy: function () {
            console.log(this.data.goods.style);
            if (this.data.goods.style.includes(false)) {
                this.setData({
                    m: false
                });
            } else {
                var selected = this.data.goods.relate.filter(x => {
                    return x.relateId == this.data.goods.style.join(";");
                });
                if (!selectedI[selected[0].skuId]) {
                    selectedI[selected[0].skuId] = this.data.num
                } else {
                    selectedI[selected[0].skuId] += this.data.num
                }

                this.setData({
                    selectedIm: selectedI
                })
                var selectedIm = this.data.selectedIm
                console.log(selectedIm)
                wx.setStorageSync('sim', selectedIm)
            }
        },
        getNum: function (e) {
            console.log(e)
            this.setData({
                "num": e.detail.num
            })
            console.log(this.data.num)
        }
    }

})