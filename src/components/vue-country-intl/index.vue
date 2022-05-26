<template>
  <schema-input
      ref="schemaInput"
      v-if="schema === 'input'"
      v-bind="$props"
      v-model="countryIntlValue"
      @onChange="_onChange"
      @selectedChange="_onSelectedChange">
    <template #vueCountryNoData><slot name="vueCountryNoData"></slot></template>
    <template #selected><slot name="selected"></slot></template>
  </schema-input>

  <schema-popover
      ref="schemaPopover"
      v-else-if="schema === 'popover'"
      v-bind="$props"
      v-model="countryIntlValue"
      @onChange="_onChange">
    <slot name="reference" slot="reference"></slot>
    <template #vueCountryNoData><slot name="vueCountryNoData"></slot></template>
    <template #selected><slot name="selected"></slot></template>
  </schema-popover>

  <schema-modal
    ref="schemaModal"
    v-else-if="schema === 'modal'"
    v-bind="$props"
    v-model="countryIntlValue"
    :visible.sync="modalVisible"
    @onChange="_onChange">
    <template #vueCountryNoData><slot name="vueCountryNoData"></slot></template>
    <template #selected><slot name="selected"></slot></template>
  </schema-modal>
</template>

<script>
import index from './index.js';
export default index;
</script>

<style>
  body.vue-country-ios{ /* 解决ios移动端document点击事件无效bug */
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    tap-highlight-color: transparent;
  }
  body.lock-scroll{
    overflow: hidden!important;
  }
</style>
