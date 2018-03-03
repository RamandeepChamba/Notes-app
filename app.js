console.log('Starting app.js');

const notes = require('./notes.js');	// importing exports from another file
let yargs = require('yargs');			// parse arguments	
let argv = yargs.argv;					// object which stores arguments given by user in cli
// console.log(argv);						// see this for better understanding
let command = argv._[0];	
let title = argv.title;
let body = argv.body;

// console.log('Process', process.argv);
// console.log('Yargs', argv);

if(command === 'add') {
	var note = notes.addNote(title, body);
	if(note) {
		console.log('Note created');
		notes.logNote(note);
	} else {
		console.log('Note title taken');
	}
	// Remove command
} else if(command === 'remove') {
	var noteRemoved = notes.removeNote(title);
	var message = noteRemoved ? 'Note removed' : 'Node not found';
	console.log(message);
	// List command
} else if(command === 'list') {
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	allNotes.forEach((note) => notes.logNote(note));
	// Read command
} else if(command === 'read') {
	var note = notes.getNote(title);	// returned value from getNote method
	if(note) {
		console.log('Note read');
		notes.logNote(note);
	} else {
		console.log('Note not found');
	}
} else {
	console.log('Command not recognized');
}