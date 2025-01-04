import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/auth/AuthView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import OauthGoogleViewDeprecated from '../views/auth/OauthGoogleViewDeprecated.vue'
import OauthGoogleView from '../views/auth/OauthGoogleView.vue'
import ProfileView from '../views/auth/ProfileView.vue'

import MainView from '../views/MainView.vue'
import HomeView from '../views/HomeView.vue'
import ActivitiesViewV2 from '../views/ActivitiesViewV2.vue'
import ActivitiesView from '../views/ActivitiesView.vue'
import PeopleView from '../views/PeopleView.vue'
import SearchView from '../views/SearchView.vue'

import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user',
      component: AuthView,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'login',
          path: 'login',
          component: LoginView,
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          name: 'register',
          path: 'register',
          component: RegisterView,
        },
        // {
        //   // UserPosts will be rendered inside User's <router-view>
        //   // when /user/:id/posts is matched
        //   name: 'oauth-google',
        //   path: '/oauth/google',
        //   component: OauthGoogleViewDeprecated,
        // },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          name: 'oauth-google-continue',
          path: '/oauth/google/continue',
          component: OauthGoogleView,
        },
      ],
    },

    {
      path: '/',
      component: MainView,
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'home',
          path: '',
          component: HomeView,
        },
        // {
        //   // UserProfile will be rendered inside User's <router-view>
        //   // when /user/:id/profile is matched
        //   name: 'activities',
        //   path: '/activities',
        //   component: ActivitiesViewV2,
        // },
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'people',
          path: '/people',
          component: PeopleView,
        },
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'search',
          path: '/search',
          component: SearchView,
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          name: 'profile',
          path: 'profile',
          component: ProfileView,
        },
      ],
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/activities',
      name: 'activities',
      component: () => import('../views/ActivitiesView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// + https://router.vuejs.org/guide/advanced/navigation-guards.html#Global-Before-Guards
router.beforeEach(async (to, from) => {
  const isAuthenticated = localStorage.getItem("token");
  
  if (
    // make sure the user is authenticated
    !isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    // to.name !== 'login' &&
    !to.name.includes('login') &&
    !to.name.includes('register') &&
    !to.name.includes('oauth') &&
    // ❗️ Home Page does not require login
    to.name !== 'home'
  ) {
    // redirect the user to the login page
    return { name: 'login' }
  }
})

export default router
