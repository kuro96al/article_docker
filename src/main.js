import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import router from './router'
import Vue2Editor from "vue2-editor";

Vue.use(Vue2Editor);

Vue.config.productionTip = false

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC3lh-qHCnlIm9ayzNeaV9R0Gw74QrmUxs",
    authDomain: "note-8b6f9.firebaseapp.com",
    databaseURL: "https://note-8b6f9.firebaseio.com",
    projectId: "note-8b6f9",
    storageBucket: "note-8b6f9.appspot.com",
    messagingSenderId: "800580043176",
    appId: "1:800580043176:web:e670672c9190215be61d9d",
    measurementId: "G-XZN271Y8ZF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//  firebase.analytics();

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
