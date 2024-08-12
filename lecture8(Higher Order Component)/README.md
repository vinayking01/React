## Higher Order Component
A Higher-Order Component (HOC) in React is a function that takes a component and returns a new component with enhanced functionality. HOCs are commonly used for cross-cutting concerns such as logging, access control, injecting props, etc.

Suppose you want to some complex calculation and beautification in two other components the logic is same just the data into it is different for the component . so we can just put this logic in HOC , and call the both component for same logic, return the result.
