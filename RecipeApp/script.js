const favoriteContainer = document.querySelector(".favorites")

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
    const respData = await resp.json();
    const meal = respData.meals[0];
    return meal;
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
    const mealIds = getMealsFromLS();

    const meals = [];

    for(let i=0; i < mealIds.length; i++) {
        const mealId = mealIds[i];
        let resp = await getMealById(mealId);
        addMealToFav(resp);
    }
    
};

function addMealToFav(mealData) {
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
    <div class="favorites_container">
                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
                <h6>${mealData.strMeal}</h6>
            </div>
            `;
    favoriteContainer.appendChild(favMeal);        

    
}