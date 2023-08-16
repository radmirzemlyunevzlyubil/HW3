let menu = document.querySelector('.menu');
let row = document.querySelector('.row');

const getProducts = (category) => {
    fetch('https://dummyjson.com/products')
    .then((res) => res.json())
    .then((data) => {
        const products = data.products.filter(product => category === 'all' || product.category === category);

        products.forEach((product) => {
            row.innerHTML += `
            <div class="card">
                <img class="card_img" src="${product.thumbnail}"/>
                <h2 class="card_title">${product.title}</h2>
                <p class="card_description">${product.description}</p>
                <p class="card_price">Price: $${product.price}</p>
                <p class="card_discount">Discount: ${product.discountPercentage}%</p>
                <p class="card_rating">Rating: ${product.rating}</p>
            </div>
        `;
        });
    })
    .catch((error) => console.log(error));
}

getProducts();

const getCategories = () => {
    fetch('https://dummyjson.com/products')
     .then((res) => res.json())
     .then((data) => {
        const categories = ['all', ...new Set(data.products.map(product => product.category))];

        categories.forEach((category) => {
            menu.innerHTML += `<li class="menu-item">${category}</li>`;
        });

        let menuItem = document.querySelectorAll('.menu-item');
        Array.from(menuItem).forEach((item) => {
            item.addEventListener('click', () =>{
                row.innerHTML = '';
                getProducts(item.textContent);
            });
        });
    });
}
getCategories();
