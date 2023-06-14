fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(response => response.json())
  .then(data => {
    const meal = data.meals[0] // Assuming only one meal is returned

    // Accessing all properties of the meal
    const mealName = meal.strMeal
    const mealCategory = meal.strCategory
    const mealInstructions = meal.strInstructions
    const mealImage = meal.strMealThumb

    const ingredientsList = document.getElementById('ingredientsList')
    const paragraphs = mealInstructions.split('\n')
    // ... and so on

    // console.log(mealName);
    // console.log(mealCategory);
    // console.log(mealInstructions);
    // console.log(mealImage);
    // ... log or use other properties as needed

    // Uppercases meal name
    document.querySelector(".meal")
        .innerHTML = `${mealName.toUpperCase()}`

    // Displays category
    document.querySelector(".category")
        .innerHTML = `Category: ${mealCategory}`
    
    // Get the container element to hold the paragraphs
    const instructionsContainer = document.getElementById('mealInstructions')

    // Create <p> elements for each paragraph
    paragraphs.forEach(paragraph => {
      //.createElement does exactly as it says
      const pElement = document.createElement('p')
      pElement.textContent = paragraph
      instructionsContainer.appendChild(pElement)
    })
    
    // Variable used to tie the specific element ID we want to target
    const imageElement = document.getElementById('mealImage')
    // Using the variable we access the src attribute and set it to meal image
    imageElement.src = mealImage

    // Grabs inngredients in this specified meal
    const ingredients = []
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`]
      const measure = meal[`strMeasure${i}`]
      if (ingredient) {
        ingredients.push(`${measure} ${ingredient}`)
      } else {
        break
      }
    }

    // Update the HTML element with the ingredients
    ingredientsList.innerHTML = ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')
  })
  .catch(error => console.error(error))

  // Variable to tie the randomize button to
  const reloadButton = document.getElementById('reloadButton')
  
  // My solution to generate a new random recipe is by reloading the page, causing a fetch to the random meal api endpoint
  reloadButton.addEventListener('click', () => {
    location.reload()
  })
console.log(mealName)


