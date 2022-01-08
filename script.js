function selectionSort(unsortAry, sortAry = []) {
  if (unsortAry.length < 2) {
    return sortAry;
  }
  let index = 0;
  for (let i = 1; i < unsortAry.length; i++) {
    if (unsortAry[index] <= unsortAry[i]) {
      continue;
    }
    index = i;
  }
  unsortAry[index] = unsortAry[0];
  sortAry.push([sortAry.length, index + sortAry.length]);
  return selectionSort(unsortAry.slice(1), [...sortAry]);
}

console.log(selectionSort([5, 4, 3, 2, 1]));

// --------------------- DOM manipulation ---------------------

const selectSorts = [...document.querySelectorAll(".selectSort li")];
const addBtn = document.querySelector(".addBtn");
const inputField = document.querySelector(".inputField");
const calcBtn = document.querySelector(".calcBtn");

let sortId = "";

selectSorts.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectSorts.forEach((el) => el.classList.remove("clicked"));
    btn.classList.add("clicked");
    sortId = btn.id;
  });
});

addBtn.addEventListener("click", () => {
  if (inputField.childElementCount < 10) {
    let input = document.createElement("input");
    input.type = "text";
    let li = document.createElement("li");
    li.appendChild(input);
    inputField.appendChild(li);
  }
});

calcBtn.addEventListener("click", () => {
  let data = [];
  if (inputField.childElementCount < 2) {
    return alert("Enter two or more numbers for sorting.");
  }
  for (let elm of inputField.children) {
    if (!elm.firstChild.value || isNaN(+elm.firstChild.value)) {
      return alert("Please input every field with numbers.");
    }
    data.push(+elm.firstChild.value);
  }
  if (!sortId) {
    return alert("Select any sorting algorithm");
  }
});

function whichSort(ary) {
  switch (sortId) {
    case "Selection":

    case "Merge":

    case "Quick":

    default:
      return;
  }
  const data = ary;
  return data;
}

// Functions for animation ------------------------

async function moveUpRight(elm, delX, delY, delay) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  elm.style.top = `-${Math.abs(delY)}px`;
  await new Promise((resolve) => setTimeout(resolve, delay));
  elm.style.left = `${Math.abs(delX)}px`;
  await new Promise((resolve) => setTimeout(resolve, delay));
  elm.style.top = `0px`;
}

async function moveDownLeft(elm, delX, delY, delay) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  elm.style.top = `${Math.abs(delY)}px`;
  await new Promise((resolve) => setTimeout(resolve, delay));
  elm.style.left = `-${Math.abs(delX)}px`;
  await new Promise((resolve) => setTimeout(resolve, delay));
  elm.style.top = `0px`;
}

async function swapElm(elm1, elm2) {
  let xDif =
    elm1.getBoundingClientRect().left - elm2.getBoundingClientRect().left;
  let yDif =
    elm1.getBoundingClientRect().top - elm2.getBoundingClientRect().top;
  let delay = 500;

  xDif === 0
    ? (xDif = elm1.getBoundingClientRect().width + 25)
    : (yDif = elm1.getBoundingClientRect().width + 25);

  moveUpRight(elm1, xDif, yDif, delay);
  moveDownLeft(elm2, xDif, yDif, delay);
}

swapElm(
  document.querySelector(".animate li:nth-child(1)"),
  document.querySelector(".animate li:nth-child(5)")
);

// Functions for animation ------------------------

// --------------------- DOM manipulation ---------------------
