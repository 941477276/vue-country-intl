# vue-country-intl
基于vue的手机区号选择、国籍选择组件，兼容pc、移动端。
Vue-based mobile phone area code selection, nationality selection component, compatible with pc, mobile.

插件支持的国家/地区数据来自：
+ iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
+ country code: https://en.wikipedia.org/wiki/List_of_country_calling_codes

## 效果预览
[https://941477276.github.io/vue-country-intl/dist/index.html](https://941477276.github.io/vue-country-intl/dist/index.html)


## 默认使用(schema=input)
```
<template>
    <VueCountryIntl v-model="phoneCountry"></VueCountryIntl>
</template>    
```
效果:
![schema=input效果](dist/img/effect.png)
## popover弹窗式使用(schema=popover)
```
<template>
    <VueCountryIntl schema="popover" v-model="phoneCountry">
        <!-- slot至关重要 -->
        <button type="button" slot="reference">选择手机区号</button>
    </VueCountryIntl>
</template>    
```
效果:
![schema=popover效果](dist/img/effect2.png)

## props 属性
1.`schema`: 展示模式

+ input: 显示为一个input输入框（默认）
+ popover: popover弹窗形式

2.`type`: 值类型

+ phone: 表示选择手机区号
+ country: 表示选择国籍

3.`placeholder`: schema=input时输入框的placeholder

4.`searchAble`: 是否可以搜索（数据类型：Boolean）

5.`disabled`: 是否禁用（数据类型：Boolean）

![showAreaCode与showLabelImg](dist/img/img1.png)

6.`showAreaCode`: 输入框中是否显示区号（数据类型：Boolean）

7.`showLabelImg`: 输入框中是否显示图片（数据类型：Boolean）

8.`onlyValue`: 是否只显示选中的值，而不显示国际名称（数据类型：Boolean）

9.`listZIndex`: 列表的层级（数据类型：Number）

10.`maxHeight`: 列表最大高度，pc默认350px，移动端默认240px（数据类型：Number）

11.`selectedText`: 列表中选中项右侧的文案，默认 Selected

12.`showSelectedText`: 列表项被选中时是否显示右侧 'Selected' 文案，默认 true （数据类型：Boolean）

13.`trigger`: 触发方式，目前只支持click。只有在`schema=popover`时有效。

14.`offsetTop`: popover弹窗距离参照元素的距离。默认为10。只有在`schema=popover`时有效（数据类型：Number）

15.`popoverClass`: popover弹窗额外class。只有在`schema=popover`时有效

16.`referenceTrigger`: 点击reference是否可以显示popover弹窗，默认为true。只有在`schema=popover`时有效（数据类型：Boolean）

## 可用方法(method)
1.`show(flag)`: 显示或隐藏列表

2.`getSelected`: 获取选中的列表项

3.`terminal`: 判断是否ios或android终端。返回数据格式：`{android: true, ios: false}`

## 事件
1.`onchange`: 用户手动选择列表项时触发，会传递selected、value给onchange使用

