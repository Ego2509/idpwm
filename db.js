const mysql = require('mysql');

const connection_parameters={
    host:"localhost",
    user:"ego2509",
    password:"jpg",
    database:"db_idpwm" 
}


let connection = mysql.createConnection(connection_parameters);

connection.connect((err)=> {
  if (err) throw err;
  console.log(`db ${connection_parameters.database} connected.`);
});

exports.db=connection /*same as module.exports.db*/