import AppComponents from "./component-loaders";

const MutationObserver =
  window.MutationObserver || window.WebKitMutationObserver;
const WebComponents = window.WebComponents;
const componentPromises = {};

export default (() => {
  WebComponents.waitFor(() => componentsInit());
})();

function componentsFinder() {
  const components = [...document.querySelectorAll(":not(:defined)")].filter(
    el => el.localName.startsWith(`app-`)
  );

  for (var i in components) {
    const component = components[i];

    if (!(component.localName in components)) {
      componentPromises[component.localName] = AppComponents[
        component.localName
      ].then(response => {
        if (response && typeof response.default) response.default();
      });
    }
  }
}

function componentsInit() {
  const observer = new MutationObserver(componentsFinder);

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  componentsFinder();
}
