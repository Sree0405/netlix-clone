import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const slug = req.query.slug as string[];

    if (!slug || !slug.length) {
      return res.status(400).json({ error: "Invalid TMDB path" });
    }

    // IMPORTANT: Use server env (not VITE_)
    const apiKey = process.env.TMDB_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "TMDB API key missing" });
    }

    const baseUrl = "https://api.themoviedb.org/3";

    // movie/popular → movie/popular
    const tmdbPath = slug.join("/");

    const targetUrl = new URL(`${baseUrl}/${tmdbPath}`);

    // Forward query params
    Object.entries(req.query).forEach(([key, value]) => {
      if (key !== "slug") {
        targetUrl.searchParams.set(key, String(value));
      }
    });

    // Add API key
    targetUrl.searchParams.set("api_key", apiKey);

    const response = await fetch(targetUrl.toString());
    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error: any) {
    console.error("TMDB Proxy Error:", error);

    return res.status(500).json({
      error: "Proxy failed",
      message: error.message,
    });
  }
}
