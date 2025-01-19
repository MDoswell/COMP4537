let messages = {noStorage: 'localStorage not supported on this browser.', storedAt: 'Stored at: ', buttonLabelRemove: 'Remove'}

document.addEventListener("DOMContentLoaded", initializeWriter);

function initializeWriter() {
    // window.postMessage("testmsg");
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
        this.notes.push(new Note(this.noteContainer, text, this.storeNotes.bind(this), this.removeNote.bind(this)));
        this.storeNotes();
    }

    getNotes() {
        if (typeof Storage !== "undefined") {
            const notes = JSON.parse(localStorage.getItem("writerKey"));
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

class Note {
    constructor(noteContainer, text, storageCallback, removeCallback) {
        this.noteContainer = noteContainer;
        this.text = text;
        this.storageCallback = storageCallback;
        this.removeCallback = removeCallback;
        this.container = this.createElements();
        noteContainer.appendChild(this.container);
    }

    createElements() {
        const container = document.createElement('div');
        const field = document.createElement('textarea');
        const button = document.createElement('button');
        field.innerHTML = this.text;
        field.oninput = () => this.update(field);
        button.innerHTML = messages.buttonLabelRemove;
        button.onclick = () => this.remove();
        container.appendChild(field);
        container.appendChild(button);
        return container;
    }

    remove() {
        this.removeCallback(this);
        this.container.remove();
    }

    update(field) {
        this.text = field.value;
        this.storageCallback();
    }
}