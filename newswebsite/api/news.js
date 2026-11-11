
export default async function handler(req, res) {
    try {
        const { q } = req.query;

        const endpoint = q
            ? "https://gnews.io/api/v4/search"
            : "https://gnews.io/api/v4/top-headlines";

        const url = new URL(endpoint);

        url.searchParams.set("lang", "en");
        url.searchParams.set("max", "10");
        url.searchParams.set("token", process.env.GNEWS_API_KEY);

        if (q) {
            url.searchParams.set("q", q);
        } else {
            url.searchParams.set("country", "in");
        }

        const response = await fetch(url);

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error("News API error:", error);

        return res.status(500).json({
            message: "Failed to fetch news"
        });
    }
}
