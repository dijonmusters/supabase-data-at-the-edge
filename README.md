# [Supabase data at the Edge with Cloudflare Workers and KV Storage](https://egghead.io/courses/cache-supabase-data-at-the-edge-with-cloudflare-workers-and-kv-storage-883c7959?af=9qsk0a)

<a href="https://egghead.io/courses/cache-supabase-data-at-the-edge-with-cloudflare-workers-and-kv-storage-883c7959?af=9qsk0a">
  <img src="https://og-image-react-egghead.now.sh/playlists/cache-supabase-data-at-the-edge-with-cloudflare-workers-and-kv-storage-883c7959?v=20201103" alt="Cache Supabase data at the Edge with Cloudflare Workers and KV Storage" width="100%" />
</a>

> This repo accompanies this [free egghead course](https://egghead.io/courses/cache-supabase-data-at-the-edge-with-cloudflare-workers-and-kv-storage-883c7959?af=9qsk0a).

## 🔍 About

Cloudflare Workers are serverless functions that run at the Edge! 🔪 This means they are running as geographically close as possible to the users of our application. This is super performant if you can perform all of the work at the edge, but what if you need to query a database? 🤔

Databases store the most important asset of our apps - their data - so need to remain reliable and consistent. Therefore, they are usually hosted in a single origin location. Unfortunately, this means as soon as our Cloudflare Worker needs to hit the database, we lose some of the performance benefit of running at the edge - especially if the user's location is on the other side of the world to our origin database.

So how can we reduce the number of trips to the origin server? 💡

Caching! 🧠

KV Storage is a special cache available to Cloudflare Workers, that allows us to "remember" some data at the edge. It is an eventually consistent cache - meaning it propagates changes across Cloudflare's CDN network, but data might be out of sync in different regions for a short period of time.

The special thing about pairing this with Supabase is we can subscribe to changes in the database - such as `insert`, `update` or `delete` and, not just bust the KV Storage cache, but automatically refresh the data without the user at the other end of the request, waiting for fresh data from the origin server! 🎉

## 🎓 Instructor

[Jon Meyers](https://jonmeyers.io) is a Software Engineer, Educator and Hip Hop Producer from Melbourne, Australia. He's passionate about web development and enabling others to build amazing things! He is currently working as a Developer Advocate at Supabase, showing just how awesome (and not that scary 👻) databases can be!

[Jon's courses at egghead.](https://egghead.io/q/resources-by-jon-meyers)

Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to his [YouTube channel](https://www.youtube.com/c/jonmeyers).

## 🗺 Table of Contents

1. [Create a Cloudflare Worker with the Wrangler CLI](/01-create-cloudflare-worker-with-wrangler-cli)
2. [Create a Supabase project](/02-create-a-supabase-project)
3. [Query Supabase from Cloudflare Worker](/03-query-supabase-from-cloudflare-worker)
4. [Proxy Supabase requests with Cloudflare Workers and Itty Router](/04-proxy-supabase-requests-with-cloudflare-workers-and-itty-router)
5. [Bind a KV store to Cloudflare Worker](/05-bind-kv-store-to-cloudflare-worker)
6. [Read and write to KV cache from Cloudflare Worker](/06-read-and-write-to-kv-cache-from-cloudflare-worker)
7. [Cache Supabase response at the Edge with KV storage](/07-cache-supabase-response-at-the-edge-with-kv-storage)
8. [Cache-busting with KV stores and Supabase](/08-cache-busting-with-kv-stores-and-supabase)
9. [Revalidate stale data by ID](/09-revalidate-stale-data-by-id)
10. [Automatically revalidate KV Store cache on change with Database Webhooks in Supabase](/10-automatically-revalidate-kv-store-cache-on-change-with-database-webhooks-in-supabase)
11. [Use waitUntil to perform work after Cloudflare Worker returns response](/11-use-waitUntil-to-perform-work-after-cloudflare-worker-returns-response)
