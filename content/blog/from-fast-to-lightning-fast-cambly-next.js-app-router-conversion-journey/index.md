---
layout: post
title: "From Fast to Lightning Fast: Cambly's Next.js App Router Conversion Journey"
date: '2023-05-06'
tags:
  - development
  - cambly
---

At [Cambly](https://www.cambly.com) we converted our [kids landing page](https://www.cambly.com/kids) to the [Next.js app router](https://nextjs.org/docs) which boosted our [Lighthouse performance score](https://developer.chrome.com/en/docs/lighthouse/performance/performance-scoring/) from 91 to 100! Our experience led to gaining a few key insights that we believe are worth sharing.

## Results

Our Lighthouse performance score has improved from 91 to 100. Refer to the following table for a breakdown of the specific metric changes.

| Metric                                                                                  | Pages Directory | App Router | Improvement |
| --------------------------------------------------------------------------------------- | --------------- | ---------- | ----------- |
| [First Contentful Paint](https://web.dev/fcp/)                                          | 1.9s            | 0.9s       | 53%         |
| [Largest Contentful Paint](https://web.dev/optimize-lcp/)                               | 3.2s            | 1.2s       | 63%         |
| [Speed Index](https://developer.chrome.com/en/docs/lighthouse/performance/speed-index/) | 2.4s            | 1.3s       | 46%         |

## Lessons Learned

### 1. Use React Server Components when possible

[React Server Components](https://nextjs.org/docs/getting-started/react-essentials#thinking-in-server-components) are a new React feature that allows us to render components on the server. This has a few key benefits:

- render React components without shipping extra JavaScript to the client
- network calls inside a <abbr title="React Server Component">RSC</abbr> are way faster since they happen within our <abbr title="Virtual Private Cloud">VPC</abbr>

We used React Server Components for anything that doesn't require client-side interactivity, React context or React state and side-effects.

### 2. Refactor from the top down

We started by converting to top level entry page & layout to React server components and then worked our way down. That allowed us to get the big performance wins quickly and spread out the conversion over time.

### 3. Co-locate data fetching with components

With the Next.js App Router we can now co-locate data fetching with components. This means that we can fetch data in the component that needs it. It makes it easier to reason about the data flow and makes it easier to refactor.

Next.js [automatically caches `fetch()` calls during a request](https://nextjs.org/docs/app/building-your-application/data-fetching#automatic-fetch-request-deduping). So fetching the current user in multiple components will only result in one network call. If you want to manually cache data, you can use the [React `cache` method](https://nextjs.org/docs/app/building-your-application/data-fetching/caching#per-request-caching).

Previously if we wanted content to be rendered on the server, we had to put all of our data fetching in `getServerSideProps`. That meant we had to do lots of prop drilling or use React context to get the data to the components that needed it.

## Gotchas

### 1. Internationalization is no longer built-in

Previously we used the `i18n` property in `next.config.js` to enable internationalization in combination with [next-i18next](https://github.com/i18next/next-i18next). When we use the Next.js App Router, that is no longer required and we can use [react-i18next](https://react.i18next.com/) directly.

Huge thanks to Adriano Raiano who provided [JavaScript](https://github.com/i18next/next-13-app-dir-i18next-example) and [TypeScript](https://github.com/i18next/next-13-app-dir-i18next-example-ts) example with the Next.js app directory:

### 2. `#__next` is gone

With the Next.js App Router, your [page content no longers renders insides of a `#__next` div](https://github.com/vercel/next.js/discussions/45541). Be sure to update any code that relies on that.

### 3. TypeScript doesn't yet support React Server Components

The latest version of TypeScript (5.0) doesn't yet support React Server Components. It should be fixed in TypeScript 5.1 but for now we had to use [the following workaround](https://github.com/vercel/next.js/issues/42292#issuecomment-1475968658):

```ts
// Async server components workaround
export default ExampleComponent as unknown as (props: Props) => JSX.Element;
```

## Conclusion

It's still early days for the Next.js App Router but we're excited about the performance improvements and the ability to co-locate data fetching with components. The Next.js team did a great job of making the transition as smooth as possible.
