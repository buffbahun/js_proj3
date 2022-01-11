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
  class LiElm {
    constructor(liElm) {
      this.xPos = 0;
      this.yPos = 0;
      this.elm = liElm;
    }

    changeDir(xDir = 0, yDir = 0) {
      this.xPos += xDir;
      this.yPos += yDir;
      this.elm.style.left = `${this.xPos}px`;
      this.elm.style.top = `${this.yPos}px`;
    }
  }
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

function showHide(ary1, ary2) {
  let tmp = [];
  let som = 0;
  for (let i = 0; i < ary1.length; i++) {
    for (let j = som; j < ary2.length; j++) {
      if (ary1[i] < ary2[j]) {
        tmp.push(i);
        break;
      }
      tmp.push(ary1.length + j);
      som++;
    }
  }
  for (let cnt = 0; cnt < ary1.length + ary2.length; cnt++) {
    let tst = true;
    for (val of tmp) {
      tst = cnt === val ? false : tst;
    }
    if (tst) {
      tmp.push(cnt);
    }
  }
  return tmp;
}

// console.log(showHide([2], [1]));

function recursive([...ary]) {
  let tmp = [];
  let returnAry = [];
  for (let i = 0; 2 ** i < ary.length; i++) {
    tmp = [];
    for (let n = 0; n < Math.ceil(ary.length / 2 ** i); n += 2) {
      let lng = tmp.length;
      if (
        ary.length % 2 ** i &&
        Math.floor(ary.length / 2 ** i) % 2 &&
        n > Math.floor(ary.length / 2 ** i) - 1
      ) {
        // console.log("no", i, n);
        let anttmp = showHide(
          ary.slice(2 ** i * n, 2 ** i * (n + 1)),
          ary.slice(2 ** i * (n + 1), ary.length)
        );
        let itr = 0;
        anttmp.push((val) => {
          anttmp[itr] = val + lng;
          itr++;
        });
        tmp.push(...anttmp);
        break;
      }
      if (
        Math.ceil(ary.length / 2 ** i) % 2 &&
        n > Math.floor(ary.length / 2 ** i) - 1
      ) {
        // console.log("yes", i, n);
        let anttmp = ary.slice(2 ** i * n, ary.length);
        anttmp.forEach((val) => {
          tmp.push(tmp.length);
        });
        break;
      }
      let ttmp = showHide(
        ary.slice(2 ** i * n, 2 ** i * (n + 1)),
        ary.slice(2 ** i * (n + 1), 2 ** i * (n + 2))
      );
      // console.log(2 ** i * n, 2 ** i * (n + 1), 2 ** i * (n + 2));
      let itr = 0;
      ttmp.forEach((val) => {
        ttmp[itr] = val + lng;
        itr++;
        // console.log(ttmp);
      });
      tmp.push(...ttmp);
    }
    let ann = [];
    tmp.forEach((val) => {
      ann.push(ary[val]);
    });
    returnAry.push([...tmp]);
    ary = [...ann];
  }
  return returnAry;
}

console.log(recursive([5, 1, 3]));

// Functions for animation ------------------------

// --------------------- DOM manipulation ---------------------
