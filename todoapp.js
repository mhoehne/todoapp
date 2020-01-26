const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const todo_repository = require('./todo_repository')

app.use(cors());
app.use(express.json()) //for parsing application/JSON

//POST
app.post('/todo', function(req, res, next) {
  res.set('Content-Type', 'application/json')
  const Aufgabe = todo_repository.insert(req.body)
  return res.status(201).send(JSON.stringify(Aufgabe))
});

//GET ALL
const path = require('path');
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
  });

app.get('/todos', function(req, res, next) {
  res.set('Content-Type', 'application/json')
  return res.send(JSON.stringify(todo_repository.getall()))
});

//GET by ID
app.get('/todo/:id', function(req, res, next) {
  res.set('Content-Type', 'application/json')
  const Aufgabe = todo_repository.getbyid (req.params.id)
  if (Aufgabe) {
    return res.status(200).send(JSON.stringify(Aufgabe))
  }

  return res.sendStatus(404)
});

//PUT
app.put('/todo/:id', function(req, res, next) {
  res.set('Content-Type', 'application/json')
  const Aufgabe = todo_repository.getbyid(req.params.id)
    if (Aufgabe) {
      todo_repository.updatebyid(req.params.id, req.body)
      return res.status(200).send(JSON.stringify(Aufgabe))
    }

  return res.sendStatus(404)
});

//DEL
app.delete('/todo/:id', function(req, res, next) {
  res.set('Content-Type', 'application/json')
  Aufgabe = todo_repository.getbyid(req.params.id)
    if (Aufgabe) {
      todo_repository.deletebyid(req.params.id)
      return res.sendStatus(200)
    }
  return res.sendStatus(404)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
