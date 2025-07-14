# 1、vue-country-intl
基于vue的手机区号选择、国籍选择组件，兼容pc、移动端。`vue-country-intl`有3种模式（
input、popover、modal）

插件支持的国家/地区数据来自：
+ iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
+ country code: https://en.wikipedia.org/wiki/List_of_country_calling_codes

## 效果预览
[https://941477276.github.io/vue-country-intl/dist/](https://941477276.github.io/vue-country-intl/dist/)

## 1.1、同门师兄弟
>vue版的国籍/手机区号选择插件(`vue-country-intl`)
+ [vue-country-intl](https://github.com/941477276/vue-country-intl)
>react版的国籍/手机区号选择插件(`reaxt-country-intl`)
+ [react-country-intl](https://github.com/941477276/react-country-intl)
>微信小程序版的国籍/手机区号选择插件(`wx-country-intl`)
+ [wx-country-intl](https://github.com/941477276/wx-country-intl)
>基于better-scroll的下拉刷新、上拉加载Vue插件(`vue-scroll-refresh-load`)
+ [vue-scroll-refresh-load](https://github.com/941477276/vue-scroll-refresh-load)

## 1.2、安裝
`npm install vue-country-intl --save`

## 1.3、使用——.vue单文件
```
/*****main.js****/
import VueCountryIntl from 'vue-country-intl';
// 引入css
import 'vue-country-intl/lib/vue-country-intl.css'
// 全局注册组件
Vue.component(VueCountryIntl.name, VueCountryIntl);

/*****组件中使用****/
<template>
    <vue-country-intl v-model="countryCode"></vue-country-intl>
</template>
```

## 1.4、使用——直接引入js文件
```
<link rel="stylesheet" href="./lib/vue-country-intl.css">
<script src="./lib/vue-country-intl.min.js"></script>
<script>
  Vue.component('vue-country-intl', vueCountryIntl);
  new Vue({
    el: '#app',
    data: {}
  });  
```

## 1.5、schema=input(默认)
```
<template>
    <VueCountryIntl v-model="phoneCountry"></VueCountryIntl>
</template>    
```
效果:

![schema=input效果](./src/assets/schema_input.gif)


使用中文显示国籍名称
![使用中文显示国籍名称](./src/assets/use-chinese.gif)

## 1.6、schema=popover(popover弹窗式)
```
<template>
    <button type="button" id="my_reference">选择手机区号</button>
    <VueCountryIntl schema="popover" elId="my_reference" v-model="phoneCountry">
    </VueCountryIntl>
</template>    
```
```
<template>
    <VueCountryIntl schema="popover" v-model="phoneCountry">
        <button type="button" slot="reference">选择手机区号</button>
    </VueCountryIntl>
</template>    
```
效果:

![schema=popover效果](./src/assets/schema_popover.gif)

## 1.7、schema=modal(弹窗)
```
<template>
    <VueCountryIntl schema="modal" v-model="phoneCountry"></VueCountryIntl>
</template>    
```
效果:

![schema=modal效果](./src/assets/schema_modal.gif)

## 1.8、props 属性
1.`schema`: 展示模式

+ input: 显示为一个input输入框（默认）
+ popover: popover弹窗形式
+ modal: 模态框弹窗形式

2.`type`: 值类型

+ phone: 表示选择手机区号
+ country: 表示选择国籍

3.`placeholder`: schema=input时输入框的placeholder

4.`searchAble`: 是否可以搜索（数据类型：Boolean）

5.`disabled`: 是否禁用（数据类型：Boolean）

6.`showAreaCode`: 输入框中是否显示区号（数据类型：Boolean）

![showAreaCode与showLabelImg](./src/assets/img1.png)

7.`showLabelImg`: 输入框中是否显示图片（数据类型：Boolean）

8.`onlyValue`: 是否只显示选中的值，而不显示国际名称（数据类型：Boolean）

9.`listZIndex`: 列表的层级（数据类型：Number）

10.`maxHeight`: 列表最大高度，pc默认350px，移动端默认240px（数据类型：Number）

11.`selectedText`: 列表中选中项右侧的文案，默认 Selected

12.`showSelectedText`: 列表项被选中时是否显示右侧 'Selected' 文案，默认 true （数据类型：Boolean）

13.`readonly`: 是否只读，默认`false`（数据类型：Boolean）

14.`offsetTop`: popover弹窗距离参照元素的距离。默认为10。只有在`schema=popover`时有效（数据类型：Number）

15.`popoverClass`: popover弹窗额外class。只有在`schema=popover`时有效（数据类型：String）

16.`referenceTrigger`: 点击reference是否可以显示popover弹窗，默认为true。只有在`schema=popover`时有效（数据类型：Boolean）

17.`searchInputPlaceholder`: 搜索输入框的placeholder文字，只有在schema=popover、schema=modal中有效（数据类型：String）

18.`elId`: 触发popover弹窗显示的元素的id，只在schema=popover模式下有效（数据类型：String）

19.`modalClass`: model弹窗额外class。只有在`schema=modal`时有效（数据类型：String）

20: `visible`: 控制组件显示与隐藏，需使用`sync`语法，如:`:visible.sync="show"`，只在schema=modal模式下有效（数据类型：Boolean）

21: `cancelText`: 关闭弹窗的按钮的文字，默认: '取消'，只在schema=modal模式下有效（数据类型：String）

22: `disableCountry`: 禁用的国家(可以传递国家名称、国家代码、国家区号)，可以传递字符串也可以传递数组，传递字符串时禁用多个国家使用逗号分隔（数据类型：String|Array）

23: `onlyCountry`: 只显示指定的国家，可以传递字符串也可以传递数组，传递字符串时多个国家使用逗号分隔（数据类型：String|Array）

24: `noDataText`: 未搜索到国家数据时显示的文案，如有`vueCountryNoData`slot则优先显示slot内容（数据类型：String）

25: `iosMobileReadonly`: ios移动终端输入框是否只读(只在`schema=input`模式下有效)，默认为true，因为在ios手机终端中如不是只读模式会弹出选择下来框出来（数据类型：Boolean）

26: `useChinese`: 是否以中文显示国籍名称，默认为`true`（数据类型：Boolean）

27： `filter`：排序函数，与`Array.filter`中的回调函数一致。默认为`null`（数据类型：Function）`1.1.5新增`

28： `sort`：排序函数，与`Array.sort`中的回调函数一致。默认为`null`（数据类型：Function）`1.1.5新增`

29： `transform`：数据处理函数，你可以通过该函数对数据列表进行深度定制，如排序、过滤、置顶等；返回值为处理过后对列表。默认为`null`（数据类型：Function）`1.1.6新增`

30： `clearable`：是否可清空，值为`true`将会显示清空按钮。默认为`false`（数据类型：Boolean）`1.1.7新增`

## 1.9、可用方法(method)
1.`show`: 显示列表

2.`hide`: 隐藏列表

3.`getSelected`: 获取选中的列表项

4.`terminal`: 判断是否ios或android终端。返回数据格式：`{android: true, ios: false}`

## 1.10、slot
1.`vueCountryNoData`：未搜索到国家数据时显示的slot

## 1.11、事件
1. `onChange`: 用户手动选择列表项时触发，会传递selected、value给onChange使用
2. `show`: 下拉弹窗显示后触发`(1.1.4新增)`
3. `hide`: 下拉弹窗隐藏后触发`(1.1.4新增)`

# 2、country-flag
一个基于vue的国家国旗标志组件

## 效果预览
![country-flag组件效果](./src/assets/country-flags-effect.png)

## 2.1、安装
`npm install vue-country-intl --save`

## 1.3、使用
```
/*****main.js****/
import VueCountryFlag from 'vue-country-intl/lib/vue-country-flag.min.js';
// 引入css
import 'vue-country-intl/lib/vue-country-flag.css'

// 引入svg图标
let flagFilePath = require.context('vue-country-intl/lib/country-flag-svgs', true, /\.svg$/);
Vue.use(VueCountryFlag, flagFilePath);

/*****组件中使用****/
<template>
    <VueCountryFlag value="cn"></VueCountryFlag>
    <VueCountryFlag value="+86">
      <template v-slot="{country}">
        <span class="slot-span">国家：<mark>{{country.name}}</mark></span>
      </template>
    </VueCountryFlag>
</template>
```

## 1.4、props 属性
1.`value`: 国籍的代码或手机区号值

2.`type`: 值类型

+ phone: 表示选择手机区号
+ country: 表示选择国籍

3.`iso2`: 国籍代码，当type=phone时必须传递iso2属性，否则当区号代码为212或358时会出问题！

4.`useTitle`: 是否给元素添加`title`属性，title的值为国籍的代码或手机区号（数据类型：Boolean）

## 1.5、可用方法(method)
1.`getCountry`: 获取详细的国籍信息

## 1.6、事件
1.`click`: click 事件
