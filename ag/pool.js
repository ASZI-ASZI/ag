//引入mysql模块
const mysql = require('mysql');
//创建连接对象
let pool = mysql.createPool({
  host: 'localhost',
  port: '3307',
  user: 'root',
  password: '',
  database: 'ag',
  multipleStatements: true,  //允许query执行多条SQL语句
  connectionLimit: 15
});

//导出连接池对象
module.exports = pool;