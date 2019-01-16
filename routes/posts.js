var express = require('express');
var router = express.Router();
const connection = require('./database.js');

///// 进入板块内部，帖子列表。  输入：页数，板块。输出20条帖子；如果没有帖子，则返回false
router.get('/postList',function(req,res,next){
	let start_num = (req.query.page-1) * 20;
	console.log(start_num);
	let sql = "select * from post where post_module =? order by if_topping desc, post_newest_comment DESC limit ?,20;" ;
	let sqlparams = [req.query.post_module, start_num ];
	connection.query(sql,sqlparams, function(error, result, fields) {
		if (error) throw error;
		if(result[0]){
			console.log("读取帖子列表成功");
			console.log(result);
			res.send( {flag:true, result:result } ); ////发送所有的帖子
		}
		else{
			console.log("没有那么多数据");
			res.send({flag:false});
		}
	});
});

//// 查看帖子内楼层内容。同时增加阅读数
///使用mysql复合语句，好用得很
//////select * from other_article_info where post_id=?
////select users, article

router.get('/postContent',function(req,res,next){
	let sql = "select * from all_floor where post_id=? order by floor_num ASC; update post set post_read_amount = post_read_amount+1 where post_id=?" ;
	let sqlparams =[ req.query.post_id, req.query.post_id, req.query.post_id];
	connection.query(sql,sqlparams, function(error, result, fields) {
		if (error) throw error;
		if(result[0]){
			console.log("读取楼层内容成功");
			console.log(result);
			res.send( {flag:true, result:result[0] } ); ////发送所有的楼层

		}
		else{
			console.log("没有那么多数据");
			res.send({flag:false});
		}
	});
});

////发帖。同时修改帖子post和层floor。 先取得目前帖子数，+1算出post_id,然后插入到floor
router.get('/addPost',function(req,res,next){
	// let myDate = new Date();
	// let post_time = myDate.toLocaleString();
	let post_time =timeFunc();
	let sql="call put_post(?, ?, ?, ?, ?);";
	console.log(req.query);
	let sqlparams= [req.query.UID, req.query.post_theme, post_time, req.query.post_module, req.query.floor_content];
	connection.query(sql, sqlparams, function(error, result, fields) {
		console.log(result);
		if (error) {
			console.log("发帖错误！");
			return res.send({flag: false});
		}
		else{
			if(result[0][0].result_code===0){
				console.log("发帖成功！");
				return res.send({flag:true});
			}
			else{
				console.log("存储过程发帖失败");
				return res.send({flag:false});
			}
		}
	});

	////post_id是自增生成的，不需要手动计算。已经有了存储过程，用存储过程替代
	// let sql ="select max(post_id) as max_p from post;";
	// connection.query(sql, function(error, result, fields){
	// 	if (error) throw error;
	// 	if(result[0]){
	// 		let post_id = result[0].max_p+1;
	// 		sql = "insert into post( UID, post_theme, post_time, post_module, post_newest_comment) values(?, ?, ?, ?, ?, ?)" ;
	// 		let sqlparams =[ req.query.UID, req.query.post_theme, post_time, req.query.post_module, post_time];
	// 		////先插入到帖子中，成功再插入到楼层中
	// 		connection.query(sql, sqlparams,  function(error, result, fields) {
	// 			if (error){
	// 				console.log("发帖错误1！");
	// 				res.send({flag:false});
	// 				throw error;
	// 			}
	//
	// 			sql= "insert into floor(post_id, floor_num, floor_content, UID, floor_time) values(?, 1, ?, ?, ?)";
	// 			sqlparams=[post_id, req.query.floor_content, req.query.UID, post_time];
	// 			////插入第一楼
	// 			connection.query(sql, sqlparams,  function(error1, result1, fields) {
	// 				if (error1){
	// 					console.log("发帖错误2！");
	// 					res.send({flag:false});
	// 					throw error1;
	// 				}
	// 				console.log(result[0]); ////插入操作是没有返回值的
	// 				console.log("发帖成功！");
	// 				res.send({flag:true});
	// 			});
	// 		});
	// 	}
	// });
});

////跟帖.同时修改帖子post和层floor。先取得目前楼层数，+1算出floor_num, 然后插入到floor。最后更新post
router.get('/followPost',function(req,res,next){
	// let myDate = new Date();
	// let floor_time = myDate.toLocaleString();
	let floor_time=timeFunc();
	console.log(floor_time);

	let sql ="select max(floor_num) as max_f from floor where post_id =?;";     //////////////////////////group by语句。
	let sqlparams = [req.query.post_id];
	connection.query(sql, sqlparams, function(error, result, fields) {
		if (error){
			console.log("跟帖错误0！");
			res.send({flag:false});
			throw error;
		}
		if(result[0]){
			let floor_num = result[0].max_f +1;  ////楼层号，已有楼层+1
			sql ="insert into floor(post_id, floor_num, floor_content, UID, floor_time) values(?, ?, ?, ?, ?)";
			sqlparams=[req.query.post_id,  floor_num ,req.query.floor_content, req.query.UID, floor_time];
			////先插入新楼层
			connection.query(sql,sqlparams, function(error1, result1, fields) {
				if (error1){
					console.log("跟帖错误1！");
					console.error(error1);
					return res.send({flag:false});
				}

				sql = "update post set post_comment_amount=post_comment_amount+1, post_newest_comment = ? where post_id =?"; ////评论数+1，最新回复时间更新
				sqlparams= [floor_time, req.query.post_id];
				////第二步更新帖子的最新回复时间,评论数
				connection.query(sql,sqlparams, function(error2, result2, filds){
					if (error2){
						console.log("跟帖错误2！");
						console.error(error2);
						return res.send({flag:false});
					}
					console.log("跟帖成功！");
					res.send({flag:true});
				});
			});
		}
	});
});



////回复帖子，暂时不做
router.get('/reply',function(req,res,next){

});


////帖子点赞。 注意存在重复点赞的问题没解决
router.get('/favor',function(req,res,next){
	let sql = "update post set post_favor_amount=post_favor_amount+1 where post_id=?;" ;
	let sqlparams =[req.query.post_id];
	connection.query(sql,sqlparams, function(error, result, fields) {
		if (error){
			console.log("点赞错误！");
			console.error(error);
			return res.send({flag:false});
		}

		console.log("点赞成功成功");
		return res.send({flag:true});
	});
});

////帖子搜索，纯靠数据库
router.get('/search',function(req,res,next){
	let sql = 'select * from post where post_theme LIKE ?; ' ;
	let sqlparams =["%"+ req.query.keyword + "%" ];
	connection.query(sql,sqlparams, function(error, result, fields) {
		if (error){
			console.log("搜索错误！");
			console.error(error);
			return res.send({flag:false});
		}

		console.log("搜索成功");
		console.log(result);
		return res.send({flag:true, result:result});
	});
});

////帖子内的标题和个人信息
router.get('/postOtherInfo',function(req,res,next){
	let sql = 'select * from users U join post P on P.UID=U.UID where P.post_id=? ; ' ;
	let sqlparams =[req.query.post_id];
	connection.query(sql,sqlparams, function(error, result, fields) {
		if (error){
			console.log("搜索错误！");
			console.error(error);
			return res.send({flag:false});
		}

		console.log("搜索成功");
		console.log(result);
		return res.send({flag:true, result:result});
	});
});

// 生成这样的时间格式 yyyy-MM-dd hh:mm:ss
function timeFunc(){
	let myDate = new Date();
	Y = myDate.getFullYear() + '-';
	M = (myDate.getMonth()+1 < 10 ? '0'+(myDate.getMonth()+1) : myDate.getMonth()+1) + '-';
	D = myDate.getDate() + ' ';
	h = myDate.getHours() + ':';
	m = myDate.getMinutes() + ':';
	s = myDate.getSeconds();

	return Y+M+D+h+m+s;
// 输出结果：2014-04-23 18:55:49
}

////阅读，点赞，评论数
module.exports = router;
