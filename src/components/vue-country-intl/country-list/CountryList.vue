<template>
  <div class="vue-country-list-wrap"
       :style="{'z-index': listZIndex != 0 ? listZIndex : '', 'max-height': maxHeight > 0 ? (maxHeight + 'px') : ''}">
    <ul class="vue-country-list" @click="_countryItemClick">
      <li class="vue-country-item"
          v-for="(item, index) in countryList"
          :class="{selected: item.iso2 === selected.iso2}"
          :key="item.iso2"
          :data-index="index"
          :data-iso="item.iso2">
        <span class="iti-flag" :class="item.iso2"></span>
        <span class="vue-country-name">{{item.name}}</span>
        <span class="vue-country-areaCode" v-show="showAreaCode">+{{item.dialCode}}</span>
        <span class="selected-text" v-show="showSelectedText">{{selectedText}}</span>
      </li>
      <li class="vue-country-no-data" v-show="countryList.length === 0">未找到任何数据！</li>
    </ul>
  </div>
</template>

<script>
  import {countriesData} from "../data";

  export default {
    name: "CountryList",
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      // 类型，有两种类型，第一种：选择手机号码区号，值为phone;第二种：选择国家，值为country
      type: {
        type: String,
        default: 'phone',
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
      }
    },
    data(){
      return {
        selected: {},
      };
    },
    computed: {
      countryList () {
        let searchText = this.searchText || '';
        let countries = countriesData;
        let disableCountry = typeof this.disableCountry === 'string' ? this.disableCountry.split(',') : this.disableCountry;
        let onlyCountry = typeof this.onlyCountry === 'string' ? this.onlyCountry.split(',') : this.onlyCountry;
        // 根据国家名称或国家代码或国家区号过滤只显示的国家
        if(onlyCountry.length > 0){
          countries = countries.filter(country => {
            let index = this.getIndex(onlyCountry, (item) => {
              let dialCode = item + '';
              if(dialCode.charAt(0) === '+'){
                dialCode = dialCode.replace('+', '');
              }
              return country.name === item || country.dialCode === dialCode || country.iso2 === item;
            });
            return index > -1;
          });
          // console.log('只显示指定国家', countries, onlyCountry)
        }
        // console.log('disableCountry', disableCountry)
        // 根据国家名称或国家代码或国家区号过滤禁用的国家
        if(disableCountry.length > 0){
          countries = countries.filter(country => {
            let index = this.getIndex(disableCountry, (item) => {
              let dialCode = item + '';
              if(dialCode.charAt(0) === '+'){
                dialCode = dialCode.replace('+', '');
              }
              return country.name === item || country.dialCode === dialCode || country.iso2 === item;
            });
            return index === -1;
          });
        }
        if (!this.searchAble || searchText.length === 0) {
          return countries;
        }
        // 按搜索条件进行查询
        countries =  countries.filter(item => {
          let reg = new RegExp(searchText, 'gi');
          let nameFlag = reg.test(item.name);
          let dialCodeFlag = reg.test(item.dialCode);
          let iso2Flag = reg.test(item.iso2);
          return nameFlag || dialCodeFlag || iso2Flag;
        });
        return countries;
      },
    },
    watch: {
      value: {
        immediate: true,
        handler(){
          let cur = this.calcSelectedOption();
          if(cur !== this.selected){
            this.selected = cur;
            // 设置显示的默认值
            this.$emit('selectedChange', cur);
          }
        }
      }
    },
    methods: {
      // 计算默认选中的值
      calcSelectedOption () {
        // console.log('计算选择值');
        let value = this.value;
        let isPhone = this.type.toLowerCase() === 'phone';
        if ((value + '').charAt(0) === '+') {
          value = value.substr(1);
        }
        let item = this.countryList.filter((item) => {
          if (isPhone) {
            return item.dialCode == value;
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
      // 列表项点击事件
      _countryItemClick (e) {
        e = e || window.event;
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
        let target = e.target;
        let selected;
        if(this.justRead){
          return;
        }
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
        this.$emit('input', this.type.toLowerCase() === 'phone' ? (selected.dialCode || '') : (selected.iso2 || ''));
        // 执行回调
        this.$emit('onchange', selected, this.type.toLowerCase() === 'phone' ? (selected.dialCode || '') : (selected.iso2 || ''));

        //console.log('target', target);
      },
      /**
       * 获取数组中符合条件的元素的索引
       * @param arr 数组
       * @param fn 一个函数，如果函数返回true，则返回该项的下标，如果没有找到则返回-1
       */
      getIndex(arr, fn) {
        if (!arr || arr.length == 0 || !fn || (typeof fn != "function")) {
          return -1;
        }

        if (arr.findIndex) {
          return arr.findIndex(fn);
        }
        let len = arr.length,
          i = 0,
          index = -1;
        for (; i < len; i++) {
          let item = arr[i];
          if (fn(item, index, arr) === true) {
            index = i;
            break;
          }
        }
        return index;
      },
    },
    mounted() {
      let cur = this.calcSelectedOption();
      if(cur.iso2){
        // 执行回调。告诉父组件，以让父组件显示到界面
        this.$emit('onchange', cur, this.type.toLowerCase() === 'phone' ? (cur.dialCode || '') : (cur.iso2 || ''));
      }
    }
  }
</script>

<style>
  @import "country-list.css";
</style>
