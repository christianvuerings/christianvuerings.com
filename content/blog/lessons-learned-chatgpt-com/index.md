---
layout: post
title: 'Lessons learned from chatgpt.com'
date: '2024-06-10'
tags:
  - development
  - openapi
---

Let's take a look at [chatgpt.com](https://www.chatgpt.com) and see what we can learn from their source code.

## Tech used

- [Statsig](https://www.statsig.com/) for feature flags and A/B testing
- [Cloudflare](https://www.cloudflare.com/) for DNS and CDN services. Static assets are served from `https://cdn.oaistatic.com/`
- [Next.js pages router](https://nextjs.org/docs) instead of new app router, as indicated by the `__NEXT_DATA__` element in the DOM
- [React](https://reactjs.org/) for building the UI
- [Radix UI](https://radix-ui.com/primitives/) as a base for some UI components
- [Segment](https://segment.com/) for analytics with a custom proxy at https://chatgpt.com/ces/v1/t
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Tailwind Typography](https://tailwindcss-typography.vercel.app/) for typography
- [KaTeX](https://katex.org/) for rendering math equations

## Available segment groups for A/B testing

Since chatgpt.com uses the Next.js pages router, we can extract the available segment groups for A/B testing from the `__NEXT_DATA__` element in the DOM:

```js
const openAiNextData = JSON.parse(
  document.getElementById('__NEXT_DATA__').textContent
);
Array.from(
  new Set(
    Object.values({
      ...openAiNextData.props.pageProps.statsig.payload.dynamic_configs,
      ...openAiNextData.props.pageProps.statsig.payload.feature_gates,
    }).flatMap(({ secondary_exposures }) =>
      secondary_exposures.map(({ gate }) => gate)
    )
  )
)
  .sort()
  .join('\n');
```

Which gives us the following list of segment groups:

```
chatgpt-allow-memory-use-admin
chatgpt-browse-sahara
chatgpt-ios-enable-sidekick-access
chatgpt-ios-enable-sidekick-access-v2
chatgpt-ios-sidekick-enterprise-optout
chatgpt-localization-allowlist
chatgpt-localization-preview
chatgpt-mainline-model-transition-unpaid-sahara-v
chatgpt-paid-users
chatgpt-search-demo-ui
chatgpt-sonic-evals
chatgpt-sonic-internal
chatgpt-web-voice-message-playback
chatgpt_anon_chat_enabled
chatgpt_anon_chat_holdout_20240227
chatgpt_fruit_juice
chatgpt_fruit_juice_anon
chatgpt_fruit_juice_inverse
chatgpt_no_auth_holdout_20240328
chatgpt_no_auth_holdout_gate_20240328
chatgpt_web_sharing_modal_simplified_targeting
chatgpt_yearly_plus_subscription_holdout_240117
internal-employee-only-chatgpt-team
segment:anonymous_users
segment:chatgpt_paid_users
segment:chatgpt_unpaid_users
segment:chatgpt_voice_team
segment:contractors
segment:employees
segment:enterprise
segment:european_legal_restricted
segment:feather_graders_for_sonic
segment:feather_memory_trainers
segment:friends_and_family_nda
segment:gizmo_store_holdout_exceptions
segment:internal_ips
segment:internal_oai_gptv_testers
segment:plus_qa_-_gizmos
segment:plusqa_testers
segment:scallion_free_preview_testers
segment:scallion_paid_testers
segment:sidekick_windows_contractors
segment:sonic-testers
segment:store_dogfooding
segment:teams_plan
```

Curious to know who belongs to the `friends_and_family_nda` segment group and what `fruit_juice` and `sidekick` are all about.

Feel free to take a look at the [full list `__NEXT_DATA__` data](https://gist.github.com/christianvuerings/173dd3b5b810952e7a7d1b115a08a1df). At the moment unique id's are used for for experiment / feature flag names. If they had used more descriptive namves, we would be able to know what their experiments are.

## Dark mode support

They store the `theme` dark or light in local storage and use the `prefers-color-scheme` media query to determine the default theme.

```js
!(function () {
  try {
    var d = document.documentElement,
      c = d.classList;
    c.remove('light', 'dark');
    var e = localStorage.getItem('theme');
    if ('system' === e || (!e && true)) {
      var t = '(prefers-color-scheme: dark)',
        m = window.matchMedia(t);
      if (m.media !== t || m.matches) {
        d.style.colorScheme = 'dark';
        c.add('dark');
      } else {
        d.style.colorScheme = 'light';
        c.add('light');
      }
    } else if (e) {
      c.add(e || '');
    }
    if (e === 'light' || e === 'dark') d.style.colorScheme = e;
  } catch (e) {}
})();
```

The `colorScheme` style property on `document.documentElement` automatically updates the browser's theme. For instance, scrollbars are styled according to the theme.

### `.style.colorScheme = 'dark'`

![Color scheme: dark](images/2024-06-10-chatgpt-color-scheme-dark.png)

### `.style.colorScheme = 'light'`

![Color scheme: light](images/2024-06-10-chatgpt-color-scheme-light.png)

## ChatGPT can be used anonymously in the USA but not in Europe

USA users can use ChatGPT without logging in. European users are required to log in with their OpenAI account.

### USA experience

![USA anon experience](images/2024-06-10-chatgpt-anon-usa.png)

### EU experience

![EU login experience](images/2024-06-10-chatgpt-anon-login.png)
