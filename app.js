"use strict";

const addCardBtn = document.querySelector(".add-card");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
const submitBtn = document.querySelector(".submitCountry");
const countryInput = document.querySelector(".countryInput");
const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open("get", `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    const code = data.cioc.toLowerCase();
    const html = `
     <div class="card">
        <div class="flag">
          <img 
          style="height: 220px;"
          src = "${data.flags.png}"
          alt=""
          />
        </div>
        <div class="card-description">
          <h2>${data.name.common}</h2>
          <h5>${data.region}</h5>
          <h5>🧑‍🤝‍🧑 ${(data.population / 1000000).toFixed(2)}M people</h5>
          <h5>🗣️ ${Object.values(data.languages)[0]}</h5>
          <h5>💰 ${Object.values(data.currencies)[0].name.toUpperCase()} : (${Object.values(data.currencies)[0].symbol})</h5>
        </div>
      </div>
    `;
    addCardBtn.insertAdjacentHTML("afterend", html);
  });
};
addCardBtn.addEventListener("click", () => (modal.style.display = "block"));
closeBtn.addEventListener("click", () => {
  countryInput.value = "";
  modal.style.display = "none";
});
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let country = countryInput.value;
  if (country) {
    getCountry(country);
    modal.style.display = "none";
    countryInput.value = "";
  } else {
    alert("Please enter a country name.");
  }
});
