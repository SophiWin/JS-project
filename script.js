let input = document.querySelector("#input");
let addBtn = document.querySelector("#addBtn");
let tasks = document.querySelector(".tasks");
let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

addBtn.addEventListener("click", () => {
  createInput(input);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
});

function displayInputs() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    items += `<div class="item">
      <div class="inputContainer">
      <span >
    <i class="fa-regular fa-circle" onclick="changeIcon()"></i>
      </span>
        <textarea id="text" disabled ">${itemsArray[i]}</textarea>
        <div class="actions">
          <i class="fa-solid fa-pen-to-square editBtn"></i>
          <i class="fa-solid fa-trash deleteBtn"></i>
        </div>
      </div>
      <div class="updateContainer">
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
      </div>
    </div>`;
  }
  tasks.innerHTML = items;
  deleteListener();
  editListener();
  saveListener();
  cancelListener();
}
function changeIcon() {
  let circle = document.querySelectorAll(".fa-circle");
  let inputs = document.querySelectorAll(".inputContainer textarea");
  circle.forEach((c, i) => {
    c.addEventListener("click", () => {
      inputs[i].style.color = "gray";
      inputs[i].style.backgroundColor = "lightgreen";
    });
  });
}
function deleteListener() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((deb, i) => {
    deb.addEventListener("click", () => deleteTask(i));
  });
}
function deleteTask(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function editListener() {
  let editBtn = document.querySelectorAll(".editBtn");
  let actions = document.querySelectorAll(".updateContainer");
  let inputs = document.querySelectorAll(".inputContainer textarea");
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      actions[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

function saveListener() {
  let saveBtn = document.querySelectorAll(".saveBtn");
  let inputs = document.querySelectorAll(".inputContainer textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateTask(inputs[i].value, i);
    });
  });
}

function updateTask(task, i) {
  itemsArray[i] = task;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function cancelListener() {
  let cancelBtn = document.querySelectorAll(".cancelBtn");
  let actions = document.querySelectorAll(".updateContainer");
  let inputs = document.querySelectorAll(".inputContainer textarea");
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      actions[i].style.display = "none";
      inputs[i].disabled = true;
    });
  });
}
function createInput(input) {
  itemsArray.push(input.value);
}
function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML =
    date[1] + " " + date[2] + " " + date[3];
}
window.onload = function () {
  displayDate();
  displayInputs();
};
