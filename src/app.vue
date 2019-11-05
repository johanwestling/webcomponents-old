<template>
  <div id="app" class="app">
    <div class="app-actions">
      <button type="button" @click="webcomponentAdd('app-input')">+ App-input</button>
      <button type="button" @click="webcomponentAdd('app-button')">+ App-button</button>
    </div>
    <div class="app-preview" v-html="webcomponentsHTML"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      webcomponents: ["app-input"],
      webcomponentsPreview: null
    };
  },
  computed: {
    webcomponentsHTML() {
      let html = ``;

      this.webcomponents.forEach(component => {
        html = `
        ${html}
        <${component}>Loading...</${component}>
        `;
      });

      return `
      ${html}
      <div id="scroll-target"></div>
      `;
    },
    webcomponentsScrollIntoView() {
      return this.webcomponentsHTML;
    }
  },
  methods: {
    webcomponentAdd(component) {
      this.webcomponents.push(component);
    }
  },
  mounted() {
    this.webcomponentsPreview = document.querySelector(".app-preview");
  },
  updated() {
    setTimeout(() => {
      if (this.webcomponentsPreview) {
        const target = this.webcomponentsPreview.querySelector(
          "#scroll-target"
        );

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }
    }, 500);
  }
};
</script>

<style>
html {
  box-sizing: border-box;
  font-size: 100%;
  color: black;
}

body {
  margin: 0;
}

body,
button,
input,
select,
textarea {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 1em;
  line-height: 1.5;
  color: inherit;
}

.app {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 3em 1fr;
}

.app-preview {
  padding: 3em;
  overflow: auto;

  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}

.app-preview > * {
  margin: 0.5em;
}

.app-actions {
  background: black;

  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: stretch;

  color: white;
}

.app-actions button {
  background: transparent;
  padding: 0 0.5em;
  border: none;
}
</style>