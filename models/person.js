const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URL
mongoose.set('strictQuery', false)

console.log('connecting to DB...')
mongoose.connect(url).then(result =>{
    console.log('connected to DB')
}).catch(error => {
    console.log('error connecting to DB ', error.message )
})

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', noteSchema)
