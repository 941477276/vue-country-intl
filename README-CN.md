# vue-country-intl
基于vue的手机区号选择、国籍选择组件，兼容pc、移动端。`vue-country-intl`有3种模式（
input、popover、modal）

插件支持的国家/地区数据来自：
+ iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
+ country code: https://en.wikipedia.org/wiki/List_of_country_calling_codes

## 效果预览
[https://941477276.github.io/vue-country-intl/dist/index.html](https://941477276.github.io/vue-country-intl/dist/index.html)

## 安裝
`npm install vue-country-intl --save`

## 使用
```
/*****main.js****/
import VuCountryIntl from 'vue-country-intl';
// 引入css
import 'vue-country-intl/lib/vue-country-intl.css'
// 全局注册组件
Vue.component(VuCountryIntl.name, VuCountryIntl);

/*****组件中使用****/
<template>
    <vue-country-intl v-model="countryCode"></vue-country-intl>
</template>
```

## schema=input(默认)
```
<template>
    <VueCountryIntl v-model="phoneCountry"></VueCountryIntl>
</template>    
```
效果:

![schema=input效果](./src/assets/schema_input.gif)

## schema=popover(popover弹窗式)
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

## schema=modal(弹窗)
```
<template>
    <VueCountryIntl schema="modal" v-model="phoneCountry"></VueCountryIntl>
</template>    
```
效果:

![schema=modal效果](./src/assets/schema_modal.gif)

## props 属性
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

## 可用方法(method)
1.`show`: 显示列表

2.`hide`: 隐藏列表

3.`getSelected`: 获取选中的列表项

4.`terminal`: 判断是否ios或android终端。返回数据格式：`{android: true, ios: false}`

## slot
1.`vueCountryNoData`：未搜索到国家数据时显示的slot

## 事件
1.`onChange`: 用户手动选择列表项时触发，会传递selected、value给onChange使用

