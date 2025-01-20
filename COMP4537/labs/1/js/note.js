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
            button.innerHTML = "Remove";
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

export default Note;