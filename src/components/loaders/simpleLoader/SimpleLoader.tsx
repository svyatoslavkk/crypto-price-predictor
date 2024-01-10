import React from 'react';
import './simpleLoader.scss';

export default function SimpleLoader() {
  return (
    <div className="simple-loader">
      <div className="loader">
        <div className="orbe" style={{ "--index": 0 } as React.CSSProperties}></div>
        <div className="orbe" style={{ "--index": 1 } as React.CSSProperties}></div>
        <div className="orbe" style={{ "--index": 2 } as React.CSSProperties}></div>
        <div className="orbe" style={{ "--index": 3 } as React.CSSProperties}></div>
        <div className="orbe" style={{ "--index": 4 } as React.CSSProperties}></div>
      </div>
    </div>
  )
}