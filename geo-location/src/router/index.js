import Vue from 'vue'
import Router from 'vue-router'
import Gmap from '@/components/home/Gmap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import firebase from 'firebase'
import ViewProfile from '@/components/profile/ViewProfile'
Vue.use(Router)

const router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Gmap',
      component: Gmap,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta:{
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) =>{
  // check to see if route requires auth
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    // check auth state of user
    let user = firebase.auth().currentUser

    if(user){
      // user signed in, proceed to route
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router