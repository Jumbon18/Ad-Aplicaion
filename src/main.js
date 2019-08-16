import Vue from 'vue'
import App from './App.vue'
import * as fb from 'firebase'
import router from './router/router'
import vuetify from './plugins/vuetify';
import store from './store'
import BuyModal from "./components/Shared/BuyModal";
import './sass/main.scss';

Vue.config.productionTip = false;
// Регистрируем компонент
Vue.component('app-buy-modal',BuyModal);

new Vue({
  router,
  vuetify,
  render: h => h(App),
  store,
  created(){
    const firebaseConfig = {
      apiKey: "AIzaSyBSGHiXZzRFcQO2f9oryRxzwrQTe4O430k",
      authDomain: "its-ad-2524a.firebaseapp.com",
      databaseURL: "https://its-ad-2524a.firebaseio.com",
      projectId: "its-ad-2524a",
      storageBucket: "its-ad-2524a.appspot.com",
      messagingSenderId: "478948893525",
      appId: "1:478948893525:web:02c95b59041c71b1"
    };
    fb.initializeApp(firebaseConfig);
    fb.auth().onAuthStateChanged(user =>{
      if(user){
        this.$store.dispatch('autoLoginUser',user);
      }
    });
    this.$store.dispatch('fetchAds').then(res=>console.log(res));
  }

}).$mount('#app');
