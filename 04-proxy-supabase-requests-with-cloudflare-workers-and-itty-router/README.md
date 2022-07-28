# Proxy Supabase requests with Cloudflare Workers and Itty Router

**[📹 Video](TODO! Add link to egghead lesson)**

Itty Router is a tiny router package that has a similar API to Express. In this video, we install Itty Router and the Extras packages.

Additionally, we refactor our existing worker to use the router, and declare a dynamic route to fetch a single article.

To handle paths and articles that don't exist, we add a catch all route that returns a 404 status.

Lastly, we use the `json` helper to automatically stringify JSON objects and set the `Content-Type` header for `application/json`.

## Code Snippets

**Install Itty Router and extras**

```bash
npm i itty-router itty-router-extras
```

**Run wrangler development server**

```bash
npx wrangler dev
```

**GET route for all articles**

```javascript
router.get(
  "/articles",
  async (request, { SUPABASE_URL, SUPABASE_ANON_KEY }) => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data } = await supabase.from("articles").select("*");
    return json(data);
  }
);
```

**GET route for one article**

```javascript
router.get(
  "/articles/:id",
  async (request, { SUPABASE_URL, SUPABASE_ANON_KEY }) => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const { id } = request.params;

    const { data } = await supabase
      .from("articles")
      .select("*")
      .match({ id })
      .single();

    if (!data) {
      return status(404, "Not found");
    }

    return json(data);
  }
);
```

**Catch all route for 404**

```javascript
router.all("*", () => status(404, "Not found"));
```

## Resources

- [Itty Router repo](https://github.com/kwhitley/itty-router)
- [Itty Router Extras repo](https://github.com/kwhitley/itty-router-extras)

---

[👉 Next lesson](/05-bind-kv-store-to-cloudflare-worker)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
