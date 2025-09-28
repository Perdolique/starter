<template>
  <BasePage title="KV storage test">
    <form @submit.prevent="onSubmit">
      <input
        type="text"
        required
        placeholder="Enter value to store"
        v-model="inputValue"
      >

      <button
        type="submit"
        :disabled="isButtonDisabled"
      >
        Store value
      </button>
    </form>
  </BasePage>
</template>

<script setup lang="ts">
  import BasePage from '~/components/BasePage.vue';
  import { useKvTestStore } from '~/stores/kv-test'

  const inputValue = defineModel({
    default: ''
  })

  const kvTestStore = useKvTestStore()
  const isButtonDisabled = computed(() => kvTestStore.storedValue === inputValue.value)

  await kvTestStore.fetchValue()

  inputValue.value = kvTestStore.storedValue

  async function onSubmit() {
    await kvTestStore.saveValue(inputValue.value)

  }
</script>
