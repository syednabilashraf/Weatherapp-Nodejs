const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

hbs.registerPartials(__dirname+"/views/partials")
hbs.registerHelper("getDate",()=>{
  return new Date().getDate();
})
const port = process.env.port || 3000;

const app = express()
app.set('view engine', 'hbs');

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = now + ":"+req.method + req.url
  
  fs.appendFileSync('server.log',log +'\n',(err)=>{
    if(err){
      console.log("append error")
    }
  })
  next()

})
// app.use((req,res,next)=>{
//   res.render(__dirname+'/views/maintenance')
  
// });
app.use(express.static(__dirname+'/static'))

app.get('/',(req,res)=>{
  
  res.render("/Users/nabil/Weather App/views/homepage.hbs",{
    pageTitle:"Homepage"
  })
})

app.get('/about',(req,res)=>{
  

  res.render(__dirname+'/views/about.hbs',{pageTitle:"About"}
  )
})

app.listen(port)