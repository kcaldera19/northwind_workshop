"use strict"
window.onload = () => {

    let productDropdown = document.querySelector("#productSearch")
    let categoryDropdown = document.querySelector("#category")
    let categorySelctedDropdown = document.querySelector("#categorySelectedDropdown");
    let productTable = document.getElementById("displayAllProducts")

    function toggleCategoryDropdown() {
        if (productDropdown.value === "category") {
            // productDropdown.style.display = "none";
            categorySelctedDropdown.style.display = "block";
            fetchCategories();
        } else {
            categorySelctedDropdown.style.display = "none";
        }
    }
    productDropdown.addEventListener("change", function () {
        console.log("product dropdown changed:", this.value);
        toggleCategoryDropdown();
        if (this.value === "viewAll") {
            console.log("showing product table");
            fetchTheDisplayProducts();
            productTable.style.display = "block";
        } else {
            console.log("hiding product table");
            fetchTheDisplayProducts();
            productTable.style.display = "none";
        }
    });
   
    categoryDropdown.addEventListener("change", function () {
        console.log("Category dropdown changed:", this.value);
        fetchTheDisplayProducts(this.value);
        
        productTable.style.display = "block";
    });
}

// grabbing the products from the api
async function fetchTheDisplayProducts(categoryId) {
    let productTable = document.getElementById("displayAllProducts");
    productTable.innerHTML = "";


    let url;
    if (categoryId && categoryId !== "viewAll") {

        url = `http://localhost:8081/api/categories/${categoryId}/products`;

    } else {
        url = `http://localhost:8081/api/products`
    }
    console.log("Fetch URL:", url);

    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('try again later');
        }
        let data = await response.json();
        displayAllProducts(data);

    } catch (err) {
        console.log('rejected', err);


    }


}


// grabing all the categories
async function fetchCategories() {

    const categoryDropdown = document.getElementById("category");

    try {
        let response = await fetch("http://localhost:8081/api/categories");
        let categories = await response.json();
        
        // Clear existing options
        categoryDropdown.innerHTML = "";

        // Add new options
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category.categoryId;
            option.textContent = category.name;
            categoryDropdown.appendChild(option);
        });
    } catch (err) {
        console.error("Error fetching categories:", err);
    }



}

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