document.addEventListener("DOMContentLoaded", initializeWriter);

function initializeWriter() {
    if (typeof Storage !== "undefined") {
        localStorage.setItem("writerKey", "44");
    }
    window.postMessage("testmsg");
}

class Writer {
    constructor() {
        // add button
        // get notes
    }

    createAddButton() {
        
    }

    getNotes() {

    }
}