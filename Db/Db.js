const mongoose=require('mongoose')
const dbURL = process.env.DB
mongoose.set('strictQuery', false)
const db=mongoose.connect(dbURL)
  .then((result) => {
   console.log("Connection Done")
  })
  .catch((err) => console.log(err))

  module.exports=db