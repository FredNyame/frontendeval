import { questions } from "./questions.js";

class Store {
  #state;
  constructor() {
    this.#state = questions;
    this.event = new CustomEvent("save");
  }
  #save(event, data) {
    document.dispatchEvent(
      new CustomEvent(event ?? "save", data ? { detail: data } : null)
    );
  }
  all() {
    return this.#state;
  }
  get(id) {
    return this.#state.find((faq, index) => index === id);
  }
  toggleFAQ(id) {
    this.#state = this.#state.map((faq, index) => {
      return index === id ? { ...faq, open: !faq.open } : faq;
    });

    this.#save("toggle", { data: this.get(id), index: id });
  }
}

export default Store;
