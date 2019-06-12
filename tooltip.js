class Tooltip extends HTMLElement {
  constructor() {
    super();
    // This will be used to save the tooltip container and it will be accessed into the class
    this.tooltipContainer;
    // This property is associated with the text attribute, that for default has "Some dummy text!!" like its value
    this.tooltipText = "Some dummy text!!";
  }

  //Access to the DOM when this element has been mounted and modify it!
  connectedCallback() {
    if (this.hasAttribute("text")) {
      this.tooltipText = this.getAttribute("text");
    }
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " (?)";
    //Add listener when mouse is enter
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.appendChild(tooltipIcon);
  }

  // This method should be used into the class ("_ convension")
  _showTooltip() {
    this.tooltipContainer = document.createElement("div");
    this.tooltipContainer.textContent = this.tooltipText;
    this.appendChild(this.tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this.tooltipContainer);
  }
}

customElements.define("wc-tooltip", Tooltip);
