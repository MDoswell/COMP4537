
let messages = {noStorage: 'localStorage not supported on this browser.', storedAt: 'Stored at: ', updatedAt: 'Updated at: ', buttonLabelRemove: 'Remove'}

// async function getMessages() {
//     const response = await fetch('../lang/messages/en/user.json')
//     if (!response.ok) 
//         return;
//     const data = await response.json();
//     return data;
// }
// let messages;

document.addEventListener("DOMContentLoaded", initializeReader);

async function initializeReader() {
    // messages = await getMessages();
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

class Note {
    constructor(noteContainer, text, isWritable, storageCallback, removeCallback) {
        this.noteContainer = noteContainer;
        this.text = text;
        this.isWritable = isWritable;
        this.storageCallback = storageCallback;
        this.removeCallback = removeCallback;
        this.container = this.createElements();
        noteContainer.appendChild(this.container);
    }

    createElements() {
        const container = document.createElement('div');

        const field = document.createElement('textarea');
        field.innerHTML = this.text;
        field.oninput = () => this.update(field);
        container.appendChild(field);

        if (this.isWritable) {
            const button = document.createElement('button');
            button.innerHTML = messages.buttonLabelRemove;
            button.onclick = () => this.remove();
            container.appendChild(button);
        }
        
        return container;
    }

    remove() {
        if (this.isWritable)
            this.removeCallback(this);
        this.container.remove();
    }

    update(field) {
        this.text = field.value;
        this.storageCallback();
    }
}