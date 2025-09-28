<template>
  <BasePage title="Database test page">
    <div>
      User: {{ userStore.userId ?? 'unknown' }}
    </div>

    <div :class="$style.buttons">
      <BaseButton
        v-if="isAuthenticated"
        @click="onDeleteAccountClick"
        :disabled="userStore.isDeleting"
        type="button"
      >
        Delete account
      </BaseButton>

      <BaseButton
        v-else
        @click="onCreateAccountClick"
        :disabled="userStore.isCreating"
        type="button"
      >
        Create account
      </BaseButton>
    </div>
  </BasePage>
</template>

<script lang="ts" setup>
  import BasePage from '~/components/BasePage.vue'
  import BaseButton from '~/components/BaseButton.vue'
  import useUserStore from '~/stores/user'

  const userStore = useUserStore()
  const isAuthenticated = computed(() => userStore.userId !== null)

  await userStore.fetchUser()

  async function onCreateAccountClick() {
    await userStore.createUser()
  }

  async function onDeleteAccountClick() {
    await userStore.deleteUser()
  }
</script>

<style module>
  .buttons {
    display: flex;
    gap: var(--spacing-12);
  }
</style>
