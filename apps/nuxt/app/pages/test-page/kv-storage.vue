<template>
  <section :class="$style.container">
    <h2>KV storage test</h2>

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
  </section>
</template>

<script setup lang="ts">
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

<style module>
  .container {
    display: grid;
    row-gap: 20px;
  }
</style>
