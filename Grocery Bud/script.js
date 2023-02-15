const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const groceryContainer = document.querySelector('.grocery-container');
const groceryList = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option 

let editElement;
let editflag = false;
let editID = "";
//submit btn
form.addEventListener('submit', addItem);
// clear btn
clearBtn.addEventListener('click', clearItems);

//loaditems

window.addEventListener("DOMContentLoaded",setupItems);

function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();


    if (value && !editflag) {
        const element = document.createElement('article');

        // add a class 
        element.classList.add('grocery-item');

        // add id 
        const attr = document.createAttribute('data-id');
        attr.value = id;

        element.setAttributeNode(attr);
        element.innerHTML = `<div class="title">${value}</div>
        <div class="btn-container">
            <button type="button" class="edit-btn" id='edit'><i class="fas fa-edit"></i></button>
            <button type="button" class="delete-btn" id='delete'><i class="fas fas fa-trash"></i></button>
        </div>`;

        // add event listeners to both buttons;
        // should slect a the element insted of document
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItems);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItems);

        //appendChild 
        groceryList.appendChild(element);

        // display alert 
        displayAlert('Item added to the list', "success");

        // show container 
        groceryContainer.classList.add('show-container');

        //Add to local storage
        addToLocalStorage(id, value);

        // set back to default 

        setBackToDefault();

    }

    else if (value && editflag) {
        editElement.innerHTML = value;
        displayAlert('Value changed ', 'success');
        editLocalStorage(editID,value);
        setBackToDefault();


    }

    else {
        displayAlert('Please enter a value', "danger");
    }
}

//display alert 

function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert after 1.5 sec 
    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);

    }, 1500);

}
// delete function 

function deleteItems(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;

    groceryList.removeChild(element);

    if (groceryList.children.length === 0) {
        groceryContainer.classList.remove("show-container");
    }
    displayAlert('item removed ', 'danger');
    setBackToDefault();

    // remove from local storage 
    // removeFromLocalStorage(id);

}

// edit function 

function editItems(e) {

    const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  grocery.value = editElement.innerHTML;
  editflag = true;
  editID = element.dataset.id;
  //
  submitBtn.textContent = "edit";

}


// clear items function 

function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(function (item) {
            groceryList.removeChild(item);
        });
    }

    groceryContainer.classList.remove('show-container');
    displayAlert('Grocery items cleared', 'danger');
    setBackToDefault();
    localStorage.removeItem('list');

}
//set back to local storage 

function setBackToDefault() {
    grocery.value = '';
    editflag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}
// add to local storage 

function addToLocalStorage(id, value) {
    const grocery = { id, value };
    console.log(grocery);

    let items = getLocalStorage();

    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {

    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];

}

function removeFromLocalStorage(id) { 
    let items = getLocalStorage();

    items = items.filter(function(item){
        if(item.id!==id){
            return item;
        }
    });
    localStorage.setItem("list",JSON.stringify(items));
}

function editLocalStorage(id,value) {
    let items = getLocalStorage();

  items = items.map(function (item) {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
 }

// setup items

function setupItems() {
    let items = getLocalStorage();
  
    if (items.length > 0) {
      items.forEach(function (item) {
        createListItem(item.id, item.value);
      });
      groceryContainer.classList.add("show-container");
    }
  }

  function createListItem(id,value){
    const element = document.createElement('article');

        // add a class 
        element.classList.add('grocery-item');

        // add id 
        const attr = document.createAttribute('data-id');
        attr.value = id;

        element.setAttributeNode(attr);
        element.innerHTML = `<div class="title">${value}</div>
        <div class="btn-container">
            <button type="button" class="edit-btn" id='edit'><i class="fas fa-edit"></i></button>
            <button type="button" class="delete-btn" id='delete'><i class="fas fas fa-trash"></i></button>
        </div>`;

        // add event listeners to both buttons;
        // should slect a the element insted of document
        const deleteBtn = element.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", deleteItems);
        const editBtn = element.querySelector(".edit-btn");
        editBtn.addEventListener("click", editItems);

        //appendChild 
        groceryList.appendChild(element);

  }