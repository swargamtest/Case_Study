const mongoose = require('mongoose')

//Connectiing to mongoose
mongoose.connect(process.env.MONGOURL, {
 useNewUrlParser: true,
 useCreateIndex: true,
 useUnifiedTopology: true
}).then(()=>{
  console.log(`connection to database established`)
}).catch(err=>{
  console.log(`db error ${err.message}`);
  process.exit(-1)
})