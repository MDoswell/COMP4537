import messages from '../lang/messages/en/user.js';

// ChatGPT was used to ask small design questions, but no code came from it directly

class Control {
    constructor(input, button, buttonDiv) {
        this.input = document.getElementById(input);
        this.button = document.getElementById(button);
        this.buttonDiv = document.getElementById(buttonDiv);
        this.button.onclick = this.startGame.bind(this);
    }

    startGame() {
        if (this.isValidInput()) {
            if (this.game) {
                this.game.clear();
            }
            this.game = new Game(this.input.value, this.buttonDiv);    
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
        this.nButtons = n;
        this.nScrambles = n;
        this.buttons = [];
        const buttonDivRect = buttonDiv.getBoundingClientRect();
        for (let i = 0; i < n; i++) {
            let button = new Button(i + 1, `${buttonDivRect.top}px`, `${i * 11 + 1}em`)
            this.buttons.push(button);
            buttonDiv.appendChild(button.button);
        }
        this.scrambleTimeout = setTimeout(this.startScramble.bind(this), 1000 * n, this);
    }

    startScramble() {
        this.scrambleInterval = setInterval(this.updateButtons.bind(this), 2000);
    }

    updateButtons() {
        this.buttons.forEach(button => {
            button.randomizePosition();
        })
        if (--this.nScrambles <= 0) {
            clearInterval(this.scrambleInterval);
            this.startGuessing();
            return;
        }
    }

    startGuessing() {
        this.buttons.forEach(button => {
            button.showNumber(false);
            button.makeClickable(true);
            button.button.onclick = this.guessButton.bind(this, button);
        })
        this.nextButton = 1;
    }

    guessButton(button) {
        if (button.number == this.nextButton) {
            this.nextButton++;
            button.showNumber(true);
            button.makeClickable(false);
            if (this.nextButton > this.nButtons) {
                this.endGuessing(true);
            }
        } else {
            this.endGuessing(false);
        }
    }

    endGuessing(playerWon) {
        this.buttons.forEach(button => {
            button.makeClickable(false);
            button.showNumber(true);
        })
        if (playerWon) {
            this.setFeedback(messages.success, true);
        } else {
            this.setFeedback(messages.failure, true);
        }
    }

    setFeedback(message, isVisible) {
        const feedbackMessage = document.getElementById('feedback-message');
        feedbackMessage.innerHTML = message;
        if (isVisible) {
            feedbackMessage.style.visibility = 'visible';
        } else {
            feedbackMessage.style.visibility = 'hidden';
        }
    }

    clear() {
        this.buttons.forEach(button => {
            button.button.remove();
        })
        this.setFeedback('', false);
    }
}

class Button {
    constructor(number, top, left) {
        this.number = number;
        this.button = document.createElement('button');
        this.button.disabled = true;
        this.button.innerHTML = number;
        this.button.classList.add('memory-button');
        this.button.style.top = top;
        this.button.style.left = left;
        this.button.style.backgroundColor = this.getRandomColor();
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

    makeClickable(isClickable) {
        this.button.disabled = !isClickable;
    }

    showNumber(showNumber) {
        if (showNumber) {
            this.button.innerHTML = this.number;
        } else {
            this.button.innerHTML = '';
        }
    }
}

function initializeGame() {
    document.getElementById('control-label').innerHTML = messages.prompt;
    const control = new Control('control-input', 'control-button', 'button-div');
}

