// import messages from '../lang/messages/en/user.js';

const messages = {prompt: "How many buttons to create?", controlText: "Go!", invalidInput: "Invalid input", success: "Excellent memory!", failure: "Wrong order!"};

class Control {
    constructor(input, button) {
        this.input = document.getElementById(input);
        this.button = document.getElementById(button);
        this.button.onclick = () => this.startGame(this);
    }

    startGame(control) {
        if (control.isValidInput()) {
            control.game = new Game(control.input.value);    
        }
    }

    isValidInput() {
        if (!this.input.value || this.input.value < 3 || this.input.value > 7) {
            alert(messages.invalidInput);
            return false;
        }
        return true;
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

let control;

initializeGame = function() {
    control = new Control('control-input', 'control-button');
    // document.getElementById('feedback-message').innerHTML = messages.success;
}

