create database bbs_forum;

use bbs_forum;
drop table post;
drop table floor;
drop table reply;

create table users(
	user_id VARCHAR(30) NOT NULL,        -- 帐号
    UID CHAR(60) NOT NULL primary key,   -- 生成的唯一标识符
    user_password VARCHAR(30) NOT NULL, -- 密码
    user_name VARCHAR(30) NOT NULL,     -- 昵称
    avatarUrl varchar(100) not null default 'http://turbulent.cn:5000/images/default.png',
    user_age INT,
	user_sex enum('male','female'),
    user_birthday DATE,
	user_phone CHAR(20),
    user_email CHAR(30),
    user_introduction VARCHAR(200),
	user_authority enum('visitor','member','admin','blackList')
);

create table post(
	post_id INT primary key auto_increment,
    UID CHAR(60) NOT NULL,
	post_theme VARCHAR(50) NOT NULL,
    post_time DATETIME NOT NULL,
    post_module enum('人文艺术','学术研究','技术交流','休闲娱乐','出国留学','就业创业','新生专区','考试专区','失物招领') NOT NULL,
    post_read_amount INT default 0,
    post_favor_amount INT default 0,
    post_comment_amount INT default 0,
    post_newest_comment DATETIME NOT NULL,
    if_topping boolean default false,
	constraint POST_FK foreign key(UID) references users(UID)
    on update cascade

)auto_increment = 0;

create table floor(
	post_id INT NOT NULL,
    floor_num INT NOT NULL,
    floor_content VARCHAR(1000) NOT NULL,
	UID CHAR(60) NOT NULL,
    floor_time DATETIME NOT NULL,
    constraint FLOOR_PK primary key(post_id,floor_num),
    constraint FLOOR_POST_FK foreign key(post_id) references post(post_id)
    on update cascade,
    constraint FLOOR_USERS_FK foreign key(UID) references users(UID)
    on update cascade
);

create table reply(
	reply_id INT NOT NULL primary key auto_increment,
    post_id INT NOT NULL,
    floor_num INT NOT NULL,
    UID_reply CHAR(60) NOT NULL,
    UID_replied CHAR(60) NOT NULL,
    reply_time DATETIME NOT NULL,
    reply_content VARCHAR(500) NOT NULL,

    constraint REPLY_FLOOR_FK foreign key(post_id,floor_num) references floor(post_id,floor_num)
    on update cascade,
    constraint REPLY_USERS_FK1 foreign key(UID_reply) references users(UID)
    on update cascade,
    constraint REPLY_USERS_FK2 foreign key(UID_replied) references users(UID)
    on update cascade
)auto_increment = 0;

insert into users(user_id,UID,user_password,user_name,user_age,
user_sex,user_birthday,user_phone,user_email,user_introduction,user_authority)
values ("tansy","1","123456","tansy",20,"male","1998-02-16","13076065817",
"12404172@qq.com","hello","visitor");

insert into users(user_id,UID,user_password,user_name,user_age,
user_sex,user_birthday,user_phone,user_email,user_introduction,user_authority)
values ("zhangsan","2","123456","张三", 28, "male", "1988-01-01",  "1332332233",
"10241024@qq.com","hello","member");

insert into post(UID,post_theme,post_time,post_module,post_read_amount,post_favor_amount,post_comment_amount,post_newest_comment)
values ("1","hello world","2018-12-9 21:05:00","人文艺术",0,0,0,"2018-12-9 22:00:00");

insert into floor(post_id,floor_num,floor_content,UID,floor_time)
values(1 ,2,"this is floor2","1","2018-12-9 22:00:00");

insert into reply(post_id,floor_num,UID_reply,UID_replied,reply_time,reply_content)
values (1,2,"1","2","2018-12-10 22:00:00","this is user1 to user2 at post1 floor2");


select * from users;
select * from post;
select * from floor;
select * from reply;

