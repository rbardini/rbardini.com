2020-05-06T16:40:33+02:00
# Hiding fully-covered files from Jest coverage report

While working on a large JavaScript codebase, one thing that bothered me was the coverage report output to the console: as most files had 100% coverage, it was difficult to spot the few exceptions in the table.

Luckily, additional options can be [passed to Istanbul reporters](https://jestjs.io/docs/en/configuration#coveragereporters-arraystring--stringany). I couldn't find documentation for the `text` reporter, so I digged into its code and found the `skipFull` option:

```diff
 {
   "coverageReporters": [
-    "text"
+    ["text", { "skipFull": true }]
   ]
 }
```

This [hides all rows with full coverage](https://github.com/istanbuljs/istanbuljs/pull/170), letting you focus on what matters most: partially or fully–uncovered files.

I also recommend [jest-silent-reporter](https://github.com/rickhanlonii/jest-silent-reporter) for an even quieter output (especially in CI builds) and [jest-it-up](https://github.com/rbardini/jest-it-up) to automatically bump up global Jest thresholds.

`lang:en-US`
