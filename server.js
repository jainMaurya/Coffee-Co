let express=require("express")
var mysql2=require("mysql2");
let fileloader=require("express-fileupload");
let app=express();
app.use(fileloader());
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'deepak1442005@gmail.com',
      pass: 'qnum tgrt jrgi hnri'
    }
  });

let config={
    host:"localhost",
    user:"root",
    password:"@Deepak23145",
    database:"project",
    dateStrings:true
    
}
var mysql=mysql2.createConnection(config);
mysql.connect(function(err)
{
    if(err==null)
        console.log("Connected To Database Successfully");
    else
        console.log(err.message);

})
app.use(express.static("public"));
app.use(express.urlencoded("true"));

app.listen(4440,function()
{
    console.log("server started : ");
})
app.get("/",function(req,res)
{
    let path= __dirname +"/public/index.html";
    res.sendFile(path);
})


app.get("/login",function(req,res)
{
    let path= __dirname +"/public/loginn.html";
    res.sendFile(path);
})
app.get("/thisis",function(req,res)
{
    let path= __dirname +"/public/index.html";
    res.sendFile(path);
})

app.get("/menu",function(req,res)
{
    let path= __dirname +"/public/menu.html";
    res.sendFile(path);
})
app.get("/aboutus",function(req,res)
{
    let path= __dirname +"/public/aboutus.html";
    res.sendFile(path);
})
app.get("/contactus",function(req,res)
{
    let path= __dirname +"/public/contactus.html";
    res.sendFile(path);
})
app.get("/drunklove",function(req,res)
{
    let path= __dirname +"/public/drunklove.html";
    res.sendFile(path);
})
app.get("/truthdare",function(req,res)
{
    let path= __dirname +"/public/games.html";
    res.sendFile(path);
})

app.get("/add-user",function(req,res)
{
    let email=req.query.email;
    let password=req.query.pwd;
    let namee=req.query.name;
    let restroname=req.query.restroname;
    let location=req.query.location;

    mysql.query("insert into resturant values(?,?,?,?,?)",[email,password,namee,location,restroname],function(err,result)
    {
        if(err==null)
        {
            res.send("Signup Successfully")
        }
        else
            res.send(err.message);
    })

})
app.get("/search-user",function(req,res)
{
    let email=req.query.email2;
    let password=req.query.password;
    mysql.query("select * from resturant where email=? and pwd=?",[email,password],function(err,result)
    {
        if(err!=null)
        {
            res.send(err.message);
            return;
        }
        if(result.length==0)
        {
            res.send("invalid id or password ");
            return;
        }
        else
        {
            res.send("Successfull");
            return;
        }
    })
})
