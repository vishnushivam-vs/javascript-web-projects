const apikey = '33f9de98fb924b089bd7e2d821cdb98b'
const blogContainer = document.getElementById("blog-container");

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apikey=${apikey}`
        const response = await fetch(apiurl);
        const data = await response.json()
        return data.articles;
    } catch (error) {
        console.error("fetching error random news", error);
        return [];
    }

};

searchBtn.addEventListener('click', async () => {
    const searchData = searchInput.value.trim();
    if (searchData !== " ") {
        try {
            const articles = await searchNewsdata(searchData);
            displayBlogs(articles);

        } catch (error) {
            console.log("Error fetching news by query")
        }
    }

})
async function searchNewsdata(query) {
    try {
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=100&apikey=${apikey}`
        const response = await fetch(apiurl);
        const data = await response.json()
        return data.articles;
    } catch (error) {
        console.error("fetching error random news", error);
        return [];
    }

}


function displayBlogs(articles) {

    blogContainer.innerHTML = "";

    articles.forEach(article => {
        const blogcart = document.createElement("div");
        blogcart.classList.add("blog-card");
        const img = document.createElement("img");
        img.classList.add("blog-image");
        img.src = article.urlToImage || "https://via.placeholder.com/300x200?text=No+Image";;
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


