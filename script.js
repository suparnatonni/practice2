function searchMeals() {
  const searchText = document.getElementById('search').value;
  const mealsDiv = document.getElementById('meals');
  mealsDiv.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
    .then(res => res.json())
    .then(data => {
      if (!data.meals) {
        mealsDiv.innerHTML = "<p class='text-danger'>No meals found</p>";
        return;
      }

      data.meals.forEach(meal => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ing = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ing && ing.trim()) {
            ingredients.push(`${measure} ${ing}`);
          }
        }

        const box = document.createElement('div');
        box.className = 'col-md-3 mb-4';
        box.innerHTML = `
          <div class="card h-100 shadow-sm">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <div class="details d-none text-start">
                <p><b>Category:</b> ${meal.strCategory}</p>
                <p><b>Ingredients:</b></p>
                <ul>${ingredients.map(item => `<li>${item}</li>`).join('')}</ul>
              </div>
            </div>
          </div>
        `;

        box.querySelector('img').onclick = () => {
          const details = box.querySelector('.details');
          details.classList.toggle('d-none');
        };

        mealsDiv.appendChild(box);
      });
    });
}
