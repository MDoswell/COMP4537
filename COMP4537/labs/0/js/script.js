// import messages from '../lang/messages/en/user.js';

const messages = {prompt: "How many buttons to create?", controlText: "Go!", success: "Excellent memory!", failure: "Wrong order!"};

class Control {
    constructor(input, button) {
        this.input = document.getElementById(input);
        this.button = document.getElementById(button);
        this.button.onclick = this.startGame;
    }

    startGame() {
        this.game = new Game(5);
    }
}

class Game {
    constructor(test) {
        alert(test);
    }
}

class Button {
    constructor(test) {

    }
}

initializeGame = function() {
    const control = new Control('control-input', 'control-button');
    // document.getElementById('feedback-message').innerHTML = messages.success;
}

