## Higher Order Component
    -A Higher Order Component is a function that takes a component and returns a new enhanced component.
    -It allows you to reuse component logic or add extra functionality without modifying the original component.


``` js
const EnhancedComponent = higherOrderComponent(WrappedComponent); //function call

```


## Key Characteristics:
- HOCs are pure functions with no side effects.
- They create a wrapper component around the original component.
- Do not modify the input component; instead, compose functionality by wrapping it.

## How Props Flow:
- Props are passed when the enhanced component is rendered.
- The HOC wrapper function receives these props and usually forwards them to the wrapped component.
- This chaining enables additional behavior or UI around the original component.



```js  

const withExtraInfo = (WrappedComponent) => {
  return function EnhancedComponent(props) {
    // Add extra props or UI
    return (
      <div>
        <p>Extra Info</p>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

const MyComponentWithExtra = withExtraInfo(MyComponent); 


```
