class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    // Add event listener to click event and confirm if you want to leave to the href, else we have to preventDefault.
    this.addEventListener("click", event => {
      if (!confirm("Do you really want to leave??")) {
        event.preventDefault();
      }
    });
  }
}
//When we extend from a built in element, we should add one more parameter in the define method, an object with the element we want to extend. In this case, the element is the anchor element.
customElements.define("wc-confirm-link", ConfirmLink, { extends: "a" });
