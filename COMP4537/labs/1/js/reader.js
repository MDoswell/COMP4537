document.addEventListener("DOMContentLoaded", initializeReader);

function initializeReader() {
    // if (typeof Storage !== "undefined") {
    //     const stored = localStorage.getItem("writerKey");
    // }
    window.addEventListener("storage", event => {
        alert("stored");
    })
    window.onstorage = (event) => {
        alert("store");
    }
}