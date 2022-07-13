//add const
const router = require("express").Router();
const { filterByQuery, findById, createNewNote } = require("../../lib/notes");
let notes = require("../../db/db.json");
const uuid = require("../../helpers/uuid");
const path = require("path");
const fs = require("fs");

//add route to get all notes

//add route to get a single note by id

//add route to post a note

//add route to delete a note (bonus)

//export notes router

module.exports = router;
