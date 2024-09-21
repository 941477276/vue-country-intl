<template>
  <div class="vue-country-intl"
       :class="{'focused': inputFocused, 'list-on-bottom': listOnBottom, 'list-on-top': !listOnBottom, 'vue-country-disabled': disabled}">
    <div class="country-intl-input-wrap" ref="input_wrap" :class="{'no-data': !selected.name, 'has-selected': selected.name}" @click="show">
      <input type="text"
             v-model="searchInputText"
             class="country-intl-input"
             autocomplete="off"
             ref="searchInput"
             :id="id + '-input'"
             :placeholder="placeholder"
             :readonly="isIos && deviceWidth < 992 && iosMobileReadonly">
      <label class="country-intl-label">
        <span class="iti-flag" :class="selected.iso2" v-show="showLabelImg"></span>
        <span>{{viewText}}</span>
      </label>
      <label class="dropdown-flag"></label>
      <span v-if="!disabled && !!schemaInputValue && clearable" class="clear-button" @click.stop="clear">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" ariaHidden="true" focusable="false"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
      </span>
      <div class="prevent-click"></div>
    </div>
    <country-list
        v-if="countryListDisplay"
        v-show="countryListShow"
        ref="countryList"
        v-model="schemaInputValue"
        :search-text="searchInputText"
        :selectedText="selectedText"
        :show-selected-text="showSelectedText"
        :type="type"
        :iso2="iso2"
        :search-able="searchAble"
        :disable-country="disableCountry"
        :only-country="onlyCountry"
        :no-data-text="noDataText"
        :use-chinese="useChinese"
        :sort="sort"
        :filter="filter"
        :transform="transform"
        @onchange="_onCountryChange"
        @selectedChange="_onSelectedChange">
      <template #vueCountryNoData><slot name="vueCountryNoData"></slot></template>
      <template #selected><slot name="selected"></slot></template>
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
