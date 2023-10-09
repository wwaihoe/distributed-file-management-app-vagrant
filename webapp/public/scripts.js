const applogic_add = "http://10.0.2.20";
const applogic_port = "8000";

/*
window.onload = async function() {
    try {
        const response = await fetch(`${applogic_add}:${applogic_port}`);
        if (respone.status === 200) {
            const objects = await response.json();
            for (var i = 0; i < objects.length; i++) {
                loadObject(JSON.parse(objects[i]));
            }
        }
    } catch (err) {
        console.error(err);
    }
};
*/

function loadObject(obj) {
    var table = document.getElementById("objectTable").getElementsByTagName("tbody")[0];
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = obj.name;
    cell1.setAttribute("class", "fileName");
    cell2.innerHTML = obj.type; 
    cell2.setAttribute("class", "fileType");
    var date = new Date(obj.lastModified);
    cell3.innerHTML = date.toLocaleString();
    cell3.setAttribute("class", "lastModified");
    var downloadButton = 
    `<button class="fileDownloadInput btn btn-outline-success" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>
    </button>`;
    var removeButton = 
    `<button class="fileRemoveInput btn btn-outline-danger" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
        </svg>
     </button>`;
    cell4.innerHTML = downloadButton;
    cell5.innerHTML = removeButton;
}

var fileInput = document.getElementById("inputGroupFileAddon");
fileInput.addEventListener("click", test);

async function test() {
    const respone = await fetch(`${applogic_add}:${applogic_port}`);
    console.log(response.text());
}

async function uploadFile() {
    var fileInput = document.getElementById("inputGroupFile");
    var fileList = fileInput.files;
    if (fileList.length === 0) {
        alert("No files selected for upload!");
    } else {
        var file = fileList[0];
        const formData = new FormData();
        formData.append( "data", file);
        try {
            const respone = await fetch(`${applogic_add}:${applogic_port}/upload`, {
                method: "POST",
                body: formData
            });
            console.log(response.text());
            if (respone.status === 200) {
                var object  = {
                    'lastModified'     : file.lastModified,
                    'name'             : file.name,
                    'type'             : file.type
                };  
                loadObject(object);
            }
        } catch(err) {
            console.log(err);
            alert("Failed to upload file!");
        }
        fileInput.value = "";
    }
}

var objectTable = document.getElementById("objectTable");
objectTable.addEventListener("click", function(e) {
    if (e.target.classList.contains("fileRemoveInput")) {
        var fileName = e.target.parentNode.parentNode.getElementsByClassName("fileName")[0].innerHTML;
        removeFile(fileName);
    }
    else if (e.target.classList.contains("fileDownloadInput")) {
        var fileName = e.target.parentNode.parentNode.getElementsByClassName("fileName")[0].innerHTML;
        downloadFile(fileName);
    }
});

async function removeFile(fileName) {
    var table = document.getElementById("objectTable");
    try {
        const response = await fetch(`${applogic_add}:${applogic_port}/remove`, {
            method: "POST",
            body: fileName
        })
        if (response.status === 200) {
            for (var i = 0; i < table.tBodies[0].rows.length; i++) {
                if (table.tBodies[0].rows[i].getElementsByClassName("fileName")[0].innerHTML === fileName) {
                    table.tBodies[0].deleteRow(i);
                } 
            }
        } 
    } catch(err) {
        console.log(err);
    }
}

async function downloadFile(fileName) {
    try {
        const response = await fetch(`${applogic_add}:${applogic_port}/download`, {
            method: "POST",
            body: fileName
        });
        if (response.status === 200) {
            var link = document.createElement("a");
            var data = await response.json;
            window.location.assign(data.url);
        }
    } catch(err) {
        console.log(err);
    }
}