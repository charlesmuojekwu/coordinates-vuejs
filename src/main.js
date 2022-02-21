import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

// Import for geo-location
import VueGeolocation from 'vue-browser-geolocation'
Vue.use(VueGeolocation)

// Import for google Map
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {

  load: {
    key:process.env.VUE_APP_MAP_API_KEY
  },

  installComponents: true
})



new Vue({
  render: h => h(App),
}).$mount('#app')
