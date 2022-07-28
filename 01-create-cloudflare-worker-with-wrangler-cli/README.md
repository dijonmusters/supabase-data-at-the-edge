# Create a Cloudflare Worker with the Wrangler CLI

**[📹 Video](TODO! Add link to egghead lesson)**

Cloudflare Workers are serverless functions that run at the Edge! 🔪

The Wrangler CLI is a tool for interfacing with your Cloudflare account, and creating or publishing your Workers.

In this video, we use the Wrangler CLI to log in to our Cloudflare account and authorize the `wrangler` command to make changes on our behalf.

Additionally, we create a worker and host it locally with the `npx wrangler dev` command. We then demonstrate making a GET request to our Cloudflare Worker from the browser, and confirm it is sending the correct response.

By modifying the response locally, we can see that changes are reflected any time we refresh the browser.

## Code Snippets

**Login to Cloudflare with Wrangler CLI**

```bash
npx wrangler login
```

**Create Cloudflare Worker**

```bash
npx wrangler init supabase-at-the-edge
```

**Run wrangler development server**

```bash
npx wrangler dev
```

## Resources

- [Cloudflare Wrangler docs](https://developers.cloudflare.com/workers/wrangler/get-started/)

---

[👉 Next lesson](/02-create-a-supabase-project)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
