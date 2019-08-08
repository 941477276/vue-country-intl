<template>
  <div class="vue-country-intl"
       :class="{'focused': inputFocused, 'list-on-bottom': listOnBottom, 'list-on-top': !listOnBottom, 'vue-country-disabled': disabled}">
    <div class="country-intl-input-wrap" ref="input_wrap" :class="{'no-data': !selected.name}">
      <input type="text"
             v-model="searchText"
             class="country-intl-input"
             @focus="show"
             @blur="hide"
             :id="id + '-input'"
             :placeholder="placeholder"
             :readonly="readonly || isMobile">
      <label :for="id + '-input'" class="country-intl-label">
        <span class="iti-flag" :class="selected.iso2" v-show="showLabelImg"></span>
        <span>{{viewText}}</span>
      </label>
      <label class="dropdown-flag" :for="id + '-input'"></label>
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
        :search-able="searchAble"
        @onchange="_onCountryChange"
        @selectedChange="_onSelectedChange"></country-list>
  </div>
</template>

<script>
  import index from './schema-input';
  export default index;
</script>

<style>
@import "schema-input.css";
</style>
