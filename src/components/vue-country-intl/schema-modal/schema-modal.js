import CountryList from '../country-list/CountryList.vue';
// import {vueCountryTool} from "../vueCountryTool";
export default {
  name: "SchemaModal",
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
    cancelText: {
      type: String,
      default: '取消'
    },
    visible: {
      type: Boolean,
      default: false
    },
    modalClass: {
      type: String,
      default: '',
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
    // 是否使用中文显示国籍名称
    useChinese: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      schemaModalValue: this.value,
      searchText: '',
      modalVisible: false,
      selected: {},
      countryListVisible: false
    }
  },
  watch: {
    value(newValue){
      if(newValue !== this.schemaModalValue){
        this.schemaModalValue = newValue;
      }
    },
    // 当前组件的值改变了，则通知父组件，及时改变父组件的值
    schemaModalValue(newVal){
      // console.log('watch schemaInputValue', newVal)
      if(newVal !== this.value){
        this.$emit('input', newVal);
        this.hide();
      }
    },
    visible(newVal){
      if(newVal !== this.modalVisible){
        if(newVal){
          this.show();
        }else{
          this.hide();
        }
      }
    },
    modalVisible(newVal){
      if(newVal !== this.visible){
        this.$emit('update:visible', newVal);
      }
    }
  },
  methods: {
    show(){
      let classList = document.body.classList;
      if(!classList.contains('lock-scroll')){
        classList.add('lock-scroll');
      }
      if(!this.countryListVisible){
        this.countryListVisible = true;
      }
      this.modalVisible = true;
    },
    hide(){
      let classList = document.body.classList;
      /*this.searchText = ''; 需要放到timeout中去执行以解决搜索后无法选折国籍问题
        this.searchText = '';放在外部则会导致在点击下拉列表的一瞬间 event.target 直接变成ul，从而造成无法选择
       */
      let timer = setTimeout(() => {
        clearTimeout(timer);
        // 解决ios无法点击问题
        if(classList.contains('lock-scroll')){
          classList.remove('lock-scroll');
        }
        this.modalVisible = false;
        this.searchText = '';
      }, 100);
    },
    _onCountryChange(newCountry){
      if(newCountry !== this.selected){
        // console.log(1111)
        this.selected = newCountry;
        this.$emit('onChange', newCountry);
      }
    },
    // 设置显示的默认值
    _onSelectedChange(selected){
      this.selected = selected;
      this.$emit('selectedChange', selected);
    }
  },
  mounted() {
    try {
      document.body.appendChild(this.$refs.intl_modal);
    } catch (e) {
      console.log(e);
    }
    if(this.visible){
      this.show();
    }
  },
  beforeDestroy() {
    this.hide();
    try {
      document.body.removeChild(this.$refs.intl_modal);
    } catch (e) {
      console.log(e);
    }
  }
}
