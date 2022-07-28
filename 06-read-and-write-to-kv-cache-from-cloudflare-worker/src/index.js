import { createClient } from "@supabase/supabase-js";
import { Router } from "itty-router";
import { json, status } from "itty-router-extras";
import { readFrom, writeTo } from "./utils/cache";

const router = new Router();

router.get("/read-kv", async (request, { ARTICLES }) => {
  const articles = await readFrom(ARTICLES, "/articles");
  return json(articles);
});

router.get("/write-kv", async (request, { ARTICLES }) => {
  const articles = [{ title: "test3" }, { title: "test4" }];
  await writeTo(ARTICLES, "/articles", articles);

  return json(articles);
});

router.get(
  "/articles",
  async (request, { SUPABASE_URL, SUPABASE_ANON_KEY }) => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const { data } = await supabase.from("articles").select("*");
    return json(data);
  }
);

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

router.all("*", () => status(404, "Not found"));

export default {
  fetch: router.handle,
};
