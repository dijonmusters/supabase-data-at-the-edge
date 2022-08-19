# Cache Supabase response at the Edge with KV storage

**[📹 Video](https://egghead.io/lessons/supabase-cache-supabase-response-at-the-edge-with-kv-storage?af=9qsk0a)**

KV Storage allows us to cache a value as close as possible to our Cloudflare Worker. The first time a user navigates to a route, we don't have the data in the cache, so we need to make a request to the Supabase origin server.

This server could be on the other side of the world and take a long time to respond. Therefore, if we cache the response we get back for a particular route, there is no need to make an additional request to the origin.

In this lesson, we implement cache-aware routes for fetching many articles or a single article. This first checks whether we have the cached value, and sends it back immediately if we do. If not, it will make a request for fresh data from Supabase, and cache the response for the next visitor.

Additionally, we simulate what a slow request might be like, as we might not experience this with super fast computers geographically close to our hosting servers.

## Code Snippets

**Cache-aware many articles route**

```javascript
router.get(
  "/articles",
  async (request, { SUPABASE_URL, SUPABASE_ANON_KEY, ARTICLES }) => {
    const cachedArticles = await readFrom(ARTICLES, "/articles");

    if (cachedArticles) {
      console.log("sending the cache");
      return json(cachedArticles);
    }

    console.log("fetching fresh articles");

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data } = await supabase.from("articles").select("*");
    await writeTo(ARTICLES, "/articles", data);
    return json(data);
  }
);
```

**Cache-aware one article route**

```javascript
router.get(
  "/articles/:id",
  async (request, { SUPABASE_URL, SUPABASE_ANON_KEY, ARTICLES }) => {
    const { id } = request.params;
    const cachedArticle = await readFrom(ARTICLES, `/articles/${id}`);

    if (cachedArticle) {
      console.log("sending the cache");
      return json(cachedArticle);
    }

    console.log("fetching fresh article");

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data } = await supabase
      .from("articles")
      .select("*")
      .match({ id })
      .single();

    await writeTo(ARTICLES, `/articles/${id}`, data);

    return json(data);
  }
);
```

**Simulate 3 second delay**

```javascript
const data = await new Promise((resolve) => {
  setTimeout(async () => {
    const { data } = await supabase.from("articles").select("*");
    resolve(data);
  }, 3000);
});
```

**Delete key from KV Store**

```bash
npx wrangler kv:key delete --binding=ARTICLES '/articles' --preview
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

[👉 Next lesson](/08-cache-busting-with-kv-stores-and-supabase)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
