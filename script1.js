// Getting all required documents 

inputBox = document.querySelector("#title").value;
const addBtn = document.querySelector("#add");
const todoList = document.querySelector(".todoList");
const clearBtn = document.querySelector(".btn");

function getAndUpdate(){
    console.log("updating List....");
    inputBox = document.querySelector("#title").value;
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push(inputBox);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArraystr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArraystr);
        itemJsonArray.push(inputBox);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    update();
}

function update(){
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArraystr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArraystr);
    }
    // populate the Table

    tableBody = document.querySelector("#tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element}</td>
        <td><button type="button" class="btn btn-primary btn-sm" onclick="deleted(${index})" >Delete</button></td>
        </tr>`;
    });
    tableBody.innerHTML = str;
}
addBtn.addEventListener("click",getAndUpdate);
update(); 

// Code to Delete Our Existing TODOs

function deleted(itemIndex){
    itemJsonArraystr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArraystr);
    itemJsonArray.splice(itemIndex,1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

// Adding Enter key press effect on my Add to List Button using JS 

document.getElementById("title")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("add").click();
    }
});
