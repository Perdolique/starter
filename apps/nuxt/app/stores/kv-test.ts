export const useKvTestStore = defineStore('kv-test', () => {
  const testValue = ref('')

  async function fetchTestValue() {
    const { data } = await useFetch('/api/kv-storage')

    if (data.value !== undefined && data.value.testValue !== null) {
      testValue.value = data.value.testValue
    }
  }

  async function saveTestValue(value: string) {

    try {
      const savedValue = await $fetch('/api/kv-storage', {
        method: 'POST',

        body: {
          value
        }
      })

      testValue.value = savedValue.testValue
    } catch {
      // No-op
    }
  }

  return {
    testValue,
    fetchTestValue,
    saveTestValue
  }
})
