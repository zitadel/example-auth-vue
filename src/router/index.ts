import { createRouter, createWebHistory } from 'vue-router';
import { withAuthenticationRequired } from 'vue-oidc-context';
import IndexView from '@/views/IndexView.vue';
import ProfileView from '@/views/ProfileView.vue';
import CallbackView from '@/views/CallbackView.vue';
import AuthErrorView from '@/views/AuthErrorView.vue';
import LogoutCallbackView from '@/views/LogoutCallbackView.vue';

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: IndexView },
    {
      path: '/profile',
      name: 'profile',
      component: withAuthenticationRequired(ProfileView),
    },
    { path: '/auth/callback', name: 'callback', component: CallbackView },
    { path: '/auth/error', name: 'authError', component: AuthErrorView },
    {
      path: '/auth/logout/callback',
      name: 'logoutCallback',
      component: LogoutCallbackView,
    },
  ],
});
