async function dataHandler() {
    const endpoint = "/api/dining";
    console.log(endpoint);
    const request = await fetch(endpoint);
    const dininghalls = await request.json();
    console.log(dininghalls)
}

dataHandler()

let tbody = document.getElementById("mytable");
tbody.appendChild(td);

let td = document.createElement("td");
td.innerHTML = "I'm table data bitch!";
mytable.appendChild(td);

for (let i = 0; i < dininghalls.length; i++) {}