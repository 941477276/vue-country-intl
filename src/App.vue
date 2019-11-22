<template>
  <div class="app" id="app">
    <div class="left">
      <h1>scheme = input 模式</h1>
      <div class="hr"></div>
      <h3 class="mb-10">
        <div class="pull-left">1、</div>
        <div class="overflow">
          <div class="mb-5">默认效果(选择手机区号)</div>
          <div>Default effect (select phone area code)</div>
        </div>
      </h3>
      <VueCountryIntl v-model="schemaInput.default">
        <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
      </VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.default || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">2、</div>
        <div class="overflow">
          <div class="mb-5">选择国籍</div>
          <div>Select country</div>
        </div>
      </h3>
      <VueCountryIntl type="country" v-model="schemaInput.country" no-data-text="没有找到相关数据"></VueCountryIntl>
      <h5 class="mt-5">国籍代码：{{schemaInput.country || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">3、</div>
        <div class="overflow">
          <div class="mb-5">onChange事件</div>
          <div>onChange Event</div>
        </div>
      </h3>
      <VueCountryIntl v-model="schemaInput.event" @onChange="onchange"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.event || '--'}}</h5>
      <div class="mb-10" style="font-size: 20px;">
        <code>{{selectedObj}}</code>
      </div>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">4、</div>
        <div class="overflow">
          <div class="mb-5">默认值</div>
          <div>Default value</div>
        </div>
      </h3>
      <VueCountryIntl v-model="schemaInput.defaultValue"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.defaultValue || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">5、</div>
        <div class="overflow">
          <div class="mb-5">禁用</div>
          <div>Disable</div>
        </div>
      </h3>
      <VueCountryIntl v-model="schemaInput.disableUse" :disabled="true"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.disableUse || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">6、</div>
        <div class="overflow">
          <div class="mb-5">不显示图片</div>
          <div>Do not display images</div>
        </div>
      </h3>
      <VueCountryIntl v-model="schemaInput.noImage" :show-label-img="false"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.noImage || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">7、</div>
        <div class="overflow">
          <div class="mb-5">不显示区号</div>
          <div>Do not display area code</div>
        </div>
      </h3>
      <VueCountryIntl v-model="schemaInput.noCode" :show-area-code="false"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.noCode || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">8、</div>
        <div class="overflow">
          <div class="mb-5">只显示值</div>
          <div>Show only values</div>
        </div>
      </h3>
      <VueCountryIntl v-model="schemaInput.onlyValue" :only-value="true" :show-label-img="false"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.onlyValue || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">9、</div>
        <div class="overflow">
          <div class="mb-5">禁用指定国籍</div>
          <div>Disable specified country</div>
        </div>
      </h3>
      <p class="mb-5">禁用：中国、美国、日本，中国香港(Disabled: China, USA, Japan, Hong Kong China)</p>
      <VueCountryIntl v-model="schemaInput.disableCountry" disable-country="+86,United States,Japan (日本),hk"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.disableCountry || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">10、</div>
        <div class="overflow">
          <div class="mb-5">只显示指定国籍</div>
          <div>Show only designated countries</div>
        </div>
      </h3>
      <p class="mb-5">只显示：中国、美国、日本，中国香港(Disabled: China, USA, Japan, Hong Kong China)</p>
      <VueCountryIntl v-model="schemaInput.onlyCountry" only-country="+86,United States,Japan (日本),hk"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaInput.onlyCountry || '--'}}</h5>
      <div class="hr"></div>
    </div>

    <div class="center">
      <h1>scheme = popover 模式</h1>
      <div class="hr"></div>
      <h3 class="mb-10">
        <div class="pull-left">1、</div>
        <div class="overflow">
          <div class="mb-5">默认效果(选择手机区号)</div>
          <div>Default effect (select phone area code)</div>
        </div>
      </h3>
      <VueCountryIntl schema="popover" popover-class="popover-class1111" v-model="schemaPopover.default">
        <button type="button" slot="reference">选择手机区号</button>
        <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
      </VueCountryIntl>
      <h5 class="mt-5">2、区号：{{schemaPopover.default || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">2、</div>
        <div class="overflow">
          <div class="mb-5">选择国籍</div>
          <div>Select country</div>
        </div>
      </h3>
      <VueCountryIntl schema="popover" type="country" v-model="schemaPopover.country">
        <button type="button" slot="reference">选择国籍</button>
      </VueCountryIntl>
      <h5 class="mt-5">国籍代码：{{schemaPopover.country || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">3、</div>
        <div class="overflow">
          <div class="mb-5">禁用</div>
          <div>Disable</div>
        </div>
      </h3>
      <VueCountryIntl schema="popover" v-model="schemaPopover.disableUse" :disabled="true">
        <button type="button" slot="reference">选择手机区号</button>
      </VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaPopover.disableUse || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">4、</div>
        <div class="overflow">
          <div class="mb-5">禁用搜索</div>
          <div>Disable search</div>
        </div>
      </h3>
      <VueCountryIntl schema="popover" v-model="schemaPopover.noSearch" :search-able="false">
        <button type="button" slot="reference">选择手机区号</button>
      </VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaPopover.noSearch || '--'}}</h5>
      <div class="hr"></div>

      <h3 class="mb-10">
        <div class="pull-left">5、</div>
        <div class="overflow">
          <div class="mb-5">使用元素ID</div>
          <div>Use element ID</div>
        </div>
      </h3>
      <button type="button" id="test_elId" @click="useElIdClick">使用元素ID</button>
      <VueCountryIntl ref="use_elId" schema="popover" v-model="schemaPopover.useElId" el-id="test_elId"></VueCountryIntl>
      <h5 class="mt-5">区号：{{schemaPopover.noSearch || '--'}}</h5>
      <div class="hr"></div>
    </div>

    <div class="right">
      <h1>scheme = modal 模式</h1>
      <div class="hr"></div>
      <h3 class="mb-10">
        <div class="pull-left">1、</div>
        <div class="overflow">
          <div class="mb-5">默认效果(选择手机区号)</div>
          <div>Default effect (select phone area code)</div>
        </div>
      </h3>
      <button type="button" @click="schemaModalVisible.default = true">选择手机区号</button>
      <VueCountryIntl schema="modal" modal-class="modal-class" :listZIndex="5000" :visible.sync="schemaModalVisible.default" v-model="schemaModal.default">
        <template slot="vueCountryNoData"><h1>没有找到该国籍！</h1></template>
      </VueCountryIntl>
      <h5 class="mt-5">2、区号：{{schemaModal.default || '--'}}</h5>
      <div class="hr"></div>
    </div>
  </div>
</template>

<script>
import VueCountryIntl from './components/vue-country-intl/index.vue';
/*import VueCountryIntl from '../node_modules/vue-country-intl/vue-country-intl.min';
import '../node_modules/vue-country-intl/vue-country-intl.css'*/

export default {
  name: 'app',
  data(){
    return {
      schemaInput: {
        default: '',
        country: '',
        defaultValue: '+86',
        disableUse: '86',
        noImage: '+86',
        //noCode: '',
        event: '+86',
        onlyValue: '+86',
        disableCountry: '',
        onlyCountry: ''
      },
      schemaPopover: {
        default: '',
        country: '',
        defaultValue: '+86',
        disableUse: '+86',
        noSearch: '+86',
        useElId: '+86'
      },
      schemaModal: {
        default: '+86'
      },
      schemaModalVisible: {
        default: false
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
    },
    useElIdClick(){
      console.log(1111)
      this.$refs.use_elId.show();
    }
  },
  mounted() {
    let timer = setTimeout(() => {
      this.schemaInput.noCode = '+86';
      clearTimeout(timer);
    }, 1600);
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
  .al {text-align:left}
  .ac {text-align:center}
  .ar {text-align:right}
  .hide {display:none}
  .pull-left{
    float: left;
  }
  .pull-right{
    float: right;
  }
  .overflow{
    overflow: hidden;;
  }
  .mb-5{
    margin-bottom: 5px;
  }

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
    width: 33%;
    height: 100%;
    padding: 20px;
  }
  .center{
    float: left;
    width: 33%;
    height: 100%;
    padding: 20px;
    border-left: 1px solid #ccc;
  }
  .right{
    float: right;
    width: 33%;
    height: 100%;
    padding: 20px;
    border-left: 1px solid #ccc;
  }

  @media (max-width: 991px) {
    .left,
    .right,
    .center{
      float: none;
      width: 100%;
      height: auto;
    }
    .right,
    .center{
      border-top: 1px solid #ccc;
      border-left: none;
    }
  }
  .popover-class1111 .vue-country-no-data{
    color: #f60;
  }
</style>
