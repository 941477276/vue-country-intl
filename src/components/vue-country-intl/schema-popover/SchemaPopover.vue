<template>
  <div class="vue-country-popover-container" ref="popover_container" :id="id">
    <slot name="reference"></slot>
    <transition name="fade">
      <div class="vue-country-intl-popover"
           ref="intl_popover"
           :class="[{'popover-on-bottom': listOnBottom, 'popover-on-top': !listOnBottom}, popoverClass]"
           :id="id + '-popover'"
           :style="{'z-index': listZIndex != 0 ? listZIndex : ''}"
           v-show="countryListShow">
        <div class="vue-country-intl-popover-content">
          <div class="search-input-box">
            <input type="text" class="search-input" v-model="searchText" :placeholder="searchInputPlaceholder">
          </div>
          <country-list
              ref="countryList"
              v-model="schemaPopoverValue"
              :search-text="searchText"
              :selectedText="selectedText"
              :show-selected-text="showSelectedText"
              :type="type"
              :search-able="searchAble"
              @onchange="_onCountryChange"
              @selectedChange="_onSelectedChange"></country-list>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import index from './schema-popover';
  export default index;
</script>

<style>
@import "schema-popover.css";
</style>
