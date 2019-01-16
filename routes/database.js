const mysql = require('mysql');

var connection =mysql.createConnection({
	host:'localhost',
	//host:'turbulent.cn',
	user:'root',
	password:'86561961gg',
	// password:'abcStart3',
	port:3306,
	database:'bbs_forum', // newNodejs   new_for_nodejs
	useConnectionPooling: true,  ////连接池，断开DB连接后可以重新开启
	multipleStatements:true,     ////多重语句查询
});


module.exports = connection;

