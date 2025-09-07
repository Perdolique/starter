const useUserStore = defineStore('user', () => {
  const userId = ref<string | null>(null)
  const isCreating = ref(false)
  const isDeleting = ref(false)

  async function fetchUser() {
    const { data } = await useFetch('/api/auth')

    userId.value = data.value?.userId ?? null
  }

  async function createUser() {
    isCreating.value = true

    try {
      const response = await $fetch('/api/auth', {
        method: 'POST'
      })

      userId.value = response.userId
    } finally {
      isCreating.value = false
    }
  }

  async function deleteUser() {
    isDeleting.value = true

    try {
      await $fetch('/api/auth', {
        method: 'DELETE'
      })

      userId.value = null
    } finally {
      isDeleting.value = false
    }
  }

  return {
    createUser,
    deleteUser,
    fetchUser,
    isCreating,
    isDeleting,
    userId
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useUserStore, import.meta.hot)
  )
}

export default useUserStore
