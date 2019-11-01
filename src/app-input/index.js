class AppInput extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
    <div id="box">
      App-input
      <slot id="slot"></slot>
      <label id="label"></label>
    </div>
    `;

    this.attachShadow({
      mode: "open"
    });

    this._store = {
      root: this.shadowRoot
    };

    this._store.root.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {}
}

export default (() => {
  console.log("app-input init");

  if (!customElements.get("app-input")) {
    customElements.define("app-input", AppInput);
  }
})();
