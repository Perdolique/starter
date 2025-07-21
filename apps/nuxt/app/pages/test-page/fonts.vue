<template>
  <section :class="$style.container">
    <h2>Fonts test</h2>

    <div :class="$style.test1">
      The quick brown fox jumps over the lazy dog.
    </div>

    <div :class="$style.test2">
      The quick brown fox jumps over the lazy dog.
    </div>

    <div :class="$style.test3">
      The quick brown fox jumps over the lazy dog.
    </div>

    <div :class="$style.test4">
      The quick brown fox jumps over the lazy dog.
    </div>

    <div :class="$style.test4">
      The quick brown fox jumps over the lazy dog.
    </div>

    <div :class="$style.test5">
      The quick brown fox jumps over the lazy dog.
    </div>

    <div :class="$style.test6">
      The quick brown fox jumps over the lazy dog.
    </div>

    <div :class="$style.test7">
      The quick brown fox jumps over the lazy dog.
    </div>

    <div :class="$style.test8">
      The quick brown fox jumps over the lazy dog.
    </div>

    <div :class="$style.test9">
      The quick brown fox jumps over the lazy dog.
    </div>
  </section>
</template>

<style module>
  .container {
    display: grid;
    row-gap: 20px;
  }

  .test1 {
    font-weight: 100;
  }

  .test2 {
    font-weight: 200;
  }

  .test3 {
    font-weight: 300;
  }

  .test4 {
    font-weight: 400;
  }

  .test5 {
    font-weight: 500;
  }

  .test6 {
    font-weight: 600;
  }

  .test7 {
    font-weight: 700;
  }

  .test8 {
    font-weight: 800;
  }

  .test9 {
    font-weight: 900;
  }
</style>
