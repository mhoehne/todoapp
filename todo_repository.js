const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/todo', {useNewUrlParser: true});

const Todo = mongoose.model('Todo', {
  id:Number,
  Titel:String,
  Datum:String,
  Autor:String,
  Kategorie:String,
  Fertig:Boolean
});

// const Aufgabe = new Todo({ Titel: 'Zildjian', id:1 });
// Aufgabe.save().then(() => console.log('meow'));


let idcounter = 1

function insert(Aufgabe) {
  Aufgabe.id= ++idcounter
  return Todo.create(Aufgabe)
}

function getall() {
    return Todo.find().exec()
}

function getbyid(id) {
  return Todo.findOne({id}).exec()
}

function updatebyid (id, body) {
  return getbyid(id).then(function(Aufgabe){
    if (Aufgabe) {
      Aufgabe.Titel = body.Titel || Aufgabe.Titel
      Aufgabe.Datum = body.Datum || Aufgabe.Datum
      Aufgabe.Author= body.Autor || Aufgabe.Autor
      Aufgabe.Kategorie = body.Kategorie || Aufgabe.Kategorie
      Aufgabe.Fertig = (body.Fertig || false)
    }
    return Aufgabe.save()
  })


}

function deletebyid(id) {
  return Todo.remove({id}).exec()
}

module.exports = {
  insert, getall, getbyid, updatebyid, deletebyid
}
