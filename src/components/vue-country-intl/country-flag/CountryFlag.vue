<template>
  <div class="yn-country-flag" :title="useTitle ? eleTitle : null" @click="_onClick">
    <img class="country-flag-img" :src="countryFlagPath" :alt="value">
    <slot :country="country"></slot>
  </div>
</template>

<script>
import {countriesData} from '../data';

export default {
  name: "VueCountryFlag",
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    // 类型，有两种类型，第一种：选择手机号码区号，值为phone;第二种：选择国家，值为country
    type: {
      type: String,
      default: 'country',
    },
    iso2: { // 国籍代码，当type=phone时必须传递iso2属性，否则当区号代码为212或358时会出问题！
      type: String,
      default: ''
    },
    useTitle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    countryFlagPath(){
      let svgPathObj = (window || Object).__country_flag_files_path_obj;
      if(!this.value){
        // 空白
        return svgPathObj['empty'];
      }
      let country = this.calcSelectedOption(this.value, this.type, countriesData);
      // console.log('country', country);
      if(country){
        return svgPathObj[country.iso2];
      }
      // 未知国家
      return svgPathObj['unknown'];
    },
    eleTitle () {
      let country = this.country;
      let value = (this.value + '').charAt(0) == '+' ? this.value.substr(1) : this.value;
      if (this.type.toLowerCase() === 'phone') {
        // let dialCode = country.dialCode;
        // 处理一个国家有多个手机区号的情况
        if (country.dialCode == 1 && country.areaCodes) {
          return `${country.name}(+${value || country.areaCodes[0]})`;
        }
        return country.name + '(+' + country.dialCode + ')';
      } else {
        return country.name;
      }
    }
  },
  data(){
    return {
      country: {},
      svgPathObj: {}
    }
  },
  methods: {
    // 计算选中的国家
    calcSelectedOption (value, type, countryList) {
      if((value + '').length == 0){
        return {};
      }
      if ((value + '').charAt(0) === '+') {
        value = value.substr(1);
      }
      let item = countryList.filter((item) => {
        // 判断国籍编码是否与value相等
        let iso2Equal = item.iso2 == value;
        if(iso2Equal){
          return true;
        }
        // 判断传递的props里的iso2是否相等
        let propIso2Equal = item.iso2 == this.iso2;
        if(propIso2Equal){
          return true;
        }
        // 一个国家只有一个手机区号的情况
        let dialCodeEqual = item.dialCode == value;
        if(dialCodeEqual){
          return true;
        }
        // 一个国家有多个手机区号的情况
        let mutipleDialCodeEqual = (item.dialCode == 1 && item.areaCodes) && item.areaCodes.some(areaCode => areaCode == value);
        if(mutipleDialCodeEqual){
          return true;
        }
      });
      if (!item || item.length === 0) {
        item = {};
      } else {
        item = item[0] || {};
      }
      this.country = item;
      return item;
    },
    getCountry(){
      return {...this.country};
    },
    _onClick(){
      this.$emit('click');
    }
  }
};
</script>

<style>
.yn-country-flag{
  display: inline-block;
  vertical-align: middle;
}
.yn-country-flag .country-flag-img{
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  width: 20px;
  min-height: 10px;
}
</style>
