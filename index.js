/**
 * @file this is a JavaScript library for simulating research of a product in a factory
 * @author Jean Christopher AMANY
 * @license MIT
 * @copyright Copyright (c) 2019 REV; J.C. Amany
 */

/*
* get a Promise containing all of the products in the catalog
* populate the list of all products table with the array of products catalog
 */
api.searchAllProducts().then(function(value){
    updateTable('allTable',value);
});

/** 
 * allow to create table headers
 * @param {the id of the table we want to fill} tableId 
 */

 function createTableHeader(tableId){
    var tableHeaderRow = document.createElement('TR');
    var th1 = document.createElement('TH');
    var th2 = document.createElement('TH');
    var th3 = document.createElement('TH');
    var th4 = document.createElement('TH');
    th1.appendChild(document.createTextNode("ProductId"));
    th2.appendChild(document.createTextNode("Type"));
    th3.appendChild(document.createTextNode("Price"));
    th4.appendChild(document.createTextNode("Examine"));
    tableHeaderRow.appendChild(th1);
    tableHeaderRow.appendChild(th2);
    tableHeaderRow.appendChild(th3);
    tableHeaderRow.appendChild(th4);
    document.getElementById(tableId).appendChild(tableHeaderRow);
}

/**
 * Dynamically add rows to an exiting table 
 * @param {the id of the table we want to modify} tableId 
 * @param {the information from witch the price type and ProductId are generated from} productArray
 */

function updateTable(tableId,productArray){
    var tableBody = document.getElementById(tableId);
    //reset table
    while (tableBody.hasChildNodes()) {   
        tableBody.removeChild(tableBody.firstChild);
    }
    //create table header
    createTableHeader(tableId);
    //populate table rows
    for (i = 0; i < productArray.length; i++) {
        var tr = document.createElement('TR');
        var td1 = document.createElement('TD');
        var td2 = document.createElement('TD');
        var td3 = document.createElement('TD');
        var td4 = document.createElement('button');

        td4.addEventListener('click',function(){
            // execute a processSearch() method call when an Examine button is pressed inside any of the tables' rows.
            processSearch(this.parentNode.firstChild.innerHTML);
        });
        td1.appendChild(document.createTextNode(productArray[i].id));
        td2.appendChild(document.createTextNode(productArray[i].type));
        td3.appendChild(document.createTextNode(productArray[i].price));
        td4.appendChild(document.createTextNode("Examine"));
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tableBody.appendChild(tr);
    }
}

/**
 * Edits the html of the examined product and fills it with the product argument
 * @param {name of the product we want information about} product 
 */

function updateExaminedText(product){
    var outputString = "Product Id: " + product.id;
    outputString += "<br> Price: " + product.price;
    outputString += "<br> Type: " + product.type;
    document.getElementById("productText").innerHTML = outputString;
}

/**
 * get intersection of similar prised and similar typed arrays
 * @param {the first array we want to find matching products in} arrA 
 * @param {the second array we want to find matching products in} arrB 
 * @param {id for matching} searchedId 
 */

function getIntersection(arrA,arrB,searchedId){

    var samePrice = arrA;
    var sameType = arrB;
    var similarArray = [];
    samePrice.forEach(function(obj1){
        sameType.forEach(function(obj2){
            if(obj1.id == obj2.id && obj1.id != searchedId)
                similarArray.push(obj1);     
        });
    });

    return similarArray;

}

/**
 * find a product by inserting his ID on the id field
 * @param {searched product id} searchId 
 */

function processSearch(searchId){
    api.searchProductById(searchId).then(function(val){
        return Promise.all([api.searchProductsByPrice(val.price,50),api.searchProductsByType(val.type),val]);
    }).then(function(val){
        var similarArray = getIntersection(val[0],val[1],val[2].id);
        updateExaminedText(val[2]);
        updateTable('similarTable',similarArray);
    }).catch(function(val){
        alert(val);
    });
}

/**
 * Search a product given a certain type
 * @param {Type of products we're searching} searchType 
 */

function processSearchType(searchType){
    api.searchProductsByType(searchType).then(function(valType){
        console.log(valType);
        var similarTypeArray = valType;  
        updateTable('similarTable',similarTypeArray);
    }).catch(function(valType){
        alert(valType);
    });
}

function processSearchPrice(searchPrice){
    api.searchProductsByPrice(searchPrice, 50).then(function(valPrice){
        console.log(valPrice);
        var similarPriceArray = valPrice;  
        updateTable('similarTable',similarPriceArray);
    }).catch(function(valPrice){
        alert(valPrice);
    });
}

// click event for the search button
document.getElementById("inputIdButton").addEventListener('click',function(){
    processSearch(document.getElementById('inputId').value);
});

document.getElementById("inputTypeButton").addEventListener('click',function(){
    processSearchType(document.getElementById('inputType').value);
});

document.getElementById("inputPriceButton").addEventListener('click',function(){
    processSearchPrice(document.getElementById('inputPrice').value);
});

// 
