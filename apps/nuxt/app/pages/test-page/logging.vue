<template>
  <BasePage title="Logging test">
    <BaseButton @click="triggerServerLog">
      Trigger server log
    </BaseButton>
  </BasePage>
</template>

<script lang="ts" setup>
  import BaseButton from '~/components/BaseButton.vue';
  import BasePage from '~/components/BasePage.vue'

  function triggerServerLog() {
    $fetch('/api/logging', {
      method: 'POST',
    })
  }
</script>
