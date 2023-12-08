import { questions } from "./questions.js";

class Store {
  #state;
  constructor() {
    this.#state = questions;
  }
  all() {
    return this.#state;
  }
  get(id) {
    return this.#state.find((faq, index) => {
      if (index === id) {
        return faq;
      }
    });
  }
}

export default Store;
