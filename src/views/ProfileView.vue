// file: src/views/ProfileView.vue
<script setup lang="ts">
import { computed, unref } from 'vue'
import { useAuth } from 'vue-oidc-context'
import { useRouter } from 'vue-router'

const authRef = useAuth()
const router = useRouter()

function isPromise(x: unknown): x is Promise<unknown> {
  return !!x && typeof (x as any).then === 'function'
}

// Pull sync values from context
const isAuthenticated = computed(() => !!unref(authRef).isAuthenticated)
const userRaw = computed(() => unref(authRef).user ?? null)

// Guard against Promises at every step
const user = computed(() => (isPromise(userRaw.value) ? null : userRaw.value))
const profile = computed(() => {
  const p = user.value ? (user.value as any).profile : null
  return isPromise(p) ? null : p
})
const token = computed(() => {
  const t = user.value ? (user.value as any).access_token : null
  return isPromise(t) ? null : t
})

// For display only: stringify safely (objects -> JSON, others -> String)
function show(x: unknown) {
  if (isPromise(x)) return '<<PROMISE>>'
  if (x === null || x === undefined) return '—'
  if (typeof x === 'object') {
    try { return JSON.stringify(x, null, 2) } catch { return '[unserializable object]' }
  }
  return String(x)
}

// Debug flags so we can see exactly what's a Promise
const debug = computed(() => ({
  isAuthenticated: isAuthenticated.value,
  userIsPromise: isPromise(userRaw.value),
  profileIsPromise: isPromise(user.value ? (user.value as any).profile : null),
  tokenIsPromise: isPromise(user.value ? (user.value as any).access_token : null),
}))

const logout = () => {
  authRef.value.signoutRedirect({
    post_logout_redirect_uri:
      import.meta.env.VITE_ZITADEL_POST_LOGOUT_URL || window.location.origin + '/',
  })
}
</script>

<template>
  <div class="p-6 space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Profile</h1>
      <div class="space-x-2">
        <router-link to="/" class="px-4 py-2 border rounded hover:bg-gray-50">
          Home
        </router-link>
        <button
          v-if="isAuthenticated"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          @click="logout"
        >
          Log out
        </button>
      </div>
    </div>

    <template v-if="isAuthenticated">
      <div class="space-y-2">
        <div><span class="font-semibold">Name:</span> {{ show(profile?.name) }}</div>
        <div><span class="font-semibold">Username:</span> {{ show(profile?.preferred_username) }}</div>
        <div><span class="font-semibold">Email:</span> {{ show(profile?.email) }}</div>
        <div><span class="font-semibold">Email verified:</span> {{ show(profile?.email_verified) }}</div>
        <div><span class="font-semibold">Subject (sub):</span> {{ show(profile?.sub) }}</div>
      </div>

      <details class="mt-2">
        <summary class="cursor-pointer underline">Raw user object</summary>
        <pre class="bg-gray-100 p-3 rounded overflow-auto text-sm">{{ show(user) }}</pre>
      </details>

      <details>
        <summary class="cursor-pointer underline">Access token</summary>
        <pre class="bg-gray-100 p-3 rounded overflow-auto text-sm">{{ show(token) }}</pre>
      </details>

      <details>
        <summary class="cursor-pointer underline">Debug</summary>
        <pre class="bg-gray-100 p-3 rounded overflow-auto text-sm">{{ show(debug) }}</pre>
      </details>
    </template>

    <template v-else>
      <p>You're not logged in.</p>
      <router-link class="underline" to="/">Go home</router-link>
    </template>
  </div>
</template>
