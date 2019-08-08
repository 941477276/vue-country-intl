import CountryList from '../country-list/CountryList.vue';
import {vueCountryTool} from "../vueCountryTool";

export default {
  name: "SchemaPopover",
  components: {
    'country-list': CountryList
  },
  inheritAttrs: false,
  props: {
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
    // 是否只读
    readonly: {
      type: Boolean,
      default: false
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
    searchInputPlaceholder: {
      type: String,
      default: '输入国家名称、区号搜索'
    },
    // 触发方式，目前功能还未实现
    trigger: {
      type: String,
      default: 'click',
    },
    // 点击reference是否可以显示popover弹窗
    referenceTrigger: {
      type: Boolean,
      default: true,
    },
    // popover弹窗距离参照元素的距离。
    offsetTop: {
      type: Number,
      default: 10,
    },
    // popover弹窗额外class。
    popoverClass: {
      type: String,
      default: '',
    },
    elId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: 'vue_country_intl-' + window._vueCountryIntl_count,
      selected: {},
      searchText: '',
      schemaPopoverValue: this.value,
      // 列表是否显示
      countryListShow: false,
      // input输入框是否获得了焦点
      inputFocused: false,
      // 列表在输入框下方
      listOnBottom: true,
      // 是否是收到触发显示
      isManualShow: false,
      //readonly: false,
      windowResizeTimer: null,
    };
  },
  watch: {
    value(newValue) {
      if (newValue !== this.schemaPopoverValue) {
        this.schemaPopoverValue = newValue;
      }
    },
    // 当前组件的值改变了，则通知父组件，及时改变父组件的值
    schemaPopoverValue(newVal) {
      // console.log('watch schemaPopoverValue', newVal)
      if (newVal !== this.value) {
        this.$emit('input', newVal);
        this.hide();
      }
    }
  },
  methods: {
    // 显示国际选择下拉框
    show() {
      if (this.disabled) {
        return;
      }
      this.countryListShow = true;

      this.$nextTick(() => {
        let popoverEle = this.$refs.intl_popover;
        this._calculatePopoverWidth();
        this._calculatePopoverPosition();
        this._calculatePopoverDirection(popoverEle, this._calculatePopoverPosition);
        popoverEle = null;
      });
    },
    hide() {
      if (this.disabled) {
        return;
      }
      this.countryListShow = false;
      this.searchText = '';
      // 这里的300毫秒必须与css transition事件保持一致
      let timer = setTimeout(() => {
        clearTimeout(timer);
        let popoverEle = this.$refs.intl_popover;
        // 每次隐藏后移除popover的宽度，以方便后面计算
        if (popoverEle.style.width) {
          popoverEle.style.width = '';
        }
      }, 300);
    },
    // 计算popover位置
    _calculatePopoverPosition() {
      if (this.countryListShow) {
        let referenceEle = this.elId ? document.getElementById(this.elId) : this.$refs.popover_container;
        let popoverEle = this.$refs.intl_popover;
        let offset = vueCountryTool.offset(referenceEle);
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
    _calculatePopoverWidth() {
      if (this.countryListShow) {
        let referenceEle = this.elId ? document.getElementById(this.elId) : this.$refs.popover_container;
        let popoverEle = this.$refs.intl_popover;
        let offset = vueCountryTool.offset(referenceEle);
        // 在pc端需要使用文档的可视宽度，而不能使用window.innerWidth，因为window.innerWidth会把文档的垂直滚动条也计算进去
        let documentWidth = document.body ? document.body.clientWidth : (document.documentElement ? document.documentElement.clientWidth : window.innerWidth);
        // console.log('width', (popoverEle.offsetWidth + offset.left), documentWidth, (documentWidth - offset.left - 15));
        // 解决在移动端会造成宽度比屏幕还宽度的问题
        if ((popoverEle.offsetWidth + offset.left) >= documentWidth) {
          popoverEle.style.width = (documentWidth - offset.left - 15) + 'px';
        }
        referenceEle = null;
        popoverEle = null;
      }
    },
    // reference元素点击事件
    _referenceClickEvent(e) {
      e = e || window.event;
      e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
      if (this.countryListShow) {
        this.hide();
      } else {
        this.show();
      }
    },
    // 计算弹出层方位
    _calculatePopoverDirection(ele, fn) {
      let eleInView = () => {
        let rect = vueCountryTool.getElementRect(ele);
        let wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度兼容写法

        if (rect.top > 0 && rect.top < wh && rect.bottom > 0 && rect.bottom < wh) { // 正在视口中
          return true;
        } else {
          return false;
        }
      };
      if (eleInView()) {
        // console.log('元素完全出现在视口中');
        eleInView = null;
      } else {
        // console.log('元素未完全出现在视口中，现尝试将位置反过来');
        // 如果列表朝下不能完全出现在视口时，则尝试将列表朝上
        this.listOnBottom = !this.listOnBottom;
        fn && typeof fn === 'function' && fn();
        // console.log('执行了fn');
        this.$nextTick(() => {
          if (eleInView()) {
            // console.log('位置反过来后，元素完全出现在视口中');
            eleInView = null;
          } else {
            this.listOnBottom = !this.listOnBottom;
            fn && typeof fn === 'function' && fn();
            // console.log('执行了fn');
            eleInView = null;
          }
        });
      }
    },
    // document click事件
    _documentClickEvent(e) {
      e = e || window.event;
      // console.log('document点击了', this.schema);
      if (this.countryListShow) {
        let target = e.target || e.srcElement;
        let popoverEle = this.$refs.intl_popover;
        let isPopover = vueCountryTool.elementContains(popoverEle, target) || target === popoverEle;
        let referenceEle = this.elId ? document.getElementById(this.elId) : this.$refs.popover_container;
        let isReference = vueCountryTool.elementContains(referenceEle, target) || target === referenceEle;
        // console.log(target, isPopover);
        // 如果target是popover中的元素，则不隐藏popover
        if (isPopover || isReference) {
          target = null;
          popoverEle = null;
          referenceEle = null;
        } else {
          this.hide();
        }
      }
    },
    // window resize 事件
    _windowResizeEvent() {
      if (this.countryListShow) {
        clearTimeout(this.windowResizeTimer);
        this.windowResizeTimer = setTimeout(() => {
          this._calculatePopoverWidth();
          this._calculatePopoverPosition();
          this._calculatePopoverDirection(this.$refs.intl_popover, this._calculatePopoverPosition);
          clearTimeout(this.windowResizeTimer);
        }, 200);
      }
    },
    _onCountryChange(selected){
      if(selected !== this.selected){
        this.selected = selected;
        this.$emit('onChange', selected);
      }
    },
    // 设置显示的默认值
    _onSelectedChange(selected){
      this.selected = selected;
      this.$emit('selectedChange', selected);
    }
  },
  mounted() {
    // 将popover弹窗移入body中
    try {
      document.body.appendChild(this.$refs.intl_popover);
    } catch (e) {
      console.log(e);
    }
    let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';

    vueCountryTool.bindEvent(document, 'click', this._documentClickEvent);
    vueCountryTool.bindEvent(window, resizeEvent, this._windowResizeEvent);
    if(!this.elId){
      let referenceEle = this.$refs.popover_container;
      if (this.referenceTrigger) {
        vueCountryTool.bindEvent(referenceEle, 'click', this._referenceClickEvent);
        referenceEle = null;
      }
    }
  },
  beforeDestroy() {
    let resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
    let popoverEle = this.$refs.intl_popover;

    vueCountryTool.unBindEvent(document, 'click', this._documentBindEvent);
    vueCountryTool.unBindEvent(window, resizeEvent, this._windowResizeEvent);
    if(!this.elId){
      let referenceEle = this.$refs.popover_container;
      if (this.referenceTrigger) {
        vueCountryTool.unBindEvent(referenceEle, 'click', this._referenceClickEvent);
        referenceEle = null;
      }
    }

    this.hide();
    try {
      document.body.removeChild(popoverEle);
    } catch (e) {
      console.error(e);
    }
  }
}
