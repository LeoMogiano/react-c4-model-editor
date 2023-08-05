import React, { useRef, useEffect } from 'react';

import './conlinStyle.css';

export default ({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
  connectionLineType,
  connectionLineStyle,
}) => {
  const pathRef = useRef(null);

  useEffect(() => {
    // Escucha de eventos para detectar los cambios en el modo de color del sistema operativo
    const darkModeMediaQuery = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

    const handleDarkModeChange = (e) => {
      if (e.matches) {
        pathRef.current.style.stroke = 'var(--dark-connection-color)'; // Color de línea para el modo oscuro
      } else {
        pathRef.current.style.stroke = 'var(--light-connection-color)'; // Color de línea para el modo normal
      }
    };

    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    handleDarkModeChange(darkModeMediaQuery);

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  return (
    <g>
      <path
        ref={pathRef}
        fill="none"
        stroke="#222"
        strokeWidth={1.5}
        className="animated"
        d={`M${fromX},${fromY} L ${toX},${toY}`}
      />
      <circle cx={toX} cy={toY} fill="#fff" r={3} stroke="#222" strokeWidth={1.5} />
    </g>
  );
};