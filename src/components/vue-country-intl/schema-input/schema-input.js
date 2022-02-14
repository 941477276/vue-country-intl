import CountryList from '../country-list/CountryList.vue';
import {vueCountryTool} from "../vueCountryTool";
import {countriesData} from '../data';

export default {
  name: "SchemaInput",
  components: {
    'country-list': CountryList
  },
  inheritAttrs: false,
  props: {
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
    iso2: { // 国籍代码，当type=phone时必须传递iso2属性，否则当区号代码为212或358时会出问题！
      type: String,
      default: ''
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
    /* 禁用的国家(可以传递国家名称、国家代码、国家区号)，可以传递字符串也可以传递数组，传递字符串时禁用多个国家使用逗号分隔 */
    disableCountry: {
      type: [String, Array],
      default(){
        return [];
      }
    },
    // 只显示指定的国家，可以传递字符串也可以传递数组，传递字符串时多个国家使用逗号分隔
    onlyCountry: {
      type: [String, Array],
      default(){
        return [];
      }
    },
    // 未搜索到国家数据时显示的文案
    noDataText: {
      type: String,
      default: '未找到任何数据！'
    },
    // ios移动终端输入框是否只读，默认为true，因为在ios手机终端中如不是只读模式会弹出选择下来框出来
    iosMobileReadonly: {
      type: Boolean,
      default: true
    },
    // 是否使用中文显示国籍名称
    useChinese: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      id: 'vue_country_intl-' + window._vueCountryIntl_count,
      // options: countriesData,
      selected: {},
      searchText: '',
      // 列表是否显示
      countryListShow: false,
      countryListDisplay: false,
      countryListDisplayTime: 0,
      // input输入框是否获得了焦点
      inputFocused: false,
      // 列表在输入框下方
      listOnBottom: true,
      isIos: false,
      deviceWidth: window.innerWidth,
      schemaInputValue: this.value
    };
  },
  computed: {
    viewText () {
      let selected = this.selected;
      let value = (this.value + '').charAt(0) == '+' ? this.value.substr(1) : this.value;
      let name = this.useChinese ? selected.nameCN : selected.name;
      if (this.type.toLowerCase() === 'phone') {
        let dialCode = selected.dialCode;
        if (this.onlyValue) {
          // 处理一个国家有多个手机区号的情况
          if (dialCode == 1 && selected.areaCodes) {
            return '+' + (value || selected.areaCodes[0]);
          }
          return '+' + dialCode;
        } else if (this.showAreaCode) {
          // 处理一个国家有多个手机区号的情况
          if (dialCode == 1 && selected.areaCodes) {
            return `${name}(+${value || selected.areaCodes[0]})`;
          }
          return name + '(+' + selected.dialCode + ')';
        } else {
          return name;
        }
      } else {
        if (this.onlyValue) {
          return selected.iso2;
        } else {
          return name;
        }
      }
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue){
        if(newValue !== this.schemaInputValue){
          this.schemaInputValue = newValue;
        }
        // 如果列表未被渲染过，则自己计算选中的项
        if(!this.countryListDisplay){
          console.log('列表未被渲染过，自己计算选中的项');
          this.selected = vueCountryTool.calcSelectedOption(this.value, this.type, countriesData);
        }
      }
    },
    // 当前组件的值改变了，则通知父组件，及时改变父组件的值
    schemaInputValue(newVal){
      //console.log('watch schemaInputValue', newVal)
      if(newVal !== this.value){
        this.$emit('input', newVal);
      }
    }
  },
  methods: {
    show(){
      if (this.disabled) {
        return;
      }
      let handleShow = () => {
        this.inputFocused = true;
        this.countryListShow = true;
        this.searchText = '';
        console.log(1111,!this.isIos, this.deviceWidth > 992, !this.iosMobileReadonly, !this.readonly)
        if(!this.isIos && this.deviceWidth > 992 && !this.readonly){
          console.log('自动获得焦点')
          let timer = setTimeout(() => {
            clearTimeout(timer);
            this.$refs.searchInput.focus();
          }, 0);
        }
        this.$nextTick(() => {
          this._calculatePopoverDirection(this.$refs.countryList.$el);
        });
      }
      if(!this.countryListDisplay){
        this.countryListDisplay = true;
        this.countryListDisplayTime = new Date().getTime();
        let timer = setTimeout(() => {
          clearTimeout(timer);
          handleShow();
        }, 0);
      }else {
        handleShow();
      }
    },
    hide(){
      /*this.searchText = ''; 需要放到timeout中去执行以解决搜索后无法选折国籍问题
        this.searchText = '';放在外部则会导致在点击下拉列表的一瞬间 event.target 直接变成ul，从而造成无法选择
       */
      let timer = setTimeout(() => {
        this.searchText = '';
        this.inputFocused = false;
        this.countryListShow = false;
        clearTimeout(timer);
      }, 80);
    },
    toggleVisible(){
      if(this.countryListShow){
        this.hide();
      }else{
        this.show();
      }
    },
    // 计算弹出层方位
    _calculatePopoverDirection (ele,fn) {
      let eleInView = () => {
        let rect = vueCountryTool.getElementRect(ele);
        let wh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度兼容写法

        if (rect.top > 0 && rect.top < wh && rect.bottom > 0 && rect.bottom < wh) { // 正在视口中
          return true;
        }else{
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
    // 选择的城市改变事件
    _onCountryChange(newCountry){
      if(newCountry !== this.selected){
        this.selected = newCountry;
        this.$emit('onChange', newCountry);
      }
      console.log(+new Date() - this.countryListDisplayTime);
      // 防止第一显示列表时列表闪一下就消失。原因：CountryList组件在mount时会自动计算一次默认选中项，并通过onchange事件通知给当前组件
      // 而在_onCountryChange中又做了隐藏列表处理
      if((+new Date() - this.countryListDisplayTime) > 20){
        this.hide();
      }
    },
    // 设置显示的默认值
    _onSelectedChange(selected){
      this.selected = selected;
      this.$emit('selectedChange', selected);
    },
    _documentClickEvent(e){
      let target = e.target;
      if(!vueCountryTool.elementContains(this.$refs.input_wrap, target)){
        this.hide();
      }
    }
  },
  mounted(){
    this.isIos = vueCountryTool.termianl().ios;
    vueCountryTool.bindEvent(document, 'click', this._documentClickEvent);
    this.$once('hook:beforeDestroy', () => {
      vueCountryTool.unBindEvent(document, 'click', this._documentClickEvent);
    });
  }
}
