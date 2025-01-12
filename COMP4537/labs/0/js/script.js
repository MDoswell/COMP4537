// import messages from '../lang/messages/en/user.js';

const messages = {invalidInput: "Invalid input", success: "Excellent memory!", failure: "Wrong order!"};

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
        this.nScrambles = n;
        this.buttons = [];
        const buttonDivRect = buttonDiv.getBoundingClientRect();
        for (let i = 0; i < n; i++) {
            let button = new Button(i + 1, `${buttonDivRect.top}px`, `${i * 11 + 1}em`)
            this.buttons.push(button);
            buttonDiv.appendChild(button.button);
        }
        this.scrambleTimeout = setTimeout(this.startScramble, 1000 * n, this);
    }

    startScramble(game) {
        game.scrambleInterval = setInterval(game.updateButtons, 2000, game);
    }

    updateButtons(game) {
        game.buttons.forEach(button => {
            button.randomizePosition();
        })
        if (--game.nScrambles <= 0) {
            clearInterval(game.scrambleInterval);
            game.startGuessing();
            return;
        }
    }

    startGuessing() {
        this.buttons.forEach(button => {
            button.hideNumber();
            button.makeClickable();
        })
        this.nextButton = 1;
    }
}

class Button {
    constructor(number, top, left) {
        this.button = document.createElement('button');
        this.button.disabled = true;
        this.button.onclick = this.guess.bind(this);
        this.button.classList.add('memory-button');
        this.button.style.top = top;
        this.button.style.left = left;
        this.button.innerHTML = number;
        this.button.style.backgroundColor = this.getRandomColor();
    }

    guess() {
        this.button.style.opacity = 1;
    }

    getRandomColor() {
        return `rgb(${this.getRandomVal(255)}, ${this.getRandomVal(255)}, ${this.getRandomVal(255)})`
    }

    getRandomVal(max) {
        return Math.floor(Math.random() * (max + 1));
    }

    randomizePosition() {
        this.button.style.position = 'absolute';
        this.button.style.top = this.getRandomVal(window.innerHeight - this.button.clientHeight);
        this.button.style.left = this.getRandomVal(window.innerWidth - this.button.clientWidth);
    }

    makeClickable() {
        this.button.disabled = false;
    }

    hideNumber() {
        this.button.innerHTML = '';
    }
}

// let control;

initializeGame = function() {
    const control = new Control('control-input', 'control-button', 'button-div');
}

