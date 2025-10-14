<template>
  <button
    type="button"
    class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 cursor-pointer"
    @click="handleSignOut"
  >
    Sign out
  </button>
</template>

<script setup lang="ts">
import { useAuth } from 'vue-oidc-context'

const auth = useAuth()

const handleSignOut = () => {
  auth.value.signoutRedirect({
    post_logout_redirect_uri:
      import.meta.env.VITE_ZITADEL_POST_LOGOUT_URL || window.location.origin + '/',
  })
}

defineOptions({
  name: 'SignOutButton',
})
</script>
