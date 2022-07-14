//add const
const router = require("express").Router();
const { filterByQuery, findById, createNewNote } = require("../../lib/notes");
let { notes } = require("../../db/db.json");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");

//add route to get all notes
router.get("/notes", (req, res) => {
  let results = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//add route to get a single note by id
router.get("/notes/:id", (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

//add route to post a note
router.post("/notes", (req, res) => {
  //creates unique id for new note
  req.body.id = uuid();
  if (!validateNote(req.body)) {
    res.status(400).send("The note is not properly formatted");
  } else {
    const newNote = createNewNote(req.body, notes);
    //notes.push(req.body);
    res.json(newNote);
  }
});

//add route to delete a note (bonus)
router.delete("/notes/:id", async (req, res) => {
  const deletedNote = findById(req.params.id, notes);
  if (deletedNote) {
    let originalList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    const filteredNote = await originalList.filter(
      (note) => note.id !== req.params.id
    );

    fs.writeFileSync("./db/db.json", JSON.stringify(filteredNote));
    const newList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    return res.json(newList);
  }
});
//export notes router
module.exports = router;
