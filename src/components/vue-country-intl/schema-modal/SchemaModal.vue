<template>
  <transition name="fade">
    <div class="vue-country-intl-modal" ref="intl_modal" v-show="modalVisible">
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
            @onchange="_onCountryChange"></country-list>
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
