
var req = new XMLHttpRequest();
var URLhost = 'https://swapi.co/api/planets/';


function getTable(response) {
    var table = document.getElementById('table-body');
    table.innerHTML = "";
    for (let k = 0; k < response.results.length; k++) {
            var row = table.insertRow(k);
            var cell0 = row.insertCell(0);
            cell0.innerHTML = response.results[k].name;
            var cell1 = row.insertCell(1);
            cell1.innerHTML = parseInt(response.results[k].diameter).toLocaleString() + " km";
            var cell2 = row.insertCell(2);
            cell2.innerHTML = response.results[k].climate;
            var cell3 = row.insertCell(3);
            cell3.innerHTML = response.results[k].terrain;
            var cell4 = row.insertCell(4);
            if (response.results[k].surface_water === 'unknown') {
                cell4.innerHTML = response.results[k].surface_water;
            } else {
                cell4.innerHTML = response.results[k].surface_water + ' %';
            }
            var cell5 = row.insertCell(5);
            if (response.results[k].population === 'unknown') {
                cell5.innerHTML = response.results[k].population;
            } else {
                cell5.innerHTML = parseInt(response.results[k].population).toLocaleString() + ' people';
            }
            var cell6 = row.insertCell(6);
            //cell6.innerHTML = response.results[k].residents;
            var cell7 = row.insertCell(7);
    };
}

document.addEventListener('DOMContentLoaded', pageButtons);

function pageButtons() {

    var f = 1;
    req.open('GET', URLhost, true);
    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response.results);
            getTable(response);


        } else {
            console.log('Error in network request: ' + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();


    document.getElementById('next').addEventListener('click', function (event) {
        if (f < 7) {
            f++;
            var req = new XMLHttpRequest();
            var URLhost = 'https://swapi.co/api/planets/?page=' + f;
            req.open('GET', URLhost, true);
            req.addEventListener('load', function () {
                if (req.status >= 200 && req.status < 400) {
                    var response = JSON.parse(req.responseText);
                    getTable(response)

                } else {
                    console.log('Error in network request: ' + req.statusText);
                }
            });
            req.send(null);
            event.preventDefault();
        }
    });

    document.getElementById('prev').addEventListener('click', function (event) {
        if (f > 1) {
            f--;
            var req = new XMLHttpRequest();
            var URLhost = 'https://swapi.co/api/planets/?page=' + f;
            req.open('GET', URLhost, true);
            req.addEventListener('load', function () {
                if (req.status >= 200 && req.status < 400) {
                    var response = JSON.parse(req.responseText);
                    getTable(response);

                } else {
                    console.log('Error in network request: ' + req.statusText);
                }
            });
            req.send(null);
            event.preventDefault();
        }
    });
}


