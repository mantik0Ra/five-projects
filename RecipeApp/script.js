async function getRandomRecipe() {
    let respone = await fetch("https://api.spoonacular.com/recipes/random?apiKey=0f6ad857558e4c888f17cd177b809d84")
    const respData = await respone.json();
    console.log(respData)
    const h3 = document.querySelector(".main__recipes_h3")
    const img = document.querySelector(".main__recipes_img")
    img.src = respData.recipes[0].image
    h3.innerHTML = respData.recipes[0].title
}

getRandomRecipe();