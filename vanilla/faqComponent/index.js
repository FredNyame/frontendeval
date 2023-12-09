import { delegate, insertHTML } from './helper.js';
import Store from './store.js';

class APP {
  constructor(store) {
    this.store = store;
    this.mainElement = document.querySelector('#faq');
  }
  init() {
    document.addEventListener('save', () => this.render());
    document.addEventListener('toggle', (e) => this.renderToggle(e.detail));
    this.bindFaqEvents();
    this.render();
  }
  #toggleFAQ({ data: faq, index }) {
    const faqItem = this.mainElement.querySelector(`[data-faqid="${index}"]`);
    const faqContent = faqItem.querySelector('[data-faq="content"]');
    const faqContentHeight = faqContent.scrollHeight;

    if (faq.open) {
      faqItem.classList.add('open');
      faqContent.style.maxHeight = `${faqContentHeight}px`;
      faqContent.style.marginTop = '1rem';
    } else {
      faqItem.classList.remove('open');
      faqContent.style.maxHeight = '0px';
      faqContent.style.marginTop = '0rem';
    }
  }
  faqEvent(event, selector, handler) {
    delegate(this.mainElement, event, selector, (e) => {
      const element = e.target.closest('[data-faqid]');
      handler(this.store.get(element.dataset.faqid), element, e);
    });
  }
  bindFaqEvents() {
    this.faqEvent('click', '[data-faq="faq-btn"]', (_, element) => {
      this.store.toggleFAQ(parseInt(element.dataset.faqid));
    });
  }
  buildFaqCard(faq, index) {
    const divElement = document.createElement('div');
    divElement.dataset.faqid = index;
    divElement.classList.add('faq-item');

    insertHTML(
      divElement,
      `
        <div class="faq-trigger" data-faq="trigger">
            <button class="faq-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                <path fill-rule="evenodd" d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
            </button>

            <button class="faq-btn" aria-expanded="${
              faq.open ? true : false
            }" aria-controls="faq${index}" data-faq="faq-btn">
            ${faq.question}
            </button>
        </div>

        <div class="faq-content" data-faq="content">
        ${faq.answer}
        </div>
        `
    );

    return divElement;
  }
  renderToggle(faqDetail) {
    this.#toggleFAQ(faqDetail);
  }
  render() {
    this.mainElement.replaceChildren(
      ...this.store.all().map((faq, index) => this.buildFaqCard(faq, index))
    );
  }
}

const store = new Store();
const app = new APP(store);
app.init();
