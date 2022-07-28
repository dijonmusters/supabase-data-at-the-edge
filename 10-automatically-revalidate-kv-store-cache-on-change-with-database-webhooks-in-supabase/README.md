# Automatically revalidate KV Store cache on change with Database Webhooks in Supabase

**[📹 Video](TODO! Add link to egghead lesson)**

Supabase Function Hooks allow us to subscribe to change events in the database - such as `insert`, `update` and `delete` - and make a HTTP request with the changed data.

In this lesson, we refactor our `revalidate` route to handle inserts, updates and deletes.

Additionally, we create a Function Hook to subscribe to all change events on the `articles` table, and automatically send a POST request to the `revalidate` route of our Cloudflare Worker.

This automatically refreshes the KV store anytime a value is changed in the database, and decouples the revalidation of our cache, from our user requesting data. This means, theoretically, users should never have to wait for a request to the Supabase origin server, as the cache is automatically populated, updated and cleared to remain in sync with the database.

## Code Snippets

**Update Revalidate route to handle insert, update and delete**

```javascript
router.post(
  "/revalidate",
  withContent,
  async (request, { SUPABASE_URL, SUPABASE_ANON_KEY, ARTICLES }) => {
    const { type, record, old_record } = request.content;
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    if (type === "INSERT" || type === "UPDATE") {
      await writeTo(ARTICLES, `/articles/${record.id}`, record);
    }

    if (type === "DELETE") {
      await ARTICLES.delete(`/articles/${old_record.id}`);
    }

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

**Publish Cloudflare Worker with Wrangler CLI**

```bash
npx wrangler publish
```

## Resources

- [Supabase Functions blog](https://supabase.com/blog/2021/07/30/supabase-functions-updates#function-hooks-alpha)
- [Supabase.js docs](https://github.com/supabase/supabase-js)
- [Wrangler CLI docs](https://developers.cloudflare.com/workers/wrangler/commands/)
- [KV Storage docs](https://developers.cloudflare.com/workers/runtime-apis/kv/)

---

[👉 Next lesson](/11-use-waitUntil-to-perform-work-after-cloudflare-worker-returns-response)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
