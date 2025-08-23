

## Q: What is `Emmet`?

A: `Emmet` is the essential toolkit for web-developers. It allows you to `type shortcuts` that are then expanded into full pieces of code for writing `HTML and CSS`, based on an abbreviation structure most developers already use that expands into full-fledged HTML markup and CSS rules.

## Q: What is `CDN`? Why do we use it?

A: A `content delivery network (CDN)` refers to a geographically distributed group of servers that work together to provide fast delivery of Internet content.
The goal is to provide high availability and performance by distributing the service spatially relative to end users.

CDN React
------------
- CDN (Content Delivery Network) lets you use React without installing it.
- React and ReactDOM can be loaded directly from the internet using <script> tags.
- This is useful for:
  - Learning
  - Prototyping
  - Demos
- Not used in production (not optimized, slower).
Example:
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>


## Q: Why is `React known as React`?

A: And it's called `React` because it `reacts`. It was developed by Facebook (a site that CONSTANTLY updates their data) to improve the user interface development and more effectively change (REACT to) what the user sees when they're doing things like mouse clicking, submitting and typing.


## Q: What is `crossorigin in script tag` if we are accessing files from CDN eg - like we did in react?
``` js
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
```

The `crossorigin` attribute sets the mode of the request to an HTTP CORS Request.
The purpose of crossorigin attribute is used to share the resources from one domain to another domain. 

Javascript and Browser both works on Same Origin Policy (Feature to prevent malicious websites from making requests to a different domain (origin) on behalf of the user ) . If your web app needs to request resources from a different origin (like an API server), you need explicit permission from that server. 

eg- Your frontend is hosted on https://myapp.com, but your backend API is on https://api.myapp.com

-⚙️ How CORS Works
- 🚫 When a request is made by defining cross origin in your made req, If the response from the server includes the proper Access-Control-Allow-Origin in their header, the browser allows the request to get the response from server and doesn't block you from accessing it, if the server doesn't have access-control details in their response the response will be blocked by browser.
- So means blockade are could be applied first is by browser and at last with server.
- It's same working is in the case when we will handle the api request but it resolved in other way. So, don't get confused with it.
 
``` js
❓ Who controls CORS?
👉 The Browser controls CORS — it decides who is allowed to access the response by checking the browser response sent by server. The details of access is entered by server through configurations in their sent response.

🧑‍💻 What does the frontend (browser/client) do?
It just sends the request.
"Hey browser, send cookies with this" → using credentials: 'include'

Or, in HTML: <img crossorigin="anonymous"> → tells browser how to fetch it.

📌 But the browser still waits for the server to say:

“Yes, I allow your site to access this.”
```
### _Syntax_

```sh
<script crossorigin="anonymous|use-credentials">
```

## Q: What is difference between `React and ReactDOM`?

A: `React` is a JavaScript library for building User Interfaces whereas `ReactDOM` is also JavaScript library that allows `React to interact with the DOM`.

The react package contains `React.createElement()`, `React.Component`, `React.Children`, and other helpers related to elements and component classes. You can think of these as the isomorphic or universal helpers that you need to build components. The react-dom package contains `ReactDOM.render()`, and in react-dom/server we have server-side rendering support with `ReactDOMServer.renderToString()` and `ReactDOMServer.renderToStaticMarkup()`.

## Q: What is difference between `react.development.js` and `react.production.js` files via `CDN`?

A: `Development` is the stage of an application before it's made public while `production` is the term used for the same application when it's made `public`.
`Development build` is several times (maybe 3-5x) `slower` than the `production build`.

## Q: What are `async and differ` attributes in `<script>` tag?

A: `Async` - The async attribute is a `boolean attribute`. The script is downloaded in `parallel(in the background)` to parsing the page, and `executed as soon` as it is available (do not block HTML DOM construction during downloading process) and don’t wait for anything.

### _Syntax_

```
<script async src="demo_async.js"></script>
```

`Defer` - The defer attribute is a `boolean attribute`. The script is downloaded in `parallel(in the background)` to parsing the page, and `executed after the page` has finished parsing(when browser finished DOM construction). The `defer attribute` tells the browser `not to wait for the script`. Instead, the browser will continue to process the HTML, build DOM.

### _Syntax_

```sh
<script defer src="demo_defer.js"></script>
```

## Q: Difference between a `Library and Framework`?

A: A framework is a set of pre-written code that provides a structure for developing software applications. A library, on the other hand, is a collection of pre-written code that can be used to perform specific tasks.

A `library` is a collection of packages that perform specific operations whereas a `framework` contains the basic flow and architecture of an application. The major difference between them is the complexity. Libraries contain a number of methods that a developer can just call whenever they write code. React js is library and Angular is Framework.

The `framework` provides the flow of a software application and tells the developer what it needs and calls the code provided by the developer as required. If a `library` is used, the application calls the code from the library.

## Package Dependency
- For example, consider a project that directly uses "Package A." If "Package A" in turn requires "Package B" to operate, then "Package B" is a transitive dependency of your project. You did not explicitly add "Package B" to your project's configuration, but it is automatically included by your package manager because "Package A" needs it. Same thing happens in when we install any package. 

## NPM vs NPX Package
- npm installs the package globally on your system (local storage). Once installed, you can use that package (like create-react-app) to create projects anywhere on your computer without reinstalling. -> Now using this package we can create our app anytime anywhere.

Example: After running npm install -g create-react-app, you can create apps with create-react-app my-app anytime.

- npx does not install the package globally. Instead, it temporarily downloads the package from the npm registry (or uses a cached version), runs it immediately to create your app in the specified directory, and then removes the temporary CLI tool.

## ⚠️ Important Clarification — Don’t Confuse This with node_modules
Regardless of using npm or npx to create your app, the project folder always includes a node_modules directory — this folder contains all the dependencies your app needs.

## Version
- Tilde (~):
This operator specifies a minor version range. It allows for updates to the patch version but prevents updates to the minor or major versions. For example, ~1.2.3 would allow versions like 1.2.4, 1.2.5, but not 1.3.0 or 2.0.0.

- Caret (^):
This operator specifies a major version range (for versions 1.0.0 and above) or a minor version range (for versions below 1.0.0).
For versions 1.0.0 and above (e.g., ^1.2.3), it allows updates to the minor and patch versions, but not the major version. For instance, ^1.2.3 would allow 1.3.0, 1.2.4, but not 2.0.0.

## Top Ways to Create a React Project ( 10 + ways )
1. 🛠️ Create React App (CRA)
- Command: npx create-react-app my-app or npm create-react-app
- Use Case: Beginners, quick prototypes, batteries-included.
- Pros: Zero config, ready-to-use.
- Cons: Uses Webpack, can be hard to customize deeply.

2. ⚡ Vite
- Command: npm create vite@latest my-app -- --template react
- Use Case: Fast dev builds, modern apps.
- Pros: Lightning-fast HMR, supports TypeScript, easy to configure.
- Cons: Slight learning curve for newcomers.
 
3. 📦 Parcel
- Setup: Manual (as shown in previous responses)
- Use Case: Simple, zero-config bundling.
- Pros: Auto detects JSX, TypeScript, SCSS, etc. Built-in HMR.
- Cons: Less ecosystem than Vite/Webpack.

4. 🌐 React + CDN (No Build Tools)
- Use Case: Tiny demo apps, codepens, quick tests.
- Pros: No setup, runs in browser.
- Cons: No bundling, no JSX without Babel in-browser.
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

### Reactjs / React

1. it is a javascript library for building user Interface.
2. it is not a framework.
3. it is designed by Jordan Walke.
4. first used in fb news feed. created by facebook.
5. It is based on component based approach
6. It allows to create Reuseable UI components.
3. Declarative approach.
4. More scalable.

