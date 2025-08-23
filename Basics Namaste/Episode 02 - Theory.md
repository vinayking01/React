

# _Episode 02 

## Q: What is `npm`?

A: `npm` is the world's largest Software Registry. The registry contains over 800,000 code packages. Open-source developers use `npm` to share software.

npm is lots of things:

- `npm` is the package manager for Node.js. It was created in 2009 as an open source project to help JavaScript developers easily share packaged modules of code.

- The `npm` Registry is a public collection of packages of open-source code for` Node.js, front-end web apps, mobile apps, robots, routers`, and countless other needs of the JavaScript community.
- `npm` alternative is `yarn`

### How to initialize `npm`?

```
npm init
```

`npm init -y` can be used to skip the setup step, `npm` takes care of it and creates the `package.json` json file automatically , but without configurations.

- `npm` is the command line client that allows developers to install and publish those packages.

## Package Bundlers
- Prepares code for browser by doing these various things and ready the code to use in production:
  - Combining multiple files (bundling)
  - Reducing size (minification)
  - Splitting files (code splitting/chunking)
- Also supports:
  - Tree-shaking (remove unused code)
  - Live reload / HMR
- Examples:
  - Webpack (classic, complex config)
  - Parcel (zero-config)
  - Vite (modern, fast, recommended)

## Why do we need Vite or other modern bundlers if Create React App already uses Webpack internally?
- The command npx create-react-app app1 sets up a new React project and uses Webpack as the bundler under the hood. However, this setup has several limitations compared to modern tools like Vite or Parcel, which offer faster builds, better performance, and easier configuration.
- CRA (Create React App) uses: Webpack (bundler) , Babel (JSX + JS transpiler), Other tools (ESLint, Jest, etc.). But the today's bundlers have more advantage like image optimization etc which was not available in webPack.

Use of `Parcel/Webpack`:
Module bundlers are the way to organize and combine many files of JavaScript code into one file. A JavaScript bundler can be used when your project becomes too large for a single file or when you're working with libraries that have multiple dependencies.


### installation commands for parcel:
- parcel package bundler is actually maintained manually.
- Install:

```
npm install -D parcel
```

`-D` is used for development and as a development dependency.

- Parcel Commands :
  - For development build:
  ```
  npx parcel <entry_point>
  ```
  - For production build :
  ```
  npx parcel build <entry_point>
  ```

## Q: How to add shortcut script in our project to run the app for production ready or development ready.
- During configuration, add name of script and command in package.json.
- we added the command like this in our script of package.json 
```
"start" : "parcel index.html",
"build" : "parcel build index.html"
```

- How u run ( Simple npm run <name>)
```
npm run start === npm start ( for development, both commands will work)
npm run build != npm run build (for production only it will crate a final dist folder for you by doing various optimization)

```



## Q: Why is `.parcel-cache` folder?

A: `cache folder` (or `.parcel-cache in parcel v2`) stores information about your project when parcel builds it for developement through command ( npm parcel index.html), so that when it rebuilds, it doesn't have to re-parse and re-analyze everything from scratch. It's a key reason why parcel can be so fast in development mode.

## Q: What is Tree Shaking? in Parcel?

A: `Tree shaking`, also known as `dead code elimination`, is the practice of `removing unused code in your production build`. It's important to ship as little code to your end-users as possible. By statically analyzing our source code, we can determine what's not being used and exclude it from our final bundle.

## Q: What is Hot Module Replacement?

A: `Hot Module Replacement (HMR)` exchanges, adds, or removes modules while an application is running, without a full reload. This can significantly speed up development in a few ways: Retain application state which is lost during a full reload. Save valuable development time by only updating what's changed.
- Provided by new react-app package and other package bundlers in their feature.

## Q: List down your favourite 5 superpowers of Parcel and describe any 3 of them in your own words.

### Parcel features:

- Dev Build - parcel provides us develop build
- Local Server - parcel also provides us a local server, which can be used to see live changes in our application.
- HMR = Hot Module Replacement - exchanges, adds, or removes modules while an application is running, without a full reload

and some of more cool features of Parcel are:

- File Watching Algorithm - written in C++
- Caching - Faster Builds
- Image Optimization
- Minification
- Bundling
- Compress
- Consistent Hashing
- Code Splitting
- Differential Bundling - support older browsers
- Diagnostic
- Error Handling
- HTTPs
- Tree Shaking - remove unused code
- Different Build for dev and prod bundles

## Q: What is `.gitignore`? What should we add and not add into it?

A: gitignore file tells Git which files to ignore when committing your project to the GitHub repository. gitignore is located in the root directory of your repo. / will ignore directories with the name.

In our code we shouldn't add the files, which we can re-generate in future e.g, `node_modules`, `dist` etc.

## Package.json vs Package-lock.json
- The package.json file focuses on project metadata and specifying the desired versions of dependencies, while the package-lock.json file ensures deterministic installations by locking the exact versions of dependencies and their dependencies.

## Q: Why should I not modify `package-lock.json`?

A: It is a generated file and is not designed to be manually edited. Its purpose is to track the entire tree of dependencies (including dependencies of dependencies) and the exact version of each dependency. You should commit `package-lock.json` to your code repository

You should avoid updating the `package.json` manually since it could break the synchronization between `package.json` and `package-lock. json`.

## Dependencies vs Dev - Dependencies

These are two types of dependencies in your package.json file, and they serve different purposes.

- ✅ dependencies
These are the packages your app needs to run in production.
They are essential for the actual functioning of your app.
eg like - npm install react

- 🧪 devDependencies
These are tools used during development, but not needed in production.
They help in building, testing, linting, compiling, etc.
They are not included when your app is deployed (e.g., on production servers).
eg like - npm install --save-dev parcel

```
"devDependencies": {
  "parcel": "^2.9.3",
  "eslint": "^8.55.0",
}

```

## Q: What is `node_modules`? Is it a good idea to push that on git?

A: The `node_modules` folder contains generated code. This is not code you've written and you should never make any updates to the files inside Node modules because there's a pretty good chance they'll get overwritten next time you install some modules.

It is better to not commit the `node_modules` folder, and instead add it to your `.gitignore` file.

Here are all the reasons why you shouldn't commit it: The node_modules folder has a massive size (up to Gigabytes). It is easy to recreate the node_modules folder via packages. json

## Q: What is the `dist` folder?

A: The `/dist` stands for distributable. The /dist folder contains the minimized version of the source code. The code present in the /dist folder is actually the code which is used on production web applications.

Parcel's default directory for your output is named dist . The --dist-dir public tag defines the output folder for your production files and is named public to avoid confusion with the dist default directory.

## Q: What is `browserlists`?

A: Browserslist defines and shares the list of target browsers between various frontend build tools.



