const foodListContainer = document.querySelector(".foodList");

const foodFactory = (food) => {
    return `<article class="foodItem">
            <br> <strong>${food.name}</strong>
            <br> ${food.ethnicity}
            <br> ${food.category}
            <br> ${food.ingredients}
            <br> ${food.countries}
            <br> ${food.calories}
            <br> ${food.fat}
            <br> ${food.sugar}
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
                        food.calories = calories;
                    } else {
                        food.calories = "no calories listed";
                    }

                    if (fat) {
                        food.fat = fat;
                    } else {
                        food.fat = "no fat listed";
                    }

                    if (sugar) {
                        food.sugar = fat;
                    } else {
                        food.sugar = "no sugar listed";
                    }

                    const foodAsHTML = foodFactory(food)
                    addFoodToDom(foodAsHTML)
                })
        })
    })

    // Ingredients
    // this.product.ingredients_text_en
    
    // Country of origin
    // this.product.countries

    // Calories per serving
    // this.product.nutriments.energy-kcal_serving

    // Fat per serving
    // this.product.nutriments.fat_serving

    // Sugar per serving
    // this.product.nutriments.sugars_serving

// FRAGMENT METHOD: CAN'T GET TO WORK
// const fragment = document.createDocumentFragment();

// const foodFactory = (foodObject) => {
//     const foodElement = document.createElement('section');
//     foodElement.innerHTML = `
//     <section>
//         <br> ${foodObject.name}
//         <br> ${foodObject.ethnicity}
//         <br> ${foodObject.category}
//     </section>
//     `
//     fragment.appendChild(foodElement);
// }

// const addFragmentToDom = () => {
//     foodListContainer.appendChild(fragment);
// }

// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         parsedFoods.forEach(food => {
//             foodFactory(food);
//         })
//     })
//     .then(addFragmentToDom());
