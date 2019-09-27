var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');
var engines = require('consolidate');

app.engine('ejs', engines.ejs);
app.set("views", "./views");
app.set("view engine", "ejs");

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection({

    host:'localhost',
    user:'root',
    password:'',
    database:'bakpak' 

});

var server = app.listen(8085, function(){
    var host = server.address().address
    var post = server.address().port
    console.log("start");
});

con.connect(function (error){
    if(error) console.log(error);
    else console.log("connected");
});


app.get('/getOrderCode', function(req,res){
    con.query('select distinct(order_code),status,payment from orders order by order_date desc',function(error,rows,fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);
        }
    })
});


app.get('/getOrderItems', function(req,res){
    con.query('select * from orders inner join item_setup on orders.item_id = item_setup.item_id', function(error,rows,fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);
        }
    })
})

app.get('/getUserByOrder/:order_code', function(req,res){
    var sql = 'select user_id from orders where order_code = ?';
    con.query(sql,[req.params.order_code],function(error,rows,fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);
        }
    });
});

app.get('/getUser/:order_code', function(req,res){
    con.query('select * from orders inner join user_details on orders.user_id = user_details.user_id where orders.order_code = ? and user_details.user_status = "ACTIVE"',[req.params.order_code],function(error,rows,fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);
        }
    });
});

app.get('/geItemsByOrder/:order_code',function(req,res){
    con.query('SELECT * FROM orders INNER JOIN item_setup ON orders.item_id=item_setup.item_id WHERE orders.order_code = ?',[req.params.order_code],function(error,rows,fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows);
        }
    });
});