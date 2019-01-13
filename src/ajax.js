const maxLoginTimes = 3;
let loginTimes = 0;
const pendingRequestPool = [];
let requestNum = 0;
const maxRequest = 10;
const uniqueRequestPool = {};
//处理请求限制
function base(
	url,
	data,
	method = "get",
	header = { "Content-Type": "application/json" },
	unique = false
) {
	return new Promise((resolve, reject) => {
		let uniqueRequestKey;
		if (unique) {
			uniqueRequestKey = `${url}+${JSON.stringify(data)}+${method}`;
			if (uniqueRequestPool[uniqueRequestKey]) {
				resolve({
					msg: "操作过于频繁"
				});
				return;
			} else {
				uniqueRequestPool[uniqueRequestKey] = true;
			}
		}
		let fn = function() {
			if (requestNum < maxRequest) {
				requestNum++;
				wx.request({
					url: url,
					data: data,
					header: header,
					method: method,
					success: reponse => {
						const res = reponse.data;
						resolve(res);
					},
					fail(e) {
						reject(e);
					},
					complete() {
						requestNum--; //请求完成，请求数-1；
						if (unique) {
							//当请求是唯一的，请求完成后过4秒后才可再请求，防止重复触发
							setTimeout(() => {
								delete uniqueRequestPool[uniqueRequestKey];
							}, 4000);
						}
						const canRequestNum = maxRequest - requestNum; //获取当前可请求数
						if (pendingRequestPool.length > 0 && canRequestNum) {
							//当等待请求的缓存池中有成员等待时，且有可请求的位置时
							const requestAgainPool = pendingRequestPool.splice(
								0,
								canRequestNum
							);
							requestAgainPool.forEach(fn => {
								fn();
							});
						}
					}
				});
			} else {
				//请求数满了，等待中
				pendingRequestPool.push(fn);
			}
		};
		fn();
	});
}

// 处理登录逻辑;
function smRequest(url, data, method, header, unique) {
	return new Promise((resolve, reject) => {
		//写一个闭包，将请求的逻辑缓存下来
		let fn = function(resolve2) {
			// 在请求头上保存登录的token和其他信息
			const token = wx.getStorageSync("TOKEN");
			if (token) {
				header["TOKEN"] = token;
			}
			let host = "https://apiapi.lexj.com/wx";
			base(host + url, data, method, header, unique).then(
				res => {
					if (res.code == "UN_LOGIN") {
						if (pendingLoginPool.length == 0) {
							//只有未请求登录的时候才进行登录，避免多个请求未登录时，都触发登录
							login();
						}
						//未登录，把请求丢进等待登录的缓存池中
						pendingLoginPool.push({ fn, resolve });
					} else {
						resolve(res);
						if (typeof resolve2 === "function") {
							resolve2(res);
						}
					}
				},
				err => {
					reject(err);
				}
			);
		};
		fn();
	});
}
export default {
	base,
	smRequest
};
