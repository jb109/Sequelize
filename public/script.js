async function dataHandler() {
    const endpoint = "/api/dining";
    console.log(endpoint);
    const request = await fetch(endpoint);
    const dininghalls = await request.json();

    let tbody = document.getElementById("mytable");

    for (let i = 0; i < dininghalls.data.length; i++) {
        tr = document.createElement("tr");
        tr.innerHTML = "<td>" + dininghalls.data[i].hall_name + "</td><td>" + dininghalls.data[i].hall_address + "</td><td>";
        mytable.appendChild(tr);
    }

    console.log(dininghalls)
}

dataHandler()