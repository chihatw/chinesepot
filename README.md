# DB

- supabase から neon に移行

# Memo

- `tsconfig.json`
  - `new Set()` を使うために `"target": "es6"` 追記

- `next.config.mjs`
  - cache 状態を見るため

```js
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```

# GitHub Copilot Usage

- https://github.com/settings/copilot/features
- https://github.com/settings/billing
