const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/person')
require('dotenv').config()
const app = express()
app.use(express.static('dist'))
app.use(express.json())
const PORT = process.env.PORT || 3001


morgan.token('body', function (req) {
  if (req.method === 'POST' && req.body) {
    return JSON.stringify(req.body);
  }
  return '-';
});
app.use(morgan(':method :url :status :response-time ms - :body'));



let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]



app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons =>{
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  // TODO: Handle errors

  Person.findById(id).then(person =>{
    response.json(person)
  })
})

app.post('/api/persons', (request, response) => {


  const person = new Person({
    name: request.body.name,
    number: request.body.number
  })

  if(!person.name || !person.number){
    
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  person.save()
  .then(savedPerson => {
    response.json(savedPerson)
  })

})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})


app.get('/info', (request, response) => {

    const currentDate = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <br>
        <p>${currentDate}</p>
        `     
    )
})




app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
})