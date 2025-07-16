type Emoji = '🐶' | '🐷' | '🐔'

const useEmojiStore = defineStore('emoji', () => {
  const allEmojis = ref(new Set<Emoji>([
    '🐶',
    '🐷',
    '🐔'
  ]))

  const enabledEmojis = ref(new Set<Emoji>([]))

  function toggleEmoji(emoji: Emoji) {
    if (enabledEmojis.value.has(emoji)) {
      enabledEmojis.value.delete(emoji)
    } else {
      enabledEmojis.value.add(emoji)
    }
  }


  return {
    allEmojis,
    enabledEmojis,
    toggleEmoji
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useEmojiStore, import.meta.hot)
  )
}

export default useEmojiStore
