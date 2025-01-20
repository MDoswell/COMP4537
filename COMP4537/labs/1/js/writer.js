import Note from './note.js';

async function getMessages() {
    const response = await fetch('./lang/messages/en/user.json')
    if (!response.ok) 
        return;
    const data = await response.json();
    return data;
}
let messages;

document.addEventListener("DOMContentLoaded", initializeWriter);

async function initializeWriter() {
    messages = await getMessages();
    const writer = new Writer(document.getElementById('notes-container'), document.getElementById('storage-time'));
}

class Writer {
    constructor(noteContainer, storeTimeText) {
        this.noteContainer = noteContainer;
        this.storeTimeText = storeTimeText;
        this.notes = [];
        document.getElementById("add-note-button").onclick = () => this.addNote('');
        this.getNotes();
    }

    addNote(text) {
        this.notes.push(new Note(this.noteContainer, text, true, this.storeNotes.bind(this), this.removeNote.bind(this)));
        this.storeNotes();
    }

    getNotes() {
        if (typeof Storage !== "undefined") {
            let notes = JSON.parse(localStorage.getItem("writerKey"));
            if (!notes)
                notes = [];
            notes.forEach(note => {
                this.addNote(note.text);
            });
        } else {
            alert(messages.noStorage);
        }
    }

    storeNotes() {
        if (typeof Storage !== "undefined") {
            localStorage.setItem("writerKey", JSON.stringify(this.notes));
            const time = new Date();
            this.storeTimeText.innerHTML = messages.storedAt + time.toLocaleTimeString('en-US');
        } else {
            alert(messages.noStorage);
        }
    }

    removeNote(note) {
        this.notes.splice(this.notes.indexOf(note), 1);
        this.storeNotes();
    }
}
