<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

const seconds = ref(5);
let timer: number | undefined;

onMounted(() => {
  timer = window.setInterval(() => {
    seconds.value -= 1;
    if (seconds.value <= 0) {
      clearInterval(timer);
      window.location.replace('/'); // go home
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="p-6 space-y-3">
    <h1 class="text-2xl font-bold">You’ve been signed out.</h1>
    <p>Redirecting to the home page in {{ seconds }} seconds…</p>
    <p>
      Don’t want to wait?
      <router-link to="/" class="underline">Go now</router-link>.
    </p>
  </div>
</template>
