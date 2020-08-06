<template>
  <div class="vue-country-intl"
       :class="{'focused': inputFocused, 'list-on-bottom': listOnBottom, 'list-on-top': !listOnBottom, 'vue-country-disabled': disabled}">
    <div class="country-intl-input-wrap" ref="input_wrap" :class="{'no-data': !selected.name, 'has-selected': selected.name}" @click="show">
      <input type="text"
             v-model="searchText"
             class="country-intl-input"
             autocomplete="off"
             ref="searchInput"
             focus="show"
             blur="hide"
             :id="id + '-input'"
             :placeholder="placeholder"
             :readonly="isIos && deviceWidth < 992 && iosMobileReadonly">
      <label class="country-intl-label">
        <span class="iti-flag" :class="selected.iso2" v-show="showLabelImg"></span>
        <span>{{viewText}}</span>
      </label>
      <label class="dropdown-flag"></label>
      <div class="prevent-click"></div>
    </div>
    <country-list
        v-show="countryListShow"
        ref="countryList"
        v-model="schemaInputValue"
        :search-text="searchText"
        :selectedText="selectedText"
        :show-selected-text="showSelectedText"
        :type="type"
        :iso2="iso2"
        :search-able="searchAble"
        :disable-country="disableCountry"
        :only-country="onlyCountry"
        :no-data-text="noDataText"
        @onchange="_onCountryChange"
        @selectedChange="_onSelectedChange">
      <template slot="vueCountryNoData"><slot name="vueCountryNoData"></slot></template>
    </country-list>
  </div>
</template>

<script>
  import index from './schema-input';
  export default index;
</script>

<style>
@import "schema-input.css";
</style>
