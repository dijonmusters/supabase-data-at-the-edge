# Bind a KV store to Cloudflare Worker

**[📹 Video](https://egghead.io/lessons/supabase-bind-a-kv-store-to-cloudflare-worker?af=9qsk0a)**

KV Storage is a cache that Cloudflare makes available within our Workers. It replicates across multiple CDN nodes, making it a super performant way to cache data.

In this lesson, we create a new KV store using the Wrangler CLI, and bind it to our Cloudflare worker using the `wrangler.toml` configuration file.

Additionally, we create a `preview` store to use in development mode.

## Code Snippets

**Create a KV Store**

```bash
npx wrangler kv:namespace create "ARTICLES"
```

**Create a preview KV Store**

```bash
npx wrangler kv:namespace create "ARTICLES" --preview
```

**Bind KV to Cloudflare Worker**

```toml
kv_namespaces = [
  { binding = "replace-with-your-kv-name", id = "replace-with-your-kv-production-id", preview_id = "replace-with-your-kv-preview-id" }
]
```

**Run wrangler development server**

```bash
npx wrangler dev
```

## Resources

- [How KV works](https://developers.cloudflare.com/workers/learning/how-kv-works/)
- [KV Storage docs](https://developers.cloudflare.com/workers/runtime-apis/kv/)

---

[👉 Next lesson](/06-read-and-write-to-kv-cache-from-cloudflare-worker)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
