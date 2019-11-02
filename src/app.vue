<template>
  <div id="app" class="app">
    <div v-html="webcomponentsHTML"></div>

    <button type="button" @click="addWebcomponent">Add component</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      webcomponents: ["app-input"]
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

      return html;
    }
  },
  methods: {
    addWebcomponent() {
      this.webcomponents.push("app-button");
    }
  }
};
</script>
