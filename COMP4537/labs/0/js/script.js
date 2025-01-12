// import messages from '../lang/messages/en/user.js';

const messages = {prompt: "How many buttons to create?", controlText: "Go!", invalidInput: "Invalid input", success: "Excellent memory!", failure: "Wrong order!"};

class Control {
    constructor(input, button, buttonDiv) {
        this.input = document.getElementById(input);
        this.button = document.getElementById(button);
        this.buttonDiv = document.getElementById(buttonDiv);
        this.button.onclick = () => this.startGame(this);
    }

    startGame(control) {
        if (control.isValidInput()) {
            control.game = new Game(control.input.value, control.buttonDiv);    
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
    constructor(n, buttonDiv) {
        this.n = n;
        this.buttons = [];
        for (let i = 0; i < n; i++) {
            let button = new Button(i, '0px', `${i * 200}px`)
            this.buttons.push(button);
            buttonDiv.appendChild(button.button);
        }
    }
}

class Button {
    constructor(number, top, left) {
        this.button = document.createElement('button');
        this.button.classList.add('memory-button');
        this.button.style.top = top;
        this.button.style.left = left;
        this.button.innerHTML = number + 1;
        this.button.style.backgroundColor = this.getRandomColor();
    }

    getRandomColor() {
        return `rgb(${255}, ${99}, ${71})`
    }
}

let control;

initializeGame = function() {
    control = new Control('control-input', 'control-button', 'button-div');
    // document.getElementById('feedback-message').innerHTML = messages.success;
}

