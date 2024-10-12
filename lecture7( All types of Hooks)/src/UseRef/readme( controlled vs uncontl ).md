### Controlled Components
1. A controlled component is a form element (like an input, select, etc.) where the value is controlled by React state. The component renders based on the state, and any changes to the input update the state.
- React State controls the input value.
- Changes to the input are reflected immediately in the state.

### Uncontrolled Components
1. An uncontrolled component is a form element where the value is handled by the DOM itself. Instead of using React state to control the value, you rely on Refs to access the input value directly from the DOM.
- DOM manages the form value.
- React doesn’t track the input changes until you explicitly retrieve the value.

## Summary:
- Controlled Component: React controls the input value via state (useState), and updates are managed through React's render cycle.
- Uncontrolled Component: The input value is handled by the DOM, and React uses useRef to access the value when necessary.