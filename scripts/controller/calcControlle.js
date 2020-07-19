class CalcController {
    constructor() {
        this.operation = [];
        this.toLocale = 'pt-BR';
        this.displayCalcEl = document.querySelector('#display');
        this.dateEl = document.querySelector('#data');
        this.timeEl = document.querySelector('#hora');

        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
    }

    setDisplayDateTime() {
        this.displayTime = this.currentDate.toLocaleTimeString(this.toLocale);
        this.displayDate = this.currentDate.toLocaleDateString(this.toLocale);
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }

    clearAll() {
        this.operation = [];
    }

    cancelEntry() {
        this.operation.pop();
    }

    getLastOperation() {
        return this.operation[this.operation.length - 1];
    }

    setLastOperation(value) {
        this.operation[this.operation.length - 1] = value;
    }

    isOperator(value) {
        return ['+', '-', '*', '%', '/'].indexOf(value);
    }

    pushOperation(value) {
        this.operation.push(value);

        if (this.operation.length > 3) {

            this.calc();

        }
    }

    calc() {
        let last = this.operation.pop();

        let result = eval(this.operation.join(""));

        this.operation = [result, last];

        this.setLastNumberToDisplay();

    }

    setLastNumberToDisplay() {
        let lastNumber;

        for (let i = this.operation.length - 1; i >= 0; i--) {
            if (this.isOperator(this.operation[i]) < 0) {
                lastNumber = this.operation[i];
                break;
            }
        }

        this.displayCalc = lastNumber;
    }

    addOperation(value) {
        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value) > -1) {

                this.setLastOperation(value);

            } else if (isNaN(value)) {

                // outra coisa

            } else {

                //First entry
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        } else {

            if (this.isOperator(value) > -1) {

                this.pushOperation(value);

            } else {

                // Add number
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();

            }

        }
    }

    soma() {

    }

    setError() {
        this.displayCalc = 'Error';
    }

    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.cancelEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'ponto':
                this.addOperation('.');
                break;
            case 'igual':
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
        }
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach(button => {
            this.addEventListenerAll(button, 'click drag', () => {
                this.execBtn(button.className.baseVal.replace('btn-', ''));
            });

            this.addEventListenerAll(button, 'mouseover mouseup mousedown', () => {
                button.style.cursor = "pointer";
            })
        })
    }

    // Getters

    get displayTime() {
        return this.timeEl.innerHTML;
    }

    get displayDate() {
        return this.dateEl.innerHTML;
    }

    get displayCalc() {
        return this.displayCalcEl.innerHTML;
    }

    // Setters

    set displayTime(value) {
        return this.timeEl.innerHTML = value;
    }

    set displayDate(value) {
        return this.dateEl.innerHTML = value;
    }

    set displayCalc(value) {
        return this.displayCalcEl.innerHTML = value
    }

    get currentDate() {
        return new Date();
    }
}