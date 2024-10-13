import { createContext, useContext } from 'react';

// 2. Create a new context using React's `createContext()` function.
//    This context will hold values that can be shared with other components.
//    The default value is an objectwhich we have passed below
export const MyContext = createContext({
    themeMode: "light",
    darkTheme: () => { },
    lightTheme: () => { },
});

// 3. Export the context's `Provider` component.
//    This `Provider` is a special component that makes the context available to child components.
//    You pass the `value` prop to this provider, and all child components can access it.
export const MyThemeProvider = MyContext.Provider;

// 4. Define a custom hook called `useTheme`.
//    This hook allows components to easily access the values from `MyContext` without needing
//    to write `useContext(MyContext)` in each component. It's a shortcut to make code cleaner.
//    - It uses `useContext(MyContext)` to access the context.
//    - It returns the context values (themeMode, darkTheme, and lightTheme).
export function useTheme() {
    return useContext(MyContext);
}