---
title: Making optional properties nullable in TypeScript
date: "2019-12-20 22:10:39+01"
lang: en-US
---

Let's say you follow the TypeScript project coding guidelines and [only use `undefined`](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined). Your types are defined with non-nullable optional properties (e.g., `x?: number`), but the data coming from the API returns `null` instead.

You decide to write a function to strip all these `null` values from the response, so that they conform to your types:

```typescript
function stripNullableProperties(obj) {
  // Return a new object without null properties
}
```

How can you strongly type such helper without duplicating your input and output types? You could try:

```typescript
function stripNullableProperties<T extends {}>(obj: T): T;
```

But it won't work in [strict null checking mode](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#--strictnullchecks), since `obj` might have `null` values that are not assignable to the non-nullable optional properties in `T`:

```typescript
type A = {
  x: number;
  y?: number;
};

stripNullableProperties<A>({
  x: 1,
  y: null // Error: Type 'null' is not assignable to type 'number | undefined'.
});
```

What you really need is something like:

```typescript
function stripNullableProperties<T extends {}>(obj: NullableOptional<T>): T;
```

## The `NullableOptional` type

The `NullableOptional` type constructs a type with all optional properties of `T` set to nullable:

```typescript
type A = {
  x: number;
  y?: number;
};

type B = NullableOptional<A>;
// {
//   x: number;
//   y?: number | null;
// }
```

You won't find `NullableOptional` in the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/utility-types.html), and that's because it's a custom type. It actually looks like this:

```typescript
type RequiredKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? never : K }[keyof T];

type OptionalKeys<T> = { [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never }[keyof T];

type PickRequired<T> = Pick<T, RequiredKeys<T>>;

type PickOptional<T> = Pick<T, OptionalKeys<T>>;

type Nullable<T> = { [P in keyof T]: T[P] | null };

type NullableOptional<T> = PickRequired<T> & Nullable<PickOptional<T>>;
```

In short:

1. pick the required properties from `T`;
2. pick the optional properties from `T` and make them nullable;
3. intersect (1) with (2).

With this, you can remove all nullable properties from an object whose interface should only have non-nullable optional properties, while still ensuring type safety:

```typescript
type A = {
  x: number;
  y?: number;
};

stripNullableProperties<A>({
  x: 1,
  y: null
});
// {
//   x: 1
// }: A
```

You could always do a type assertion and avoid all this trouble, but ensuring type safety—even in seemingly unharmful cases like this one—pays off in the long run.
