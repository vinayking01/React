
## Folder Structure of React app - Standardize structure when create through create_react-app , webpack etc. ( just few changes in structure happen)
```
my-app/
├── README.md            // Information about your project, setup instructions, and usage details.
├── node_modules/        // Contains all installed dependencies required for your React application.
├── package.json         // Metadata about your project, including dependencies and scripts.
├── public/              // Contains static assets that are served publicly by your application. do not put the security , confidential file in this folder
│   ├── favicon.ico      // Icon displayed in the browser tab.
│   ├── index.html       // Main HTML file for your application; the root of your React application.
│   └── ...              // Other static assets.
├── src/                 // Contains most of your application code (JavaScript, CSS, components, etc.).
│   ├── App.css          // Stylesheet specific to the App component.
│   ├── App.js           // Main component of your React application; defines structure and behavior.
│   ├── App.test.js      // Test cases for the App component using Jest.
│   ├── index.css        // Global stylesheet for your application.
│   ├── index.js         // Entry point of your React application; renders the App component into the DOM.
│   ├── logo.svg         // Sample SVG logo file included in the default template.
│   └── ...              // Other components, styles, and assets.
└── ...

```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
