# Cache-busting with KV stores and Supabase

**[📹 Video](https://egghead.io/lessons/cloudflare-cache-busting-with-cloudflare-kv-stores-and-supabase?af=9qsk0a)**

Cache Busting or Invalidation, is the process of clearing stale data from a cache. After the first request, the response data from Supabase is cached in our KV store, and never fetched again. This means if data in the database changes, our KV store will never be updated.

In this lesson, we create a `revalidate` route, which fetches fresh data from Supabase and updates the cache.

## Code Snippets

**Revalidate cache for articles route**

```javascript
router.get(
  "/revalidate",
  async (request, { SUPABASE_URL, SUPABASE_ANON_KEY, ARTICLES }) => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { data: articles } = await supabase.from("articles").select("*");
    await writeTo(ARTICLES, "/articles", articles);
    return json({ received: true });
  }
);
```

**Run wrangler development server**

```bash
npx wrangler dev
```

## Resources

- [Supabase.js docs](https://github.com/supabase/supabase-js)
- [Wrangler CLI docs](https://developers.cloudflare.com/workers/wrangler/commands/)
- [KV Storage docs](https://developers.cloudflare.com/workers/runtime-apis/kv/)

---

[👉 Next lesson](/09-revalidate-stale-data-by-id)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
