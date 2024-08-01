2023-05-28T15:50:45+02:00
# How to build a TypeScript library with Vite

I recently moved a few TypeScript libraries from [Microbundle](https://github.com/developit/microbundle), [TSDX](https://github.com/jaredpalmer/tsdx) and [dts-cli](https://github.com/weiran-zsd/dts-cli) to [Vite](https://vitejs.dev/). I wanted more control over the build setup, and to be able to develop, build and test[^1] them using the same configuration.

The secret is to use Vite's [library mode](https://vitejs.dev/guide/build.html#library-mode), and externalize all dependencies and built-in Node.js modules so that they are not bundled with your code:

```ts
// vite.config.js
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'], // pure ESM package
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies), // don't bundle dependencies
        /^node:.*/, // don't bundle built-in Node.js modules (use protocol imports!)
      ],
    },
    target: 'esnext', // transpile as little as possible
  },
  plugins: [dts()], // emit TS declaration files
})
```

You will also need a `tsconfig.json` specifying root files and compiler options. If you don't have one yet, you can generate one with the appropriate [`create-vite`](https://www.npmjs.com/package/create-vite) TypeScript template, e.g. `vanilla-ts`.

[^1]: I got tired of trying to make Jest work, especially after my migrations to ESM. Adopting [Vitest](https://vitest.dev/), with its compatible API and unified configuration with Vite, was a no-brainer.

`lang:en-US`
