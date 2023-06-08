//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const  _ = require("lodash");

const homeStartingContent = "Welcome to my Blog Website";
const aboutContent = "Here you can post all the news related to any field and the posted news will then be shown on the home page";
const contactContent = "Contact me @panwarr404@gmail.com   - Rahul Panwar";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let store = [];

app.get("/", function(req, res)
{
  res.render("home",{hcontent:homeStartingContent,pcontent:store})
 
})
app.get("/about", function(req, res)
{
  res.render("about",{acontent:aboutContent})
})
app.get("/contact", function(req, res)
{
  res.render("contact",{ccontent:contactContent})
})

app.get("/compose", function(req, res)
{
  res.render("compose")
 
})
app.post("/compose", function(req, res)
{
 const ans = {
          titlec:req.body.ftext,
          postc:req.body.postbody,

 };
  store.push(ans);
  res.redirect("/");
 
});

app.get("/posts/:postName",function(req, res)
{
  const requestedtitle = _.lowerCase(req.params.postName);
  
  store.forEach(function(stor)
  {
    const storedfile = _.lowerCase(stor.titlec);

   if(storedfile === requestedtitle)
   {
         res.render("post", {heading:storedfile, desc:stor.postc})
   }
   

  })
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
