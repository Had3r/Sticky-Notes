<div align="center">

# Sticky-Notes (functional programming) in Vanilla JavaScript

A practical application that I use to learn some of the JavaScript concepts. Allows you to add questions along with the answers, 
working perfectly at all resolutions. Written in "***Vanilla***" **JavaScript** (_no frameworks!_) in **functional programming**,
with the maximum control of side effects.

</div>

## Libraries used

* **Ramda** - awesome library built to leverage Functional Programming Concepts
* **Hyperscript** - to generate html and css
* **Webpack/Babel** - I have configured the minimum build system using webpack, babel and several related plugins
* **Virtual-Dom** - to efficiently update webpages

### Others

* NPM Scripts - to configure a simple page-building process. NPM allows me to execute task sequences after the project is completed, 
like compilation **SASS**, prefixing, compressing

### Preview

https://had3r.github.io/Sticky-Notes/

After clicking "Pokaż odpowiedź", three icons will be displayed. After pressing the icon on the left (sad face), the question will be moved to the beginning. The middle icon moves the question to the middle, and the cheerful icon moves the question to the end of the list.

### Development

In your terminal, run:

```sh
git clone https://github.com/Had3r/Sticky-Notes
```

```sh
npm install
```

```sh
npm start
```

### Architecture

in the src folder (code for programming purposes)
```bash
|-- js
        |-- App.js      - impure app function
        |-- index.js    - imports other parts of the app
        |-- Model.js    - data model
        |-- Update.js   - update fn
        |-- View.js     - view fn
|-- sass
        |-- _base.scss         - resets, breakpoints 
        |-- _components.scss   - parts of the app
        |-- _layout.scss    
        |-- main.scss          - imports other files       
```

## Thank you for your interest in my project!

