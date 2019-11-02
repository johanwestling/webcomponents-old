const componentName = `app-button`;

class Component extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
    <style>
    :host {
      --app-input-background-default: black;
      --app-input-padding: 
        var(--app-input-padding-top, .5em) 
        var(--app-input-padding-right, .5em) 
        var(--app-input-padding-bottom, .5em) 
        var(--app-input-padding-left, .5em);
      --app-input-border: 
        var(--app-input-border-size, 1px) 
        var(--app-input-border-type, solid) 
        var(--app-input-border-color, black);
      --app-input-border-radius: .3em;

      display: inline-block;
      color: white;
    }

    #container {
      background: var(--app-input-background-default);
      padding: var(--app-input-padding);
      border: var(--app-input-border);
      border-radius: var(--app-input-border-radius);
    }
    </style>
    <div id="container">
      ${componentName}
      <slot id="slot"></slot>
    </div>
    `;

    this.attachShadow({
      mode: "open"
    });

    this._store = {
      host: this.shadowRoot.host,
      root: this.shadowRoot
    };

    this._store.root.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    console.log(`[${componentName}]: connectedCallback`);
    this._store.host.innerHTML = "Loaded!";
  }

  disconnectedCallback() {
    console.log(`[${componentName}]: disconnectedCallback`);
  }
}

export default (() => {
  console.log(`[${componentName}]: init`);

  if (!customElements.get(`${componentName}`)) {
    setTimeout(() => customElements.define(`${componentName}`, Component), 500);
  }
})();
