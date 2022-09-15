const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/zappbin');

//Schema
const ZapData = mongoose.model('ZappData', { link1: String , context: String});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/zappbin');
}

main().catch(err => console.log(err));

async function checkData(link){
  const data = await ZapData.findOne({link1:link});
  console.log(data)
}


async function run(){
  await checkData("a51eb8ac-eaf2-4bbc-bd45-95e217137392")
  await checkData("17eb9c12-fec8-4846-8642-25b133973e73")
  console.log("hii")
}

run()