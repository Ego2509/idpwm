const mysql = require('mysql');

const connection_parameters={
    host:"localhost",
    // port:3306,
    user:"root",
    password:"jpg",
    database:"db_idpwm" 
}

//what I did to get it working due to the conf of the server:
//https://stackoverflow.com/questions/44946270/er-not-supported-auth-mode-mysql-server
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'jpg';
//SELECT User,plugin From mysql.use; <- to show changes

let connection = mysql.createConnection(connection_parameters);


connection.connect((err)=> {
  if (err) throw(err);
  console.log(`db ${connection_parameters.database} connected.`);
});


exports.db=connection /*same as module.exports.db*/