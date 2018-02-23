window.$ = jQuery;


function getModalTable(residentsData) {
    var table = document.getElementById('table-modal');
    table.innerHTML = "";
    for (let k = 0; k < residentsData.length; k++) {
            var row = table.insertRow(k);
            var cell0 = row.insertCell(0);
            cell0.innerHTML = residentsData[k].name;
            var cell1 = row.insertCell(1);
            cell1.innerHTML = residentsData[k].height;
            var cell2 = row.insertCell(2);
            cell2.innerHTML = residentsData[k].mass;
            var cell3 = row.insertCell(3);
            cell3.innerHTML = residentsData[k].hair_color;
            var cell4 = row.insertCell(4);
            cell4.innerHTML = residentsData[k].skin_color;
            var cell5 = row.insertCell(5);
            cell5.innerHTML = residentsData[k].eye_color;
            var cell6 = row.insertCell(6);
            cell6.innerHTML = residentsData[k].birth_year;
            var cell7 = row.insertCell(7);
            cell7.innerHTML = residentsData[k].gender;
    };
}


function getTable(response) {
    var table = document.getElementById('table-body');
    table.innerHTML = "";
    var paged = 10;
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
            if (response.results[k].residents.length === 0) {
                cell6.innerHTML = "No known residents";
            } else {
                var button = "<button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModal\" data-whatever=\"" + response.results[k].name + "\" data-residents=\"" + response.results[k].residents + "\">"+ response.results[k].residents.length +" resident(s) </button>"
                cell6.innerHTML = button;
            }
            var cell7 = row.insertCell(7);
    };
}


document.addEventListener('DOMContentLoaded', pageButtons);
function pageButtons() {
    var req = new XMLHttpRequest();
    var URLhost = 'https://swapi.co/api/planets/';
    var f = 1;
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

$('#exampleModal').on('show.bs.modal', function (event) {
    var residentsData = [];
    getModalTable(residentsData);
    var button = $(event.relatedTarget);
    var planet = button.data('whatever');
    var residents = button.data('residents').split(',');
    residents.forEach(function (element) {
        var newURLhost = element;
        var newReq = new XMLHttpRequest();
        newReq.open('GET', newURLhost, true);
        newReq.addEventListener('load', function(){
            if(newReq.status >= 200 && newReq.status < 400){
                var newResponse = JSON.parse(newReq.responseText);
                residentsData.push(newResponse);
                getModalTable(residentsData);
            } else {
                console.log("Error in network request: " + newReq.statusText);
            }
        });
                newReq.send(null);
    });
    var modal = $(this);
    modal.find('.modal-title').text('Residents of  ' + planet);
});

