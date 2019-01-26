<template>
  <div class="app" id="app">
    <div class="left">
      <h1>scheme = input 模式</h1>
      <div class="hr"></div>
      <h3 class="mb-10">1、默认效果(选择手机区号)</h3>
      <VueCountryIntl v-model="schemaInput.default"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.default || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">2、选择国籍</h3>
      <VueCountryIntl type="country" v-model="schemaInput.country"></VueCountryIntl>
      <h5 class="mt-5">国籍代码：{{schemaInput.country || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">3、onchange事件</h3>
      <VueCountryIntl v-model="schemaInput.event" @onchange="onchange"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.event || '--'}}</h5>
      <div class="mb-10" style="font-size: 20px;">
        <code>{{selectedObj}}</code>
      </div>
      <div class="hr"></div>

      <h3 class="mb-10">4、默认值</h3>
      <VueCountryIntl v-model="schemaInput.defaultValue"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.defaultValue || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">5、禁用</h3>
      <VueCountryIntl v-model="schemaInput.disableUse" :disabled="true"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.disableUse || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">6、不显示图片</h3>
      <VueCountryIntl v-model="schemaInput.noImage" :show-label-img="false"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.noImage || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">7、不显示区号</h3>
      <VueCountryIntl v-model="schemaInput.noCode" :show-area-code="false"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.noCode || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">8、只显示值</h3>
      <VueCountryIntl v-model="schemaInput.onlyValue" :only-value="true" :show-label-img="false"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.onlyValue || '--'}}</h5>
      <div class="hr"></div>
    </div>

    <div class="right">
      <h1>scheme = popover 模式</h1>
      <div class="hr"></div>
      <h3 class="mb-10">1、默认效果(选择手机区号)</h3>
      <VueCountryIntl schema="popover" v-model="schemaPopover.default">
        <button type="button" slot="reference">选择手机区号</button>
      </VueCountryIntl>
      <h5 class="mt-5">2、区号：{{schemaPopover.default || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">3、选择国籍</h3>
      <VueCountryIntl schema="popover" type="country" v-model="schemaPopover.country">
        <button type="button" slot="reference">选择国籍</button>
      </VueCountryIntl>
      <h5 class="mt-5">国籍代码：{{schemaPopover.country || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">4、禁用</h3>
      <VueCountryIntl schema="popover" v-model="schemaPopover.disableUse" :disabled="true">
        <button type="button" slot="reference">选择手机区号</button>
      </VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaPopover.disableUse || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">5、禁用搜索</h3>
      <VueCountryIntl schema="popover" v-model="schemaPopover.noSearch" :search-able="false">
        <button type="button" slot="reference">选择手机区号</button>
      </VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaPopover.noSearch || '--'}}</h5>
      <div class="hr"></div>

    </div>

  </div>
</template>

<script>
import VueCountryIntl from './components/vue-country-intl';

export default {
  name: 'app',
  data(){
    return {
      schemaInput: {
        default: '',
        country: '',
        defaultValue: '+86',
        disableUse: '+86',
        noImage: '86',
        noCode: '+86',
        event: '+86',
        onlyValue: '+86'
      },
      schemaPopover: {
        default: '',
        country: '',
        defaultValue: '+86',
        disableUse: '+86',
        noSearch: '+86'
      },
      selectedObj: {}
    }
  },
  components: {
    VueCountryIntl
  },
  methods: {
    onchange(selected){
      this.selectedObj = selected;
    }
  }
}
</script>

<style>
  *{box-sizing: border-box;}
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,button,textarea,p,blockquote,th,td { margin:0; padding:0; }
  body { background:#fff; color:#555; font-size:14px; font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif; }
  td,th,caption { font-size:14px; }
  address, caption, cite, code, dfn, em, strong, th, var { font-style:normal; font-weight:normal;}
  a { color:#555; text-decoration:none; }
  a:hover { text-decoration:underline; }
  img { border:none; }
  ol,ul,li { list-style:none; }
  input, textarea, select, button { font:14px "Arial","Microsoft YaHei","黑体","宋体",sans-serif; }
  table { border-collapse:collapse; }
  html {overflow-y: scroll;}

  .clearfix:after {content: "."; display: block; height:0; clear:both; visibility: hidden;}
  .clearfix { *zoom:1; }/*公共类*/
  .fl { float:left}
  .fr {float:right}
  .al {text-align:left}
  .ac {text-align:center}
  .ar {text-align:right}
  .hide {display:none}

  html,body,.app{
    height: 100%;
  }
  .hr{
    height: 1px;
    margin: 10px 0 20px 0;
    background-color: #ccc;
  }
  .mb-10{
    margin-bottom: 10px;
  }
  .mt-5{
    margin-top: 5px;
  }
  .left{
    float: left;
    width: 50%;
    height: 100%;
    padding: 20px;
  }
  .right{
    float: right;
    width: 50%;
    height: 100%;
    padding: 20px;
    border-left: 1px solid #ccc;
  }

  @media (max-width: 991px) {
    .left,
    .right{
      float: none;
      width: 100%;
      height: auto;
    }
    .right{
      border-top: 1px solid #ccc;
      border-left: none;
    }
  }
</style>
