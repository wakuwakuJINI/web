// 레시피 세부 정보를 현재 페이지에 표시
function displayRecipePage(meal) {
  // 특정 레시피의 세부 정보를 가져오는 함수
  // lookup.php 엔드포인트를 사용하여 음식의 고유 idMeal을 기반으로 상세 정보를 가져옴.
  // (특정 나라, 재료를 클릭해서 나온 결과 클릭시, 세부내용이 반영되지 않아서 다시 찾아봄.)
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
  .then(response => response.json())
  .then(data => {
    const detailedMeal = data.meals[0]; // 상세 정보 가져오기
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `
          <div class="recipe-container">
                    <div class="left-container">
                        <h1>${detailedMeal.strMeal}</h1>
                        <img src="${detailedMeal.strMealThumb}" alt="${detailedMeal.strMeal}">
                    </div>
                    <div class="right-container">
                        <h3>Ingredients</h3>
                        <ul class="ingredients-list">
                            ${getIngredientsWithMeasures(detailedMeal).map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="instruction-container">
                        <h3>Instructions</h3>
                        <p>${detailedMeal.strInstructions}</p>
                    </div>
                    </div>
            `;
    }
)}

// 재료와 과정, 가져오기
function getIngredientsWithMeasures(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(`${ingredient} - ${measure}`);
        }
    }
    return ingredients;
}
