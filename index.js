const express = require("express");
const app = express();
const port =8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');


 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

 let posts = [
    {  
        id:uuidv4(),
        username:"Mrudla",
        content:"this is post 1"
    },
    {       
        id:uuidv4(),
        username:"raj",
        content:"this is post 2"
    },
    {
        id:uuidv4(),
        username:"lata",
        content:"this is post 3"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let  post = posts.find((p)=> id === p.id);
    res.render("show.ejs",{post});
});


app.patch("/posts/:id",(req,res)=>{
    req.send("patch request working");
});
app.listen(port,()=>{
    console.log("listening on port :8080");
});