import { useState, useLayoutEffect, useEffect, useRef } from "react";


export function UseLayout_hook() {
  const [width, setWidth] = useState(0);
  const divRef = useRef(null);

  // useLayoutEffect runs synchronously after DOM changes but before painting
  useLayoutEffect(() => {
    if (divRef.current) {
      // Measure the width of the div and set it in the state
      setWidth(divRef.current.offsetWidth);
    }
  });

  return (
    <div>
      <div ref={divRef} style={{ width: "100%" }}>
        This div has a width of {width}px.
      </div>
    </div>
  );
}

