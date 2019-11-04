import AppComponents from "./component-loaders";

const MutationObserver =
  window.MutationObserver || window.WebKitMutationObserver;
const componentsLoaded = {};

export default (() => {
  try {
    window.WebComponents.waitFor(componentsInit);
  } catch (e) {
    console.log(`Failed to load polyfills loader!`);
    componentsInit();
  }
})();

function componentsFinder() {
  const els =
    document.querySelectorAll(":not(:defined)") ||
    document.getElementsByTagName("*");
  const components = [...els].filter(el => el.localName.startsWith(`app-`));

  for (var i in components) {
    const component = components[i];

    if (!(component.localName in componentsLoaded)) {
      componentsLoaded[component.localName] = AppComponents[
        component.localName
      ].then(response => {
        if (response && typeof response.default)
          setTimeout(
            response.default,
            Math.floor(Math.random() * (2000 - 1000 + 1) + 1000)
          );
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

  return Promise.resolve();
}
