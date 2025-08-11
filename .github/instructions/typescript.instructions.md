---
applyTo: '**/*.ts'
---

# TypeScript Instructions

## Style

- Use implicit comparisons with specific values instead of type casting:

```ts
// BAD (woof is undefined and will be casted to boolean)
if (!woof) {
  // do something
}

// GOOD
if (woof === undefined) {
  // do something
}
```

- Group variables together to improve readability if they take one line. Put

```ts
// BAD
const woof = 'Woof'

const meow = 'Meow'

const tweet = 'Tweet'
```

```ts
// GOOD
const woof = 'Woof'
const meow = 'Meow'
const tweet = 'Tweet'
```

- Always Put empty lines between logical blocks (variables, functions, etc.) It improves readability.

```ts
// BAD
const woof = 'Woof'
function bark() {
  console.log(woof)
}
console.log(woof)
await bark()
```

```ts
// GOOD
const woof = 'Woof'

function bark() {
  console.log(woof)
}

await bark()

console.log(woof)
```
