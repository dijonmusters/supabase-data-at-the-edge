import { createClient } from "@supabase/supabase-js";
import { Router } from "itty-router";
import { json, status } from "itty-router-extras";

const router = new Router();

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
