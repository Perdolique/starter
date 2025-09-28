<template>
  <section :class="$style.container">
    <h1>
      {{ title }}
    </h1>

    <slot></slot>
  </section>
</template>

<script lang="ts" setup>
  interface Props {
    title: string
  }

  defineProps<Props>()
</script>

<style module>
  .container {
    display: grid;
    row-gap: 20px;
  }
</style>
