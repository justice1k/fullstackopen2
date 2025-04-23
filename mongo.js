const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('please enter arguements')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://justice1k:${password}@contacts.wqhci.mongodb.net/?retryWrites=true&w=majority&appName=Contacts`
mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length == 3){
    console.log('reading...')
    Person.find({}).then(result =>{
        console.log('Phonebook')
        result.forEach(person =>{
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

if(process.argv.length == 5){
    console.log('adding...')
    const person = new Person({
        id: "",
        name: process.argv[3],
        number: process.argv[4]
    })
    
    
    person.save().then(result => {
        console.log(`added ${result.name} and number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}