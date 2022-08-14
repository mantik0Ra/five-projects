const mainContainer = document.querySelector(".main__recipes")
const favoriteContainer = document.querySelector(".favorites");
const searchBtn = document.querySelector(".search");
const searchTerm = document.querySelector(".search-term");

async function getRandomRecipe() {
    let respone = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const respData = await respone.json();
    const h3 = document.querySelector(".main__recipes_h3");
    const img = document.querySelector(".main__recipes_img");
    img.src = respData.meals[0].strMealThumb;
    h3.innerHTML = respData.meals[0].strMeal;
    buttonLike(respData.meals[0].idMeal);
};

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+id);
    const respData = resp.json();
    const meal = respData.meals[0];
    
    return meal;
}

async function getMealsBySearch(term) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);

    const respData = await resp.json();
    const meals = respData.meals;

    return meals;

}

function addMeal(meal) {
    const container = document.createElement("div");
    container.classList.add("meal")
    container.innerHTML = `
    
                <div class="recipe_container">
                    <h3 class="main__recipes_h3">${meal.strMeal}</h3>
                    <img class="main__recipes_img" src="${meal.strMealThumb}" alt="">
                    <button class="main__recipes_btn"><i class="fa-solid fa-heart"></i></button>
                    <h6 class="random_recipe">Random Recipe</h6>
                </div>

            `

    mainContainer.appendChild(container);        
}

getRandomRecipe();
fetchFavMeals();

function buttonLike(respData) {
    let button = document.querySelector(".main__recipes_btn");
    let data = respData;
    button.addEventListener("click", (e) => {
        if(e.target.classList.contains("active")) {
            e.target.classList.remove("active")
            removeMealFromLS(data);
        } else {
            e.target.classList.add("active")
            addMealToLS(data)
        }
        favoriteContainer.innerHTML = ""
        fetchFavMeals();
    });
};

function addMealToLS(mealId) {
    const mealIds = getMealsFromLS();

    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}
function removeMealFromLS(mealId) {
    const mealIds = getMealsFromLS();

    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter(id => id !== mealId)));
}

function getMealsFromLS() {
    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds === null ? [] : mealIds;
}

async function fetchFavMeals() {

    favoriteContainer.innerHTML = ""
    const mealIds = getMealsFromLS();
    

    const meals = [];

    for(let i=0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        console.log(mealId)
        let resp = await getMealById(mealId);
        console.log(resp)
        addMealToFav(resp);
    }
    
};

function addMealToFav(mealData) {
    const favMeal = document.createElement("li");
    

    favMeal.innerHTML = `
    <div class="favorites_container">
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                <h6>${mealData.strMeal}</h6>
                <button class="favorites_container_button clear"><i class="fa-solid fa-rectangle-xmark"></i></button>
            </div>
            
            `;

    const btn = favMeal.querySelector(".clear")
    btn.addEventListener("click", (e) => {
        removeMealFromLS(mealData.idMeal);
        favoriteContainer.innerHTML = ""
        fetchFavMeals();
    });
            

    favoriteContainer.appendChild(favMeal);        

}

searchBtn.addEventListener("click", async () => {
    const search = searchTerm.value;

    const meals = await getMealsBySearch(search);

    meals.forEach((meal) => {
        addMeal(meal);
    })
});