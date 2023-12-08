import { questions } from "./questions.js";
import { delegate } from "./helper.js";

class APP {
  #mainElement;
  constructor() {
    this.#mainElement = document.querySelector("#faq");
  }
  init() {
    this.bindFaqEvents();
  }
  faqEvent(event, selector, handler) {
    delegate(this.#mainElement, event, selector, (e) => {
      const element = e.target.closest("data-faqid");
      handler;
    });
  }
  bindFaqEvents() {
    this.faqEvent("click", []);
  }
  buildFaqCard(faq, index) {
    const divElement = document.createElement("div");
    divElement.dataset.faqid = index;
    divElementClass = `faq-item ${faq.open ? "open" : ""}`;
    divElement.classList.add(divElementClass);
  }
}
