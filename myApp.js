var express = require('express');
var app = express();
const bodyParser = require('body-parser');
console.log("Hello World");
app.use('/public',express.static(`${__dirname}/public`));
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.get('/',(req,res)=>{
  res.sendFile(`${__dirname}/views/index.html`);
});
app.get('/json',(req,res)=>{
  let object = {"message": "Hello json"};
  if (process.env.MESSAGE_STYLE==='uppercase') {
    object.message=object.message.toUpperCase();
  }
  res.json(object);
});
app.get('/now',(req,res,next)=>{
  req.time=new Date().toString();
  next();
},(req,res)=>{
  res.json({time:req.time});
});
app.get('/:word/echo',(req,res)=>{
  res.json({echo:req.params.word});
});

let handler = (req,res)=>{res.json({name:`${req.query.first} ${req.query.last}`})};

app.use(bodyParser.urlencoded({extended:false}));
app.route('/name').get(handler).post((req,res)=>{
  res.json({name:`${req.body.first} ${req.body.last}`});
});


































 module.exports = app;
