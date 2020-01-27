const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/todo', {useNewUrlParser: true}).catch(function(){
  process.exit(1)
})

const Todo = mongoose.model('Todo', {
  Titel:String,
  Datum:String,
  Autor:String,
  Kategorie:String,
  Fertig:Boolean
});


function insert(Aufgabe) {
  return Todo.create(Aufgabe)
}

function getall({Status, Kategorie}) {
  const filtern = {}
  if (Status != 'all') {
    filtern.Fertig = Status == 'done'?true:false
  }
  if (Kategorie != 'all') {
    filtern.Kategorie = Kategorie
  }
    return Todo.find(filtern).exec()
}

function getbyid(id) {
  return Todo.findOne({_id:id}).exec()
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
  return Todo.remove({_id:id}).exec()
}

module.exports = {
  insert, getall, getbyid, updatebyid, deletebyid
}
