class Timer {
  constructor() {
    //gather all DOM element
    this.form = document.querySelector('[data-timer="form"]');
    this.inputHours = document.querySelector('[data-timer="input_hours"]');
    this.inputMinutes = document.querySelector('[data-timer="input_minutes"]');
    this.inputSeconds = document.querySelector('[data-timer="input_seconds"]');

    this.showHours = document.querySelector('[data-timer="show_hours"]');
    this.showMinutes = document.querySelector('[data-timer="show_minutes"]');
    this.showSeconds = document.querySelector('[data-timer="show_seconds"]');
  }
  init() {
    this.form.addEventListener('submit', (e) => this.onSubmit(e));
  }
  onSubmit(event) {
    event.preventDefault();
    const hours = parseInt(
      this.inputHours.value.length > 0 ? this.inputHours.value : '0'
    );
    const minutes = parseInt(
      this.inputMinutes.value.length > 0 ? this.inputMinutes.value : '0'
    );
    const seconds = parseInt(
      this.inputSeconds.value.length > 0 ? this.inputSeconds.value : '0'
    );
    this.countDownTimer(hours, minutes, seconds);

    this.toggleShowValues(this.inputHours, this.showHours, hours);
    this.toggleShowValues(this.inputMinutes, this.showMinutes, minutes);
    this.toggleShowValues(this.inputSeconds, this.showSeconds, seconds);
  }
  countDownTimer(hours, minutes, seconds) {
    const userDate = new Date();
    userDate.setHours(hours);
    userDate.setMinutes(minutes);
    userDate.setSeconds(seconds);
    setInterval(() => {
      const now = new Date().getTime();
      const distance = userDate - now;

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      console.log({
        hours,
        minutes,
        seconds,
      });
    }, 1000);
  }
  toggleShowValues(input, showcase, value) {
    showcase.textContent = value.length > 0 ? value : '00';
    showcase.classList.add('open');
    input.style.display = 'none';
  }
}

const timer = new Timer();
document.addEventListener('DOMContentLoaded', (_) => {
  timer.init();
});
