async function getMessages() {
    const response = await fetch('/COMP4537/labs/1/lang/messages/en/user.json')
    if (!response.ok) 
        return;
    const data = await response.json();
    return data;
}
let messages;

document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {
    messages = await getMessages();
    document.getElementById("title-text").innerHTML = messages.title;
    document.getElementById("top-header").innerHTML = messages.title;
    document.getElementById("reader-link").innerHTML = messages.readerPage;
    document.getElementById("writer-link").innerHTML = messages.writerPage;
}