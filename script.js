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

  if (sortId === selectSorts[0].id) {
    selectionAnim(data);
  }

  if (sortId === selectSorts[1].id) {
    console.log("yes");
    mergeAnim(data);
  }

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

async function mergeAnim(arry) {
  class DivElm {
    constructor(div) {
      this.xPos = 0;
      this.yPos = 0;
      this.div = div;
    }

    moveTo(x = 0, y = 0) {
      this.div.style.left = this.xPos + x + "px";
      this.div.style.top = this.yPos + y + "px";
      this.xPos += x;
      this.yPos += y;
    }
  }

  liCreator(arry);

  let data = [];

  const liElms = [...animate.children];

  liElms.forEach((el) => {
    el.classList.add("mar");
  });

  let margin = marginIt(+animate.childElementCount, "margin");
  let demargin = marginIt(+animate.childElementCount, "demargin");

  let diffa, diffb;
  if (window.innerWidth > 810) {
    diffa = 0;
    diffb = 100;
  } else {
    diffa = 100;
    diffb = 0;
  }

  for (let ary of margin) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    for (let position of ary) {
      if (!diffa) {
        liElms[position].style.marginRight = "22px";
      } else {
        liElms[position].style.marginBottom = "22px";
      }
    }
  }

  for (let value of liElms) {
    data.push(+value.textContent);
  }

  let poss = recursive(data);
  let cnt = 0;
  for (let pos of poss) {
    const divElms = [];

    let ary = demargin[cnt++];
    for (let position of ary) {
      if (!diffa) {
        liElms[position].style.marginRight = "0px";
      } else {
        liElms[position].style.marginBottom = "0px";
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 500));

    for (let value of liElms) {
      let div = document.createElement("div");
      div.classList.add("created");
      div.textContent = value.textContent;
      document.body.appendChild(div);
      divElms.push(new DivElm(div));
    }

    for (let i = 0; i < divElms.length; i++) {
      let x = liElms[i].getBoundingClientRect().left;
      let y = liElms[i].getBoundingClientRect().top;
      divElms[i].moveTo(x, y);
    }

    for (let i = 0; i < pos.length; i++) {
      let diff0 =
        liElms[i].getBoundingClientRect().left -
        liElms[pos[i]].getBoundingClientRect().left;

      let diff1 =
        liElms[i].getBoundingClientRect().top -
        liElms[pos[i]].getBoundingClientRect().top;

      diffa === 0 ? (diff1 = 0) : (diff0 = 0);

      liElms[pos[i]].style.visibility = "hidden";
      divElms[pos[i]].moveTo(diff0 + diffa, diff1 + diffb);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    for (let rm of divElms) {
      if (!diffa) {
        rm.moveTo(0, -100);
      } else {
        rm.moveTo(-100, 0);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    for (let rm of divElms) {
      rm.div.remove();
    }
    let somVal = [];
    for (let val of pos) {
      somVal.push(liElms[val].textContent);
    }
    let anCnt = 0;
    for (let val of liElms) {
      val.textContent = somVal[anCnt++];
      val.style.visibility = "visible";
    }
  }
  liElms.forEach((el) => {
    el.classList.remove("mar");
  });
}

// mergeAnim();

function marginIt(lng, code) {
  let tmp = [];

  if (code === "margin") {
    tmp = [[lng]];
    while (tmp[tmp.length - 1].length < lng) {
      let insrt = [];
      for (let value of tmp[tmp.length - 1]) {
        if (value < 2) {
          insrt.push(value);
        } else {
          insrt.push(Math.ceil(value / 2), Math.floor(value / 2));
        }
      }
      tmp.push(insrt);
    }
    tmp.shift();

    for (let ary of tmp) {
      let sum = 0;
      let cnt = 0;
      for (let value of ary) {
        ary[cnt++] = sum + value - 1;
        sum += value;
      }
      ary.pop();
    }
  }

  if (code === "demargin") {
    let i = 0;
    while (2 ** i < lng) {
      let n = 0;
      let tmpAry = [];
      while (2 ** i - 1 + n * 2 ** (i + 1) < lng - 1) {
        tmpAry.push(2 ** i - 1 + n * 2 ** (i + 1));
        n++;
      }
      tmp.push(tmpAry);
      i++;
    }
  }

  return tmp;
}

// console.log(marginIt(9, "demargin"));

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

// console.log(recursive([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]));

// Functions for animation ------------------------

// --------------------- DOM manipulation ---------------------
