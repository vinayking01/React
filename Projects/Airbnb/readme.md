# Airbnb Project
(AIrbnb Project)["https://airbnb-pthw.onrender.com/"] 

## Project Development Roadmap
``Phase 1: Core Setup & Backend Development``
1. Basic Setup – Establish the project structure, create the listing model, set up routes, implement CRUD operations, and initialize the database.
2. Building the Boilerplate – Configure EJS-Mate for templating, design the navigation bar and footer, and style key pages like index, edit, and delete.
3. Error Handling Implementation – Set up middleware for error handling, create a custom error class, manage default status messages, handle asynchronous errors using try-catch blocks, and manage Mongoose-related errors.

``Phase 2: Advanced Features & Middleware Integration``
1. Form Validation & Feedback – Implement client-side form validation, display success and failure messages, and validate schemas.
2. Listing & Review Management – Handle listing deletions, create the review model, set up post-middleware to delete reviews when a listing is removed, validate reviews, render them, and manage their deletion.
3. Routing & Cookie Management – Restructure listings and reviews using the Express Router, integrate cookie parsing, and handle cookies effectively.
4. Session Management – Understand stateful vs. stateless protocols, implement session-based authentication, store session information, and integrate flash messages for success and failure notifications.

``Phase 3: Authentication, Authorization & Deployment``
1. User Authentication & Authorization – Create a user model, choose an authentication strategy, and implement sign-up and login functionality.
2. User Access Control – Link login/logout features, enforce authorization to restrict users from modifying or deleting listings and reviews without proper permissions.
3. MVC Architecture & Cloud Storage – Refactor the project into an MVC structure for Listings, Reviews, and Users. Implement an image upload feature and integrate cloud storage using Cloudinary.
4. Image & Map Integration – Enable image editing and preview functionality via cloud storage. Connect and configure a mapping service using the Here Maps API for geocoding.
5. Database & Deployment – Transition from a local MongoDB setup to Mongo Atlas for online hosting, convert Express sessions to use MongoDB session storage, and deploy the project on Render.

## Points Taken 
### Form Methods

In HTML, forms support only two methods: `GET` and `POST`. These methods define how data is sent to the server side or even same situation in client side.

## Handling Other HTTP Methods 

- When handling form submissions on the server side, sometimes you need to use HTTP methods other than `GET` and `POST`, such as `PUT` or `DELETE`. This can be achieved by using a hidden input field to override the method.
- in server side the Express does

### Example

```html
<form action="/update" method="post">
    <input type="hidden" name="_method" value="put">
    <input type="text" name="username" placeholder="Username">
    <button type="submit">Update</button>
</form>
```

On the server side, you can check for the `_method` parameter and override the request method accordingly.

### Server-Side Handling (Node.js Example)

```javascript
const express = require('express');
const methodOverride = require('method-override');
const app = express();

// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.post('/update', (req, res) => {
    if (req.body._method === 'put') {
        // Handle PUT request
        res.send('Handled PUT request');
    } else {
        res.send('Handled POST request');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

By using the `method-override` middleware, you can handle different HTTP methods while still using forms that only support `GET` and `POST`.



