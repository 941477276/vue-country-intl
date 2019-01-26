<template>
  <div class="vue-country-intl"
       v-if="schema === 'input'"
       :id="id"
       :class="{'focused': inputFocused, 'list-on-bottom': listOnBottom, 'list-on-top': !listOnBottom, 'vue-country-disabled': disabled}">
    <div class="country-intl-input-wrap" :class="{'no-data': !selected.name}">
      <input type="text"
             v-model="searchText"
             class="country-intl-input"
             :id="id + '-input'"
             :placeholder="placeholder"
              :readonly="readonly">
      <label :for="id + '-input'" class="country-intl-label">
        <span class="iti-flag" :class="selected.iso2" v-show="showLabelImg"></span>
        <span>{{viewText}}</span>
      </label>
      <label class="dropdown-flag" :for="id + '-input'"></label>
      <div class="prevent-click"></div>
    </div>
    <div class="vue-country-list-wrap"
         :id="id + '-list'"
         :style="{'z-index': listZIndex != 0 ? listZIndex : '', 'max-height': maxHeight > 0 ? (maxHeight + 'px') : ''}"
         v-show="countryListShow">
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
            <span class="selected-text">{{selectedText}}</span>
        </li>
      </ul>
    </div>
  </div>

  <div v-else-if="schema === 'popover'" class="vue-country-reference" :id="id">
    <slot name="reference"></slot>
    <transition name="fade">
      <div class="vue-country-intl-popover"
           :class="[{'popover-on-bottom': listOnBottom, 'popover-on-top': !listOnBottom}, popoverClass]"
           :id="id + '-popover'"
           :style="{'z-index': listZIndex != 0 ? listZIndex : ''}"
           v-show="countryListShow">
        <div class="vue-country-intl focused">
          <div class="search-input-box">
            <input type="text" class="search-input" v-model="searchText">
          </div>
          <div class="vue-country-list-wrap"
               :id="id + '-list'"
               :style="{'max-height': maxHeight > 0 ? (maxHeight + 'px') : ''}">
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
                <span class="selected-text">{{selectedText}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import index from './vue-country-intl';
export default index;
</script>

<style>
  @import "vue-country-intl.css";
</style>
