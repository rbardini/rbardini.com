2026-01-06 20:08:29+00:00
# Web components initialization and lifecycle pitfalls

I've been writing some vanilla web components lately, and it has made me greatly appreciate how [Lit](https://lit.dev/) abstracts away a lot of the quirks in the web platform. Here are a few _aha!_ moments I've had:

## `isConnected` becomes `true` before `connectedCallback()` is called

You can't rely on `isConnected` to determine if `connectedCallback()` has already been called:

```js
connectedCallback() {
  this.foo = 'bar'
}

doSomething() {
  if (!this.isConnected) return
  console.log(this.foo) // 'bar' | undefined
}
```

If you have code that should only ever run after `connectedCallback()`, you probably want to set your own flag:

```js
connectedCallback() {
  this.foo = 'bar'
  this.isInitialized = true
}

doSomething() {
  if (!this.isInitialized) return
  console.log(this.foo) // 'bar'
}
```

## `attributeChangedCallback()` is also called on attribute initialization

`attributeChangedCallback()` is called after each observed attribute is _initialized_ once the element is parsed, even if those attributes never change:

```html
<my-element foo="bar"></my-element>
```

```js
attributeChangedCallback(name, oldValue, newValue) {
  console.log(name, oldValue, newValue) // 'foo', null, 'bar'
}
```

The good news is, all initialization calls happen _before_ `connectedCallback()`. If you only want to respond to actual modifications, you can once again check if `connectedCallback()` has been called:

```js
connectedCallback() {
  this.isInitialized = true
}

attributeChangedCallback(name, oldValue, newValue) {
  if (!this.isInitialized) return
  console.log(name, oldValue, newValue) // unreachable during initialization
}
```

## `observedAttributes` can be used as a (property) initializer

The `observedAttributes` static property is accessed before any `attributeChangedCallback()` calls. This means you can hook into it to, for example, dynamically create a property for each attribute before attributes are initialized:

```js
static createProperties(attributes) {
  const store = {}

  // map attributes to properties
  attributes.forEach(attr =>
    Object.defineProperty(this.prototype, camelCase(attr), {
      get() { return store[attr] },
      set(value) { store[attr] = value },
    })
  )

  // ensure properties are only created once
  this.createProperties = function noop() {}
}

static get observedAttributes() {
  const attributes = ['foo']
  this.createProperties(attributes)

  return attributes
}

attributeChangedCallback(name, oldValue, newValue) {
  this[camelCase(name)] = newValue
}

connectedCallback() {
  console.log(this.foo) // 'bar'
}
```

## Wrapping up

I'm sure there are other edge cases I'm not taking into account, and maybe I [shouldn't be using `connectedCallback()`](https://hawkticehurst.com/2023/11/you-are-probably-using-connectedcallback-wrong/) in the first place. Hopefully [this related WICG discussion](https://github.com/WICG/webcomponents/issues/1081) leads to improvements to the Custom Elements specification.

`lang:en-US`
