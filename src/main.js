import Vue from 'vue'
import App from './App.vue'

// import VueCountryFlag from 'vue-country-intl/lib/vue-country-flag.min';
// import 'vue-country-intl/lib/vue-country-flag.css';
// Vue.use(VueCountryFlag, require.context('vue-country-intl/lib/country-flag-svgs', true, /\.svg$/))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
