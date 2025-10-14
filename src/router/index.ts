import { createRouter, createWebHistory } from 'vue-router'
import { withAuthenticationRequired } from 'vue-oidc-context'
import IndexView from '@/views/IndexView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CallbackView from '@/views/CallbackView.vue'
import LogoutCallbackView from '@/views/LogoutCallbackView.vue'
import AuthErrorView from '@/views/AuthErrorView.vue'
import LogoutErrorView from '@/views/LogoutErrorView.vue'
import LogoutSuccessView from '@/views/LogoutSuccessView.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: IndexView },
    { path: '/profile', name: 'profile', component: withAuthenticationRequired(ProfileView) },
    { path: '/auth/callback', name: 'callback', component: CallbackView },
    { path: '/auth/error', name: 'authError', component: AuthErrorView },
    { path: '/auth/logout/callback', name: 'logoutCallback', component: LogoutCallbackView },
    { path: '/logout/error', name: 'logoutError', component: LogoutErrorView },
    { path: '/logout/success', name: 'logoutSuccess', component: LogoutSuccessView },
  ],
})
