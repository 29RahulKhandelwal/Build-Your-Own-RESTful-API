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