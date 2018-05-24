var async = require("async");

// 并发连接数的计数器
var concurrencyCount = 0;
var urls = [];
for(var i = 0; i < 10; i++) {
  urls.push('http:' + i);
}


var fetchUrl = function (url, callback) {
  // delay 的值在 2000 以内，是个随机的整数
  var delay = parseInt(Math.random() * 2000);
  concurrencyCount++;
  console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url);
  setTimeout(function () {
    concurrencyCount--;
		console.log( url, '已抓取完毕，耗时' + delay + '毫秒');
    callback(null, url + ' html content'); //callback做异步函数 ②
  }, delay);
};

var callBackFn = function(url, callback){ //callback做异步函数 ①
	fetchUrl(url, callback);
}

// var callBackFn = async function(url) {  使用ES7
//     const response = await fetch(url)
//     return response.body
// }

async.mapLimit(urls, 5, callBackFn, function (err, result) {
  console.log('final:');
  console.log(result);
});
