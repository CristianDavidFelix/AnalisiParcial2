class LoginObservable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    this.observers.push(func);
    console.log(this.observers);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((f) => {
      return f !== func;
    });
  }

  notify(value) {
    this.observers.forEach((observer) => {
      observer(value);
    });
  }
}

export default new LoginObservable();
