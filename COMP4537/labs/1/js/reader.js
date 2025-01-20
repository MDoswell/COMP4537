import Note from './note.js';

async function getMessages() {
    const response = await fetch('./lang/messages/en/user.json')
    if (!response.ok) 
        return;
    const data = await response.json();
    return data;
}
let messages;

document.addEventListener("DOMContentLoaded", initializeReader);

async function initializeReader() {
    messages = await getMessages();
    const reader = new Reader(document.getElementById('notes-container'), document.getElementById('storage-time'));
}

class Reader {
    constructor(noteContainer, storeTimeText) {
        this.noteContainer = noteContainer;
        this.storeTimeText = storeTimeText;
        this.notes = [];
        window.onstorage = (event) => {
            this.getNotes();
        }
        this.getNotes();
        this.updateInterval = setInterval(this.getNotes.bind(this), 2000);
    }

    getNotes() {
        if (typeof Storage !== "undefined") {
            this.clearNotes();
            const notes = JSON.parse(localStorage.getItem("writerKey"));
            notes.forEach(note => {
                this.addNote(note.text);
            });
            const time = new Date();
            this.storeTimeText.innerHTML = messages.updatedAt + time.toLocaleTimeString('en-US');
        } else {
            alert(messages.noStorage);
        }
    }

    addNote(text) {
        this.notes.push(new Note(this.noteContainer, text, false));
    }

    clearNotes() {
        this.notes.forEach(note => note.remove());
        this.notes = [];
    }
}
