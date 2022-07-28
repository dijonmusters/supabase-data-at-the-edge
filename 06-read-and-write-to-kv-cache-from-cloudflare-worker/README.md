# Read and write to KV cache from Cloudflare Worker

**[📹 Video](TODO! Add link to egghead lesson)**

KV Storage is a read-optimized, eventually consistent cache that can be accessed from Cloudflare Workers. The interface for reading and writing is similar to `localStorage` in the browser.

In this lesson, we create a `read-kv` route for reading from the KV store. This automatically gets passed any KV stores that have been bound to the Cloudflare Worker. Initially, the store is empty, so returns the value `null`.

Additionally, we create a `write-kv` route to populate the store with test data.

To reduce the overhead of stringifying and parsing JSON objects, we create two helper functions to easily read and write values to any KV store.

Lastly, we publish a production version of our Cloudflare Worker, to confirm that writing these value locally - to our preview store - does not affect our production store.

## Code Snippets

**readFrom helper function**

```javascript
export const readFrom = async (cache, path) => {
  const data = await cache.get(path);
  return JSON.parse(data);
};
```

**writeTo helper function**

```javascript
export const writeTo = async (cache, path, data) => {
  await cache.put(path, JSON.stringify(data));
};
```

**Read KV route**

```javascript
router.get("/read-kv", async (request, { ARTICLES }) => {
  const articles = await readFrom(ARTICLES, "/articles");
  return json(articles);
});
```

**Write KV route**

```javascript
router.get("/write-kv", async (request, { ARTICLES }) => {
  const articles = [{ title: "test3" }, { title: "test4" }];
  await writeTo(ARTICLES, "/articles", articles);

  return json(articles);
});
```

**Publish Cloudflare Worker**

```bash
npx wrangler publish
```

**Run wrangler development server**

```bash
npx wrangler dev
```

## Resources

- [Wrangler CLI docs](https://developers.cloudflare.com/workers/wrangler/commands/)
- [KV Storage docs](https://developers.cloudflare.com/workers/runtime-apis/kv/)

---

[👉 Next lesson](/07-cache-supabase-response-at-the-edge-with-kv-storage)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
