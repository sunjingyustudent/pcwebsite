/*
 * 获取url参数
 * @name 自定义获取参数名称
 */
export function getUrlParameter(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/*
* 删除数组对象/数组
* @thisArray 操作的数组对象／数组
* @objId 当前id
*/
export function delArrayObj(thisArray, objId) {
  for (var j = 0; j < thisArray.length; j++) {
    if (typeof (thisArray[j]) == "object") {
      var isId = thisArray[j].hasOwnProperty('id');//id

      if (isId && objId == thisArray[j].id) {
        thisArray.splice(j, 1);
      }
    }
    if (typeof (thisArray[j]) == "number") {
      if (objId == thisArray[j]) {
        thisArray.splice(j, 1);
      }
    }
  }
}

/*
* 获取当前用户设备(h5)
*/
export const checkOs = {
  ua: navigator.userAgent,
  wechat() { return this.ua.match(/(MicroMessenger)\/([\d.]+)/i); },
  android() { return this.ua.match(/(Android);?[\s/]+([\d.]+)?/); },
  ios() { return this.ua.match(/(iPhone\sOS)\s([\d_]+)/); },
};
/*
*获取并返回cookie
*参数为要获取cookie中的键
*/
export function getCookie(key) {
  let cookies = document.cookie;
  let arr = cookies.split(";");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].indexOf(key) != -1) {
      return arr[i].split("=")[1];
    }
  }
}

/*
* 随机生成20位字符串
*/
export function randomStr() {
  let arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "z", "0", "x", "c", "v", "b", "n", "m", "a", "s", "d", "f", "g", "h", "j", "k", "l", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];

  let str = "";
  for (let i = 0; i < 16; i++) {
    str += arr[parseInt(Math.random() * arr.length)];
  }
  return str += (+ new Date() + "").slice(-4);
}

//获取当前时间
export function getNowFormatDate() {
  let date = new Date();
  let seperator2 = ":";
  let currentdate = date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
  return currentdate;
}

//表情替换方法
export function emojiReplace(str,map) {
  for (var i = 1; i <= map.length; i++) {
    var img = '<img class="emoji-img" src="' + map[i - 1].image_path + '">';
    var res = map[i - 1].emoji;
    res = res.replace(/\[/, '\\[').replace(/\]/, '\\]').replace(/\//, '\\/').replace(/\(/, '\\(').replace(/\)/, '\\)').replace(/\'/, "\\'").replace(/\?/, "\\?").replace(/\|/, "\\|").replace(/\*/, "\\*");
    str = str.replace(new RegExp(res, "gm"), img)
  }
  return str;
}
