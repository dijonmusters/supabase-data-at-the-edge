# Create a Supabase project

**[📹 Video](TODO! Add link to egghead lesson)**

[Supabase](https://app.supabase.com/) is a suite of open-source tools wrapping a PostgreSQL database. It provides the building blocks of an app - database hosting, auth, file storage, realtime and edge functions - so we can focus on the thing that makes our app unique.

In this video, we sign up for a free Supabase account, create a basic schema for a blog, and populate it with test data.

## Code Snippets

**Create the table**

```sql
create table if not exists articles (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  content text not null,
  is_published bool default false not null
);
```

**Insert test data**

```sql
insert into articles(title, content)
values
	('First blog', 'This is my very first blog'),
	('Second blog', 'I am really enjoying writing blogs'),
	('Third blog', 'Okay, this is getting hard to maintain');
```

## Resources

- [Create a Supabase project](https://app.supabase.com/)
- [Supabase docs](https://supabase.com/docs)

---

[👉 Next lesson](/03-query-supabase-from-cloudflare-worker)

---

Enjoying the course? Follow Jon Meyers on [Twitter](https://twitter.com/jonmeyers_io) and subscribe to the [YouTube channel](https://www.youtube.com/c/jonmeyers).
