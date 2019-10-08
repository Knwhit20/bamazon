var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Lolafitz",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    startBamazon();
    purchase();
})

function startBamazon(){
    connection.query("SELECT id, product_name, price FROM products", function(err, res){
        if (err) throw err;

        // console.log(res);
        for (var i = 0; i < res.length; i++){
            console.log("Id: " + res[i].id +  " || Product: " + res[i].product_name + " || Price: " + res[i].price);
           
           
        }
    })
};


function purchase(){
    inquirer.prompt([
        {
        type: "list",
        name: "rawList",
        message: "What is the ID of the product you would like to buy?",
        choices:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
        type: "input",
        name: "numUnits",
        message: "How many units would you like to purchase?",
        
        }
    ]).then(function(){
        console.log("congrats you purchased something!")
    })

}