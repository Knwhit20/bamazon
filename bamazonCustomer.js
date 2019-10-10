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

connection.connect(function (err) {
    if (err) throw err;
    displayProducts();

});

function displayProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // console.log(res);logs all results
        for (var i = 0; i < res.length; i++) {
            console.log("Id: " + res[i].id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);


        };
        purchase()


    });
};

//creates two prompts, 1. asks the user to select the id of the product they want to buy; 2. asks how many of the product they would like to buy
function purchase() {
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "Select an id number of the product you would like to purchase" + ".\n",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }

        },
        {
            type: "input",
            name: "quantity",
            message: "How many units would you like to purchase?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            },

        }
    ]).then(function (answer) {
        // console.log(answer);

        var chosenItem = answer.item_id
        // console.log(chosenItem);
        var quantity = answer.quantity
        // console.log(quantity);

        connection.query("SELECT id, price, stock_quantity FROM products", function (err, res) {
            if (err) throw err;
            var item;
            for (var i = 0; i < res.length; i++) {
                // console.log(res[i]);
                // console.log(res[i].id);
                if (parseInt(chosenItem) === res[i].id) {
                     item = res[i]
                }
            } 
            if(item){
                var stock = item.stock_quantity;
                var price = item.price;
                // console.log(stock);
                // console.log(chosenItem);
                
                if (quantity <= stock) {
                    console.log("Order fulfilled")
                    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?", [quantity, chosenItem],
                        function (err) {
                            if (err) throw err;
                            //total displayed to user, price multiplied by the quantity
                            var total = (price * quantity).toFixed(2);

                            console.log("Your total price is $" + total);
                            console.log("Thank you for purchasing!")

                        })
            }
        
           
            else {
                console.log("sorry not enough in stock")

            }
        
            } else {
                console.log("Please select a valid product ID")
            }
            
        })

    })

}


// function startover() {
//     inquirer.prompt([
//         {
//             type: "confirm",
//             name: "startover",
//             message: "Would you like to purchase something else?",
//             default: true
//         }

//     ]).then(function() {
//         if (confirm) {
//             displayProducts();
//         }
//         else (end());
//     });
// }
  