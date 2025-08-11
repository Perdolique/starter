<template>
  <main :class="$style.root">
    <slot />
  </main>
</template>

<script setup lang="ts">
  useHead({
    htmlAttrs: {
      lang: 'en'
    }
  })
</script>

<style module>
  .root {
    display: grid;
    grid-template-rows: 1fr;
  }
</style>
