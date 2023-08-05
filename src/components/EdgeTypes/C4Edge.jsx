/* import React, { useRef, useEffect } from 'react';

import './c4style.css';

const C4Edge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data }) => {
  const edgePath = `M ${sourceX},${sourceY} L ${targetX},${targetY}`;
  const pathRef = useRef(null); // Añadir el useRef

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

    const handleDarkModeChange = (e) => {
      if (e.matches) {
        pathRef.current.style.stroke = 'white'; // Color de línea para el modo oscuro
      } else {
        pathRef.current.style.stroke = '#0e0e0e'; // Color de línea para el modo normal
      }
    };

    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    handleDarkModeChange(darkModeMediaQuery);

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  const markerEnd = (
    <marker
      id={`marker-${id}`}
      viewBox="0 0 10 10"
      refX="8"
      refY="5"
      markerWidth="10"
      markerHeight="10"
      orient="auto-start-reverse"
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--c4-arrow-color)" />
    </marker>
  );

  return (
    <>
      <path
        id={id}
        ref={pathRef} // Añadir el ref al elemento path
        className="react-flow__edge-path c4-edge"
        d={edgePath}
        markerEnd={`url(#marker-${id})`}
      />

<path
        className="react-flow__edge-path c4-edge-selection"
        d={edgePath}
      />
      <text className="react-flow__edge-text" dy={8}>
        <textPath xlinkHref={`#${id}`} startOffset="50%" textAnchor="middle">
          {data.title} ({data.type})
        </textPath>
      </text>
      {markerEnd}
    </>
  );
};

export default C4Edge;
 */