<template>
  <div :class="$style.component">
    <button
      v-for="emoji in emojiStore.allEmojis"
      :key="emoji"
      @click="emojiStore.toggleEmoji(emoji)"
      :class="[$style.emojiButton, { enabled: emojiStore.enabledEmojis.has(emoji) }]"
    >
      {{ emoji }}
    </button>
  </div>
</template>

<script lang="ts" setup>
  import useEmojiStore from '~/stores/emoji'

  const emojiStore = useEmojiStore()
</script>

<style module>
  .component {
    display: grid;
    grid-auto-flow: column;
    overflow: auto;
    column-gap: 8px;
    justify-content: start;
  }

  .emojiButton {
    cursor: pointer;
    font-size: 2rem;
    width: 64px;
    aspect-ratio: 1 / 1;
    border: none;
    background-color: transparent;
    transition:
      background-color 200ms cubic-bezier(0.2, 0, 0, 1),
      box-shadow 200ms cubic-bezier(0.2, 0, 0, 1);
    border-radius: 16px;
    display: inline flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    &:global(.enabled) {
      background-color: #6366f1;
      box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    }
  }
</style>
