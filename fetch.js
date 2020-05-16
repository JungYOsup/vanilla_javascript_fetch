"use strict";

// 먼저 fetch를 통해서 데이터를 받아오는 방법을 배웠던걸로 기억한다. 그것을 활용하여 데이터를 받아와보자
// 내가 입력하는 값을 어떻게 실시간으로 가져올까? ajax를 활용해? 노노 ajax는 비동기식 통신방법이잖아 즉 비동기적으로 데이터를 주고 받고 하는거일뿐인데 fetch가 나오기 전까지는 구현하는게 어렵다가 , fetch를 통해서 쉽게 데이터를 주고 받을수 있게 되었다.

//https://stackoverflow.com/questions/33501696/how-to-return-value-from-addeventlistener

// filter에 대한것 하나더 알아두기

const inputElement = document.querySelector(".searchValue");
const listElement = document.querySelector(".list");
const ul = document.createElement("ul");
const colorli = document.querySelectorAll("li");
let result = "";

listElement.appendChild(ul);

function getData() {
  fetch(
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      filterData(json);
    });
}

function filterData(items) {
  if (inputElement) {
    inputElement.addEventListener("input", function (event) {
      result = getValue(event);
      const array = items.filter((item) => {
        if (item.city.includes(result) || item.state.includes(result)) {
          return item;
        }
      });
      console.log(array);
      printValue(array);
    });
  }
}

function getValue(event) {
  // 백스페이에 input되는 값을 제외시키기기 위해
  if (event.target.value != "") {
    return event.target.value;
  }
}

function removeList() {
  const lists = document.querySelectorAll("li");
  lists.forEach((list) => {
    ul.removeChild(list);
  });
}

function printValue(array) {
  removeList();
  array.forEach((element) => {
    const li = document.createElement("li");
    const index = element.city.indexOf(result);

    const index2 = element.state.indexOf(result);

    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");

    li.appendChild(p1);
    li.appendChild(p2);
    li.appendChild(p3);

    //
    if (element.city.includes(result)) {
      if (element.city.length !== index + 1 || index === 0) {
        p1.innerHTML =
          element.city.substring(0, index) +
          `<span class="yellow">${result}</span>` +
          element.city.substring(index + result.length, element.city.length);
      } else {
        p1.innerHTML =
          element.city.substring(0, index) +
          `<span class="yellow">${result}</span>`;
      }
    } else {
      p1.innerHTML = element.city;
    }

    if (element.state.includes(result)) {
      if (element.state.length !== index2 + 1 || index2 === 0) {
        p2.innerHTML =
          element.state.substring(0, index2) +
          `<span class="yellow">${result}</span>` +
          element.state.substring(index2 + result.length, element.state.length);
        // 문자열이 입력됬을경우 찾기 위해
      } else {
        p2.innerHTML =
          element.state.substring(0, index2) +
          `<span class="yellow">${result}</span>`;
      }
    } else {
      p2.innerHTML = element.state;
    }

    p3.innerHTML = element.population;

    ul.appendChild(li);
  });
}

function init() {
  getData();
}

init();
