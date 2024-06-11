"use strict"
window.onload = () => {
    console.log("alright");
    fetchProductIds()
    .then(productIds=>{
        if(!productIds || productIds.length === 0){
            window.location.href = 'index.html';
        }else{
            productIds.forEach(productId=>{
                fetchProductsDetails(productId);
            })
        }
    })
    .catch(error=>{
        console.error("Error getting the products",error);
    })

    let productTable = document.querySelector("#productDetailTable");
    productTable.addEventListener("click", function(event){

    })
   
    
}

async function fetchProductIds(){
    return fetch('http://localhost:8081/api/products')
    .then(response =>{
        if(!response.ok){
            throw new Error('failed to get id')
        }
        return response.json();
    })
}


// need to fixs the end point 
function fetchProductsDetails(){
    fetch(`http://localhost:8081/api/products`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        return response.json(); 
    })
    .then(product =>{
        displayProductDetails(product);
    }).catch(error =>{
        console.error("Error getting the products",error);
    })
}

function displayProductDetails(product) {
    let productTable = document.getElementById("productDetailTable")
    let row = productTable.insertRow();
    row.insertCell(0).textContent = product.productName;
    row.insertCell(1).textContent = product.productId;
    row.insertCell(2).textContent = product.unitPrice;
    row.insertCell(3).textContent = product.supplier;
}