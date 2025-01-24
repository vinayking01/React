# Airbnb Project

## Form Methods

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

