//app.js
//1:加载模块 express pool.js
const express = require("express");
const pool = require("./pool");
const cors = require("cors");
const bodyParser = require("body-parser");
//2:创建服务器端对象
var app = express();
//3:监听 5050
app.listen(5050);
//4:指定静态目录  public 
app.use(express.static("public"));

app.use(cors({
    origin:["http://sock.applinzi.com","https://sock.applinzi.com"],
    credentials:true
}))

const session = require("express-session");
app.use(session({
    secret:"128位随机字符",
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*8
    }
}))

app.use(bodyParser.urlencoded({
    extended:false
}))

//功能一:home 组件轮播图片
app.get("/imageList",(req,res)=>{
   //1:将轮播图中所需图片 复制public/img
   var sql = `SELECT * FROM shop_banner`;
   pool.query(sql,(err,result)=>{
       if(err) throw err
       if(result.length > 0){
           res.send({code:1,data:result});
       }
   })
});

//功能二：新闻列表分页显示
app.get("/newsList",(req,res)=>{
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    if(!pno) pno = 1;
    if(!pageSize) pageSize = 7;
    var sql = `SELECT * FROM shop_news LIMIT ?,?`;
    var ps = parseInt(pageSize);
    var offset = (pno-1)*ps;
    pool.query(sql,[offset,ps],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:1,data:result});
        }
    })
})

//功能三：商品分页显示
app.get("/products",(req,res)=>{
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    if(!pno) pno = 1;
    if(!pageSize) pageSize = 4;
    var sql = `SELECT * FROM shop_detail LIMIT ?,?`;
    var ps = parseInt(pageSize);
    var offset = (pno-1)*ps;
    pool.query(sql,[offset,ps],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:1,data:result});
        }
    })
})

//新闻详情页
app.get("/findnewsInfo",(req,res)=>{
    var id= req.query.id;
    var reg = /^\d{1,}$/;
    if(!reg.test(id)){
        res.send({code:-1,msg:"新闻的编号不正确"});
        return;
    }
    var sql = `SELECT * FROM shop_news WHERE id = ?`;
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:1,data:result});
        }
    })
})

//新闻评论
app.get("/getComment",(req,res)=>{
    var nid = req.query.nid;
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    if(!pno) pno = 1;
    if(!pageSize) pageSize = 5;
    var offset = (pno -1)*pageSize;
    pageSize = parseInt(pageSize)
    var sql = `SELECT * FROM shop_comment WHERE nid = ? ORDER BY ctime DESC LIMIT ?,?`;
    pool.query(sql,[nid,offset,pageSize],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:1,data:result});
        }
    })
})

//发表新闻评论
app.post("/addComment",(req,res)=>{
    var nid = req.body.nid;
    var content = req.body.content;
    var sql = `INSERT INTO shop_comment VALUES(NULL,?,NOW(),?)`;
    pool.query(sql,[content,nid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({code:1,msg:"评论发表成功"});
        }else{
            res.send({code:-1,msg:"评论发表失败"});
       }
    })
})

//获取商品的详细信息
app.get("/findProduct",(req,res)=>{
    var id = req.query.id;
    var sql = `SELECT * FROM shop_detail WHERE id = ?`;
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:1,data:result});
        }
    })
})

//用户登录
app.get("/login",(req,res)=>{
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    var sql = `SELECT id FROM shop_login WHERE uname = ? AND upwd = md5(?)`;
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length == 0){
            res.send({code:-1,msg:"用户名或密码输入错误"})
        }else{
            //将用户信息凭证保存在服务端 session对象中
            var id = result[0].id;
            req.session.uid = id;     //获取用户id，并保存在session中
            //console.log(req.session);
            res.send({code:1,msg:"登录成功"})
        }
    })
})

// 把商品添加到购物车
app.get("/addcart",(req,res)=>{
    if(!req.session.uid){
        res.send({code:-1,msg:"请登录"});
        return;
    }
    var pid = parseInt(req.query.pid);
    var uid = req.session.uid;
    var price = parseInt(req.query.price);
    //var count = 1;
    var sql = `SELECT id FROM shop_cart WHERE uid = ? AND pid = ?`;
    pool.query(sql,[uid,pid],(err,result)=>{
        if(err) throw err;
        if(result.length == 0){
            var sql = `INSERT INTO shop_cart VALUES(NULL,1,${price},${pid},${uid})`
        }else{
            var sql = `UPDATE shop_cart SET count = count+1 WHERE pid = ${pid} AND uid = ${uid}`;
        }
        pool.query(sql,(err,result)=>{
            if(err) throw err;
            if(result.affectedRows > 0){
                res.send({code:1,msg:"添加成功"});
            }else{
                res.send({code:-1,msg:"添加失败"});
            }
        })
    })
})


//购物车详细列表
app.get("/cartList",(req,res)=>{
    var uid = req.session.uid;
    if(!uid){
        res.send({code:-1,msg:"请登录"});
        return;
    }
    var sql = `SELECT d.title,d.img_url,c.id,c.count,c.price,c.pid,c.uid FROM shop_detail AS d,shop_cart AS c WHERE d.id = c.pid AND uid = ?`;
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code:1,data:result})
        }
    })
})


//删除购物车中的一件商品
app.get("/delCartItem",(req,res)=>{
    var id = req.query.id;
    var sql = `DELETE FROM shop_cart WHERE id = ?`;
    pool.query(sql,[id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({code:1,msg:"删除成功"});
        }else{
            res.send({code:-1,msg:"删除失败"});
        }
    })
})

//删除购物车中的多个商品
app.get("/removeItem",(req,res)=>{
    //ids的格式为3,4,5
    var ids = req.query.ids;
    var sql =`DELETE FROM shop_cart WHERE id IN (?)`;
    pool.query(sql,[ids],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({code:1,msg:"删除成功"})
        }else{
            res.send({code:-1,msg:"删除失败"})
        }
    })
})

//用户退出
app.get("/logout",(req,res)=>{
    req.session.uid = null;
    res.send({code:1,msg:"已退出"});
})








