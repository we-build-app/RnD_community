var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dbconfig = require('../config/database.js');
const connection = mysql.createConnection(dbconfig);

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  // Uncomment below lines for first time to create a table in database
  // var sql = "CREATE TABLE users (email VARCHAR(255), password VARCHAR(255))";
  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("Table created");
  // });
  console.log('connected as id ' + connection.threadId);
});

exports.register = function (req, res) {                                                                                                                                                   
    // console.log("req", req.body);
    let today = new Date();
    let userName = {
        "User_name": req.body.email.split("@")[0],
        "joined": today,
    };

    connection.query('INSERT INTO User SET ?', userName, function (error, results, fields) {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code" : 400,
                "failed": "error ocurred"
            });
        } else {
            let users = {
                "User_id": results.insertId,  // LAST_INSERT_ID()
                "email": req.body.email,
                "pw": req.body.password,
            }

            connection.query('INSERT INTO User_login SET ?', users, function (error, results, fields) {
                if (error) {
                    console.log("error ocurred", error);
                    res.send({
                        "code" : 400,
                        "failed": "error ocurred"
                    })
                } else {
                    console.log('The solution is: ', results);
                    res.send({
                        "code": 200,
                        "success": "user registered successfully"
                    });
                }
            });
        }
    });
}

exports.login = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM User_login WHERE Email = ?', [email],
    function( error, results, fields) {
        if (error) {
            // console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if(results.length > 0) {
                if(results[0].pw == password) {
                    const expires = new Date();
                    expires.setMinutes(expires.getMinutes() + 5);
                    res.writeHead(200, {
                        Location: '/',
                        'Set-Cookie': `userId=${results[0].User_id}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
                    });
                    // res.send({
                    //     "code": 200,
                    //     "success": "login successfull"
                    // });
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            } else {
                res.send({
                    "code":204,
                    "success": "Email does not exists"
                });
            }
        }    
    }) 
}
