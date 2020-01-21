class Tooltip extends HTMLElement {
  // this default method is called when the class is instanced
  constructor() {
    super();
    // This will be used to save the tooltip container and it will be accessed into the class
    this._tooltipContainer;
    // This will be used to save the tooltip icon and it will be accessed into the class
    this._tooltipIcon;
    // This property is associated with the text attribute, that for default has "Some dummy text!!" like its value
    this._tooltipText = "Some dummy text!!";
    //Enable shadow DOM
    this.attachShadow({ mode: "open" });
    // You can style your web component with ::slotted, :host o :host-context
    this.shadowRoot.innerHTML = `
                <style>
                  div {
                    font-weight: normal;
                    background-color: black;
                    color: white;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem;
                    z-index: 10;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                  }

                  .highlight {
                    background-color: red;
                  }

                  ::slotted(.highlight){
                    border-bottom: 1px dotted red;
                  }

                  .icon {
                    background: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                  }
                  
                  :host(.important) {
                    background: var(--color-primary,#ccc);
                    padding: 0.15rem;
                  }

                  :host-context(p) {
                    font-weight: bold;
                  }

                </style> 
                <slot>Default Text</slot>
                <span class="icon">?</span>`;
  }

  //Access to the DOM when this element has been mounted and modify it!
  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    // Get the span element in the DOM
    this._tooltipIcon = this.shadowRoot.querySelector("span");
    //Add listener when mouse is enter
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );
    this.style.position = "relative";
  }

  // Observe when some attribute changes.
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    // When text attribute changes, we have to apdate the tooltiptext value with the new value
    if (name === "text") {
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    // You have to specify the name of the attribute that you want to observe for any change.
    return ["text"];
  }
  // This Circle life method is called when the element is disconnected from the DOM. This is the best place to clean up for example, the event listeners
  disconnectedCallback() {
    console.log("Removing event listeners....");
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  // This method should be used into the class ("_ convension")
  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("wc-tooltip", Tooltip);
