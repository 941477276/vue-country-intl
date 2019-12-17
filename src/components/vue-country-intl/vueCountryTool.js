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
};
