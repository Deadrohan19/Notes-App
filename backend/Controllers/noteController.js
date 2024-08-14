const asyncHandler = require("express-async-handler");
const Note = require("../Models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error("Please fill all fields.");
  } else {
    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      category,
    });

    if (note) {
      res.status(201).json(note);
    } else {
      res.status(400);
      throw new Error("Error Occured!");
    }
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You can't perform this action.");
  }

  if (note) {
    res.json(note);
  } else {
    res.status(404);
    throw new Error("Note not found.");
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You can't perform this action.");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found.");
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You can't perform this action.");
  }

  if (note) {
    await note.deleteOne();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not found.");
  }
});

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
