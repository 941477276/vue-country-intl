import SchemaInput from './schema-input/SchemaInput.vue';
import SchemaPopover from './schema-popover/SchemaPopover.vue';
import SchemaModal from './schema-modal/SchemaModal.vue';
import {vueCountryTool} from "./vueCountryTool";

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
export default {
  name: 'VueCountryIntl',
  components: {
    'schema-input': SchemaInput,
    'schema-popover': SchemaPopover,
    'schema-modal': SchemaModal
  },
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
    // 触发popover弹出的元素。只有在schema=popover时有效
    elId: {
      type: String,
      default: ''
    },
    // modal弹出显示。只有在schema=modal时有效
    visible: {
      type: Boolean,
      default: false
    },
    // model弹窗额外class。只有在schema=model时有效
    modalClass: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    /* 禁用的国家(可以传递国家名称、国家代码、国家区号)，可以传递字符串也可以传递数组，传递字符串时禁用多个国家使用逗号分隔 */
    disableCountry: {
      type: [String, Array],
      default(){
        return [];
      }
    },
    // 只显示指定的国家，可以传递字符串也可以传递数组，传递字符串时禁用多个国家使用逗号分隔
    onlyCountry: {
      type: [String, Array],
      default(){
        return [];
      }
    }
  },
  data () {
    if (!window._vueCountryIntl_count) {
      window._vueCountryIntl_count = 1;
    } else {
      window._vueCountryIntl_count++;
    }
    return {
      id: 'vue_country_intl-' + window._vueCountryIntl_count,
      countryIntlValue: this.value,
      // options: countriesData,
      selected: {},
      version: '1.0.4',
      modalVisible: this.visible
    };
  },
  methods: {
    show(){
      let com;
      switch (this.schema) {
        case 'input':
          com = this.$refs.schemaInput;
          break;
        case 'popover':
          com = this.$refs.schemaPopover;
          break;
        case 'modal':
          com = this.$refs.modalPopover;
          break;
      }
      com.show();
    },
    hide(){
      let com;
      switch (this.schema) {
        case 'input':
          com = this.$refs.schemaInput;
          break;
        case 'popover':
          com = this.$refs.schemaPopover;
          break;
        case 'modal':
          com = this.$refs.modalPopover;
          break;
      }
      com.hide();
    },
    // 获取选中的数据
    getSelected () {
      return this.selected;
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
    _onChange(newCountry){
      this.selected = newCountry;
      this.$emit('onChange', newCountry);
    },
    // 设置显示的默认值
    _onSelectedChange(selected){
      this.selected = selected;
    }
  },
  watch: {
    value(newVal){
      if(newVal !== this.countryIntlValue){
        this.countryIntlValue = newVal;
      }
    },
    countryIntlValue(newVal){
      console.log('watch countryIntlValue', newVal)
      if(newVal !== this.value){
        this.$emit('input', newVal);
      }
    },
    visible(newVal){
      if(newVal !== this.modalVisible){
        this.modalVisible = newVal;
      }
    },
    modalVisible(newVal){
      if(newVal !== this.visible){
        this.$emit('update:visible', newVal);
      }
    }
  },
  mounted(){
    let classList = document.body.classList;
    // 解决ios无法点击问题
    if(vueCountryTool.termianl().ios && !classList.contains('vue-country-ios')){
      classList.add('vue-country-ios');
    }
  }
};
