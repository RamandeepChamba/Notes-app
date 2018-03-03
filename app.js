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
		console.log('--');
		console.log(`Title: ${title}`);
		console.log(`Body: ${body}`);
	} else {
		console.log('Note title taken');
	}
} else if(command === 'remove') {
	var noteRemoved = notes.removeNote(title);
	var message = noteRemoved ? 'Note was removed' : 'Node not found';
	console.log(message);
} else if(command === 'list') {
	notes.getAll();
} else if(command === 'read') {
	notes.getNote(title);
} else {
	console.log('Command not recognized');
}