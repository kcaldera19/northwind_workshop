"use strict"
window.onload = () => {
    
    let productDropdown = document.querySelector("#productSearch");
    let categoryDropdown = document.querySelector("#category");
    
    
    let categorySelctedDropdown = document.querySelector("#categorySelectedDropdown");
    
    let productTable = document.getElementById("displayAllProducts");
    
    let categoryTable =document.getElementById("displayAllCategories");
    fetchTheDisplayCategories();
    function toggleCategoryDropdown() {
        if (productDropdown.value === "category") {
            
            categorySelctedDropdown.style.display = "block";
            fetchCategories();
            if(categoryTable){
                categoryTable.style.display = "block";
            }
             
        } else {
            categorySelctedDropdown.style.display = "none";
            if(categoryTable){
                categoryTable.style.display = "none";
            }
           
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
        if(this.value !=="category"){
            fetchTheDisplayProducts(this.value);
            
        }
        
        
        // productTable.style.display = "block";
    });
    
    
}

// grabbing the products from the api
async function fetchTheDisplayProducts(categoryId) {
    
    let productTable = document.getElementById("displayAllProducts");
    productTable.innerHTML = "";


    let url;
    if (categoryId && categoryId !== "viewAll") {

        url = `http://localhost:8081/api/products/bycategory/${categoryId}`;

    } 
    else {
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
    

    let categoryDropdown = document.getElementById("category");
    categoryDropdown.innerHTML ="";

    try {
        let response = await fetch("http://localhost:8081/api/categories");
        if(!response.ok){
            throw new Error("Failed to fetch categories");
        }
        
        let categories = await response.json();
        
        
        categories.forEach(category => {
            let option = document.createElement("option");
            option.value = category.categoryId;
            option.textContent = category.name;
            categoryDropdown.appendChild(option);
        });
        
        
    } catch (err) {
        console.error("Error fetching categories:", err);
    }
   
}



async function fetchTheDisplayCategories(){
    
    try{
        let response = await fetch("http://localhost:8081/api/categories");
        let categories = await response.json();
        console.log("Fetched categories:", categories); 
        displayAllCategories(categories);
    }catch(err){
        console.error("Error fetching categories:", err);
    }
}

function displayAllCategories(categories){
    let categoryTable = document.getElementById("displayAllCategories").getElementsByTagName('tbody')[0];;
    
    categoryTable.innerHTML = "";
    categories.forEach(category=>{
        let row = categoryTable.insertRow();
        row.insertCell(0).textContent=category.categoryId;
        row.insertCell(1).textContent=category.description;
        row.insertCell(2).textContent=category.name;
        
    });
    console.log("Table content:", categoryTable.innerHTML);
}
async function fetchProductsByCategory(categoryId) {
    let productTable = document.getElementById("displayAllProducts");
    productTable.innerHTML = "";

    let url = `http://localhost:8081/api/products/bycategory/${categoryId}`;
    console.log("Fetch URL:", url);

    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        let data = await response.json();
        displayAllProducts(data);
    } catch (err) {
        console.error('Error fetching products:', err);
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




