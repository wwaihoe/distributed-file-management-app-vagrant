const applogic_url = "http://10.0.2.15:3000"

window.onload = async function() {
    try {
        const response = await fetch(applogic_url);
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

function loadObject(obj) {
    var table = document.getElementById("objectTable");
    var row = table.insertRow(0);
    var fileName = row.insertCell(0);
    var type = row.insertCell(1);
    var lastModified = row.insertCell(2);
    cell1.innerHTML = obj.name;
    cell2.innerHTML = obj.type;
    cell3.innerHTML = obj.lastModified;
}

async function uploadFile() {
    var fileInput = document.getElementById("inputGroupFile");
    if (fileInput.length === 0) {
        alert("No files selected for upload!");
    } else {
        var file = fileInput.files[0];
        const formData = new FormData();
        formData.append( "data", file);
        try {
            const respone = await fetch(applogic_url, {
                method: "POST",
                body: formData
            })
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
        }

    }
}

async function removeFile(fileName) {
    try {
        const respone = await fetch(`${applogic_url}/remove`, {
            method: "POST",
            body: fileName
        })
        if (response.status === 200) {
            var table = document.getElementById("objectTable");
            for (var i = 0; i < table.length; i++) {
                if (table.rows[i].cells[0].innerHTML === fileName) {
                    table.deleteRow(i);
                } 
            }
        }
    } catch(err) {
        console.log(err);
    }
}