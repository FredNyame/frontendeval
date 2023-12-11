class Timer {
  constructor() {
    this.form = document.querySelector('[data-timer="form"]');
    this.inputHours = document.querySelector('[data-timer="input_hours"]');
    this.inputMinutes = document.querySelector('[data-timer="input_minutes"]');
    this.inputSeconds = document.querySelector('[data-timer="input_seconds"]');

    this.showHours = document.querySelector('[data-timer="show_hours"]');
    this.showMinutes = document.querySelector('[data-timer="show_minutes"]');
    this.showSeconds = document.querySelector('[data-timer="show_seconds"]');
  }
  init() {
    //check user notification permission
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications.');
    } else {
      if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          console.log(permission);
        });
      }
    }
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

    this.timeMilliseconds = seconds + minutes * 60 + hours * 60 * 60;
    this.countDownTimer();
  }
  countDownTimer() {
    const intervalTimer = setInterval(() => {
      const hours = Math.floor(this.timeMilliseconds / 3600);
      const minutes = Math.floor((this.timeMilliseconds / 60) % 60);
      const seconds = Math.floor(this.timeMilliseconds % 60);

      this.toggleShowValues(this.inputHours, this.showHours, hours);
      this.toggleShowValues(this.inputMinutes, this.showMinutes, minutes);
      this.toggleShowValues(this.inputSeconds, this.showSeconds, seconds);

      if (this.timeMilliseconds === 0) {
        this.stopCountdownTimer();
        clearInterval(intervalTimer);
      }

      this.timeMilliseconds = Math.max(this.timeMilliseconds - 1, 0);
    }, 1000);
  }
  stopCountdownTimer() {
    if (Notification.permission === 'granted') {
      createNotification(taskTitle);
    } else {
      alert('Countdown timer is complete');
    }
  }
  createNotification(title = 'notified') {
    // Create and show the notification
    const img = '/to-do-notifications/img/icon-128.png';
    const text = `HEY! Your task "${title}" is now overdue.`;
    const notification = new Notification('To do list', { body: text, icon: img });
  }
  checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }

    return true;
  }
  toggleShowValues(input, showcase, value) {
    showcase.textContent = value ? value.toString().padStart(2, '0') : '00';
    showcase.classList.add('open');
    input.style.display = 'none';
  }
}

const timer = new Timer();
document.addEventListener('DOMContentLoaded', (_) => {
  timer.init();
});
