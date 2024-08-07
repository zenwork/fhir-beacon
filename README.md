FHIR Beacon
===========

demo site: https://zenwork.github.io/fhir-beacon/

* #### [FHIR](http://hl7.org/fhir/) UI components that do not require a backend 🏝️
* #### Works with all frameworks 🖼️
* #### Works in CSR, SSR, and SSG environments
* #### Built on top of [https://shoelace.style] 👟
* #### Fully customizable with CSS 🎨
* #### Open source

What Problems Does `fhir-beacon` Solve?
-----

* Build FHIR-based UIs in an idiomatic way that aligns to the standard
* Provide out-of-the-box rendering of resources, complex, simple, and other FHIR data structures
* Display errors
* Render as detailed structures
* Extend components to customize what is rendered
* \[TODO] - edit data with full validation
* \[TODO] - display collections as tables.

Why Use Web Components?
--------------

Web Components are a way to instruct the browser on the introduction of new custom elements that can be used just
like any other HTML markup.

```html

<html >
<head >
  <script src="/js/my-element.js"></script >
</head >
<body >
  <my-element title="Salutation" value="Hello World!"></my-element >
</body >
</html >
```

### A Browser Standard

Web component is a browser standard supported in all major browsers and one implementation can be used in all major
frameworks.

They are made up of the following Browser APIs:

* Custom Elements
* Shadow DOM
* Template Elements
* CSS custom properties
* CSS Parts

### Libraries

Although no extra library is needed to create or interact with a web component, there are many librairies that make
their development easier.

### Resources

* [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) - The specification
* [Lit Library](https://lit.dev) - most popular library for implenting web components
* [Web Component](https://webcomponents.dev/) - online IDE with demos of supporting libraries and
  frameworks
* [Browser Support](https://caniuse.com/custom-elementsv1)
