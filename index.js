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

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }

  next(error)
}




app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons =>{
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id).then(person =>{
    if(person){
      response.json(person)
    }else{
      response.status(404).end()
    }
  }).catch(error => {
    next(error)
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

app.delete('/api/persons/:id', (request, response,next) => {
  
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    console.log('deleting...')
    console.log(result)
    response.status(204).end()
  })
  .catch( error => {
    next(error)
  })
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

app.use(unknownEndpoint)

app.use(errorHandler)




app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
})