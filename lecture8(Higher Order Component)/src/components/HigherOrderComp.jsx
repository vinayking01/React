import React, { useState } from 'react';

export function HOComponent(OldComponent) {
    return function EnhancedComponent(props) {
        const [count, setCount] = useState(0);
        console.log(props)
        return (
            <OldComponent {...props} count={count} incrementCount={() => setCount(count + 1)} />
        );
    }
}
