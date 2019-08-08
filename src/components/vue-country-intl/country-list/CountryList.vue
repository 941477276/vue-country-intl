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
    },
    data(){
      return {
        selected: {},
      };
    },
    computed: {
      countryList () {
        let searchText = this.searchText || '';
        if (!this.searchAble || searchText.length === 0) {
          return countriesData;
        }
        return countriesData.filter(item => {
          let reg = new RegExp(searchText, 'gi');
          let nameFlag = reg.test(item.name);
          let dialCodeFlag = reg.test(item.dialCode);
          let iso2Flag = reg.test(item.iso2);
          return nameFlag || dialCodeFlag || iso2Flag;
        });
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
