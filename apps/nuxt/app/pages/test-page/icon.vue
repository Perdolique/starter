<template>
  <BasePage title="Icons test page">
    <p :class="$style.icons">
      <Icon name="streamline-emojis:dog" />
      <Icon name="streamline-emojis:dashing-away" />
    </p>
  </BasePage>
</template>

<script setup lang="ts">
  import BasePage from '~/components/BasePage.vue';
</script>

<style module>
  .icons {
    font-size: 3rem;
  }
</style>
