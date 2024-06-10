"use strict"
window.onload = () => {

    let productDropdown = document.querySelector("#productSearch")
    let categoryDropdown = document.querySelector("#category")
    let categorySelctedDropdown = document.querySelector("#categorySelectedDropdown")
    productDropdown.addEventListener("change", function () {
        console.log("product dropdown changed:", this.value);
        fetchTheDisplayProducts();
        if (this.value === "category") {
            categorySelctedDropdown.style.display = "block";
           fetchCategories();

        } else {
            categorySelctedDropdown.style.display = "none";
        }
    });
    categoryDropdown.addEventListener("change", function(){
        console.log("Category dropdown changed:", this.value);
        fetchTheDisplayProducts();
    });
    
       
}

// grabbing the products from the api
function fetchTheDisplayProducts() {
    let productTable = document.getElementById("displayAllProducts");
    productTable.innerHTML = "";
    let selectedCategory = document.querySelector("#categorySelectedDropdown #category").value;
    console.log("Selected Category ID:", selectedCategory);

    let url;
    if (selectedCategory && selectedCategory !== "viewAll") {

        url = `http://localhost:8081/api/categories`;

    } else {
        url = `http://localhost:8081/api/products`
    }
    console.log("Fetch URL:", url); 

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('try again later');
            } return response.json();
        }).then(data => {
            
            // // console.log("API Response:", data);
            // displayAllProducts(data);

        }).catch((err) => {
            console.log('rejected', err);
            console.log("Product Endpoint URL:", url);

        });


}


// grabing all the categories
async function fetchCategories() {
    let categories;

    try {

        let response = await fetch(`http://localhost:8081/api/categories`)
        console.log("categories",fetchCategories);
        if (!response.ok) {
            throw new Error(`Cant grab product by category`);
        }
        categories = await response.json();
            console.log("categories", categories);
            displayAllCategories(categories);
        
    } catch (err) {
        console.log('Error', err);
    }

}

function displayAllCategories(categories) {
    
    let categoryDropdown = document.querySelector("#categorySelectedDropdown #category");
    categoryDropdown.innerHTML = "";
    console.log(categoryDropdown)
    categories.forEach(category => {
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


