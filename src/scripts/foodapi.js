const foodListContainer = document.querySelector(".foodList");

const foodFactory = (food) => {
    return `<article class="foodItem">
            <br> <strong>${food.name}</strong>
            <br> ${food.ethnicity}
            <br> ${food.category}
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
            const foodAsHTML = foodFactory(food)
            addFoodToDom(foodAsHTML)
        })
    })


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

