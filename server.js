/**
 * Created by latheshkarkera on 4/19/17.
 */
const express = require('express');
const path = require('path');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mlab = process.env.MLAB_URI;
const port = process.env.PORT || 3000;
const mongoUrl = 'mongodb://localhost:27017/blog';
mongoose.connect(mlab || mongoUrl);


var PostSchema = mongoose.Schema({
   title:{type:String,required:true,},
   body:{type:String},
   tag:{type:String,enum:['POLITICS','ECONOMY','EDUCATION']},
   posted:{type:Date,default:Date.now}

},{collection:'post'});

var PostModel = mongoose.model('PostModel',PostSchema);
//mongoose.Promise = global.Promise;
app.use(express.static(__dirname+'/public'));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/api/blogpost',function(req,res){
   console.log(req.body);
   var post = req.body;
   PostModel.create(post).then(function(post){
      res.sendStatus(200);
   },
   function (err) {
       res.sendStatus(400);
   });
});

app.get('/api/blogpost',function (req,res) {
    PostModel.find().then(function (posts) {
        res.json(posts);
    },function (err) {
        res.sendStatus(400);
    });
});

app.delete('/api/blogpost/:id',function (req,res) {
   var postId = req.params.id;
   PostModel.remove({_id:postId}).then(function (status) {
      res.sendStatus(200);
   },function () {
      res.sendStatus(400);
   });
});

app.get('/api/blogpost/:id',function (req,res) {
   var postId = req.params.id;
   PostModel.findById(postId).then(function (post) {
       res.json(post);
   },function (err) {
       res.sendStatus(400);
   });
});

app.put('/api/blogpost/:id',function (req,res) {
    var postId = req.params.id;
    PostModel.update({_id:postId},{
       title:req.body.title,
        body:req.body.body
    }).then(function (success) {
        res.sendStatus(200);
    },function (err) {
        res.sendStatus(400);
    });
});

app.listen(port,function(){
   console.log('Server running on port',port);
});