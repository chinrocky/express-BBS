insert into users(user_id,UID,user_password,user_name,user_age,
user_sex,user_birthday,user_phone,user_email,user_introduction,user_authority)
values ("tansy","1","123456","赵思成",20,"male","1998-02-16","13076065817",
"12404172@qq.com","大家好，这里是赵思成","admin");

insert into users(user_id,UID,user_password,user_name,user_age,
user_sex,user_birthday,user_phone,user_email,user_introduction,user_authority)
values ("wangxiong","2","123456","王雄",20,"male","1998-02-16","13076065817",
"12404172@qq.com","大家好，这里是王雄","admin");

insert into users(user_id,UID,user_password,user_name,user_age,
user_sex,user_birthday,user_phone,user_email,user_introduction,user_authority)
values ("zhangyi","3","123456","张义",20,"male","1998-02-16","13076065817",
"12404172@qq.com","大家好，这里是张义","member");

insert into users(user_id,UID,user_password,user_name,user_age,
user_sex,user_birthday,user_phone,user_email,user_introduction,user_authority)
values ("chenluojie","4","123456","陈洛杰",20,"male","1998-02-16","13076065817",
"12404172@qq.com","大家好，这里是陈洛杰","member");

insert into users(user_id,UID,user_password,user_name,user_age,
user_sex,user_birthday,user_phone,user_email,user_introduction,user_authority)
values ("chujiaxin","5","123456","储家新",20,"male","1998-02-16","13076065817",
"12404172@qq.com","大家好，这里是储家新","blackList");

insert into users(user_id,UID,user_password,user_name,user_age,
user_sex,user_birthday,user_phone,user_email,user_introduction,user_authority)
values ("lihongbo","6","123456","李洪波",20,"male","1998-02-16","13076065817",
"12404172@qq.com","大家好，这里是李洪波","blackList");

insert into post(UID,post_theme,post_time,post_module,post_read_amount,post_favor_amount,post_comment_amount,post_newest_comment) 
values ("1","赵思成发的贴","2018-12-9 1:00:00","work",0,0,0,"2018-12-9 2:00:00");

insert into post(UID,post_theme,post_time,post_module,post_read_amount,post_favor_amount,post_comment_amount,post_newest_comment) 
values ("2","王雄发的贴","2018-12-9 2:00:00","work",0,0,0,"2018-12-9 5:00:00");

insert into post(UID,post_theme,post_time,post_module,post_read_amount,post_favor_amount,post_comment_amount,post_newest_comment) 
values ("3","张义发的贴","2018-12-9 3:00:00","work",0,0,0,"2018-12-9 4:00:00");

insert into post(UID,post_theme,post_time,post_module,post_read_amount,post_favor_amount,post_comment_amount,post_newest_comment) 
values ("4","陈洛杰发的贴","2018-12-9 4:00:00","work",0,0,0,"2018-12-9 5:00:00");

insert into post(UID,post_theme,post_time,post_module,post_read_amount,post_favor_amount,post_comment_amount,post_newest_comment) 
values ("5","储家新发的贴","2018-12-9 5:00:00","work",0,0,0,"2018-12-9 5:00:00");

insert into post(UID,post_theme,post_time,post_module,post_read_amount,post_favor_amount,post_comment_amount,post_newest_comment) 
values ("6","李洪波发的贴","2018-12-9 6:00:00","work",0,0,0,"2018-12-9 6:00:00");




insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(1,1,"这里是1号帖子的一楼，存储一号帖的内容","1","2018-12-9 1:00:00");

insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(2,1,"这里是2号帖子的一楼，存储二号帖的内容","2","2018-12-9 2:00:00");

insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(3,1,"这里是3号帖子的一楼，存储三号帖的内容","3","2018-12-9 3:00:00");

insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(4,1,"这里是4号帖子的一楼，存储四号帖的内容","4","2018-12-9 4:00:00");

insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(5,1,"这里是5号帖子的一楼，存储五号帖的内容","5","2018-12-9 5:00:00");

insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(6,1,"这里是6号帖子的一楼，存储六号帖的内容","6","2018-12-9 6:00:00");

insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(1,2,"这里是1号帖子的二楼，由UID为2的用户回复","2","2018-12-9 2:00:00");

insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(2,2,"这里是2号帖子的二楼，由UID为1的用户回复","1","2018-12-9 3:00:00");

insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(2,3,"这里是2号帖子的三楼，由UID为3的用户回复","3","2018-12-9 4:00:00");

insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(3,2,"这里是3号帖子的二楼，由UID为1的用户回复","1","2018-12-9 4:00:00");

insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(4,2,"这里是4号帖子的二楼，由UID为1的用户回复","1","2018-12-9 5:00:00");

insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(2,4,"这里是2号帖子的四楼，由UID为4的用户回复","4","2018-12-9 5:00:00");



insert into reply(post_id,floor_num,UID_reply,UID_replied,reply_time,reply_content)
values (1,2,"1","2","2018-12-9 3:00:00","1号贴2楼，UID为1的用户对UID为2的用户的回复"); 

insert into reply(post_id,floor_num,UID_reply,UID_replied,reply_time,reply_content)
values (2,2,"2","1","2018-12-9 4:00:00","2号贴2楼，UID为2的用户对UID为1的用户的回复"); 

insert into reply(post_id,floor_num,UID_reply,UID_replied,reply_time,reply_content)
values (2,3,"2","1","2018-12-9 5:00:00","2号贴3楼，UID为2的用户对UID为1的用户的回复"); 

insert into reply(post_id,floor_num,UID_reply,UID_replied,reply_time,reply_content)
values (2,3,"1","2","2018-12-9 6:00:00","2号贴3楼，UID为1的用户对UID为2的用户的回复");

insert into reply(post_id,floor_num,UID_reply,UID_replied,reply_time,reply_content)
values (4,2,"4","1","2018-12-9 6:00:00","4号贴2楼，UID为4的用户对UID为1的用户的回复");

insert into reply(post_id,floor_num,UID_reply,UID_replied,reply_time,reply_content)
values (4,2,"1","4","2018-12-9 7:00:00","4号贴2楼，UID为1的用户对UID为4的用户的回复"); 
 
