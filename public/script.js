function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }



  

async function getMeals() {
    console.log('data request');
    const diningRequest = await fetch('/api/wholeMeal')
    const diningData = await diningRequest.json();
    return diningData;
}




async function windowActions() {
    console.log('loaded window');
    const results = await getMeals();
    const meals = results.data;
    
    const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const selectedMeals = mealArray.map((element) => {
        const random = getRandomIntInclusive(0, meals.length - 1);
        return meals[random];
    });

    let tbody = document.getElementById('selectedMeals');

    for (let i = 0; i < selectedMeals.length; i++) {
        tr = document.createElement('tr');
        let meal = selectedMeals[i];
        allColumns = ['meal_id', 'meal_name', 'meal_category', 'macro_id', 'calories', 'serving_size', 'cholesterol', 'sodium', 'carbs', 'protein', 'fat'];
        let trInnerHTML = ""
        for (let j = 0; j<allColumns.length; j++) {
            let columnName = allColumns[j]
            let value = meal[columnName]
      trInnerHTML = trInnerHTML + "<td>" + value + "</td>"
    }
    tr.innerHTML = trInnerHTML;
    tbody.appendChild(tr);
  }


    console.log(selectedMeals);
}







async function dataHandler() {
    const endpoint = "/api/dining";
    console.log(endpoint);
    const request = await fetch(endpoint);
    const dininghalls = await request.json();

    let tbody = document.getElementById("mytable");

  for (let i = 0; i < dininghalls.data.length; i++) {
    tr = document.createElement('tr');
    tr.innerHTML = '<td>' + dininghalls.data[i].hall_name + "</td><td>" + dininghalls.data[i].hall_address + "</td><td>";
    mytable.appendChild(tr);
  }

    console.log(dininghalls)
}

window.onload = windowActions;

dataHandler()