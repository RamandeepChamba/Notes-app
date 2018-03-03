console.log('Starting note.js');

const fs = require('fs');

var fetchNotes = () => {
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
	var notes = fetchNotes();
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
	return fetchNotes();
};

// Reading note
var getNote = (title) => {
	// Fetch notes
	var notes = fetchNotes();
	// filter out the required note
	var readNote = notes.filter((note) => note.title === title);	// will return an empty array if note not found
	// console.log(readNote);	// Check this for testing
	// filter will return an array, return first element(object) of that array
	return readNote[0];		// if array is empty, simply returns undefined
};

// Removing note
var removeNote = (title) => {
	// fetch notes
	var notes = fetchNotes();

	// remove note having title same as the argument
	var filteredNotes = notes.filter((note) => note.title !== title);

	//save new notes array
	saveNote(filteredNotes);

	return filteredNotes.length !== notes.length;
};

var logNote = (note) => {
	console.log('--');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
};

// Exporting data
// In ES6 in objects if (addNote: addNote), simply use addNote
module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};