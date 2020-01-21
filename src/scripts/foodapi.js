const foodListContainer = document.querySelector(".foodList");

// [x] Create a function which returns a string template. 
// The template is the HTML representation for a food item.
const foodFactory = (food) => {
    return `<article class="foodItem">
            <br> <strong>${food.name}</strong>
            <br> ${food.ethnicity}
            <br> ${food.category}
        </article>
        `
}

// [x] Create a function that inserts an HTML representation 
// of a food into the DOM
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

