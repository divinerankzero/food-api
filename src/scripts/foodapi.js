const foodListContainer = document.querySelector(".foodList");

const foodFactory = (food) => {
    return `<article class="foodItem">
            <h2>${food.name}</h2>
            <ul>
                <li> <strong>Origin:</strong> ${food.ethnicity} </li>
                <li> <strong>Category:</strong> ${food.category} </li>
                <li> <strong>Ingredients:</strong> ${food.ingredients} </li>
                <li> <strong>Countries of Origin:</strong> ${food.countries} </li>
                <li> <strong>Calories per Serving:</strong> ${food.calories} </li>
                <li> <strong>Fat per Serving:</strong> ${food.fat} </li>
                <li> <strong>Sugar per Serving:</strong> ${food.sugar} </li>
            </ul>
        </article>
        `
}

const addFoodToDom = (HTMLFood) => {
    foodListContainer.innerHTML += HTMLFood;
}

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    const ingredients = productInfo.product.ingredients_text;
                    const countries = productInfo.product.countries;
                    const calories = productInfo.product.nutriments.energy_serving;
                    const fat = productInfo.product.nutriments.fat_serving;
                    const sugar = productInfo.product.nutriments.sugars_serving;

                    if (ingredients) {
                        food.ingredients = ingredients;
                    } else {
                        food.ingredients = "no ingredients listed";
                    }

                    if (countries) {
                        food.countries = countries;
                    } else {
                        food.countries = "no countries listed";
                    }
                    
                    if (calories) {
                        food.calories = calories + " kj";
                    } else {
                        food.calories = "no calories listed";
                    }

                    if (fat) {
                        food.fat = fat + " g";
                    } else {
                        food.fat = "no fat listed";
                    }

                    if (sugar) {
                        food.sugar = sugar + " g";
                    } else {
                        food.sugar = "no sugar listed";
                    }

                    const foodAsHTML = foodFactory(food)
                    addFoodToDom(foodAsHTML)
                })
        })
    })
