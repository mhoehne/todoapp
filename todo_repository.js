const todos = [
  {
    id:1,
    Titel:'Aufgaben',
    Datum:'2020/01/25',
    Author:'Martin',
    Kategorie:'Uni',
    Fertig: false,
  }]
let idcounter = 1

function insert(Aufgabe) {
  Aufgabe.id= ++idcounter
  todos.push(Aufgabe)
  return Aufgabe
}

function getall() {
  return todos
}

function getbyid(id) {
  for(i=0; i<todos.length; i++) {
    if (id == todos[i].id) {
      return todos[i]
    }
  }
}

function updatebyid (id, body) {
  const Aufgabe = getbyid(id)
    if (Aufgabe) {
      Aufgabe.Titel = body.Titel || Aufgabe.Titel
      Aufgabe.Datum = body.Datum || Aufgabe.Datum
      Aufgabe.Author= body.Author || Aufgabe.Author
      Aufgabe.Kategorie = body.Kategorie || Aufgabe.Kategorie
      Aufgabe.Fertig = (body.Fertig || false)
    }
}

function deletebyid(id) {
  const Aufgabe = getbyid(id)
    if (Aufgabe) {
      const index = todos.indexOf(Aufgabe);
      todos.splice(index, 1); // removes 1 element from position i
    }
}

module.exports = {
  insert, getall, getbyid, updatebyid, deletebyid
}
