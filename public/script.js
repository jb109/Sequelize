function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

async function getMeals() {
  console.log('data request');
  const diningRequest = await fetch('/api/wholeMeal');
  const diningData = await diningRequest.json();
  return diningData;
}

async function windowActions() {
  console.log('loaded window');
  const results = await getMeals();
  const meals = results.data;

  // This function extracts the datapoints we need from the data collected above
  function getData(mealName, macro) {
    const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const selectedMeals = mealArray.map((element) => {
      const random = getRandomIntInclusive(0, meals.length - 1);
      return ({ label: mealName[random].meal_name, y: eval(`mealName[random].${macro}`)});
    });
    return selectedMeals;
  }

  // Create chart variable
  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: 'Meal Macros'
    },
    axisX: {
      labelFontSize: 25,
      interval: 1
    },
    axisY: {
      labelFontSize: 25
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer',
      itemclick: toggleDataSeries
    },

    dataPointWidth: 30,

    data: [{
      type: 'stackedBar',
      name: 'Calories',
      showInLegend: 'true',
      dataPoints: getData(meals, 'calories')
    },
    {
      type: 'stackedBar',
      name: 'Carbs',
      showInLegend: 'true',
      dataPoints: getData(meals, 'carbs')
    },
    {
      type: 'stackedBar',
      name: 'Cholesterol',
      showInLegend: 'true',
      dataPoints: getData(meals, 'cholesterol')
    },
    {
      type: 'stackedBar',
      name: 'Fat',
      showInLegend: 'true',
      dataPoints: getData(meals, 'fat')
    },
    {
      type: 'stackedBar',
      name: 'Protein',
      showInLegend: 'true',
      dataPoints: getData(meals, 'protein')
    },
    {
      type: 'stackedBar',
      name: 'Sodium',
      showInLegend: 'true',
      dataPoints: getData(meals, 'sodium')
    }
    ]

  });
  chart.render();

  // Render chart
  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }
}

async function dataHandler() {
  const endpoint = '/api/dining';
  console.log(endpoint);
  const request = await fetch(endpoint);
  const dininghalls = await request.json();

  const tbody = document.getElementById('mytable');

  for (let i = 0; i < dininghalls.data.length; i++) {
    tr = document.createElement('tr');
    tr.innerHTML = `<td>${dininghalls.data[i].hall_name}</td><td>${dininghalls.data[i].hall_address}</td><td>`;
    tbody.appendChild(tr);
  }

  console.log(dininghalls);
}

window.onload = windowActions;

dataHandler();
