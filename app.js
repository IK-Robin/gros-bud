// ****** select items **********

const form = document.querySelector(".grocery-form");
const alert = document.querySelector(".alert");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";
// ****** event listeners **********

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener('DOMContentLoaded',setupItems);

// ****** functions **********

// add item
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value  && !editFlag) {
   
   createListItem(id,value);

    // add event listeners to both buttons

    // display alert
    displayAlert("item added to the list", "success");
    
    // show container
    container.classList.add("show-container");
    // set local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag ) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");

    // edit  local storagfe
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}
// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove('show-container');
  displayAlert('remove all elements','danger');
  setBackToDefault();
  localStorage.removeItem('list');

  // clear local storage

  
}

// delete item

// edit item

// set backt to defaults
function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// delete items 
function deletItems (e) {
  const elemenTS = e.currentTarget.parentElement.parentElement;

  const id = elemenTS.dataset.id;

  list.removeChild(elemenTS);
  
  if (list.childNodes.length ==0 ){
    clearItems();
  
  }
  else if (list.children.length>0){

    displayAlert('remove element','danger');
  } else{
    
    setBackToDefault();
  }
  // remove from localStorage
  removeFromLocalstorage(id);
}
function editItems (e) {

  const elemenTS = e.currentTarget.parentElement.parentElement;
  editElement =e.currentTarget.parentElement.previousElementSibling;
  grocery.value = editElement.innerHTML;
  editFlag =true;
submitBtn.innerHTML ='Edit';
displayAlert('Edit the element','success');
  
}




// ****** local storage **********

// add to local storage
function addToLocalStorage(id, value) {
  const grocery = {id,value};
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem('list',JSON.stringify(items));
  console.log(items)
}


function removeFromLocalstorage (id){
  let items = getLocalStorage();
  items = items.filter(function (item){
    if(item.id !==id){
      return item;
    }
  });
  
  localStorage.setItem('list',JSON.stringify(items));
}
function editLocalStorage(id,value) {
  // localStorage API
  // setItem
  //getItem
  // removeItem
  // save as string
  // localStorage.setItem('orange',JSON.stringify(['robin','hood']));
  // const oranges = JSON.parse(localStorage.getItem('orange'));
  // localStorage.removeItem('orange');``
  // console.log(oranges)
}

// get local storage 

function getLocalStorage() {
  return localStorage.getItem('list')?JSON.parse(localStorage.getItem('list')):[];
  
}
// editLocalStorage(editID,);




// SETUP LOCALSTORAGE.REMOVEITEM('LIST');

// ****** setup items **********

function setupItems (){
  let items  = getLocalStorage();
  if (items.length >0){
   items.forEach(function (item){
     createListItem(item.id,item.value);
   });
  }
  container.classList.add('show-container');
}

// add another functions
function createListItem(id,value){
  const element = document.createElement("article");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  element.setAttributeNode(attr);
  element.classList.add("grocery-item");
  element.innerHTML = `<p class="title">${value}</p>
          <div class="btn-container">
            <!-- edit btn -->
            <button type="button" class="edit-btn">
              <i class="fas fa-edit"></i>
            </button>
            <!-- delete btn -->
            <button type="button" class="delete-btn">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `;
  // add event listeners to both buttons;
 
  const deletBTn = element.querySelector('.delete-btn');
  const editBtn = element.querySelector('.edit-btn');
  deletBTn.addEventListener('click',deletItems);
  editBtn.addEventListener('click',editItems);

  // append child
  list.appendChild(element);
}