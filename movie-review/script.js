let mainContainer = document.querySelector(".mainContainer");
let pageNumber = document.querySelector(".pageNumber");
let previousButton = document.querySelector(".prevButton");
let nextButton = document.querySelector(".nextButton");
let pageChangeblock = document.querySelector(".pageChange");
let serchBox = document.querySelector(".searchBox");
let serchButton = document.querySelector(".searchButton");
let languageBtn = document.querySelectorAll(".languageBtn");
let moviedtls = null;
let currentpage = 1;
let allCarts;
let selectedLang = null;
let searchMovieName = null;
// Function to fetch movie data from the API
async function getMovieData(page) {
  let url = " ";
  if (selectedLang) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=81b987fac6252bea5b00897083c09d75&with_original_language=${selectedLang}&page=${page}`;
  } else if (searchMovieName) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=81b987fac6252bea5b00897083c09d75&query=${searchMovieName}&page=${page}`;

  } else {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=81b987fac6252bea5b00897083c09d75&page=${page}`;
  }


  try {
    let movie = await fetch(url);
    let data = await movie.json();
    moviedtls = data;
    console.log("data", data);
    displayContent();
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
}
getMovieData(currentpage);

function searchMovieData() {
  serchButton.addEventListener('click', async () => {
    searchMovieName = serchBox.value.trim();
    currentpage = 1;
    getMovieData(currentpage)
  })
}
searchMovieData()

function languageMovieData(page) {

  languageBtn.forEach(button => {
    button.addEventListener('click', async (event) => {
      selectedLang = event.target.value;
      searchMovieName = null;
      serchBox.value = " ";
      currentpage = 1;
     languageBtn.forEach(btn => btn.classList.remove("active"));
     button.classList.add("active");
      getMovieData(currentpage);

    })
  })
}
languageMovieData(currentpage)
function displayContent() {
  let movieResults = moviedtls.results;
  if(!moviedtls.results || moviedtls.results.length === 0 ){
    alert("No movies available on this page. Please select a different page.");
     return;
  }
  mainContainer.innerHTML = ""; // Clear previous content
  console.log(mainContainer);

  movieResults.forEach((result) => {
    mainContainer.innerHTML += `
   
      <div class="movieDtlsCart" data-id = "${result.id}">
        <div class="imageBox">
          <img class="moviePoster" src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${result.title}">
        </div>
        <div class="movieDtlsBox1">
          <h3 class="movieTitle">${result.title}</h3>           
          <p class="rating"> ⭐${result.vote_average.toFixed(1)}</p> 
        </div>
        <div class="movieDtlsBox2">
          <p class="language">Language: ${result.original_language}</p>
          <p class="year">Release: ${result.release_date}</p>
        </div>         
      </div>
    `;
  });

  let carts = document.querySelectorAll(".movieDtlsCart");
  allCarts = carts;

  movieDetails()
  pageNumber.value = currentpage;
  console.log("Current Page:", moviedtls.page);

}


function movieDetails() {

  allCarts.forEach((cart) => {
    cart.addEventListener("click", () => {
      let cartId = Number(cart.getAttribute("data-id"));
      let movieObject = moviedtls.results.find(movie => movie.id === cartId);
      localStorage.setItem("selectedMovie", JSON.stringify(movieObject));
      window.location.href = "movieDtls.html";

    })
  })

}


// Function to handle page navigation
function pageChange() {
  nextButton.addEventListener("click", () => {
    currentpage++;
    pageNumber.value = currentpage;
    getMovieData(currentpage);
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  })

  previousButton.addEventListener("click", () => {
    if (currentpage > 1) {
      currentpage--;
      pageNumber.value = currentpage;
      getMovieData(currentpage);
    }
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  });
  pageNumber.addEventListener("click", () => {
    let existingButton = document.querySelector(".goPageButton");
    if (existingButton) return;

    let goPage = document.createElement("button");
    goPage.textContent = "Go to Page";
    goPage.className = "goPageButton";
    pageChangeblock.appendChild(goPage);

    goPage.addEventListener("click", () => {
      currentpage = pageNumber.value;
      console.log(currentpage);
      getMovieData(currentpage)
      if (currentpage > 500) {
        alert("Maximum allowed page is 500");
        currentpage = 1;
        getMovieData(currentpage)
      }
      goPage.remove();
      goPage = null;
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    });

  });
}

getMovieData(currentpage);
pageChange();
