# vue-country-intl
Vue-based mobile phone area code selection, nationality selection component, compatible with pc, mobile.`vue-country-intl`There are 3 modes（
input、popover、modal）

The country data supported by the plugin comes from:
+ iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
+ country code: https://en.wikipedia.org/wiki/List_of_country_calling_codes

## Effect preview
[https://941477276.github.io/vue-country-intl/dist/index.html](https://941477276.github.io/vue-country-intl/dist/index.html)

[中文文档](https://github.com/941477276/vue-country-intl/blob/master/README-CN.md)

## Install
`npm install vue-country-intl --save`

## Usage
```
/*****main.js****/
import VuCountryIntl from 'vue-country-intl';
// import css
import 'vue-country-intl/lib/vue-country-intl.css'
// Global registration component
Vue.component(VuCountryIntl.name, VuCountryIntl);

/*****Used in components****/
<template>
    <vue-country-intl v-model="countryCode"></vue-country-intl>
</template>
```

## schema=input(default)
```
<template>
    <VueCountryIntl v-model="phoneCountry"></VueCountryIntl>
</template>    
```
effect:

![schema=input效果](./src/assets/schema_input.gif)

## schema=popover(popover)
```
<template>
    <button type="button" id="my_reference">Select phone area code</button>
    <VueCountryIntl schema="popover" elId="my_reference" v-model="phoneCountry">
    </VueCountryIntl>
</template>    
```
```
<template>
    <VueCountryIntl schema="popover" v-model="phoneCountry">
        <button type="button" slot="reference">Select phone area code</button>
    </VueCountryIntl>
</template>    
```
effect:

![schema=popover效果](./src/assets/schema_popover.gif)

## schema=modal
```
<template>
    <VueCountryIntl schema="modal" v-model="phoneCountry"></VueCountryIntl>
</template>    
```
effect:

![schema=modal效果](./src/assets/schema_modal.gif)

## props
1.`schema`: Display mode

+ input: Display as an `input` input box (default)
+ popover: Popover pop-up form
+ modal: Modal box pop-up form

2.`type`: Value type

+ phone: To select the area code
+ country: Select nationality

3.`placeholder`: The placeholder of the input box when `schema=input`

4.`searchAble`: Whether it can be searched (data type: Boolean)

5.`disabled`: Whether to disable (data type: Boolean)

6.`showAreaCode`: Whether to display the area code in the input box (data type: Boolean)

![showAreaCode与showLabelImg](./src/assets/img1.png)

7.`showLabelImg`: Whether to display an image in the input box (data type: Boolean)

8.`onlyValue`: Whether to display only the selected value without displaying the nationality name (data type: Boolean)

9.`listZIndex`: z-index for list (data type：Number)

10.`maxHeight`: The maximum height of the list, pc default 350px, mobile default 240px (data type：Number)

11.`selectedText`: The copy to the right of the selected item in the list, the default is Selected (data type：String)

12.`showSelectedText`: Whether the right side of the 'Selected' file is displayed when the list item is selected, the default is true (data type: Boolean)

13.`readonly`: Read-only, default `false` (data type: Boolean)

14.`offsetTop`: The distance from the popover popup window to the reference element. The default is 10.Only valid when `schema=popover` (data type：Number)

15.`popoverClass`: Popover pop-up window extra class.Only valid when `schema=popover` (data type：String)

16.`referenceTrigger`: Click on whether the reference can display the popover popup. The default is true.Only valid when `schema=popover` (data type: Boolean)

17.`searchInputPlaceholder`: Search for the placeholder text in the input box,Only valid in schema=popover, schema=modal (data type：String)

18.`elId`: Trigger the id of the element displayed by the popover popup,Only valid in schema=popover mode (data type：String)

19: `visible`: Control component display and hide, you need to use the `sync` syntax, such as:`:visible.sync="show"`, valid only in schema=modal mode (data type: Boolean)

20: `cancelText`: Close the text of the button of the popup, default: 'Cancel', valid only in schema=modal mode (data type：String)

21: `disableCountry`: Disabled countries (can pass country name, country code, mobile area code), can pass strings or pass arrays, pass strings to disable multiple countries, need to be separated by commas（data type：String|Array）

21: `onlyCountry`: Display only the specified country, can pass a string or pass an array, multiple countries separated by commas when passing a string（data type：String|Array）

## Methods(method)
1.`show`: Display list

2.`hide`: Hidden list

3.`getSelected`: Get the selected list item

4.`terminal`: Determine if ios or android terminal. Return data format：`{android: true, ios: false}`

## Event
1.`onChange`: Triggered when the user manually selects a list item, it will pass selected, value to onChange.

