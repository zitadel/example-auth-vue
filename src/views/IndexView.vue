<script setup lang="ts">
import { useAuth } from 'vue-oidc-context'

const auth = useAuth()

const login = () => auth.value.signinRedirect()
const logout = () =>
  auth.value.signoutRedirect({
    post_logout_redirect_uri:
      import.meta.env.VITE_ZITADEL_POST_LOGOUT_URL || window.location.origin + '/',
  })
</script>

<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl font-bold">Home</h1>

    <div v-if="auth.isAuthenticated">
      <button class="px-4 py-2 border rounded" @click="logout">Log out</button>
      <router-link to="/profile" class="ml-3 px-4 py-2 border rounded">Go to Profile</router-link>
    </div>

    <div v-else>
      <button class="px-4 py-2 border rounded" @click="login">Log in</button>
    </div>
  </div>
</template>
