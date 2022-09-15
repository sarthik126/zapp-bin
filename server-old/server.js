const express = require('express')
const app = express()
// const port =  process.env.PORT || 3000;
const port = 5500;
const cors = require('cors')
const bodyParser = require('body-parser')
const { uuid } = require('uuidv4')

app.use(cors())

app.use(bodyParser.json())

var details = {}

app.get('/', (req, res) => {
  res.send("Zapp Bin Server");
})

app.get('/api', (req, res) => {
  //console.log("All data sent");
  res.send(details);
})

app.post('/new',(req, res) => {
  const context = req.body.val1;
  const link1 = req.body.link1;
  //save value with new link
  details[link1] = context;
  res.json({'context': context, 'link1': link1});
  //console.log("Saved");
})

app.post('/load', (req, res) => {
  const link = req.body.id;
  var obj = {}
  if(link in details){
    obj = {
      'context': details[link], 
      'link1': link,
      'valid': true
    }
  }else{
    obj = {
      'context': '',
      'link1': uuid(),
      'valid': false
    }
  }

  res.json(obj);
  //console.log("Loaded");
})

app.post('/duplicate', (req, res) => {
  const context = req.body.val1;
  const link1 = req.body.link1;
  //save duplicate value with new link
  details[link1] = context;
  res.json({'context': context, 'link1': link1});
  //console.log("Duplicated");
})

app.get('/delete/:id', (req, res) => {
  if(req.params.id === "delete@admin"){
    details = {};
    res.send("Database Cleared");
  }else{
    res.send("Error");
  }
})

app.get('/getlink', (req, res) => {
  //send new link back
  const newLink = uuid();
  res.json({'newLink': newLink});
  //console.log("New Link Created");
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})