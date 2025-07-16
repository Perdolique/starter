<template>
  <main :class="$style.root">
    <slot />
  </main>
</template>

<style module>
  .root {
    display: grid;
    grid-template-rows: 1fr;
  }
</style>
