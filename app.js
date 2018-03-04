console.log('Starting app.js');

const notes = require('./notes.js'); // importing exports from another file
const yargs = require('yargs'); // parse arguments	
const titleOptions = {
    describe: 'Title of note',
    demand: true, // required
    alias: 't' // instead of --title we can use -t 
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};
const argv = yargs
    .command('add', 'Add a new note', { // add
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes') // list
    .command('read', 'Read a note', { // read
        title: titleOptions
    })
    .command('remove', 'Remove a note', { // remove
        title: titleOptions
    })
    .help()
    .argv; // object which stores arguments given by user in cli
// console.log(argv); // see this for better understanding
var command = argv._[0];
var title = argv.title;
var body = argv.body;

// console.log('Process', process.argv);
// console.log('Yargs', argv);

if (command === 'add') {
    var note = notes.addNote(title, body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    } else {
        console.log('Note title taken');
    }
    // Remove command
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(title);
    var message = noteRemoved ? 'Note removed' : 'Node not found';
    console.log(message);
    // List command
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
    // Read command
} else if (command === 'read') {
    var note = notes.getNote(title); // returned value from getNote method
    if (note) {
        console.log('Note read');
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else {
    console.log('Command not recognized');
}