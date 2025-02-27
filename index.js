const express = require('express')
const app = express()

app.use(express.json())

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
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  const person = persons.find(person => person.id === id)

  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {

  const maxId = persons.length > 0
    ? Math.max(...persons.map(person => Number(person.id)))
    : 0

  const person = request.body

  if(!person.name || !person.number){
    
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const exists = persons.some(p => p.name === person.name)

  if(exists){
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  
  person.id = String(maxId + 1)
  persons = persons.concat(person)
  response.json(person)
  response.status(201).end()

})

app.delete('api/persons/:id', (request, response) => {
  const id = request.params.id

  const notes = notes.filter(note => note.id !== id)

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


const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
})