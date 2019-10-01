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
    apiKey: "AIzaSyCMBzsDlterlhA1PQedsVoQ6g-vf91TFyI",
    authDomain: "article-34887.firebaseapp.com",
    databaseURL: "https://article-34887.firebaseio.com",
    projectId: "article-34887",
    storageBucket: "",
    messagingSenderId: "664289679428",
    appId: "1:664289679428:web:f6991c9e354cb326aa4411"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
