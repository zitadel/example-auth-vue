<script setup lang="ts">
import AuthProvider from 'vue-oidc-context'
import { ZITADEL_SCOPES } from '@/config/scopes'
import ErrorBoundary from '@components/ErrorBoundary.vue'

const cfg = {
  authority: import.meta.env.VITE_ZITADEL_DOMAIN,
  client_id: import.meta.env.VITE_ZITADEL_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_ZITADEL_CALLBACK_URL,
  post_logout_redirect_uri: import.meta.env.VITE_POST_LOGOUT_URL,
  scope: ZITADEL_SCOPES,
  loadUserInfo: true,
  onSigninCallback: () => {
    console.log('onSigninCallback fired')
    window.history.replaceState({}, document.title, window.location.origin + '/')
    window.location.assign(import.meta.env.VITE_POST_LOGIN_URL || '/profile')
  },
}
</script>

<template>
  <ErrorBoundary>
    <AuthProvider
      :authority="cfg.authority"
      :client_id="cfg.client_id"
      :redirect_uri="cfg.redirect_uri"
      :post_logout_redirect_uri="cfg.post_logout_redirect_uri"
      :scope="cfg.scope"
      :loadUserInfo="cfg.loadUserInfo"
      :onSigninCallback="cfg.onSigninCallback"
    >
      <router-view />
    </AuthProvider>
  </ErrorBoundary>
</template>
