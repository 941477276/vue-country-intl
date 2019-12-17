<template>
  <transition name="fade">
    <div class="vue-country-intl-modal" ref="intl_modal" :class="modalClass" :style="{zIndex: listZIndex != 0 ? listZIndex : ''}" v-show="modalVisible">
      <div class="country-modal-content">
        <div class="country-modal-search-box">
          <div class="modal-search-wrap">
            <input type="text" v-model="searchText" class="country-modal-search-input" :placeholder="searchInputPlaceholder"/>
            <span class="country-modal-search-cancel" @click="hide"><!--取消-->{{cancelText}}</span>
          </div>
        </div>
        <country-list
            ref="countryList"
            v-model="schemaModalValue"
            :search-text="searchText"
            :selectedText="selectedText"
            :show-selected-text="showSelectedText"
            :type="type"
            :search-able="searchAble"
            :disable-country="disableCountry"
            :only-country="onlyCountry"
            :no-data-text="noDataText"
            @onchange="_onCountryChange"
            @selectedChange="_onSelectedChange">
          <template slot="vueCountryNoData"><slot name="vueCountryNoData"></slot></template>
        </country-list>
      </div>
    </div>
  </transition>
</template>

<script>
  import index from './schema-modal';

  export default index;
</script>

<style>
  @import "schema-modal.css";
</style>
