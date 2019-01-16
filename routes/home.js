var express = require('express');
var router = express.Router();
const connection = require('./database.js');


///// 主页，显示9个板块的5个帖子。
router.get('/homePage',function(req,res,next){
	let sql = "select * from post where post_module =? order by post_newest_comment DESC limit 0,5;" ;
	let sqlparams = [req.query.post_module ];
	connection.query(sql,sqlparams, function(error, result, fields) {
		if (error){
			console.log("返回帖子错误！");
			console.error(error);
			return res.send({flag:false});
			//throw error;
		}
		if(result[0]){
			console.log("读取帖子列表成功");
			console.log(result);
			res.send( {flag:true, result:result } ); ////发送所有的帖子
		}
	});
});

/////获取跑马灯，返回跑马灯的图片地址，和跳转的网址
router.get('/getMarquee',function(req,res,next){
	let imageUrl = 'http://turbulent.cn:5000/images/';
	let post_id1="3";
	var marque = {image1:imageUrl+'1.jpg'  , post_id1:post_id1, image2:imageUrl+'2.jpg'  , post_id2:post_id1, image3:imageUrl+'3.jpg'  , post_id3:post_id1, image4:imageUrl+'4.jpg'  , post_id4:post_id1, image5:imageUrl+'5.jpg'  , post_id5:post_id1 };
	return res.send( {flag:true, marque:marque} );
});

module.exports = router;