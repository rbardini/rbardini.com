---
title: Automating tests for the GTM data layer
date: 2019-07-20 20:50:06 +2
lang: en-US
---

At [Travix](https://www.travix.com/) we are constantly analyzing application and user behavior on our websites in order to offer the best experience to our customers. One of the tools employed for this purpose is [Google Tag Manager](https://tagmanager.google.com/) (also called GTM), alongside a _data layer_. A data layer is a JavaScript object that is used to pass information from the website to the Tag Manager container[^1], like product views and purchases.

While implementing new features and refactoring parts of the frontend application, we frequently faced an issue: some GTM events would go missing, be duplicated, dispatch at the wrong time, or just lack important dimensions. This can heavily impact our ability to analyze the data, and thus demanded a lot of manual testing to ensure that everything was working as intended.

We already have end-to-end tests in place, doing a lot of user interactions throughout the website, that in turn push events to the data layer. What if we could extend these tests to also check if the information in the data layer is consistent? Since the data layer is basically an array of JavaScript objects, we can do a sort of snapshot testing, comparing the current values with what we expect them to be.

In this article, I will cover how we automated GTM data layer testing using our end-to-end test framework of choice, [TestCafe](https://devexpress.github.io/testcafe/). The same principles can be easily applied to other test frameworks though.

## Retrieving the data layer

The data layer is assigned to a global `dataLayer` variable. To retrieve the data layer items in end-to-end tests, we must execute code in the browser's context. In TestCafe, this can be done with a [`ClientFunction`](https://devexpress.github.io/testcafe/documentation/test-api/obtaining-data-from-the-client/):

```js
import { ClientFunction } from 'testcafe'

const getDataLayer = ClientFunction(() => window.dataLayer)
```

However, if you try to run this function in your tests, you may face the following error:

```
ClientFunction cannot return DOM elements. Use Selector functions for this purpose.
```

This happens due to some events like `gtm.click` containing references to DOM nodes, which cannot be serialized. One way to fix this is to traverse over all items and remove any such references before returning the data. I will leave this as an exercise, mainly because the problem went away once we started filtering out default GTM events, as I will explain in the next section.

## Filtering out default GTM events

One thing I noticed after printing the data layer a couple of times was that default GTM events (e.g., `gtm.load`, `gtm.click`) would fire at different points in time, thus their order would not be the same and our tests would often fail. To avoid this issue, I decided to simply filter out these default events, since they are not very relevant to us—we care more about the custom events we fire ourselves.

All default GTM events start with `gtm`, so we can just ignore them with a `filter` on the event name:

```js
const getDataLayer = ClientFunction(() => window.dataLayer
  .filter(({ event }) => !event.startsWith('gtm'))
)
```

## Comparing the data layer

Now that we have the data layer in hand, we can make assertions on it. Write your reference data layer snapshot and do a [deep equality check](https://devexpress.github.io/testcafe/documentation/test-api/assertions/assertion-api.html#deep-equal) against it[^2]:

```js
import { t } from 'testcafe'

const dataLayerSnapshot = [
  { event: "productClick" },
  { event: "addToCart" },
  { event: "removeFromCart" },
  { event: "promotionClick" },
  { event: "checkout" },
  { event: "checkoutOption" }
]

await t
  .expect(getDataLayer()).eql(dataLayerSnapshot)
```

If the data layer does not match the snapshot, the test will fail:

```
AssertionError: expected [ Array(5) ] to deeply equal [ Array(6) ]
```

Then it is a matter of fixing the code if it is a regression issue, or (manually) updating the snapshot.

## Bonus: improving test failure output

You probably noticed that the error message is not very helpful—it does not tell you exactly what the difference is between the expected and the received values.

We can work around this by doing a string comparison instead, stringifying both the data layer and the snapshot before the assertion:

```js
const getDataLayer = ClientFunction(() => JSON.stringify(
  window.dataLayer
    .filter(({ event }) => !event.startsWith('gtm'))
))
```

```js
const dataLayerSnapshot = JSON.stringify([
  { event: "productClick" },
  { event: "addToCart" },
  { event: "removeFromCart" },
  { event: "promotionClick" },
  { event: "checkout" },
  { event: "checkoutOption" }
])
```

Not pretty, but it does the job—although it is still a bit difficult to spot what the actual problem is:

```
AssertionError: expected

'[{"event":"productClick"},{"event":"addToCart"},{"event":"promotionClick"},{"event":"checkout"},{"event":"checkoutOption"}]'
   to deeply equal

'[{"event":"productClick"},{"event":"addToCart"},{"event":"removeFromCart"},{"event":"promotionClick"},{"event":"checkout"},{"event":"checkoutOption"}]'
```

In a follow-up post I will explain how we managed to improve this even further by using the [`expect`](https://www.npmjs.com/package/expect) module inside TestCafe for a more Jest-like assertion output.

## Conclusion

Manually testing the data layer after each frontend change is a very time consuming process. Inspection tools like [dataslayer](https://dataslayer.org/) can help, but they are no match for proper automation. By leveraging the power of end-to-end tests, we can save valuable time from developers and data analysts, while being more confident that changes to the codebase will not negatively impact sales and performance tracking.

[^1]: See [this GTM help center article](https://support.google.com/tagmanager/answer/6164391) for more information.
[^2]: For a single-page application (SPA), this could be the very last step of the test.
