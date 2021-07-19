# Build-Your-Own-RESTful-API

## Example Documents
```
{
    "_id" : ObjectId("5c139771d79ac8eac11e754a"),
    "title" : "API",
    "content" : "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
}


{
    "_id" : ObjectId("5c1398aad79ac8eac11e7561"),
    "title" : "Bootstrap",
    "content" : "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
}


{
    "_id" : ObjectId("5c1398ecd79ac8eac11e7567"),
    "title" : "DOM",
    "content" : "The Document Object Model is like an API for interacting with our HTML"
}
```

## Server Starting Code

```
const express=require("express");
const app=express();
const mongoose=require("mongoose");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true,useUnifiedTopology:true});

const articleSchema=mongoose.Schema({
    title:String,
    content:String
});

const Article=mongoose.model("Article",articleSchema);
// --------------------Request Targetting all the Articles--------------------------------
app.route("/articles")
    .get(function(req,res){
        Article.find(function(err,foundArticles){
            if(!err){
                res.send(foundArticles);
            }
            else{
                res.send(err);
            }
        });
    })
    .post(function(req,res){
        const newArticle=new Article({
            title:req.body.title,
            content:req.body.content
        });
        newArticle.save(function(err){
            if(!err){
                res.send("Successfully added a new article!");
            }else{
                res.send(err);
            }
        });
    })
    .delete(function(req,res){
        Article.deleteMany(function(err){
            if(!err){
                res.send("Successfully deleted all articles!");
            }
            else{
                res.send(err);
            }
        });
    });
// --------------------Request Targetting specific Articles--------------------------------
app.route("/articles/:articleTitle")
    .get(function(req,res){
        Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
            if(foundArticle){
                res.send(foundArticle);
            }else{
                res.send("No, article matching with that title");
            }
        });
    })
    .put(function(req,res){
        Article.update(
            {title:req.params.articleTitle},
            {title:req.body.title, content:req.body.content},
            {overwrite:true},
            function(err){
                if(!err){
                    res.send("Successfully updated the article!");
                }
            }
        );
    })
        
    .patch(function(req,res){
        Article.updateOne(
            {title:req.params.articleTitle},
            {$set:req.body},
            function(err){
                if(!err){
                    res.send("Successfully updated the article!");
                }
            }
        );
    })

    .delete(function(req,res){
        Article.deleteOne(
            {title:req.params.articleTitle},
            function(err){
                if(!err){
                    res.send("Successfully deleted the article!");
                }else{
                    res.send(err);
                }
            }
        );
    });



app.listen(3000,function(){
    console.log("Server running on port 3000");
});
```

## Re-populate Database

```

{
    "_id" : "5c18e1892998bdb3b3d355bf",
    "title" : "REST",
    "content" : "REST is short for REpresentational State Transfer. IIt's an architectural style for designing APIs."
}


{
    "_id" : ObjectId("5c139771d79ac8eac11e754a"),
    "title" : "API",
    "content" : "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
}


{
    "_id" : ObjectId("5c1398aad79ac8eac11e7561"),
    "title" : "Bootstrap",
    "content" : "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
}


{
    "_id" : ObjectId("5c1398ecd79ac8eac11e7567"),
    "title" : "DOM",
    "content" : "The Document Object Model is like an API for interacting with our HTML"
}


{
    "_id" : "5c18f35cde40ab6cc551cd60",
    "title" : "Jack Bauer",
    "content" : "Jack Bauer once stepped into quicksand. The quicksand couldn't escape and nearly drowned.",
    "__v" : 0
}
```
