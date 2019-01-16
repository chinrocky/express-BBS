var express = require('express');
var router = express.Router();
const connection = require('./database.js');
// var multer = require('multer');
// var upload = multer({dest: path.resolve(__dirname, '../public/images/')});

////个人空间，注册，登录
/* GET users listing. */
router.get('/', function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin','*');
	//res.send('respond with a resource1');
	var myDate = new Date();
	var mytime=myDate.toLocaleTimeString();     //获取当前时间
	myDate.toLocaleString();        //获取日期与时间
	// console.log(myDate.toLocaleDateString());
	// console.log(mytime);
	// console.log(myDate.toLocaleString());


	Y = myDate.getFullYear() + '-';
	M = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1) + '-';
	D = myDate.getDate() + ' ';
	h = myDate.getHours() + ':';
	m = myDate.getMinutes() + ':';
	s = myDate.getSeconds();
	console.log(Y+M+D+h+m+s); //呀麻碟

	res.end();
});


////注册
router.get('/register', function(req, res, next){
	console.log('query::');
	console.log(req.query);

	////验证是否重复
	let sql = "select user_id from users;" ;
	connection.query(sql, function(error, result, fields) {
		if (error) throw error;

		////验证帐号是否已存在
		for(let i=0; i<result.length; i++){
			if(result[i].user_id === req.query.user_id){
				console.log("帐号已存在！");
				return res.send({flag:false} );
			}
		}
		//// 默认UID不可能重复，因为有18位随机数
		let UID = makeCode();

		////存入数据库
		sql="insert into users(user_id, UID, user_password, user_name, user_authority) values(?, ?, ?, ?, ?)";
		let sqlparams =[req.query.user_id,  UID,   req.query.user_password,   req.query.user_name, 'member'];

		connection.query(sql,sqlparams,function(error, result, fields) {
			if (error){
				res.send({flag:false});
				throw error;
			}
			////传回UID给前端使用
			console.log('存入数据库成功');
			return res.send( {"UID": UID, "flag":true}  );

		});
	});

	////验证是否已有重复数据， 存入数据库：帐号、密码、昵称
});

////登录
router.get('/login', function(req, res, next){
	////验证帐号密码是否正确。正确则传回正确登录的UID。
	let sql = "select * from users where user_id=?" ;
	let sqlparams =[req.query.user_id];
	connection.query(sql,sqlparams, function(error, result, fields) {
		if (error){
			console.log("登录错误！");
			console.log(error);
			return res.send({flag:false});
			//throw error;
		}
		if(result[0].user_id ===req.query.user_id && result[0].user_password===req.query.user_password   ){
			console.log("登陆成功");
			console.log(result[0].UID);
			////JSON大法好
			res.send(  {"UID":result[0].UID, "user_name":result[0].user_name  , flag:true }  );///////////////////////////////////////////////////
		}
		else{
			console.log("帐号密码错误");
			res.send({flag:false});
		}
	});
} );

////个人主页加载。   注意：生日还有待处理
router.get('/profile', function(req, res, next){
	//// 用UID访问数据库，并取回个人数据
	let sql = "select user_name,user_age,user_sex,user_birthday,user_phone,user_email,user_introduction,user_authority  from users where UID=?;" ;
	let sqlparams =[req.query.UID];
	connection.query(sql,sqlparams, function(error, result, fields) {
		if (error) throw error;
		if(result[0]){
			console.log("读取个人主页成功");
			////将生日格式转为年月日。要加If
			if(result[0].user_birthday!==null){
				let myDate1 = result[0].user_birthday;
				result[0].user_birthday=timeFunc1(myDate1 );
			}
			// let myDate = new Date();
			console.log(result);
			res.send({"result":result[0], flag:true});    ///////////////////////////////////////////////////可能要改
		}
		else{
			console.log("加载个人主页出错");
			res.send({flag:false});
		}
	});
	// var userData = {name: "张三", gender:'男', age:'18'};
	// res.send(userData);
});

////个人主页修改更新
router.get('/update_profile', function(req,res,next){
	///将所有数据都更新一遍
	let sql = "update users set user_name=?,user_age=?,user_sex=?,user_birthday=?,user_phone=?,user_email=?,user_introduction=? where UID =?" ;
	let sqlparams =[req.query.user_name, req.query.user_age, req.query.user_sex, req.query.user_birthday, req.query.user_phone, req.query.user_email, req.query.user_introduction, req.query.UID];
	connection.query(sql,sqlparams, function(error, result, fields) {
		if (error) {
			console.log("个人主页更新错误！");
			console.log(error);    ////代替throw error 的错误
			return res.send({flag: false});
			// throw error;
		}
		else{
			console.log("个人主页更新成功");
			console.log(result);
			res.send({ flag:true});
		}
	});
});

////个人发帖列表,用UID取出
router.get('/myPosts', function(req,res,next){
	//// 用UID访问数据库，并取回发帖数据
	let sql = "select P.post_id, P.post_theme, P.post_time, U.user_name, U.user_id  from post P join users U on P.UID=U.UID where P.UID=?;;" ;  ////获取帖子id，标题，发布时间
	let sqlparams =[req.query.UID];
	connection.query(sql,sqlparams, function(error, result, fields) {
		if (error) throw error;
		if(result[0]){
			console.log("获取发帖成功");
			for(let i=0;i<result.length   ;i++){
				let post_time = result[i].post_time;
				result[i].post_time=timeFunc2(post_time );
				console.log(result[i].post_time);
			}

			res.send({"result":result, flag:true});///////////////////////////////////////////////////可能要改
		}
		else{
			console.log("获取发帖失败！");
			res.send({flag:false});
		}
	});
});

////个人删帖，只能删自己的帖子。
router.get('/delete_myPosts', function(req,res,next){
	//// 用UID访问数据库，并取回发帖数据
	let sql = "select * from post where post_id=? and UID = ? ; " ;  ////验证是否有结果
	let sqlparams =[req.query.post_id, req.query.UID];
	connection.query(sql,sqlparams, function(error, result, fields) {
		if (error) {
			console.log("个人删帖错误！");
			console.log(error);    ////代替throw error 的错误
			return res.send({flag: false});
			// throw error;
		}
		/////如果有返回说明有UID和帖子匹配的向，执行删除； 否则说明没有，拒绝删除非本人的帖子
		if(result[0]){
			sql = "call delete_post(?);";
			sqlparams = [req.query.post_id];
			connection.query(sql, sqlparams, function(error, result, fields) {
				if (error) {
					console.log("个人删除错误！");
					console.log(error);    ////代替throw error 的错误
					return res.send({flag: false});
					// throw error;
				}
				///////删除成功和删除失败
				else{
					console.log(result ) ;
					if(result[0][0].result_code===0){
						console.log("个人删帖成功！");
						return res.send({flag:true});
					}
					else{
						console.log("存储过程删帖失败");
						return res.send({flag:false});
					}
				}
			});
		}
		else{
			console.log("个人删帖数据不匹配！");
			return res.send({flag:false});
		}
	});
});

////修改密码
router.get('/changePassword', function(req,res,next){
	//// 用UID找人，然后更改密码
	let sql = "update users set user_password =? where UID=?" ;  ////
	let sqlparams =[req.query.user_password  ,req.query.UID];
	connection.query(sql,sqlparams, function(error, result, fields) {
		if (error) {
			console.log("修改密码错误！");
			console.log(error);    ////代替throw error 的错误
			return res.send({flag: false});
			// throw error;
		}
		else{
			console.log("修改密码成功");
			res.send({ flag:true});///////////////////////////////////////////////////可能要改
		}
	});
});

////上传头像， 修改头像
// router.post('/changeAvatar', upload.single('avatar'), function(req, res, next) {
// 	let file = req.file;
// 	let body = req.body;
// 	console.log(file);
// 	console.log(body);
//
// 	// var name =  '_sub_' +file.originalname;
// 	// console.log(name);
// 	// fs.renameSync(file.destination+'/' + file.filename, name);
//
// 	//// 用UID找人，然后改头像url
// 	let sql = "update users set avatarUrl =? where UID=?" ;  ////
// 	let sqlparams =[req.query.avatarUrl  ,req.query.UID];
// 	connection.query(sql,sqlparams, function(error, result, fields) {
// 		if (error) {
// 			console.log("修改头像错误！");
// 			console.log(error);    ////代替throw error 的错误
// 			return res.send({flag: false});
// 			// throw error;
// 		}
// 		else{
// 			console.log("修改头像成功");
// 			res.send({ flag:true});///////////////////////////////////////////////////可能要改
// 		}
// 	});
// });

function makeCode()
{
	let len = 32;  //我们使用长度为32的code
	var text = "";
	var possible = "1234567890"; //删除部分易混
	var Time= new Date();

	var nowYear=new Date().getFullYear().toString();
	var nowMonth=(new Date().getMonth() + 1).toString();
	var nowDay=new Date().getDate().toString();
	var nowHours= new Date().getHours().toString();       //获取当前小时数(0-23)
	var nowMin= new Date().getMinutes().toString();     //获取当前分钟数(0-59)
	var nowSeconds= new Date().getSeconds().toString();     //获取当前秒数(0-59)
	function timeAdd0(str) {
		if(str.length < 2){
			str='0'+str;
		}
		return str
	}
	nowMonth=timeAdd0(nowMonth);
	nowDay=timeAdd0(nowDay);
	nowHours=timeAdd0(nowHours);
	nowMin=timeAdd0(nowMin);
	nowSeconds=timeAdd0(nowSeconds);

	for(let i=0;i<18;i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	text = text+ nowYear+nowMonth+nowDay+nowHours+nowMin+nowSeconds;  ////18位随机+14位时间 = 32位
	text.toString();
	console.log(text);
	return text;
}

////用于发帖时间转换格式
function timeFunc2(myDate ){
	let Y = myDate.getFullYear() + '-';
	let M = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1) + '-';
	let D = myDate.getDate() + ' ';
	let h = myDate.getHours() + ':';
	let m = myDate.getMinutes() + ':';
	let s = myDate.getSeconds()+ ' ';

	////一位数的添成两位
	function timeAdd0(str) {
		if(str.length < 3){
			str='0'+str;
		}
		return str
	}
	Y=timeAdd0(Y); ///这个是不会执行的
	M=timeAdd0(M);
	D=timeAdd0(D);
	h = timeAdd0(h);
	m = timeAdd0(m);
	s = timeAdd0(s);

	return Y+M+D+h+m+s;

// 输出结果：2014-04-23 18:55:49
}

////用于生日转换格式
function timeFunc1(myDate ){
	Y = myDate.getFullYear() + '-';
	M = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1) + '-';
	D = myDate.getDate() + ' ';

	return Y+M+D;
// 输出结果：2014-04-23
}

module.exports = router;
