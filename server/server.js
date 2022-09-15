const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { v4:uuid } = require('uuid')
const mongoose = require('mongoose');
const ZapData = require('./Schema/ZappData')

const port =  process.env.PORT || 5500;
// const port = 5500;

async function main() {
  await mongoose.connect('mongodb://localhost:27017/zappbin');
}

main().catch(err => console.log(err));

app.use(cors())
app.use(bodyParser.json())

var details = {}

app.get('/', (req, res) => {
  res.send("(ZappBin) Server is running...");
})

app.get('/all-data', async (req, res) => {
  const data = await ZapData.find();
  res.json(data);
})

app.post('/new', async (req, res) => {
  const context = req.body.val1;
  const link1 = req.body.link1;

  const data = await ZapData.findOne({link1:link1})
  console.log(data)

  if(data){
    console.log("updated")
    await updateData(link1,context)
  } else {
    console.log("added")
    await createData(link1,context)
  }
  res.json({'context': context, 'link1': link1});
})

app.post('/load', async (req, res) => {
  const link = req.body.id;
  const data = await ZapData.findOne({link1:link});
  if(data){
    obj = {
      'context': data.context, 
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

app.post('/duplicate', async (req, res) => {
  const context = req.body.val1;
  const link1 = req.body.link1;

  //save duplicate value with new link
  const data = await createData( link1, context);
  res.json({'context': context, 'link1': link1});

})

app.get('/getlink', (req, res) => {
  //send new link back
  const newLink = uuid();
  res.json({'newLink': newLink});
})

app.listen(port, () => {
  console.log(`Server listening at PORT : ${port}`)
})

async function checkData(link){
  ZapData.findOne({link1:link}).then((data)=>{
    if(data){
      return true
    } else {
      return false
    }
  })
}

async function createData(link,context) {
  const data = await ZapData.create({ link1: link, context:context })
  return data
}
async function updateData(link,context) {
  let data = await ZapData.updateOne({link1:link}, {context:context})
  return data
}
