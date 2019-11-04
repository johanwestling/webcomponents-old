import AppComponents from "./component-loaders";
const componentsLoaded = {};
const MutationObserver = mutationObserverPrefixed();

function mutationObserverPrefixed() {
  return window.MutationObserver || window.WebKitMutationObserver;
}

function webcomponentsAwaitReady() {
  return new Promise(resolve => {
    function webcomponentsAreReady() {
      if (!window.WebComponents || !window.WebComponents.ready) {
        console.log(`[webcomponents.js]: Waiting...`);
        requestAnimationFrame(webcomponentsAreReady);
        return;
      }
      resolve(webcomponentsReady());
    }
    requestAnimationFrame(webcomponentsAreReady);
  });
}

function webcomponentsReady() {
  console.log(`[webcomponents.js]: Ready!`);
  window.WebComponents.waitFor(webcomponentsAwaitComponents);
}

function webcomponentsAwaitComponents() {
  const observer = new MutationObserver(webcomponentsInitComponents);

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  webcomponentsInitComponents();
}

function webcomponentsInitComponents() {
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

export default webcomponentsAwaitReady();
