console.log('Starting note.js');

const fs = require('fs');

var fetchNote = () => {
	try {
		return JSON.parse(fs.readFileSync('notes.json'));
	} catch(e) {
		return [];		// first time there will be 'no notes.json' file
	}
};

var saveNote = (notes) => {
	fs.writeFileSync('notes.json', JSON.stringify(notes));
};

// Adding note
var addNote = (title, body) => {
	var notes = fetchNote();
	var note = {
		title,
		body
	};

	// If title already exists
	var duplicates = notes.filter((note) => note.title === title);

	// If no duplicates
	if(duplicates.length === 0) {
		notes.push(note);
		saveNote(notes);
		return note;	// If note is added return note else return undefined
	}
};

// Listing all notes
var getAll = () => {
	console.log('Listing all notes');
};

// Reading note
var getNote = (title) => {
	console.log('Reading note: ', title);
};

// Removing note
var removeNote = (title) => {
	// fetch notes
	var notes = fetchNote();

	// remove note having title same as the argument
	var filteredNotes = notes.filter((note) => note.title !== title);

	//save new notes array
	saveNote(filteredNotes);

	return filteredNotes.length !== notes.length;
};

// Exporting data
// In ES6 in objects if (addNote: addNote), simply use addNote
module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
};