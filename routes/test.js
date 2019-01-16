var express = require('express');
var router = express.Router();


router.get('/',function(req,res, next){
	var test_data = {'name': "张三", 'gender':"男", 'age':''};
	var test_data2 = {name: "张三", gender:'男', age:'18', college:'信软', grade:'新生'};
	res.setHeader('Access-Control-Allow-Origin','*');
	res.send(test_data2);

});


module.exports=router;
