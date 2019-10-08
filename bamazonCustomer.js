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
    readBamazon();
})

function readBamazon(){
    connection.query("SELECT id, product_name, price FROM products", function(err, res){
        if (err) throw err;

        console.log(res);
    })
};