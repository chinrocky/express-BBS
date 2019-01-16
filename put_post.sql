use bbs_forum;
DROP PROCEDURE IF EXISTS put_post;
DELIMITER //

create procedure put_post(IN uid varchar(30),IN ptheme varchar(50),IN ptime DATETIME,IN module varchar(20),IN content varchar(1000))
BEGIN
   DECLARE result_code INTEGER DEFAULT 0;
   declare postId INTEGER;
   DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET result_code=1;


   START TRANSACTION;
    insert into post(UID,post_theme,post_time,post_module, post_newest_comment)
       values(uid,ptheme,ptime,module, ptime);
    select last_insert_id() into postId;
    insert into floor(post_id,floor_num,floor_content,UID,floor_time)
       values(postID,1,content,uid,ptime);


   IF result_code = 1 THEN
       ROLLBACK;
   ELSE
       COMMIT;
   END IF;
select result_code;
END ;
//
DELIMITER ;

call put_post("1","人文艺术帖子1","2018-12-15 1:03:00","人文艺术","人文艺术帖子1内容");
call put_post("1","人文艺术帖子2","2018-12-15 2:03:00","人文艺术","人文艺术帖子2内容");
call put_post("1","人文艺术帖子3","2018-12-15 3:03:00","人文艺术","人文艺术帖子3内容");
call put_post("1","人文艺术帖子4","2018-12-15 4:03:00","人文艺术","人文艺术帖子4内容");
call put_post("1","人文艺术帖子5","2018-12-15 5:03:00","人文艺术","人文艺术帖子5内容");
call put_post("1","人文艺术帖子6","2018-12-15 6:03:00","人文艺术","人文艺术帖子6内容");
call put_post("1","学术研究帖子1","2018-12-15 1:03:00","学术研究","学术研究帖子1内容");
call put_post("1","学术研究帖子2","2018-12-15 2:03:00","学术研究","学术研究帖子2内容");
call put_post("1","学术研究帖子3","2018-12-15 3:03:00","学术研究","学术研究帖子3内容");
call put_post("1","学术研究帖子4","2018-12-15 4:03:00","学术研究","学术研究帖子4内容");
call put_post("1","学术研究帖子5","2018-12-15 5:03:00","学术研究","学术研究帖子5内容");
call put_post("1","学术研究帖子6","2018-12-15 6:03:00","学术研究","学术研究帖子6内容");
call put_post("1","技术交流帖子1","2018-12-15 1:03:00","技术交流","技术交流帖子1内容");
call put_post("1","技术交流帖子2","2018-12-15 2:03:00","技术交流","技术交流帖子2内容");
call put_post("1","技术交流帖子3","2018-12-15 3:03:00","技术交流","技术交流帖子3内容");
call put_post("1","技术交流帖子4","2018-12-15 4:03:00","技术交流","技术交流帖子4内容");
call put_post("1","技术交流帖子5","2018-12-15 5:03:00","技术交流","技术交流帖子5内容");
call put_post("1","技术交流帖子6","2018-12-15 6:03:00","技术交流","技术交流帖子6内容");
call put_post("1","休闲娱乐帖子1","2018-12-15 1:03:00","休闲娱乐","休闲娱乐帖子1内容");
call put_post("1","休闲娱乐帖子2","2018-12-15 2:03:00","休闲娱乐","休闲娱乐帖子2内容");
call put_post("1","休闲娱乐帖子3","2018-12-15 3:03:00","休闲娱乐","休闲娱乐帖子3内容");
call put_post("1","休闲娱乐帖子4","2018-12-15 4:03:00","休闲娱乐","休闲娱乐帖子4内容");
call put_post("1","休闲娱乐帖子5","2018-12-15 5:03:00","休闲娱乐","休闲娱乐帖子5内容");
call put_post("1","休闲娱乐帖子6","2018-12-15 6:03:00","休闲娱乐","休闲娱乐帖子6内容");
call put_post("1","出国留学帖子1","2018-12-15 1:03:00","出国留学","出国留学帖子1内容");
call put_post("1","出国留学帖子2","2018-12-15 2:03:00","出国留学","出国留学帖子2内容");
call put_post("1","出国留学帖子3","2018-12-15 3:03:00","出国留学","出国留学帖子3内容");
call put_post("1","出国留学帖子4","2018-12-15 4:03:00","出国留学","出国留学帖子4内容");
call put_post("1","出国留学帖子5","2018-12-15 5:03:00","出国留学","出国留学帖子5内容");
call put_post("1","出国留学帖子6","2018-12-15 6:03:00","出国留学","出国留学帖子6内容");
call put_post("1","就业创业帖子1","2018-12-15 1:03:00","就业创业","就业创业帖子1内容");
call put_post("1","就业创业帖子2","2018-12-15 2:03:00","就业创业","就业创业帖子2内容");
call put_post("1","就业创业帖子3","2018-12-15 3:03:00","就业创业","就业创业帖子3内容");
call put_post("1","就业创业帖子4","2018-12-15 4:03:00","就业创业","就业创业帖子4内容");
call put_post("1","就业创业帖子5","2018-12-15 5:03:00","就业创业","就业创业帖子5内容");
call put_post("1","就业创业帖子6","2018-12-15 6:03:00","就业创业","就业创业帖子6内容");
call put_post("1","新生专区帖子1","2018-12-15 1:03:00","新生专区","新生专区帖子1内容");
call put_post("1","新生专区帖子2","2018-12-15 2:03:00","新生专区","新生专区帖子2内容");
call put_post("1","新生专区帖子3","2018-12-15 3:03:00","新生专区","新生专区帖子3内容");
call put_post("1","新生专区帖子4","2018-12-15 4:03:00","新生专区","新生专区帖子4内容");
call put_post("1","新生专区帖子5","2018-12-15 5:03:00","新生专区","新生专区帖子5内容");
call put_post("1","新生专区帖子6","2018-12-15 6:03:00","新生专区","新生专区帖子6内容");
call put_post("1","考试专区帖子1","2018-12-15 1:03:00","考试专区","考试专区帖子1内容");
call put_post("1","考试专区帖子2","2018-12-15 2:03:00","考试专区","考试专区帖子2内容");
call put_post("1","考试专区帖子3","2018-12-15 3:03:00","考试专区","考试专区帖子3内容");
call put_post("1","考试专区帖子4","2018-12-15 4:03:00","考试专区","考试专区帖子4内容");
call put_post("1","考试专区帖子5","2018-12-15 5:03:00","考试专区","考试专区帖子5内容");
call put_post("1","考试专区帖子6","2018-12-15 6:03:00","考试专区","考试专区帖子6内容");
call put_post("1","失物招领帖子1","2018-12-15 1:03:00","失物招领","失物招领帖子1内容");
call put_post("1","失物招领帖子2","2018-12-15 2:03:00","失物招领","失物招领帖子2内容");
call put_post("1","失物招领帖子3","2018-12-15 3:03:00","失物招领","失物招领帖子3内容");
call put_post("1","失物招领帖子4","2018-12-15 4:03:00","失物招领","失物招领帖子4内容");
call put_post("1","失物招领帖子5","2018-12-15 5:03:00","失物招领","失物招领帖子5内容");
call put_post("1","失物招领帖子6","2018-12-15 6:03:00","失物招领","失物招领帖子6内容");
select * from post;
select * from floor;