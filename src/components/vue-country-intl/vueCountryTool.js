export const vueCountryTool = {
  /**
   * 获取元素距浏览器最顶部及最左边的距离
   * @param ele dom元素
   */
  offset (ele) {
    let positon = {
      top: 0,
      left: 0,
    };
    let offsetParent = ele.offsetParent;
    positon.top = ele.offsetTop;
    positon.left = ele.offsetLeft;
    while (offsetParent != null) {
      positon.top += offsetParent.offsetTop;
      positon.left += offsetParent.offsetLeft;
      offsetParent = offsetParent.offsetParent;
    }
    offsetParent = null;
    return positon;
  },
  /**
   * 判断两个元素是否是包含关系
   * @param ele 父元素
   * @param childEle 子元素
   * @returns {Boolean}
   */
  elementContains(ele, childEle) {
    if (ele === childEle) {
      return false;
    }
    if (typeof ele.contains === 'function') {
      return ele.contains(childEle);
    } else {
      while (true) {
        if (!childEle) {
          return false;
        }
        if (childEle === ele) {
          return true;
        } else {
          childEle = childEle.parentNode;
        }
      }
      return false;
    }
  },
  // 绑定事件
  bindEvent(el, eventName, fn) {
    if (document.addEventListener) {
      el.addEventListener(eventName, fn, false);
      el.addEventListener(eventName, fn, false);
    } else if (window.attachEvent) {
      el.attachEvent('on' + eventName, fn);
      el.attachEvent('on' + eventName, fn);
    }
  },
  // 解绑事件
  unBindEvent(el, eventName, fn) {
    if (!el) {
      return;
    }
    if (document.removeEventListener) {
      el.removeEventListener(eventName, fn, false);
      el.removeEventListener(eventName, fn, false);
    } else if (window.detachEvent) {
      el.detachEvent('on' + eventName, fn);
      el.detachEvent('on' + eventName, fn);
    }
  },
  getElementRect(element) {
    var rect = element.getBoundingClientRect(); // 距离视窗的距离
    // html元素对象的上边框的宽度
    var top = document.documentElement.clientTop ? document.documentElement.clientTop : 0;
    var left = document.documentElement.clientLeft ? document.documentElement.clientLeft : 0;
    return {
      top: rect.top - top,
      bottom: rect.bottom - top,
      left: rect.left - left,
      right: rect.right - left,
    };
  },
  // 检测终端
  termianl () {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端

    return {
      android: isAndroid,
      ios: isIOS,
    };
  },
  // 计算默认选中的值
  calcSelectedOption (value, type, countryList) {
    // console.log('计算选择值');
    if((value + '').length == 0){
      return {};
    }
    let isPhone = type.toLowerCase() === 'phone';
    if ((value + '').charAt(0) === '+') {
      value = value.substr(1);
    }
    let item = countryList.filter((item) => {
      if (isPhone) {
        if(this.iso2){
          // console.log('iso2', this.iso2, item.iso2);
          return item.iso2 == this.iso2;
        }
        // 一个国家只有一个手机区号的情况
        if(item.dialCode == value){
          return true;
        }

        // 一个国家有多个手机区号的情况
        if(item.dialCode == 1 && item.areaCodes){
          return item.areaCodes.some(areaCode => areaCode == value);
        }
      } else {
        return item.iso2 == value;
      }
    });
    if (!item || item.length === 0) {
      item = {};
    } else {
      item = item[0] || {};
    }
    return item;
  },
};
