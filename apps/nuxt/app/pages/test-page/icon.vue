<template>
  <section>
    <h1>Icons test page</h1>

    <p :class="$style.icons">
      <Icon name="streamline-emojis:dog" />
      <Icon name="streamline-emojis:dashing-away" />
    </p>
  </section>
</template>

<style module>
  .icons {
    font-size: 3rem;
  }
</style>
