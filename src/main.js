(function () {
  "use strict";
  const alpaphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const params = (location.href.split("?")[1] || "")
    .split("&")
    .map((pair) => pair.split("="))
    .filter((i) => i[0] !== "")
    .reduce((acc, i) => {
      acc[i[0]] = i[1];
      return acc;
    }, {});
  params.combinations = (params.combinations || "1-1-1")
    .split(",")
    .map((comb) => comb.split("-"));
  console.log(params);

  const reelsCount = parseInt(params.reelsCount, 10) || 3;
  const reels = [];
  for (let r = 0; r < reelsCount; r++) {
    const letter = alpaphabet[r];
    reels.push(
      new Array(parseInt(params[`reel${letter}`], 10) || 1)
        .fill(null)
        .map((_, i) => `items/${letter}/${i + 1}.jpg`)
    );
  }
  console.log(reels);
  let turnCount = 0;

  // const items = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

  reels.flat().forEach((item) => {
    const img = new Image();
    img.src = item;
  });

  // add .door * reelsCount > .boxes
  document.querySelector(".doors").innerHTML =
    '<div class="door"><div class="boxes"></div></div>'.repeat(reelsCount);

  const doors = document.querySelectorAll(".door");

  document.querySelector("#spinner").addEventListener("click", spin);
  document.querySelector("#reseter").addEventListener("click", init);
  document.addEventListener("keypress", spin);

  async function spin() {
    init();
    init(
      false,
      parseInt(params.duration, 10) || 4,
      parseInt(params.duration, 10) || 5
    );
    for (const door of doors) {
      const boxes = door.querySelector(".boxes");
      const duration = parseInt(boxes.style.transitionDuration);
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
      boxes.style.transform = "translateY(0)";
    }
    turnCount++;
  }

  function init(firstInit = true, groups = 1, duration = 1) {
    let reelIndex = 0;
    for (const door of doors) {
      const items = reels[reelIndex];

      if (firstInit) {
        door.dataset.spinned = "0";
      } else if (door.dataset.spinned === "1") {
        return;
      }

      const boxes = door.querySelector(".boxes");
      const boxesClone = boxes.cloneNode(false);

      const pool = [items[0]];
      if (!firstInit) {
        const arr = [];
        const itemsWithoutFirst = [...items];
        itemsWithoutFirst.shift();
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          const itemsToAdd = n === 0 ? itemsWithoutFirst : items;
          arr.push(...itemsToAdd);
        }

        const toAdd = shuffle(arr);
        toAdd.pop();
        try {
          toAdd.push(
            reels[reelIndex][
              parseInt(params.combinations[turnCount][reelIndex], 10) - 1
            ]
          );
        } catch {
          console.log("not enough combinations");
        }
        pool.push(...toAdd);

        boxesClone.addEventListener(
          "transitionstart",
          function () {
            door.dataset.spinned = "1";
            // this.querySelectorAll(".box").forEach((box) => {
            //   box.style.filter = "blur(1px)";
            // });
          },
          { once: true }
        );

        boxesClone.addEventListener(
          "transitionend",
          function () {
            this.querySelectorAll(".box").forEach((box, index) => {
              //box.style.filter = "blur(0)";
              if (index > 0) this.removeChild(box);
            });
          },
          { once: true }
        );
      }
      // console.log(pool);

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.style.width = door.clientWidth + "px";
        box.style.height = door.clientHeight + "px";
        //box.textContent = pool[i];
        box.innerHTML = `<div class="img" style="background-image:url(${pool[i]})"></div>`;
        boxesClone.appendChild(box);
      }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${
        door.clientHeight * (pool.length - 1)
      }px)`;
      door.replaceChild(boxesClone, boxes);
      // console.log(door);

      reelIndex++;
    }
  }

  function shuffle([...arr]) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  }

  init();
})();
