SET NAMES UTF8;
DROP DATABASE IF EXISTS shop;
CREATE DATABASE shop CHARSET=UTF8;
USE shop;

#banner图片表
CREATE TABLE shop_banner(
	id INT PRIMARY KEY AUTO_INCREMENT,
	img_url VARCHAR(128)
);
INSERT INTO shop_banner VALUES
(NULL,'http://shop.applinzi.com/img/banner/banner1.jpg'),
(NULL,'http://shop.applinzi.com/img/banner/banner2.jpg'),
(NULL,'http://shop.applinzi.com/img/banner/banner3.jpg'),
(NULL,'http://shop.applinzi.com/img/banner/banner4.jpg');

#新闻表
CREATE TABLE shop_news(
  id INT PRIMARY KEY AUTO_INCREMENT,
  title  VARCHAR(255),
  img_url  VARCHAR(255),
  ctime  DATETIME,
  point   INT,
  content VARCHAR(2000)
);

INSERT INTO shop_news VALUES(null,'干果大减价','http://shop.applinzi.com/img/1.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'今天水果买一送一','http://shop.applinzi.com/img/2.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'吃哪些水果可以养生','http://shop.applinzi.com/img/1.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'今天你减肥了吗','http://shop.applinzi.com/img/2.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'好吃的零食，应该怎么选','http://shop.applinzi.com/img/1.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题1','http://shop.applinzi.com/img/2.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题2','http://shop.applinzi.com/img/1.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题3','http://shop.applinzi.com/img/2.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题4','http://shop.applinzi.com/img/1.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题5','http://shop.applinzi.com/img/2.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题6','http://shop.applinzi.com/img/1.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题7','http://shop.applinzi.com/img/2.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题8','http://shop.applinzi.com/img/1.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题9','http://shop.applinzi.com/img/2.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题10','http://shop.applinzi.com/img/1.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题11','http://shop.applinzi.com/img/2.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题12','http://shop.applinzi.com/img/1.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题13','http://shop.applinzi.com/img/2.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题14','http://shop.applinzi.com/img/2.png',now(),0,'内容详情内容详情内容详情');
INSERT INTO shop_news VALUES(null,'内容标题15','http://shop.applinzi.com/img/1.png',now(),0,'内容详情内容详情内容详情');


#商品详情表
CREATE TABLE shop_detail(
	id INT PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(128),
	img_url VARCHAR(128),
	price VARCHAR(10)
);
INSERT INTO shop_detail VALUES
(NULL,'942g辣条零食大礼包网红魔芋爽小面筋休闲一箱小吃开包卫龙庆祝一下','http://shop.applinzi.com/img/detail/1.jpg',77.77),
(NULL,'奥利奥饼干批发整箱包邮实惠装696g*2原味巧克力夹心饼干零食批发','http://shop.applinzi.com/img/detail/2.jpg',65.00),
(NULL,'好吃点饼干香脆杏仁饼800g/箱休闲食品早餐下午茶零食超值大礼包','http://shop.applinzi.com/img/detail/3.jpg',45.00),
(NULL,'942g辣条零食大礼包网红魔芋爽小面筋休闲一箱小吃开包卫龙庆祝一下','http://shop.applinzi.com/img/detail/1.jpg',77.77),
(NULL,'奥利奥饼干批发整箱包邮实惠装696g*2原味巧克力夹心饼干零食批发','http://shop.applinzi.com/img/detail/2.jpg',65.00),
(NULL,'好吃点饼干香脆杏仁饼800g/箱休闲食品早餐下午茶零食超值大礼包','http://shop.applinzi.com/img/detail/3.jpg',45.00),
(NULL,'942g辣条零食大礼包网红魔芋爽小面筋休闲一箱小吃开包卫龙庆祝一下','http://shop.applinzi.com/img/detail/1.jpg',77.77),
(NULL,'奥利奥饼干批发整箱包邮实惠装696g*2原味巧克力夹心饼干零食批发','http://shop.applinzi.com/img/detail/2.jpg',65.00),
(NULL,'好吃点饼干香脆杏仁饼800g/箱休闲食品早餐下午茶零食超值大礼包','http://shop.applinzi.com/img/detail/3.jpg',45.00);

#评论表
CREATE TABLE shop_comment(
	id INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(50),
	ctime DATETIME,
	nid INT
);
INSERT INTO shop_comment VALUES
(NULL,'这条新闻很好！1',now(),5),
(NULL,'这条新闻很好！2',now(),5),
(NULL,'这条新闻很好！3',now(),5),
(NULL,'这条新闻很好！4',now(),5),
(NULL,'这条新闻很好！5',now(),5),
(NULL,'这条新闻很好！6',now(),5),
(NULL,'这条新闻很好！7',now(),5),
(NULL,'这条新闻很好！8',now(),5),
(NULL,'这条新闻很好！9',now(),5),
(NULL,'这条新闻很好！10',now(),5),
(NULL,'这条新闻很好！11',now(),5);

#用户登录表
CREATE TABLE shop_login(
	id INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(25),
	upwd VARCHAR(32)
);
INSERT INTO shop_login VALUES
(NULL,'admin',md5('admin')),
(NULL,'tom',md5('123456')),
(NULL,'marry',md5('123456'));

#购物车表
CREATE TABLE shop_cart(
	id INT PRIMARY KEY AUTO_INCREMENT,
	count INT,
	price DECIMAL(10,2),
	pid INT,
	uid INT
);



































