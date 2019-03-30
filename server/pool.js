//1:引入mysql库
const mysql = require("mysql");
//2:创建连接池
var pool = mysql.createPool({
  host     : process.env.MYSQL_HOST,
  port     : process.env.MYSQL_PORT,
  user     : process.env.ACCESSKEY,
  password : process.env.SECRETKEY,
  database : 'app_' + process.env.APPNAME,
  connectionLimit:20
});
//3:导出连接池对象
module.exports = pool;