var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
    
});

function displayProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;

        // console.log(res);logs all results
        for (var i = 0; i < res.length; i++){
            console.log("Id: " + res[i].id +  " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
           
           
        };
       purchase(res)
    });
};

//creates two prompts, 1. asks the user to select the id of the product they want to buy; 2. asks how many of the product they would like to buy
function purchase(inventory){
    inquirer.prompt([
        {
        type: "input",
        name: "item_id",
        message: "Select an id number of the product you would like to purchase" + ".\n",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        },

        },
        {
        type: "input",
        name: "quantity",
        message: "How many units would you like to purchase?",
        validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            },
        
        }
    ]).then(function(answer) {
        console.log(answer);
        // var chosenProduct;
        var chosenItem;
        for (var i = 0; i < inventory.length; i++) {
            if (inventory[i].id === answer.item_id) {
                chosenItem = answer.item_id;
                console.log(chosenItem);
            }
        }
      
        
            for (var i = 0; i < inventory.length; i++) {
                if (inventory[i].id === parseInt(answer.item_id)) {
                    chosenproduct = inventory[i];
                    console.log(chosenProduct);
                    // console.log(chosenProduct.quantity)
                }
            }; if (!chosenProduct) {
                console.log("Please choose a valid product ID");
            };
    
    

        // //use id.quantity to see if enough inventory exists
        // if (chosenProduct){
        //     if chosenProduct.stock_quantity >= parseInt(answer.quantity){
        //         connection.query("UPDATE products SET stock_quantity = stock_quantity - "?"WHERE id = "?", [answer.quantity, chosenProduct.id], 
        //         function (err) {
        //             if (err) throw err;
        //             console.log("Thank you for purchasing")
        //         })
        //     }
        // }


    })

}