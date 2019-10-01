import Vue from 'vue'
import Router from 'vue-router'
import Edit from './views/Edit'
import Chat from './views/Chat'
Vue.use(Router); 

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    }
  ]
})
