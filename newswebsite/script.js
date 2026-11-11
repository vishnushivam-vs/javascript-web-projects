

const blogContainer = document.getElementById("blog-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const apiKey = "pub_9c8ee9b900fc40cd87cd0118b6dd928f"


async function fetchRandomNews() {

    try {
        const apiurl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=in&language=en`;
        const response = await fetch(apiurl);
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const data = await response.json();
        return data.results || [];

        return data.articles;
    } catch (error) {
        console.error("fetching error random news", error);
        return [];
    }

}


async function searchNewsdata(query) {
    try {
        const url = new URL("https://newsdata.io/api/1/latest");

        url.searchParams.set("apikey", apiKey);
        url.searchParams.set("q", query);
        url.searchParams.set("country", "in");
        url.searchParams.set("language", "en");

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        return data.results || []

    } catch (error) {
        console.log("Search error:", error);
        return [];
    }

}


searchBtn.addEventListener('click', async () => {
    const searchData = searchInput.value.trim();
    if (searchData !== "") {
        try {
            const articles = await searchNewsdata(searchData);
            displayBlogs(articles);

        } catch (error) {
            console.log("Error fetching news by query")
        }
    }

})

function displayBlogs(articles) {

    blogContainer.innerHTML = "";

    articles.forEach(article => {
        const blogcart = document.createElement("div");
        blogcart.classList.add("blog-card");
        const img = document.createElement("img");
        img.classList.add("blog-image");
        img.src = article.image_url || "https://via.placeholder.com/300x200?text=No+Image";
        img.alt = article.title || "News image";
        const title = document.createElement("h2");
        const articleTitle = article.title || "No title available";
        const trumcatedTitle =
            articleTitle.length > 30
                ? articleTitle.slice(0, 30) + "....."
                : articleTitle

        title.textContent = trumcatedTitle;
        const description = document.createElement("p")
        const articleDescription = article.description || "No description available";

        description.textContent =
            articleDescription.length > 100
                ? articleDescription.slice(0, 100) + "....."
                : articleDescription;

        blogcart.appendChild(img);
        blogcart.appendChild(title);
        blogcart.appendChild(description);

        blogcart.addEventListener("click", () => {
            window.open(article.url, "_blank");
        })

        blogContainer.appendChild(blogcart)

    });

}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("error fetching random news", error)
    }
})();

