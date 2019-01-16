var express = require('express');
var router = express.Router();
const connection = require('./database.js');

/////后台交互。包括：显示帖子，显示用户，拉黑名单，取消黑名单； 帖子置顶，取消置顶
////用于生日转换格式
function timeFunc1(myDate ){
	Y = myDate.getFullYear() + '-';
	M = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1) + '-';
	D = myDate.getDate() + ' ';

	return Y+M+D;
// 输出结果：2014-04-23
}

////用于发帖时间转换格式
function timeFunc2(myDate ){
	Y = myDate.getFullYear() + '-';
	M = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1) + '-';
	D = myDate.getDate() + ' ';
	h = myDate.getHours() + ':';
	m = myDate.getMinutes() + ':';
	s = myDate.getSeconds();

	return Y+M+D+h+m+s;
// 输出结果：2014-04-23 18:55:49
}
////显示帖子，用于管理
router.get('/showPosts',function(req,res,next){
	let sql ="select * from post;";
	connection.query(sql, function(error, result, fields) {
		if (error){
			console.log("显示错误！");
			console.log(error);    ////代替throw error 的错误
			return res.send({flag:false});
			// throw error;
		}
		if(result[0]){
			////当数据存在，将所有的发帖时间经过处理再返回
			console.log(result.length);
			for(let i=0;i<result.length   ;i++){
				let myDate1 = result[i].post_time;
				let myDate2=result[i].post_newest_comment;

				result[i].post_time=timeFunc2(myDate1 );
				result[i].post_newest_comment=timeFunc2(myDate2);
			}

			console.log("显示成功！");
			return res.send(result);
		}
	});
});

//// 置顶帖子， if_topping设置为true
router.get('/topping',function(req,res,next){
	let sql ="update post set if_topping = true where post_id=?;";     //////////////////////////group by语句。
	let sqlparams = [req.query.post_id];
	connection.query(sql, sqlparams, function(error, result, fields) {
		if (error){
			console.log("置顶错误！");
			console.log(error);    ////代替throw error 的错误
			return res.send({flag:false});
			// throw error;
		}
		if(result.affectedRows!==0){
			console.log("置顶成功！");
			return res.send({flag:true,result:result});
		}
		else{
			console.log("没有这一条");
			return res.send({flag:false});
		}

	});

});

//// 取消置顶帖子， if_topping设置为false
router.get('/untopping',function(req,res,next){
	let sql ="update post set if_topping = false where post_id=?;";     //////////////////////////group by语句。
	let sqlparams = [req.query.post_id];
	connection.query(sql, sqlparams, function(error, result, fields) {
		if (error){
			console.log("取消置顶错误！");
			console.log(error);
			return res.send({flag:false});
			//throw error;
		}
		if(result.affectedRows!==0){
			console.log("取消置顶成功！");
			return res.send({flag:true,result:result});
		}
		else{
			console.log("没有这一条");
			return res.send({flag:false});
		}
	});
});

////显示普通用户，用于管理
router.get('/showMember',function(req,res,next){
	let sql ="select * from users where user_authority='member';";
	connection.query(sql, function(error, result, fields) {
		if (error){
			console.log("显示错误！");
			console.log(error);    ////代替throw error 的错误
			return res.send({flag:false});
			// throw error;
		}
		if(result[0]){
			////返回数据之前，要将生日做处理，转为y-m-d格式。由于有些人每填生日，因此还要判断if。
			console.log(result.length);
			for(let i=0;i<result.length   ;i++){
				if(result[i].user_birthday!==null){
					let myDate1 = result[i].user_birthday;
					result[i].user_birthday=timeFunc1(myDate1 );
				}
			}
			console.log("显示成功！");
			return res.send(result);
		}
	});
});

////显示管理员用户，用于管理
router.get('/showAdmin',function(req,res,next){
	let sql ="select * from users where user_authority='admin';";     //////////////////////////group by语句。
	connection.query(sql, function(error, result, fields) {
		if (error){
			console.log("显示错误！");
			console.log(error);    ////代替throw error 的错误
			return res.send({flag:false});
			// throw error;
		}
		if(result[0]){
			for(let i=0;i<result.length   ;i++){
				if(result[i].user_birthday!==null){
					let myDate1 = result[i].user_birthday;
					result[i].user_birthday=timeFunc1(myDate1 );
				}
			}
			console.log("显示成功！");
			return res.send(result);
		}
	});
});

////显示黑名单用户，用于管理
router.get('/showBlackList',function(req,res,next){
	let sql ="select * from users where user_authority='blackList';";     //////////////////////////group by语句。
	connection.query(sql, function(error, result, fields) {
		if (error){
			console.log("显示错误！");
			console.log(error);    ////代替throw error 的错误
			return res.send({flag:false});
			// throw error;
		}
		if(result[0]){
			for(let i=0;i<result.length   ;i++){
				if(result[i].user_birthday!==null){
					let myDate1 = result[i].user_birthday;
					result[i].user_birthday=timeFunc1(myDate1 );
				}
			}
			console.log("显示成功！");
			return res.send(result);
		}
	});
});

//////// 拉黑名单，用用户名更好表示
router.get('/blackList',function(req,res,next){
	let blackPassword='jQju8/-qD<!Z}r*OdH'; ////黑名单用户的密码。

	let sql1 ="select user_password from users where user_id=?;";     //////////////////////////group by语句。
	let sqlparams1 = [ req.query.user_id];
	connection.query(sql1,sqlparams1, function(error, result, fields) {
		if (error){
			console.log("拉黑求密码错误！");
			console.log(error);    ////代替throw error 的错误
			return res.send({flag:false});
			// throw error;
		}
		if(result[0]){
			let sql2 ="insert into black values(?,?); update users set user_authority='blackList', user_password=? where user_id= ?; ";
			let sqlparams2 = [req.query.user_id,  result[0].user_password,  blackPassword,  req.query.user_id];
			connection.query(sql2, sqlparams2, function(error, result1, fields) {
				if (error){
					console.log("拉黑出错！");
					console.log(error);
					return res.send({flag:false});
					//throw error;
				}
				if(result1.affectedRows!==0){
					console.log("拉黑成功！");
					return res.send({flag:true,result:result1});
				}
				else{
					console.log("没有这一条");
					return res.send({flag:false});
				}
			});

		}
	});
});

//////// 取出黑名单
router.get('/outBlackList',function(req,res,next){
	let sql1 ="select user_password from black where user_id=?;";
	let sqlparams1 = [ req.query.user_id];
	connection.query(sql1,sqlparams1, function(error, result, fields) {
		if (error){
			console.log("求密码错误！");
			console.log(error);    ////代替throw error 的错误
			return res.send({flag:false});
			// throw error;
		}
		if(result[0]){
			let sql2 ="delete from black where user_id=? ; update users set user_authority='member', user_password=? where user_id= ?; ";
			let sqlparams2 = [req.query.user_id,  result[0].user_password,   req.query.user_id];
			connection.query(sql2, sqlparams2, function(error, result1, fields) {
				if (error){
					console.log("取消黑名单错误！");
					console.log(error);
					return res.send({flag:false});
					//throw error;
				}
				if(result.affectedRows!==0){
					console.log("取出黑名单成功！");
					return res.send({flag:true,result:result});
				}
				else{
					console.log("没有这一条");
					return res.send({flag:false});
				}
			});

		}
	});

});

//delete from post where post_id=1;
//////// 删除帖子。先解除外键限制，然后删除楼层和帖子
router.get('/deletePost',function(req,res,next){

	let sql = "call delete_post(?);";
	let sqlparams = [req.query.post_id];
	connection.query(sql, sqlparams, function(error, result, fields) {
		if (error) {
			console.log("删除错误！");
			console.log(error);    ////代替throw error 的错误
			return res.send({flag: false});
			// throw error;
		}
		else{
			console.log(result ) ;
			if(result[0][0].result_code===0){
				console.log("删除帖子成功！");
				return res.send({flag:true});
			}
			else{
				console.log("存储过程删帖失败");
				return res.send({flag:false});
			}
		}
	});

	// let sql ="SET FOREIGN_KEY_CHECKS = 0;"; //解除级联限制
	// connection.query(sql, function(error, result, fields) {
	// 	if (error){
	// 		console.log("删除错误！");
	// 		console.log(error);    ////代替throw error 的错误
	// 		return res.send({flag:false});
	// 		// throw error;
	// 	}
	// 	////同时删除楼层和帖子，不涉及回复。
	// 	sql ="delete floor,post from post join floor on post.post_id=floor.post_id where post.post_id = ?;";
	// 	let sqlparams = [req.query.user_id];
	// 	connection.query(sql, sqlparams, function(error, result, fields) {
	// 		if (error) {
	// 			console.log("删除错误！");
	// 			console.log(error);    ////代替throw error 的错误
	// 			return res.send({flag: false});
	// 			// throw error;
	// 		}
	// 		sql ="SET FOREIGN_KEY_CHECKS = 0;";
	// 		connection.query(sql, function(error, result, fields) {
	// 			if(error){
	// 				console.log("改回权限失败！");
	// 				return res.send({flag: false});
	// 			}
	// 			console.log("删除成功！");
	// 			return res.send({flag:true});
	// 		});
	// 	});
	// });
});



module.exports = router;
