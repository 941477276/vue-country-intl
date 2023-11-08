export const countryListProps = {
  value: {
    type: [String, Number],
    default: ''
  },
  // 类型，有两种类型，第一种：选择手机号码区号，值为phone;第二种：选择国家，值为country
  type: {
    type: String,
    default: 'phone',
  },
  iso2: { // 国籍代码，当type=phone时必须传递iso2属性，否则当区号代码为212或358时会出问题！
    type: String,
    default: ''
  },
  listZIndex: { // 列表的层级
    type: Number,
    default: 0,
  },
  maxHeight: { // 列表最大高度
    type: Number,
    default: 0,
  },
  searchText:{ // 查询条件
    type: [String, Number],
    default: ''
  },
  // 是否显示区号
  showAreaCode: {
    type: Boolean,
    default: true,
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
  // 是否可以搜索
  searchAble: {
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
  // 是否使用中文显示国籍名称
  useChinese: {
    type: Boolean,
    default: false
  },
  // 排序函数
  sort: {
    type: Function,
    default: null
  },
  // 过滤函数
  filter: {
    type: Function,
    default: null
  }
};
