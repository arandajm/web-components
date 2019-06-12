class Tooltip extends HTMLElement {
  constructor() {
    super();
  }

  //Access to the DOM when this element has been mounted and modify it!
  connectedCallback() {
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " (?)";
    this.appendChild(tooltipIcon);
  }
}

customElements.define("wc-tooltip", Tooltip);
