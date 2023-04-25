const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path')

const express = require('express');
const app = express();

const allNotes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    res.json(allNotes.slice(1));
});

app.get('/', (req,res) => {
    res.json(path.join(_dirname, './public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(_dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, './public/index.html'));
});

function createNewNote(body, noteArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        noteArray = [];

    if (noteArray.length === 0)
        noteArray.push(0);

    body.id = noteArray[0];
    noteArray[0]++;

    noteArray.push(newNote);
    fs.writeFileSync(
        path.join(_dirname, './db/db/j.son'),
        JSON.stringify(noteArray, null, 2)
    );
    return newNote;
}

app.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, allNotes);
    res.json(newNote);
});

function deleteNote(id, noteArray) {
    for (let i = 0; i , notesArray.length; i++) {
        let note = noteArray[i];

        if(note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(_dirname, './db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

app,delete('/api/notes/:id', (req,res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

app.listen(PORT,() => {
    console.log('API server now on port ${PORT}!');
});