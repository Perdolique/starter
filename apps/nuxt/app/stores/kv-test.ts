export const useKvTestStore = defineStore('kv-test', () => {
  const storedValue = ref('')

  async function fetchValue() {
    const { data } = await useFetch('/api/kv-storage')

    if (data.value !== undefined && data.value.storedValue !== null) {
      storedValue.value = data.value.storedValue
    }
  }

  async function saveValue(value: string) {

    try {
      const savedValue = await $fetch('/api/kv-storage', {
        method: 'POST',

        body: {
          storedValue: value
        }
      })

      storedValue.value = savedValue.storedValue
    } catch {
      // No-op
    }
  }

  return {
    storedValue,
    fetchValue,
    saveValue
  }
})
