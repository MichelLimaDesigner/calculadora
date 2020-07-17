class CalcController {
    constructor() {
        this.toLocale = 'pt-BR';
        this.displayCalcEl = document.querySelector('#display');
        this.dateEl = document.querySelector('#data');
        this.timeEl = document.querySelector('#hora');

        this.initialize();
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