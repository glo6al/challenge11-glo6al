const fs = require("fs");
const path = require("path");

//create function to display notes
function filterByQuery(query, notes) {
  let filteredResults = notes;
  if (query.title) {
    filteredResults = filteredResults.filter(
      (note) => note.title === query.title
    );
  }
  if (query.text) {
    filteredResults = filteredResults.filter(
      (note) => note.text === query.text
    );
  }
  return filteredResults;
}

//create function to add new note to database
function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);

  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(
      {
        notes: notesArray,
      },
      null,
      2
    )
  );

  return note;
}

//create function to find note by ID
function findById(id, notes) {
  const result = notes.filter((note) => note.id === id)[0];
  return result;
}
//create function to delete note by ID (bonus)

module.exports = {
  createNewNote,
  findById,
  filterByQuery,
};
