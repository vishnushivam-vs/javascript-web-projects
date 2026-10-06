const searchInput = document.querySelector(".searchBar");
const searchBtn = document.querySelector(".searchBtn");
const mesage = document.querySelector(".resultMsg");
const mainContainer = document.querySelector(".recipe-container");
const recipeCard = document.querySelectorAll(".recipe-card");


let searchTerm = "";
let recipeDtls = "";

async function fetchData() {
  const api = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${searchTerm}`;
  const response = await fetch(api)
  let data = await response.json();
  recipeDtls = data;
  if (recipeDtls.meals === null) {
    mesage.innerHTML = "Sorry, we couldn't find any recipes matching your search";
    console.log("null");

  } else if (searchTerm !== "") {
    mesage.innerHTML = "search results for " + searchTerm;
  } else {
    mesage.innerHTML = "";
  }
  console.log(data);
  displayMeals();
}
fetchData();

searchBtn.addEventListener("click", () => {
  let text = searchInput.value.trim();
  searchTerm = text;

  fetchData()
})

function displayMeals() {
  let meals = recipeDtls.meals;
  mainContainer.innerHTML = "";
  meals.forEach(meal => {
    mainContainer.innerHTML += `
        <div class="recipe-card" data-id="${meal.idMeal}">
            <div class="imgBlock">
                <img class="recipeimg" src="${meal.
        strMealThumb
      }">
            </div>
            <p class="recipeName"> ${meal.strMeal}</p>
             <div class="cart-dwnsection">
                <p class="category">Category: ${meal.strCategory}</p>
                <p class="countryName">country: ${meal.strArea}</p>
            </div>
            

        </div>
        `
  });

  recipeDetails();
}
function recipeDetails() {
  const recipeCard = document.querySelectorAll(".recipe-card");

  recipeCard.forEach(recipe => {
    recipe.addEventListener("click", () => {

      const ingredientHead = document.querySelector(".ingredient");
      const instructions = document.querySelector(".instructions");
      const recipeName = document.querySelector(".recipe-Name");
      const recipeimg = document.querySelector(".recipeDtlsImg");
      const detailsSection = document.querySelector(".reciprdtls-container");
      const mealInstructions = document.querySelector(".mealInstructions");
      const ingredientsBox = document.querySelector(".ingredientsBox");
      const ytubeLink = document.querySelector(".ytubeLink");
      const ytubeBox = document.querySelector(".ytubeBox");
      const selectedId = recipe.getAttribute("data-id");

      const selectedRecipe = recipeDtls.meals.find(meal => meal.idMeal === selectedId);
      recipeName.innerHTML = selectedRecipe.strMeal;
      recipeimg.src = selectedRecipe.strMealThumb;
      mealInstructions.innerHTML = selectedRecipe.strInstructions;
      ytubeBox.textContent = "➡️ Watch on YouTube";
      ytubeLink.href = selectedRecipe.strYoutube;
      ytubeLink.style.display = "block";
      ingredientHead.innerText = "Ingredients";
      instructions.innerText = "instructions";
      ingredientsBox.innerHTML = "";

      for (let i = 1; i <= 20; i++) {
        const ingredient = selectedRecipe[`strIngredient${i}`];
        const measure = selectedRecipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
          const combained = `${measure ? measure : ""} ${ingredient}`.trim();
          ingredientsBox.innerHTML += `<p class="ingredients">${combained}</p>`;


        }
      }
      detailsSection.scrollIntoView({ behavior: "auto" })

    })
  })
}

//recipeDetails();