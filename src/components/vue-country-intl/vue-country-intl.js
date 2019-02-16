import { countriesData } from './data';

/*
  {
    // 区域代码
    areaCodes: null,
    // 国际区号
    dialCode: "86",
    // iso2国家代码
    iso2: "cn",
    // 显示的文字
    name: "China (中国)",
    // 优先级
    priority: 0
  }
   */
// console.log('countriesData', countriesData);
export default {
  name: 'VueCountryIntl',
  props: {
    // 展示模式
    schema: {
      type: String,
      // 有两种模式，input: 输入框模式(默认)；popover: popover弹窗模式
      default: 'input',
    },
    // 下拉框placeholder
    placeholder: {
      type: String,
      default: '请选择国家',
    },
    // 是否显示区号
    showAreaCode: {
      type: Boolean,
      default: true,
    },
    // 实现自定义v-model第一步
    value: '',
    // 类型，有两种类型，第一种：选择手机号码区号，值为phone;第二种：选择国家，值为country
    type: {
      type: String,
      default: 'phone',
    },
    // 是否可以搜索
    searchAble: {
      type: Boolean,
      default: true,
    },
    // 列表的层级
    listZIndex: {
      type: Number,
      default: 0,
    },
    // 输入框中是否显示图片
    showLabelImg: {
      type: Boolean,
      default: true,
    },
    // input是否只显示选中的值，而不显示国际名称
    onlyValue: {
      type: Boolean,
      default: false,
    },
    // 列表最大高度
    maxHeight: {
      type: Number,
      default: 0,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 选中项中右侧 "select" 的文案
    selectedText: {
      type: String,
      default: 'Selected',
    },
    // 是否显示选中项右侧的 "select" 文案
    showSelectedText: {
      type: Boolean,
      default: true,
    },
    // 触发方式，只有在schema=popover时有效。目前功能还未实现
    trigger: {
      type: String,
      default: 'click',
    },
    // 点击reference是否可以显示popover弹窗
    referenceTrigger: {
      type: Boolean,
      default: true,
    },
    // popover弹窗距离参照元素的距离。只有在schema=popover时有效
    offsetTop: {
      type: Number,
      default: 10,
    },
    // popover弹窗额外class。只有在schema=popover时有效
    popoverClass: {
      type: String,
      default: '',
    },
  },
  data () {
    if (!window._vueCountryIntl_count) {
      window._vueCountryIntl_count = 1;
    } else {
      window._vueCountryIntl_count++;
    }
    return {
      id: 'vue_country_intl-' + window._vueCountryIntl_count,
      // options: countriesData,
      selected: {},
      searchText: '',
      // 作为value的属性名称
      trackBy: this.type.toLowerCase() === 'phone' ? 'dialCode' : 'iso2',
      // 显示的默认选中项属性名
      label: 'name',
      // 列表是否显示
      countryListShow: false,
      // input输入框是否获得了焦点
      inputFocused: false,
      // 列表在输入框下方
      listOnBottom: true,
      // 是否是收到触发显示
      isManualShow: false,
      readonly: false,
      windowResizeTimer: null,
      version: '1.0',
    };
  },
  methods: {
    // 显示或隐藏国际选择下拉框
    show (flag) {
      if (typeof flag === 'undefined') {
        flag = !!flag;
      }
      if (this.disabled) {
        return;
      }
      this.countryListShow = flag;
      if (flag) {
        let termianl = this.termianl();
        if (termianl.ios) {
          let classList = document.body.classList;
          if (!classList.contains('vue-country-ios')) {
            classList.add('vue-country-ios');
          }
          classList = null;
        }
        /* this._calculateEleDirection(); */
        if (this.schema === 'input') {
          this.$nextTick(() => {
            this._calculateEleDirection(document.getElementById(this.id + '-list'));
          });
        } else {
          let popoverEle = document.getElementById(this.id + '-popover');
          // 每次显示时先移除popover的宽度，以方便后面计算
          if (popoverEle.style.width) {
            popoverEle.style.width = '';
          }
          this.$nextTick(() => {
            this._calculatePopoverWidth();
            this._calculatePopoverPosition();
            this._calculateEleDirection(popoverEle, this._calculatePopoverPosition);
            popoverEle = null;
          });
        }
        this.inputFocused = true;
        this.isManualShow = true;
      } else {
        this.isManualShow = false;
        this.searchText = '';
      }
    },
    // 获取选中的数据
    getSelected () {
      return this.selected;
    },
    /**
     * 判断两个元素是否是包含关系
     * @param ele 父元素
     * @param childEle 子元素
     * @returns {Boolean}
     */
    elementContains (ele, childEle) {
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
    // 列表项点击事件
    _countryItemClick (e) {
      e = e || window.event;
      e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
      let target = e.target;
      let selected;
      if (target.nodeName !== 'LI') {
        target = target.parentElement;
      }
      let iso = target.getAttribute('data-iso');
      let index = target.getAttribute('data-index');
      if (iso === this.selected.iso2) {
        selected = {};
      } else {
        selected = this.countryList[index];
      }
      // 如果是收到把列表显示出来的，则点击后需要收到隐藏
      if (this.isManualShow) {
        this.inputFocused = false;
        this.countryListShow = false;
        this.isManualShow = false;
      }
      // 实现自定义v-model第二步
      this.$emit('input', this.type.toLowerCase() === 'phone' ? selected.dialCode : selected.iso2);
      // 执行回调
      this.$emit('onchange', selected, this.type.toLowerCase() === 'phone' ? selected.dialCode : selected.iso2);

      console.log('target', target);
    },
    // 计算元素方位
    _calculateEleDirection (ele, fn) {
      let eleInView = () => {
        // let list = document.getElementById(this.id + '-list');
        let list = ele;
        let rect = this._getElementRect(list);
        let wh = window.innerHeight;
        list = null;
        // 代表元素完全出现在视口中
        if (rect.top > 0 && rect.top < wh && rect.bottom > 0 && rect.bottom < wh) {
          return true;
        } else {
          return false;
        }
      };
      if (eleInView()) {
        console.log('元素完全出现在视口中');
        eleInView = null;
      } else {
        console.log('元素未完全出现在视口中，现尝试将位置反过来');
        // 如果列表朝下不能完全出现在视口时，则尝试将列表朝上
        this.listOnBottom = !this.listOnBottom;
        fn && typeof fn === 'function' && fn();
        console.log('执行了fn');
        this.$nextTick(() => {
          if (eleInView()) {
            console.log('位置反过来后，元素完全出现在视口中');
            eleInView = null;
          } else {
            this.listOnBottom = !this.listOnBottom;
            fn && typeof fn === 'function' && fn();
            console.log('执行了fn');
            eleInView = null;
          }
        });
      }
    },
    _getElementRect (element) {
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
    // 计算popover位置
    _calculatePopoverPosition () {
      if (this.countryListShow) {
        let referenceEle = document.getElementById(this.id);
        let popoverEle = document.getElementById(this.id + '-popover');
        let offset = this.offset(referenceEle);
        if (this.listOnBottom) {
          popoverEle.style.top = offset.top + referenceEle.offsetHeight + this.offsetTop + 'px';
        } else {
          popoverEle.style.top = offset.top - popoverEle.offsetHeight - this.offsetTop + 'px';
        }
        popoverEle.style.left = offset.left + 'px';
        referenceEle = null;
        popoverEle = null;
      }
    },
    // 计算popover宽度
    _calculatePopoverWidth () {
      if (this.countryListShow) {
        let referenceEle = document.getElementById(this.id);
        let popoverEle = document.getElementById(this.id + '-popover');
        let offset = this.offset(referenceEle);
        // 在pc端需要使用文档的可视宽度，而不能使用window.innerWidth，因为window.innerWidth会把文档的垂直滚动条也计算进去
        let documentWidth = document.body ? document.body.clientWidth : (document.documentElement ? document.documentElement.clientWidth : window.innerWidth);
        console.log('width', (popoverEle.offsetWidth + offset.left), documentWidth, (documentWidth - offset.left - 15));
        // 解决在移动端会造成宽度比屏幕还宽度的问题
        if ((popoverEle.offsetWidth + offset.left) >= documentWidth) {
          popoverEle.style.width = (documentWidth - offset.left - 15) + 'px';
        }
        referenceEle = null;
        popoverEle = null;
      }
    },
    // 计算默认选中的值
    _defaultSelectedOption () {
      // console.log('计算选择值');
      let value = this.value;
      let isPhone = this.type.toLowerCase() === 'phone';
      if (isPhone) {
        if ((value + '').charAt(0) === '+') {
          value = value.substr(1);
        }
      }
      let item = this.countryList.filter((item) => {
        if (isPhone) {
          return item.dialCode === value;
        } else {
          return item.iso2 === value;
        }
      });
      if (!item) {
        item = {};
      } else {
        item = item[0] || {};
      }
      return item;
    },
    // 输入表单的focus事件
    _inputFocusEvent () {
      if (this.disabled) {
        return;
      }
      this.inputFocused = true;
      this.countryListShow = true;
      this.$nextTick(() => {
        this._calculateEleDirection(document.getElementById(this.id + '-list'));
      });
    },
    // 输入表单的blur事件
    _inputBlurEvent () {
      // 未了能够触发列表的click事件
      let timer = setTimeout(() => {
        this.inputFocused = false;
        this.countryListShow = false;
        this.searchText = '';
        clearTimeout(timer);
      }, 150);
    },
    // reference元素点击事件
    _referenceClickEvent (e) {
      e = e || window.event;
      e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
      this.show(true);
    },
    // document click事件
    _documentClickEvent (e) {
      e = e || window.event;
      console.log('document点击了', this.schema);
      if (this.countryListShow) {
        let target = e.target || e.srcElement;
        let popoverEle = document.getElementById(this.id + '-popover');
        let isPopover = this.elementContains(popoverEle, target) || target === popoverEle;
        let referenceEle = document.getElementById(this.id);
        let isReference = this.elementContains(referenceEle, target) || target === referenceEle;
        console.log(target, isPopover);
        // 如果target是popover中的元素，则不隐藏popover
        if (isPopover || isReference) {
          target = null;
          popoverEle = null;
          referenceEle = null;
        } else {
          if (this.countryListShow) {
            this.show(false);
          }
        }
      }
    },
    // window resize 事件
    _windowResizeEvent () {
      if (this.countryListShow) {
        clearTimeout(this.windowResizeTimer);
        this.windowResizeTimer = setTimeout(() => {
          this._calculatePopoverWidth();
          this._calculatePopoverPosition();
          this._calculateEleDirection(document.getElementById(this.id + '-popover'), this._calculatePopoverPosition);
          clearTimeout(this.windowResizeTimer);
        }, 200);
      }
    },
    // 绑定事件
    _bindEvent (el, eventName, fn) {
      if (document.addEventListener) {
        el.addEventListener(eventName, fn, false);
        el.addEventListener(eventName, fn, false);
      } else if (window.attachEvent) {
        el.attachEvent('on' + eventName, fn);
        el.attachEvent('on' + eventName, fn);
      }
    },
    // 解绑事件
    _unBindEvent (el, eventName, fn) {
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
  },
  computed: {
    countryList () {
      let searchText = this.searchText;
      if (searchText.length === 0 || !this.searchAble) {
        return countriesData;
      }
      return countriesData.filter(item => {
        return new RegExp(searchText, 'gi').test(item.name);
      });
    },
    viewText () {
      let selected = this.selected;
      if (this.type.toLowerCase() === 'phone') {
        if (this.onlyValue) {
          return '+' + selected.dialCode;
        } else if (this.showAreaCode) {
          return selected.name + '(+' + selected.dialCode + ')';
        } else {
          return selected.name;
        }
      } else {
        if (this.onlyValue) {
          return selected.iso2;
        } else {
          return selected.name;
        }
      }
    },
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.selected = this._defaultSelectedOption();
      },
    },
  },
  mounted () {
    let inputEl = document.getElementById(this.id + '-input');
    let termianl = this.termianl();
    if (termianl.ios) {
      let classList = document.body.classList;
      if (!classList.contains('vue-country-ios')) {
        classList.add('vue-country-ios');
      }
      classList = null;
    }
    if (this.schema === 'input') {
      this._bindEvent(inputEl, 'focus', this._inputFocusEvent);
      this._bindEvent(inputEl, 'blur', this._inputBlurEvent);
      if (window.innerWidth < 992) {
        this.readonly = true;
      }
    } else {
      if (!this.$slots.reference) {
        console.error('当前组件schema为popover，并且缺少值为reference的slot！');
      } else {
        // 将popover弹窗移入body中
        try {
          document.body.appendChild(document.getElementById(this.id + '-popover'));
        } catch (e) {
          console.log(e);
        }
        let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
        let referenceEle = document.getElementById(this.id);
        this._bindEvent(document, 'click', this._documentClickEvent);
        this._bindEvent(window, resizeEvent, this._windowResizeEvent);
        if (this.referenceTrigger) {
          this._bindEvent(referenceEle, 'click', this._referenceClickEvent);
          referenceEle = null;
        }
      }
      console.log(this.$slots.reference);
    }
  },
  beforeDestroy () {
    window._vueCountryIntl_count--;
    try {
      if (this.schema === 'input') {
        let inputEl = document.getElementById(this.id + '-input');
        this._unBindEvent(inputEl, 'focus', this._inputFocusEvent);
        this._unBindEvent(inputEl, 'blur', this._inputBlurEvent);
        inputEl = null;
      } else {
        let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
        let popoverEle = document.getElementById(this.id + '-popover');
        let referenceEle = document.getElementById(this.id);
        this._unBindEvent(document, 'click', this._documentClickEvent);
        this._unBindEvent(window, resizeEvent, this._windowResizeEvent);
        if (this.referenceTrigger) {
          this._unBindEvent(referenceEle, 'click', this._referenceClickEvent);
          referenceEle = null;
        }

        try {
          document.body.removeChild(popoverEle);
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
    }
    let termianl = this.termianl();
    if (termianl.ios) {
      let classList = document.body.classList;
      if (classList.contains('vue-country-ios')) {
        classList.remove('vue-country-ios');
      }
      classList = null;
    }
  },
};
