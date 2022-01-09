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

// console.log(selectionSort([5, 4, 3, 2, 1]));

// --------------------- DOM manipulation ---------------------

const selectSorts = [...document.querySelectorAll(".selectSort li")];
const addBtn = document.querySelector(".addBtn");
const inputField = document.querySelector(".inputField");
const calcBtn = document.querySelector(".calcBtn");
const animate = document.querySelector(".animate");
const reset = document.querySelector(".reset");

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

  selectionAnim(data);
  reset.classList.remove("hidden");
});

reset.addEventListener("click", () => {
  while (animate.firstChild) {
    animate.removeChild(animate.lastChild);
  }
  while (inputField.firstChild) {
    inputField.removeChild(inputField.lastChild);
  }
  reset.classList.add("hidden");
});

function liCreator(ary) {
  while (animate.firstChild) {
    animate.removeChild(animate.lastChild);
  }

  for (let val of ary) {
    let li = document.createElement("li");
    li.textContent = val;
    animate.appendChild(li);
  }
}

// Functions for animation ------------------------

async function moveTo(elm, dirAry, delay) {
  // dirAry ==> [ [top/left, delX/Y, 1/-1] , .... ]

  for (let i of dirAry) {
    elm.style[i[0]] = `${i[2] * Math.abs(i[1])}px`;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

async function swapElm(elm1, elm2) {
  let xDif =
    elm1.getBoundingClientRect().left - elm2.getBoundingClientRect().left;
  let yDif =
    elm1.getBoundingClientRect().top - elm2.getBoundingClientRect().top;
  let delay = 500;
  let elm1Ary = [];
  let elm2Ary = [];

  if (window.innerWidth > 810) {
    yDif = elm1.getBoundingClientRect().width + 25;
    elm1Ary.push(["top", yDif, -1]);
    elm1Ary.push(["left", xDif, 1]);
    elm1Ary.push(["top", 0, 1]);

    elm2Ary.push(["top", yDif, 1]);
    elm2Ary.push(["left", xDif, -1]);
    elm2Ary.push(["top", 0, 1]);
  } else {
    xDif = elm1.getBoundingClientRect().width + 25;
    elm1Ary.push(["left", xDif, 1]);
    elm1Ary.push(["top", yDif, 1]);
    elm1Ary.push(["left", 0, 1]);

    elm2Ary.push(["left", xDif, -1]);
    elm2Ary.push(["top", yDif, -1]);
    elm2Ary.push(["left", 0, 1]);
  }

  moveTo(elm1, elm1Ary, delay);
  await moveTo(elm2, elm2Ary, delay);
}

async function selectionAnim(ary) {
  let sortAry = selectionSort([...ary]);
  let tmp;
  liCreator(ary);
  for (subAry of sortAry) {
    await swapElm(animate.children[subAry[0]], animate.children[subAry[1]]);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(
      animate.children[subAry[0]],
      animate.children[subAry[1]],
      "hello"
    );
    tmp = ary[subAry[0]];
    ary[subAry[0]] = ary[subAry[1]];
    ary[subAry[1]] = tmp;

    liCreator(ary);
  }
  return new Promise((resolve) => {
    resolve;
  });
}

// selectionAnim([5, 4, 3, 2, 1]);

// Functions for animation ------------------------

// --------------------- DOM manipulation ---------------------
