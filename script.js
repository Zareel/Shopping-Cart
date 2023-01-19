let shop = document.querySelector("#shop");

let shopItemsData = [
  {
    id: "zareel",
    name: "Casual Shirt",
    price: 45,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    img: "images/img-1.jpg",
  },
  {
    id: "shine",
    name: "Office Shirt",
    price: 100,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    img: "images/img-2.jpg",
  },
  {
    id: "shon",
    name: "T-Shirt",
    price: 100,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    img: "images/img-3.jpg",
  },
  {
    id: "coding",
    name: "Men's Suit",
    price: 300,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    img: "images/img-4.jpg",
  },
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div id="product-id-${id}" class="item">
    <img width="220" src=${img} alt="" />
    <div class="details">
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="pricequantity">
        <h2>$ ${price}</h2>
        <div class="buttons">
          <i  onclick="increment(${id})" class="bi bi-plus-lg"></i>
          <div id=${id} class="quantity">
          ${search.item === undefined ? 0 : search.item}
          </div>
          <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
        </div>
      </div>
    </div>
  </div>
      `;
    })
    .join(""));
};
generateShop();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  //* if the item doesn't exist only then push into the basket or just incease the quantity(number)
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));

  //   console.log(basket);
  update(selectedItem.id);
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  //* When the number of items hits 0 we need to stop decrement
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  //   console.log(basket);
  update(selectedItem.id);
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //   console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.querySelector("#cartamount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y);
};
calculation();
