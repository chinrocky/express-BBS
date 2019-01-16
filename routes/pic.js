var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const images=path.resolve(__dirname, '../public/images/a.jpg');
const htmls=path.resolve(__dirname, '../public/images/b.html');

router.get('/',function(req,res, next){
	console.log(images);
	//res.setHeader('Content-Type','binary');   ////html，jpg都不需要设置头部，默认能返回

	// res.header("Access-Control-Allow-Origin", "*");
	// res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");


	////方法一：sendFile，直接返回路径images或htmls
	// res.sendFile(htmls);

	res.sendFile(images);


	////方法二：先用readFile读取文件（binary），然后再用write发送，用end结束。注意，用write需要搭配end(),否则加载不会停止，只会超时。因为write
	// res.writeHead(200,  "OK");
	// var content= fs.readFileSync(images,  'binary');
	// var content2 = fs.readFileSync(htmls);
	// res.write(content, 'binary');
	// // res.write(content2);
	// res.end();
});


module.exports=router;












