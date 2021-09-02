//这里书写公共方法     //这个是防抖函数
export function debounce(func, delay) { //这个是模板，可以直接套用
    let timer = null
    return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args) //这里是在定时器中执行this.$refs.scroll. refresh这个函数
        }, delay)
    }
}

// 事件格式化
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp('(${k})').test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padleftZero(str));
        }

    }
    return fmt;
};

function padleftZero(str) {
    return ('00' + str).substr(str.length)
}
// Date.prototype.format = function(fmt) {
//     //debugger;
//     let o = {
//         "M+": this.getMonth() + 1, //月份
//         "d+": this.getDate(), //日
//         "h+": this.getHours(), //小时
//         "m+": this.getMinutes(), //分
//         "s+": this.getSeconds(), //秒
//         "q+": Math.floor((this.getMonth() + 3) / 3), //季度
//         "S": this.getMilliseconds() //毫秒
//     };
//     if (/(y+)/.test(fmt))
//         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//     for (let k in o)
//         if (new RegExp("(" + k + ")").test(fmt))
//             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//     return fmt;
// };

// export function fmtDate(date, pattern) {
//     let ts = date.getTime();
//     let d = new Date(ts).format("yyyy-MM-dd hh:mm:ss");
//     if (pattern) {
//         d = new Date(ts).format(pattern);
//     }
//     return d.toLocaleString();
// }