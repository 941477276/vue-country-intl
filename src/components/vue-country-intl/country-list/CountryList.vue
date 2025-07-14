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
        <span class="vue-country-name">{{useChinese ? item.nameCN : item.name}}</span>
        <span class="vue-country-areaCode" v-show="showAreaCode">
          +{{item.dialCode | areaCodeView(item)}}
        </span>
        <span class="selected-text" v-show="showSelectedText">
          <slot name="selected">
            {{selectedText}}
          </slot>
        </span>
      </li>
      <li class="vue-country-no-data" v-show="countryList.length === 0">
        <slot name="vueCountryNoData">{{noDataText}}</slot>
      </li>
    </ul>
  </div>
</template>

<script>
  import {countriesData} from "../data";
  import {vueCountryTool} from '../vueCountryTool';
  import {countryListProps} from './country-list-props';

  export default {
    name: "CountryList",
    props: {
      ...countryListProps
    },
    filters: {
      areaCodeView (dialCode, country) {
        // console.log(dialCode, country);
        // 有些国家的手机区号会有多个值
        if(dialCode == 1 && country.areaCodes){
          let otherEnableCodes = country.areaCodes.slice(0, 5);

          return (country.areaCodes[0] + ` [${otherEnableCodes.join(', ')}]`);
        }
        return dialCode;
      }
    },
    data(){
      return {
        currentResult: '', // 当前值
        selected: {},
      };
    },
    computed: {
      countryList () {
        let searchText = this.searchText || '';
        let countries = [...countriesData];
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
              return country.name === item || country.nameCN === item || country.dialCode === dialCode || country.iso2 === item;
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
              return country.name === item || country.nameCN === item || country.dialCode === dialCode || country.iso2 === item;
            });
            return index === -1;
          });
        }
        if (typeof this.filter == 'function') {
          countries = countries.filter(this.filter);
        }
        if (typeof this.sort == 'function') {
          countries.sort(this.sort);
        }
        if (typeof this.transform == 'function') {
          countries = this.transform(countries);
        }
        if (!this.searchAble || searchText.length === 0) {
          return countries;
        }
        // 解决用户输入"+"作为搜索条件时，而导致new RegExp(searchText, 'gi')时将"+"认为是需要一个或多个字符
        searchText = searchText.replace('+', '\\+');
        // 按搜索条件进行查询
        countries =  countries.filter(item => {
          let reg = new RegExp(searchText, 'gi');
          // console.log('reg',reg);
          let nameFlag = reg.test(item.name);
          let nameFlag2 = reg.test(item.nameCN);
          if(nameFlag || nameFlag2){
            return true;
          }
          let dialCodeFlag = reg.test(item.dialCode);
          if(dialCodeFlag){
            return true;
          }
          let iso2Flag = reg.test(item.iso2);
          if(iso2Flag){
            return true;
          }
          // 有些国家的手机区号会有多个值
          let diaCodeInMultipleAreaCodeCountry = item.areaCodes && item.areaCodes.some(areaCode => searchText.search(areaCode) > -1);
          return diaCodeInMultipleAreaCodeCountry;
        });
        return countries;
      },
    },
    watch: {
      value: {
        immediate: true,
        handler(){
          // let cur = this.calcSelectedOption();
          let cur = vueCountryTool.calcSelectedOption(this.value, this.type, this.countryList);
          // 防止重复计算
          if(this.value == this.currentResult){
            return;
          }
          console.log('watch', cur, this.selected);
          console.log('watch', this.value, this.currentResult);

          if(cur !== this.selected){
            this.selected = cur;
            this.currentResult = this.value;
            // 设置显示的默认值
            this.$emit('selectedChange', cur);
          }
        }
      }
    },
    methods: {
      /*// 计算默认选中的值
      calcSelectedOption () {
        // console.log('计算选择值');
        let value = this.value;
        if((value + '').length == 0){
          return {};
        }
        let isPhone = this.type.toLowerCase() === 'phone';
        if ((value + '').charAt(0) === '+') {
          value = value.substr(1);
        }
        let item = this.countryList.filter((item) => {
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
      },*/
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
        console.log('target', target, e.currentTarget);
        let countryList = this.countryList;
        let iso = target.getAttribute('data-iso');
        let index = -1;
        for(let i = 0, len = countryList.length; i < len; i++){
          if(countryList[i].iso2 === iso){
            index = i;
            selected = countryList[i];
            break;
          }
        }
        // let index = target.getAttribute('data-index');
        // selected = this.countryList[index];
        console.log('selected', selected, {...selected});
        // 如果用户点击的是“无数据提示”则select会为undefined
        if(!selected){
          return;
        }
        // 如果是收到把列表显示出来的，则点击后需要收到隐藏
        if (this.isManualShow) {
          this.inputFocused = false;
          this.countryListShow = false;
          this.isManualShow = false;
        }
        this.selected = selected;

        let result = '';
        if(this.type.toLowerCase() === 'phone'){
          // 一个国家有多个手机区号
          if(selected.dialCode == 1 && selected.areaCodes) {
            result = selected.areaCodes[0];
          }else {
            result = selected.dialCode || '';
          }
        }else{
          result = selected.iso2 || '';
        }
        this.currentResult = result;
        // 实现自定义v-model第二步
        this.$emit('input', result);
        // 执行回调
        this.$emit('onchange', selected, result);
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
      clear () {
        this.selected = {};
        this.currentResult = '';
        // 实现自定义v-model第二步
        this.$emit('input', '');
        // 执行回调
        this.$emit('onchange', {}, '');
      }
    },
    mounted() {
      // let cur = this.calcSelectedOption();
      let cur = vueCountryTool.calcSelectedOption(this.value, this.type, this.countryList);
      if(this.type == 'phone' && (this.iso2 + '').length == 0){
        console.error('当type=phone时最好传递iso2属性，否则当区号代码为212或358时会出现选择不正确问题！');
      }
      if(cur.iso2){
        // 执行回调。告诉父组件，以让父组件显示到界面
        this.$emit('onchange', cur, this.type.toLowerCase() === 'phone' ? (cur.dialCode || '') : (cur.iso2 || ''));
      }
    }
  }
</script>

<style>
  @import "country-list.css";
  @import "../country-data/country-flags.css";
</style>
