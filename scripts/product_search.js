"use strict"
window.onload = () => {
    
    let productDropdown = document.querySelector("#productSearch")
    let categoryDropdown = document.querySelector("#category")

    productDropdown.addEventListener("change", fetchTheDisplayProducts);
    categoryDropdown.addEventListener("change", fetchCategories);
}

// grabbing the products from the api
function fetchTheDisplayProducts() {
    let selectedCategory = document.querySelector("#category").value;
    let url;
    if(selectedCategory){
        url=`http://localhost:8081/api/categories`;
    }else{
        url = `http://localhost:8081/api/products`
    }

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('try again later');
            } return response.json();
        }).then(data => {
            console.log(data);
            displayAllProducts(data);

        }).catch((err) => {
            console.log('rejected', err);
        });


}
// grabing all the categories
async function fetchCategories() {
    try {
        
        let response = await fetch(`http://localhost:8081/api/categories`)
        if (!response.ok) {
            throw new Error(`Cant grab product by category`);
        }
        let data = await response.json();
        console.log(data);
        displayAllCategories(data);
    } catch (err) {
        console.log('Error', err);
    }

}
function displayAllCategories(categories){
    let categoryDropdown = document.querySelector("#category")
    categoryDropdown.innerHTML="";

    categories.forEach(category=>{
        let option = document.createElement("option");
        option.value = category.categoryId;
        option.textContent = category.name;
        categoryDropdown.appendChild(option);

    })
}
// {productId: '6', productName: "Grandma's Boysenberry Spread", unitPrice: '25.0000', unitsInStock: '120', categoryId: 2, …}

function displayAllProducts(products) {
    let productTable = document.getElementById("displayAllProducts");
    productTable.innerHTML = "";

    products.forEach(product => {
        let row = productTable.insertRow();
        row.insertCell(0).textContent = product.productName;
        row.insertCell(1).textContent = product.productId;
        row.insertCell(2).textContent = product.unitPrice;


    })
}




function selectOne() {

}


