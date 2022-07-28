# Revalidate stale data by ID

**[📹 Video](TODO! Add link to egghead lesson)**

Handling revalidation of a particular article requires us to pass through an ID as part of the request's body. Therefore, we need to change this from a GET request to a POST request and use the `withContent` middleware to parse the request's body into a JSON object.

Additionally, we fetch data for this specific article from Supabase, using its ID, and update the cache for that path.

We can no longer test this using a browser, as it can only send GET requests. Therefore, we use a VS Code extension called Thunder Client to make the POST request and pass along the article's ID in the request's body.

## Code Snippets

**Update Revalidate route for single article**

```javascript
router.post(
  "/revalidate",
  withContent,
  async (request, { SUPABASE_URL, SUPABASE_ANON_KEY, ARTICLES }) => {
    const { id } = request.content;
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data: article } = await supabase
      .from("articles")
      .select("*")
      .match({ id })
      .single();
    await writeTo(ARTICLES, `/articles/${id}`, article);

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
- [Thunder Client VS Code extension](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

---

[👉 Next lesson](/10-automatically-revalidate-kv-store-cache-on-change-with-database-webhooks-in-supabase)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
