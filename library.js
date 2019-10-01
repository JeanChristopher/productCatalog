/**
 * @file this is a JavaScript library used to provide product information asynchronously using Promises
 * @author Jean Christopher AMANY
 * @license MIT
 * @copyright Copyright (c) 2019 REV; J.C. Amany
 */
// Gblobal variables definition


(function(window){

    function myLibrary(){

        //execute code here

        // a catalog that contains 100 products all te functions will refer to this catalog variable
        var catalog = createRandomCatalog(100);

        return {
            searchProductById: searchProductById,
            searchProductsByPrice: searchProductsByPrice,
            searchProductsByType: searchProductsByType,
            searchAllProducts: searchAllProducts
        }

        //function definitions go here
        /**
         * Create a product with a random type and price
         * @returns {Array[]} of price and types of the products
         */
        
        function createRandomProduct(){
            var typeArray = ['Electronics','Book','Clothing','Food'];
            var price = (Math.random()*500).toFixed(2) 
            var type = typeArray[Math.floor(Math.random()*4)];
        
            return {price:price, type:type};                
        }
        
        /**
         * Returns an array containing a specified number of randomized products
         * @returns {Promise[object]} of price and types of the products
         */

        function createRandomCatalog(num){
            var catalog = [];
            for (var i = 0; i < num; i++){
                var obj = createRandomProduct();
                catalog.push({id:i,price:obj.price,type:obj.type});
            }
            return catalog;
        }

        /**         
         * Returns a Promise containing an array that has all the products in the catalog
         * @returns {Promise[array]} 
         */

        function searchAllProducts(){
            var promise = new Promise(function(resolve, reject) {

                setTimeout(function(){
                    resolve(catalog);
                },1000);
        
            });
            return promise;
        }

        /**         
         * Returns a Promise containing the productr that matches the id argulent after a research in the catalog
         * @param {id} id of the searched product
         * @returns {Promise[array]} 
         */

        function searchProductById(id){

            var promise = new Promise(function(resolve,reject){
                var i = 0;
                setTimeout(function(){
                    while (i < catalog.length){
                        if (catalog[i].id == id){                        
                            resolve({id:id,price:catalog[i].price,type:catalog[i].type});
                        }
                        i++;
                    }
                    reject("Invalid ID: " + id);
                },1000);
            });
            return promise;
        }

        /**         
         * Returns a Promise containing the product that matches a specified type after a research in the catalog
         * @param {type} type of the searched product
         * @returns {Promise[array]} 
         */

        function searchProductsByType(type){

            var promise = new Promise(function(resolve,reject){
                var i = 0;
                var typeArray = [];
                var possibleTypes = ['Electronics','Book','Clothing','Food'];
                if(!possibleTypes.includes(type)){
                    reject("Invalid Type: " + type)
                }
                else{
                    setTimeout(function(){
                        while (i < catalog.length){
                            if (catalog[i].type == type){
                                typeArray.push({id:catalog[i].id,price:catalog[i].price,type:catalog[i].type});
                            }
                            i++;
                        }
                        resolve(typeArray);
                    },1000);
                }
            });
            return promise;
        }

        /**         
         * Returns a Promise containing the product that were in a specified difference 
           of the specified price and after a research in the catalog
         * @param {price} price of the product
         * @param {difference} difference within witch we want the price to be on
         * @returns {Promise[array]}
         */

        function searchProductsByPrice(price,difference){
            var promise = new Promise(function(resolve,reject){
                var i = 0;
                var priceArray = [];
                if(!isFinite(price)){
                    reject("Invalid Price: " + price)
                }
                else{
                    setTimeout(function(){
                        while (i < catalog.length){
                            if (Math.abs(catalog[i].price - price) < difference){
                                priceArray.push({id:catalog[i].id,price:catalog[i].price,type:catalog[i].type});
                            }
                            i++;
                        }
                        resolve(priceArray);
                    },1000);
                }
            });
            return promise;
        }  
    
    }        

    if(typeof(window.api) === 'undefined'){
        window.api = myLibrary();
    }

})(window);