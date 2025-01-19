let messages = {noStorage: 'localStorage not supported on this browser.', storedAt: 'Stored at: ', buttonLabelRemove: 'Remove'}


document.addEventListener("DOMContentLoaded", initializeReader);

function initializeReader() {
    // if (typeof Storage !== "undefined") {
    //     const stored = localStorage.getItem("writerKey");
    // }
    window.addEventListener("storage", event => {
        console.log("stored");
    })
    window.onstorage = (event) => {
        console.log("store");
    }
}

class Reader {
    constructor(noteContainer, storeTimeText) {
        this.noteContainer = noteContainer;
        this.storeTimeText = storeTimeText;
        this.notes = [];
        this.getNotes();
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