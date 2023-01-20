let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
  let cartIcon = document.querySelector("#cartamount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y);
};
calculation();
