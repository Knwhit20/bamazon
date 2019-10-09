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
    purchase();
})

function displayProducts(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;

        // console.log(res);
        for (var i = 0; i < res.length; i++){
            console.log("Id: " + res[i].id +  " || Product: " + res[i].product_name + " || Price: " + res[i].price + "|| Quantity: " + res[i].stock_quantity);
           
           
        };
        purchase(res);
    })
};


function purchase(){
    inquirer.prompt([
        {
        type: "input",
        name: "ID",
        message: "Select an id number of the product you would like to purchase" + ".\n",
        // validate: function(value) {
        //     if (isNaN(value) === false) {
        //         return "true";
        //     }
        //     return false;
        // },

        },
        {
        type: "input",
        name: "quantity",
        message: "How many units would you like to purchase?",
            // validate: function(value) {
            //     if (isNaN(value) === false) {
            //         return true;
            //     }
            //     return false;
            // },
        
        }
    ]).then(function(res) {
        // console.log(res);
        console.log("checking inventory");
        var id = res.id;
        var quantity = res.quantity

        // check if enough quantity exists to fulfill order
        if (stock_quantity >= quantity) {
            console.log("fill order")

        }
        //if not enough quantity exists, log insufficient quantity
        else {
            console.log("Insufficient quantity, unable to place order")
        }

        // if quantity available, fulfill the order
        //update new quantity of item
        //show customer the total cost of their purchase
    })

}