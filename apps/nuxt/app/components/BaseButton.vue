<template>
  <button :class="$style.button">
    <slot />
  </button>
</template>

<style module>
  .button {
    --color-bg-light: lightsalmon;
    --color-bg-dark: color-mix(in oklch, var(--color-bg-light), black 40%);
    --color-bg-hover-light: color-mix(in oklch, var(--color-bg-light), black 10%);
    --color-bg-hover-dark: color-mix(in oklch, var(--color-bg-dark), white 10%);

    appearance: none;
    padding: var(--spacing-12) var(--spacing-24);
    background-color: light-dark(var(--color-bg-light), var(--color-bg-dark));
    border: none;
    border-radius: var(--border-radius-12);
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      filter 0.2s ease,
      color 0.2s ease,
      opacity 0.2s ease;

    &:hover:not(:disabled),
    &:focus-visible {
      background-color: light-dark(var(--color-bg-hover-light), var(--color-bg-hover-dark));
    }

    &:disabled {
      opacity: 0.8;
      filter: grayscale(1);
      cursor: not-allowed;
      color: inherit;
    }
  }
</style>
