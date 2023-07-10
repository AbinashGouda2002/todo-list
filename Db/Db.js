const mongoose=require('mongoose')
const dbURL = 'mongodb+srv://abinash123:Abinash1234@nodejsbasics.orpbt68.mongodb.net/todo?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
const db=mongoose.connect(dbURL)
  .then((result) => {
   console.log("Connection Done")
  })
  .catch((err) => console.log(err))

  module.exports=db
