export const delegate = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.matches(selector)) {
      handler(e, element);
    }
  });
};
